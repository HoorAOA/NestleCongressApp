import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, LayoutAnimation, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MessageSquare, MessagesSquare } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { ATTENDEE } from '../../data/quickAccessData';
import {
    INITIAL_QUESTIONS,
    QUESTION_SORTS,
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
    const inputRef = useRef<any>(null);
    const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
    const [draft, setDraft] = useState('');
    const [category, setCategory] = useState('General');
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);
    const [sort, setSort] = useState('Recent');

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
                ? questions.filter(q => q.answered)
                : [...questions];

        return list.sort((a, b) =>
            sort === 'Recent' ? b.createdAt - a.createdAt : b.votes - a.votes,
        );
    }, [questions, sort]);

    const handleChangeText = (text: string) => {
        setDraft(text);
        if (error) {
            setError(undefined);
        }
    };

    const handleSubmit = () => {
        const text = draft.trim();

        if (text.length < MIN_LENGTH) {
            setError(`Please enter at least ${MIN_LENGTH} characters.`);
            return;
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setQuestions(prev => [
            {
                id: `q-${Date.now()}`,
                text,
                category,
                votes: 0,
                upvoted: false,
                answered: false,
                author: ATTENDEE.name,
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
            title="Ask Q&A"
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton label="Questions">
                    <MessagesSquare size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={MessageSquare}
                    title="Ask the Experts"
                    subtitle="Submit your questions and vote for top discussions"
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
                        title="No answered questions yet"
                        subtitle="Answered questions will appear here."
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
