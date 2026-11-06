import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
}: SheetTitleRowProps) => (
    <View style={styles.row}>
        <AppTitle
            title={title}
            size={21}
            color={Colors.navyText}
            weight="extraBold"
        />

        {actionLabel && (
            <Pressable onPress={onActionPress} style={styles.action} hitSlop={6}>
                <RotateCcw size={15} color={Colors.primary} />
                <Text style={styles.actionText}>{actionLabel}</Text>
            </Pressable>
        )}
    </View>
);

export default SheetTitleRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    action: {
        flexDirection: 'row',
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
