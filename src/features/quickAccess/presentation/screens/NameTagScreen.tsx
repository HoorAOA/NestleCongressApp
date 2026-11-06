import React, { useRef, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { Share2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import logger from '../../../../core/utils/logger';
import { ABOUT_URL, ATTENDEE } from '../../data/quickAccessData';
import {
    HeaderIconButton,
    NameTagCard,
    ScreenLayout } from '../components';

const NameTagScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const cardRef = useRef<React.ElementRef<typeof View>>(null);
    const [sharing, setSharing] = useState(false);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    const attendee = {
        ...ATTENDEE,
        name: isArabic ? ATTENDEE.nameAr : ATTENDEE.nameEn,
        headline: isArabic ? ATTENDEE.headlineAr : ATTENDEE.headlineEn,
        location: isArabic ? ATTENDEE.locationAr : ATTENDEE.locationEn,
        congressDates: isArabic ? ATTENDEE.congressDatesAr : ATTENDEE.congressDatesEn,
    };

    const openAbout = async () => {
        try {
            await Linking.openURL(ABOUT_URL);
        } catch {
            Alert.alert(t('common.linkErrorTitle'), t('common.linkErrorMessage'));
        }
    };

    const shareNameTag = async () => {
        if (sharing || !cardRef.current) {
            return;
        }

        try {
            setSharing(true);

            const base64 = await captureRef(cardRef, {
                format: 'png',
                quality: 1,
                result: 'base64',
            });

            await Share.open({
                title: t('quickAccess.myNameTag'),
                url: `data:image/png;base64,${base64}`,
                type: 'image/png',
                filename: 'nestle-congress-name-tag',
                failOnCancel: false,
            });
        } catch (error) {
            logger.error('Failed to share name tag:', error);
            Alert.alert(t('common.shareErrorTitle'), t('common.shareErrorMessage'));
        } finally {
            setSharing(false);
        }
    };

    return (
        <ScreenLayout
            title={t('quickAccess.myNameTag')}
            onBack={navigation.goBack}
            padded
            headerRight={
                <HeaderIconButton label={t('quickAccess.shareNameTag')} onPress={shareNameTag}>
                    <Share2 size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
        >
            <NameTagCard
                ref={cardRef}
                attendee={attendee}
                qrValue={ABOUT_URL}
                onQrPress={openAbout}
            />
        </ScreenLayout>
    );
};

export default NameTagScreen;
