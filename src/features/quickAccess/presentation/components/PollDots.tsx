import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors } from '../../../../core/theme/colors';

interface PollDotsProps {
    count: number;
    scrollX: Animated.Value;
    pageWidth: number;
}

/** Page indicator whose active dot stretches into a pill while swiping. */
const PollDots = ({ count, scrollX, pageWidth }: PollDotsProps) => {
    const w = pageWidth || 1;

    return (
        <View style={styles.row}>
            {Array.from({ length: count }).map((_, i) => {
                const inputRange = [(i - 1) * w, i * w, (i + 1) * w];

                const width = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 34, 10],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [Colors.dotInactive, Colors.primary, Colors.dotInactive],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={i}
                        style={[styles.dot, { width, backgroundColor }]}
                    />
                );
            })}
        </View>
    );
};

export default PollDots;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        height: 10,
        borderRadius: 5,
    },
});
