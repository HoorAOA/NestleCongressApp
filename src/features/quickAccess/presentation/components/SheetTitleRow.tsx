import React from 'react';
import { I18nManager, Pressable, StyleSheet, Text, View } from 'react-native';
import { RotateCcw } from 'lucide-react-native';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface SheetTitleRowProps {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
}

const SheetTitleRow = ({
    title,
    actionLabel,
    onActionPress,
}: SheetTitleRowProps) => {
    const isRTL = I18nManager.isRTL;

    return (
        <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <AppTitle
                title={title}
                size={21}
                color={Colors.navyText}
                weight="extraBold"
                align={isRTL ? 'right' : 'left'}
            />

            {actionLabel && (
                <Pressable
                    onPress={onActionPress}
                    style={[styles.action, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                    hitSlop={6}
                >
                    <RotateCcw size={15} color={Colors.primary} />
                    <Text style={styles.actionText}>{actionLabel}</Text>
                </Pressable>
            )}
        </View>
    );
};

export default SheetTitleRow;

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    action: {
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 18,
        backgroundColor: Colors.iconTintBlue,
    },
    actionText: {
        fontSize: 13,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});
