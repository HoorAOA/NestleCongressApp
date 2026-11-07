import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { Poll } from '../../data/engagementData';

import VoteOption from './VoteOption';

interface VotePollCardProps {
    poll: Poll;
    selectedId?: string;
    locked: boolean;
    onSelect: (optionId: string) => void;
}

const VotePollCard = ({ poll, selectedId, locked, onSelect }: VotePollCardProps) => {
    const answered = !!selectedId;

    // The user's own vote is added on top of the existing votes.
    const options = poll.options.map(option => ({
        ...option,
        total: option.votes + (option.id === selectedId ? 1 : 0),
    }));
    const totalVotes = options.reduce((sum, o) => sum + o.total, 0);

    return (
        <View style={styles.card}>
            <View style={styles.statusRow}>
                <View style={[styles.pill, answered ? styles.pillVoted : styles.pillLive]}>
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: answered ? Colors.gold : Colors.primary },
                        ]}
                    />
                    <Text
                        style={[
                            styles.pillText,
                            { color: answered ? Colors.goldDeep : Colors.primary },
                        ]}
                    >
                        {answered ? 'VOTED' : 'LIVE'}
                    </Text>
                </View>

                <Text style={styles.category}>{poll.category}</Text>
            </View>

            <AppTitle
                title={poll.question}
                size={22}
                color={Colors.navyText}
                weight="extraBold"
                style={{ lineHeight: 29 }}
            />

            <Text style={styles.totalVotes}>{totalVotes} total votes</Text>

            <View style={styles.options}>
                {options.map(option => (
                    <VoteOption
                        key={option.id}
                        label={option.label}
                        percent={Math.round((option.total / totalVotes) * 100)}
                        votes={option.total}
                        selected={option.id === selectedId}
                        revealed={answered}
                        disabled={locked}
                        onPress={() => onSelect(option.id)}
                    />
                ))}
            </View>
        </View>
    );
};

export default VotePollCard;

const styles = StyleSheet.create({
    card: {
        gap: 14,
        padding: 20,
        borderRadius: 30,
        backgroundColor: Colors.white,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 18,
    },
    pillVoted: {
        backgroundColor: Colors.iconTintGold,
    },
    pillLive: {
        backgroundColor: Colors.iconTintBlue,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    pillText: {
        fontSize: 12,
        letterSpacing: 0.8,
        fontFamily: Typography.extraBold,
    },
    category: {
        fontSize: 13,
        fontFamily: Typography.bold,
        color: Colors.slateText,
    },
    totalVotes: {
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: Colors.mutedText,
    },
    options: {
        gap: 14,
        marginTop: 4,
    },
});
