import React, { createContext, useContext } from 'react';
import { I18nManager } from 'react-native';

interface LanguageContextValue {
    isRTL: boolean;
    refreshDirection: () => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
    isRTL: I18nManager.isRTL,
    refreshDirection: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
