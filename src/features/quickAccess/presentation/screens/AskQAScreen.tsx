import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, LayoutAnimation, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MessageSquare, MessagesSquare } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { ATTENDEE } from '../../data/quickAccessData';
import {
    INITIAL_QUESTIONS,
    QUESTION_SORTS,
    QUESTION_SORTS_AR,
    Question,
} from '../../data/engagementData';
import {
    ContentSheet,
    EmptyState,
    HeaderIconButton,
    InfoBanner,
    QuestionCard,
    QuestionComposer,
    ScreenLayout,
    SegmentTabs,
} from '../components';

const MIN_LENGTH = 10;

const AskQAScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');
    const inputRef = useRef<any>(null);
    const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
    const [draft, setDraft] = useState('');
    const [category, setCategory] = useState('General');
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);
    const [sort, setSort] = useState('Recent');

    const sortLabelMap = useMemo(
        () => ({
            Popular: t('quickAccess.askQaSorts.Popular'),
            Recent: t('quickAccess.askQaSorts.Recent'),
            Answered: t('quickAccess.askQaSorts.Answered'),
        }),
        [t],
    );

    const visibleSortOptions = isArabic ? QUESTION_SORTS_AR : QUESTION_SORTS;
    const localizedQuestions = useMemo(
        () =>
            questions.map(question => ({
                ...question,
                text: isArabic ? question.textAr : question.textEn,
                category: isArabic ? question.categoryAr : question.categoryEn,
                author: isArabic ? question.authorAr : question.authorEn,
            })),
        [isArabic, questions],
    );

    useEffect(
        () => () => {
            if (successTimer.current) {
                clearTimeout(successTimer.current);
            }
        },
        [],
    );

    const visibleQuestions = useMemo(() => {
        const list =
            sort === 'Answered'
                ? localizedQuestions.filter(q => q.answered)
                : [...localizedQuestions];

        return list.sort((a, b) =>
            sort === 'Recent' ? b.createdAt - a.createdAt : b.votes - a.votes,
        );
    }, [localizedQuestions, sort]);

    const handleChangeText = (text: string) => {
        setDraft(text);
        if (error) {
            setError(undefined);
        }
    };

    const handleSubmit = () => {
        const text = draft.trim();

        if (text.length < MIN_LENGTH) {
            setError(t('quickAccess.askQaMinLength', { count: MIN_LENGTH }));
            return;
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setQuestions(prev => [
            {
                id: `q-${Date.now()}`,
                text,
                textEn: text,
                textAr: text,
                category,
                categoryEn: category,
                categoryAr: category,
                votes: 0,
                upvoted: false,
                answered: false,
                author: ATTENDEE.name,
                authorEn: ATTENDEE.name,
                authorAr: ATTENDEE.name,
                createdAt: Date.now(),
            },
            ...prev,
        ]);

        setDraft('');
        setError(undefined);
        setSort('Recent'); // so the new question shows at the top of the list
        Keyboard.dismiss();

        setSuccess(true);
        if (successTimer.current) {
            clearTimeout(successTimer.current);
        }
        successTimer.current = setTimeout(() => setSuccess(false), 3000);
    };

    const toggleVote = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setQuestions(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                          ...q,
                          upvoted: !q.upvoted,
                          votes: q.votes + (q.upvoted ? -1 : 1),
                      }
                    : q,
            ),
        );
    };

    const handleReply = (author: string) => {
        setDraft(`@${author} `);
        inputRef.current?.focus();
    };

    return (
        <ScreenLayout
            title={t('quickAccess.askQaTitle')}
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton label={t('quickAccess.askQaHeaderLabel')}>
                    <MessagesSquare size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={MessageSquare}
                    title={t('quickAccess.askQaHeaderTitle')}
                    subtitle={t('quickAccess.askQaHeaderSubtitle')}
                />
            }
        >
            <ContentSheet>
                <QuestionComposer
                    inputRef={inputRef}
                    value={draft}
                    onChangeText={handleChangeText}
                    category={category}
                    onCategoryChange={setCategory}
                    onSubmit={handleSubmit}
                    error={error}
                    success={success}
                />

                <SegmentTabs
                    options={QUESTION_SORTS}
                    labels={sortLabelMap}
                    selected={sort}
                    onSelect={setSort}
                />

                {visibleQuestions.length > 0 ? (
                    <View style={styles.list}>
                        {visibleQuestions.map(question => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onToggleVote={() => toggleVote(question.id)}
                                onReply={() => handleReply(question.author)}
                            />
                        ))}
                    </View>
                ) : (
                    <EmptyState
                        icon={MessageSquare}
                        title={t('quickAccess.askQaNoAnswersTitle')}
                        subtitle={t('quickAccess.askQaNoAnswersSubtitle')}
                    />
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default AskQAScreen;

const styles = StyleSheet.create({
    list: {
        gap: 14,
    },
});
