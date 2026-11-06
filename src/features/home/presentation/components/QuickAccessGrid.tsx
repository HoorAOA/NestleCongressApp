import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

type QuickAccessItem = {
    label: string;
    Icon: React.ComponentType<{ size?: number; color?: string; fill?: string }>;
};

type QuickAccessGridProps = {
    items: QuickAccessItem[];
    tileSize: number;
    onItemPress?: (label: string) => void;
};

const QuickAccessGrid = ({ items, tileSize, onItemPress }: QuickAccessGridProps) => (
    <View style={styles.grid}>
        {items.map(({ label, Icon }) => (
            <Pressable
                key={label}
                onPress={() => onItemPress?.(label)}
                style={[
                    styles.tile,
                    { width: tileSize, height: tileSize * 1.18 },
                ]}
            >
                <Icon size={24} color={Colors.blueBright} />
                <Text style={styles.tileLabel} numberOfLines={1}>
                    {label}
                </Text>
            </Pressable>
        ))}
    </View>
);

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tile: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 18,
        backgroundColor: Colors.tileBackground,
        borderWidth: 1,
        borderColor: Colors.tileBorder,
    },
    tileLabel: {
        color: Colors.white,
        fontSize: 10,
        fontFamily: Typography.semiBold,
    },
});

export default QuickAccessGrid;
export type { QuickAccessItem };
