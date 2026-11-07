import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { GradientButton } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';

interface PollFooterProps {
    primaryLabel: string;
    canGoBack: boolean;
    canGoForward: boolean;
    isRTL: boolean;
    onBack: () => void;
    onForward: () => void;
    onPrimary: () => void;
}

const PollFooter = ({
    primaryLabel,
    canGoBack,
    canGoForward,
    onBack,
    onForward,
    onPrimary,
    isRTL,
}: PollFooterProps) => {
    const { t } = useTranslation();

    return (
        <View style={styles.row}>
            <Pressable
                onPress={isRTL ? onForward : onBack}
                disabled={isRTL ? !canGoForward : !canGoBack}
                accessibilityLabel={isRTL ? t('quickAccess.nextPoll') : t('quickAccess.previousPoll')}
                style={[styles.arrow, (isRTL ? !canGoForward : !canGoBack) && styles.arrowDisabled]}
            >
                {isRTL ?<ArrowRight size={22} color={Colors.primary} /> : <ArrowLeft size={22} color={Colors.primary} />}
            </Pressable>

            <View style={styles.primary}>
                <GradientButton title={primaryLabel} onPress={onPrimary} />
            </View>

            <Pressable
                onPress={isRTL ? onBack : onForward}
                disabled={isRTL ? !canGoBack : !canGoForward}
                accessibilityLabel={isRTL ? t('quickAccess.previousPoll') : t('quickAccess.nextPoll')}
                style={[styles.arrow, (isRTL ? !canGoBack : !canGoForward) && styles.arrowDisabled]}
            >
                {isRTL ?<ArrowLeft size={22} color={Colors.primary} /> : <ArrowRight size={22} color={Colors.primary} />}
            </Pressable>
        </View>
    );
};

export default PollFooter;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    primary: {
        flex: 1,
    },
    arrow: {
        width: 54,
        height: 54,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    arrowDisabled: {
        opacity: 0.4,
    },
});
