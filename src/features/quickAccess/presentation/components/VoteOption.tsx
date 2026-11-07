import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface VoteOptionProps {
    label: string;
    percent: number;
    votes: number;
    selected: boolean;
    /** Results (percent, bar, votes) are shown once the poll has been answered. */
    revealed: boolean;
    disabled?: boolean;
    onPress: () => void;
}

const VoteOption = ({
    label,
    percent,
    votes,
    selected,
    revealed,
    disabled,
    onPress,
}: VoteOptionProps) => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: revealed ? percent : 0,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();
    }, [revealed, percent, progress]);

    const barWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                pressed && { opacity: 0.85 },
            ]}
        >
            <View style={styles.row}>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                    {selected && <Check size={16} color={Colors.white} strokeWidth={3} />}
                </View>

                <Text style={styles.label}>{label}</Text>

                {revealed && <Text style={styles.percent}>{percent}%</Text>}
            </View>

            {revealed && (
                <>
                    <View style={styles.track}>
                        <Animated.View
                            style={[
                                styles.fill,
                                {
                                    width: barWidth,
                                    backgroundColor: selected
                                        ? Colors.gold
                                        : Colors.blueBright,
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.votes}>
                        {votes} {votes === 1 ? 'vote' : 'votes'}
                    </Text>
                </>
            )}
        </Pressable>
    );
};

export default VoteOption;

const styles = StyleSheet.create({
    card: {
        gap: 12,
        padding: 16,
        borderRadius: 22,
        backgroundColor: Colors.sheetBackground,
        borderWidth: 1.5,
        borderColor: Colors.cardBorder,
    },
    cardSelected: {
        backgroundColor: Colors.iconTintBlue,
        borderColor: Colors.primary,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    radio: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: Colors.dotInactive,
    },
    radioSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    percent: {
        fontSize: 15,
        fontFamily: Typography.extraBold,
        color: Colors.primary,
    },
    track: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: Colors.trackBackground,
    },
    fill: {
        height: '100%',
        borderRadius: 5,
    },
    votes: {
        alignSelf: 'flex-end',
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.mutedText,
    },
});
