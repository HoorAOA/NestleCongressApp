import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronUp, Reply } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { Question } from '../../data/engagementData';

interface QuestionCardProps {
    question: Question;
    onToggleVote: () => void;
    onReply: () => void;
}

const QuestionCard = ({ question, onToggleVote, onReply }: QuestionCardProps) => {
    const { t } = useTranslation();

    return (
        <View style={[styles.card, question.answered && styles.cardAnswered]}>
        <Pressable
            onPress={onToggleVote}
            accessibilityLabel={question.upvoted ? t('quickAccess.askQaRemoveUpvote') : t('quickAccess.askQaUpvote')}
            style={[styles.vote, question.upvoted && styles.voteActive]}
        >
            <ChevronUp
                size={20}
                color={question.upvoted ? Colors.primary : Colors.mutedText}
                strokeWidth={3}
            />
            <Text
                style={[
                    styles.voteCount,
                    question.upvoted && { color: Colors.primary },
                ]}
            >
                {question.votes}
            </Text>
        </Pressable>

        <View style={styles.body}>
            <View style={styles.tags}>
                <View style={styles.categoryChip}>
                    <Text style={styles.categoryText}>{question.category}</Text>
                </View>

                {question.answered && (
                    <View style={styles.answeredChip}>
                        <Text style={styles.answeredText}>{t('quickAccess.askQaAnswered')}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.text}>{question.text}</Text>

            <View style={styles.footer}>
                <View style={styles.author}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {question.author.replace(/^Dr\.?\s*/i, '').charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.authorName} numberOfLines={1}>
                        {question.author}
                    </Text>
                </View>

                <Pressable onPress={onReply} style={styles.reply} hitSlop={8}>
                    <Reply size={16} color={Colors.mutedText} />
                    <Text style={styles.replyText}>{t('quickAccess.askQaReply')}</Text>
                </Pressable>
            </View>
        </View>
    </View>
);
};

export default QuestionCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 14,
        padding: 16,
        borderRadius: 26,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: Colors.navyText,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    cardAnswered: {
        borderColor: Colors.goldBorder,
    },
    vote: {
        width: 54,
        height: 66,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: Colors.sheetBackground,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    voteActive: {
        backgroundColor: Colors.iconTintBlue,
        borderColor: Colors.primary,
    },
    voteCount: {
        fontSize: 16,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    body: {
        flex: 1,
        gap: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: Colors.iconTintBlue,
    },
    categoryText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    answeredChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: Colors.gold,
    },
    answeredText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: Colors.navyText,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    author: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.iconTintBlue,
    },
    avatarText: {
        fontSize: 13,
        fontFamily: Typography.extraBold,
        color: Colors.primary,
    },
    authorName: {
        flexShrink: 1,
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: Colors.mutedText,
    },
    reply: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    replyText: {
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: Colors.mutedText,
    },
});
