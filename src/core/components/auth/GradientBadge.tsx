import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { LucideIcon } from 'lucide-react-native';

import { Colors } from '../../theme/colors';

interface GradientBadgeProps {
    size?: number;
    radius?: number;
    colors?: [string, string];
    icon?: LucideIcon;
    iconSize?: number;
    style?: StyleProp<ViewStyle>;
    iconColor?: string;
}

const GradientBadge = ({
    size = 42,
    radius = 12,
    colors = [Colors.secondary, Colors.primary],
    icon: Icon,
    iconSize,
    style,
    iconColor = Colors.white,
}: GradientBadgeProps) => (
    <View style={[styles.container, { width: size, height: size, borderRadius: radius }, style]}>
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
            <Defs>
                <LinearGradient id={`badgeGrad-${size}-${radius}`} x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={colors[0]} />
                    <Stop offset="1" stopColor={colors[1]} />
                </LinearGradient>
            </Defs>
            <Rect
                width={size}
                height={size}
                rx={radius}
                ry={radius}
                fill={`url(#badgeGrad-${size}-${radius})`}
            />
        </Svg>

        {Icon ? (
            <View style={styles.iconWrap}>
                <Icon size={iconSize ?? Math.max(18, size * 0.52)} color={iconColor} />
            </View>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 4,
    },
    iconWrap: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GradientBadge;
