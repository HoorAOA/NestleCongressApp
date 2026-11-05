import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ShieldCheck } from 'lucide-react-native';

import { Colors } from '../../theme/colors';

const ShieldBadge = ({ size = 42 }: { size?: number }) => (
    <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
            <Defs>
                <LinearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={Colors.secondary} />
                    <Stop offset="1" stopColor={Colors.primary} />
                </LinearGradient>
            </Defs>
            <Rect
                width={size}
                height={size}
                rx={12}
                ry={12}
                fill="url(#shieldGrad)"
            />
        </Svg>
        <View style={styles.iconWrap}>
            <ShieldCheck size={22} color={Colors.white} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
    iconWrap: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ShieldBadge;
