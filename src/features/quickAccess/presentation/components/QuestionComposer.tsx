import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Check, Send } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { AppTitle, GradientButton } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import { QUESTION_CATEGORIES } from '../../data/engagementData';

import FilterChips from './FilterChips';

interface QuestionComposerProps {
    value: string;
    onChangeText: (text: string) => void;
    category: string;
    onCategoryChange: (category: string) => void;
    onSubmit: () => void;
    error?: string;
    success?: boolean;
    inputRef?: any;
}

const QuestionComposer = ({
    value,
    onChangeText,
    category,
    onCategoryChange,
    onSubmit,
    error,
    success,
    inputRef,
}: QuestionComposerProps) => {
    const { t } = useTranslation();
    const categoryLabels = QUESTION_CATEGORIES.reduce((acc, option) => {
        acc[option] = t(`quickAccess.askQaCategories.${option}`);
        return acc;
    }, {} as Record<string, string>);

    return (
        <View style={styles.card}>
            <AppTitle
                title={t('quickAccess.askQaComposerTitle')}
                size={20}
                color={Colors.navyText}
                weight="extraBold"
            />

            <View>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, !!error && styles.inputError]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={t('quickAccess.askQaComposerPlaceholder')}
                    placeholderTextColor={Colors.mutedText}
                    multiline
                    maxLength={280}
                    textAlignVertical="top"
                />
                {!!error && <Text style={styles.error}>{error}</Text>}
            </View>

            <FilterChips
                variant="soft"
                options={QUESTION_CATEGORIES}
                labels={categoryLabels}
                selected={category}
                onSelect={onCategoryChange}
            />

            <GradientButton
                title={t('quickAccess.askQaSubmit')}
                onPress={onSubmit}
                startIcon={<Send size={20} color={Colors.white} />}
            />

            {success && (
                <View style={styles.success}>
                    <Check size={16} color={Colors.primary} strokeWidth={3} />
                    <Text style={styles.successText}>
                        {t('quickAccess.askQaSuccess')}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default QuestionComposer;

const styles = StyleSheet.create({
    card: {
        gap: 16,
        padding: 18,
        borderRadius: 30,
        backgroundColor: Colors.white,
        shadowColor: Colors.navyText,
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    input: {
        minHeight: 104,
        padding: 16,
        borderRadius: 20,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Typography.medium,
        color: Colors.navyText,
        backgroundColor: Colors.sheetBackground,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    error: {
        marginTop: 6,
        marginLeft: 4,
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.danger,
    },
    success: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    successText: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
        color: Colors.primary,
    },
});
