import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface GradientBoxProps {
    colors: [string, string];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    radius?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

const GradientBox = ({
    colors,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    radius = 0,
    style,
    children,
}: GradientBoxProps) => (
    <View style={[{ borderRadius: radius }, style]}>
        <View
            pointerEvents="none"
            style={[
                StyleSheet.absoluteFill,
                { borderRadius: radius, overflow: 'hidden' },
            ]}
        >
            <Svg width="100%" height="100%">
                <Defs>
                    <LinearGradient
                        id="box"
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                    >
                        <Stop offset="0" stopColor={colors[0]} />
                        <Stop offset="1" stopColor={colors[1]} />
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#box)" />
            </Svg>
        </View>
        {children}
    </View>
);

export default GradientBox;
