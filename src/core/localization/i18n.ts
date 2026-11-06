import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { getLocales } from 'react-native-localize';

import { LanguageStorage, type AppLanguage } from '../storage/languageStorage';
import en from './locals/en';
import ar from './locals/ar';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

export const supportedLanguages: AppLanguage[] = ['en', 'ar'];

export const applyLanguageDirection = (language: AppLanguage) => {
    const isRTL = language === 'ar';

    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTL);

    return isRTL;
};

export const initializeLanguage = async (): Promise<AppLanguage> => {
    const storedLanguage = await LanguageStorage.getLanguage();

    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
        applyLanguageDirection(storedLanguage);
        await i18next.changeLanguage(storedLanguage);
        return storedLanguage;
    }

    const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
    const nextLanguage = supportedLanguages.includes(deviceLanguage as AppLanguage)
        ? deviceLanguage
        : 'en';

    applyLanguageDirection(nextLanguage as AppLanguage);
    await i18next.changeLanguage(nextLanguage);
    await LanguageStorage.setLanguage(nextLanguage as AppLanguage);

    return nextLanguage as AppLanguage;
};

if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .init({
            compatibilityJSON: 'v4',
            resources,
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            returnNull: false,
        });
}

export default i18next;
