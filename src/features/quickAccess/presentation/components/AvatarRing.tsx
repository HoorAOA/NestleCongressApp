import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface AvatarRingProps {
    initials: string;
    size?: number;
    colors?: [string, string];
    fontSize?: number;
}

const STROKE = 3;

const AvatarRing = ({
    initials,
    size = 76,
    colors = [Colors.secondary, Colors.primary],
    fontSize,
}: AvatarRingProps) => (
    <View
        style={{
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
            <Defs>
                <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={colors[0]} />
                    <Stop offset="1" stopColor={colors[1]} />
                </LinearGradient>
            </Defs>
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={(size - STROKE) / 2}
                fill={Colors.iconTintBlue}
                stroke="url(#ring)"
                strokeWidth={STROKE}
            />
        </Svg>

        <Text
            style={{
                fontFamily: Typography.extraBold,
                fontSize: fontSize ?? size * 0.3,
                color: Colors.primary,
            }}
        >
            {initials}
        </Text>
    </View>
);

export default AvatarRing;
