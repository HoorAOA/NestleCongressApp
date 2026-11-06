import React, { useRef, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { Share2 } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { ABOUT_URL, ATTENDEE } from '../../data/quickAccessData';
import {
    HeaderIconButton,
    NameTagCard,
    ScreenLayout } from '../components';

const NameTagScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const cardRef = useRef<React.ElementRef<typeof View>>(null);
    const [sharing, setSharing] = useState(false);

    const openAbout = async () => {
        try {
            await Linking.openURL(ABOUT_URL);
        } catch {
            Alert.alert('Unable to open link', 'Please try again later.');
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
                title: 'My Name Tag',
                url: `data:image/png;base64,${base64}`,
                type: 'image/png',
                filename: 'nestle-congress-name-tag',
                failOnCancel: false,
            });
        } catch (error) {
            console.error('Failed to share name tag:', error);
            Alert.alert('Unable to share', 'Something went wrong. Please try again.');
        } finally {
            setSharing(false);
        }
    };

    return (
        <ScreenLayout
            title="My Name Tag"
            onBack={navigation.goBack}
            padded
            headerRight={
                <HeaderIconButton label="Share name tag" onPress={shareNameTag}>
                    <Share2 size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
        >
            <NameTagCard
                ref={cardRef}
                attendee={ATTENDEE}
                qrValue={ABOUT_URL}
                onQrPress={openAbout}
            />
        </ScreenLayout>
    );
};

export default NameTagScreen;
