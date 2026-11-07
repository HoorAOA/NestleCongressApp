import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

import { GradientButton } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';

interface PollFooterProps {
    primaryLabel: string;
    canGoBack: boolean;
    canGoForward: boolean;
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
}: PollFooterProps) => (
    <View style={styles.row}>
        <Pressable
            onPress={onBack}
            disabled={!canGoBack}
            accessibilityLabel="Previous poll"
            style={[styles.arrow, !canGoBack && styles.arrowDisabled]}
        >
            <ArrowLeft size={22} color={Colors.primary} />
        </Pressable>

        <View style={styles.primary}>
            <GradientButton title={primaryLabel} onPress={onPrimary} />
        </View>

        <Pressable
            onPress={onForward}
            disabled={!canGoForward}
            accessibilityLabel="Next poll"
            style={[styles.arrow, !canGoForward && styles.arrowDisabled]}
        >
            <ArrowRight size={22} color={Colors.primary} />
        </Pressable>
    </View>
);

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
