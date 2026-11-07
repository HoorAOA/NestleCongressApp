import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { AppTextButton, AppTitle, GradientButton } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

import GradientBox from './GradientBox';

interface VoteSuccessProps {
    answeredCount: number;
    onDone: () => void;
    onReview: () => void;
}

const VoteSuccess = ({ answeredCount, onDone, onReview }: VoteSuccessProps) => {
    const { t } = useTranslation();
    const scale = useRef(new Animated.Value(0.4)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true,
            }),
        ]).start();
    }, [scale, opacity]);

    return (
        <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
            <GradientBox
                radius={48}
                colors={[Colors.secondary, Colors.primary]}
                style={styles.badge}
            >
                <Check size={44} color={Colors.white} strokeWidth={3} />
            </GradientBox>

            <AppTitle
                title={t('quickAccess.votesSubmitted')}
                size={24}
                color={Colors.navyText}
                weight="extraBold"
                align="center"
            />

            <Text style={styles.subtitle}>
                {t('quickAccess.votesSubmittedSubtitle', { count: answeredCount })}
            </Text>

            <View style={styles.actions}>
                <GradientButton title={t('quickAccess.votingDone')} onPress={onDone} />
                <AppTextButton title={t('quickAccess.votingReview')} onPress={onReview} />
            </View>
        </Animated.View>
    );
};

export default VoteSuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 8,
        paddingBottom: 40,
    },
    badge: {
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 20,
        fontFamily: Typography.medium,
        color: Colors.slateText,
    },
    actions: {
        alignSelf: 'stretch',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
});
