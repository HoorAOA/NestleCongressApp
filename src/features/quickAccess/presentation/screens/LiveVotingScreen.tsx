import React, { useCallback, useRef, useState } from 'react';
import {
    Animated,
    LayoutAnimation,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, Vote } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { POLLS } from '../../data/engagementData';
import {
    ContentSheet,
    HeaderIconButton,
    InfoBanner,
    PollDots,
    PollFooter,
    ScreenLayout,
    VotePollCard,
    VoteSuccess,
} from '../components';

const LiveVotingScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const insets = useSafeAreaInsets();

    const pagerRef = useRef<any>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const [pageWidth, setPageWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const answeredCount = POLLS.filter(poll => answers[poll.id]).length;
    const allAnswered = answeredCount === POLLS.length;

    const goTo = useCallback(
        (target: number) => {
            const next = Math.max(0, Math.min(POLLS.length - 1, target));
            setIndex(next);
            pagerRef.current?.scrollTo({ x: next * pageWidth, animated: true });
        },
        [pageWidth],
    );

    const handleSelect = (pollId: string, optionId: string) => {
        if (submitted) {
            return;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnswers(prev => ({ ...prev, [pollId]: optionId }));
    };

    const handlePrimary = () => {
        if (submitted) {
            navigation.goBack();
            return;
        }

        if (allAnswered) {
            setSubmitted(true);
            setShowSuccess(true);
            return;
        }

        if (index < POLLS.length - 1) {
            goTo(index + 1);
        } else {
            // Last poll reached with unanswered polls left: jump to the first one.
            const firstOpen = POLLS.findIndex(poll => !answers[poll.id]);
            goTo(firstOpen < 0 ? 0 : firstOpen);
        }
    };

    const handleReview = () => {
        scrollX.setValue(0);
        setIndex(0);
        setShowSuccess(false);
    };

    const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (pageWidth > 0) {
            setIndex(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
        }
    };

    const handlePagerLayout = (event: LayoutChangeEvent) => {
        setPageWidth(event.nativeEvent.layout.width);
    };

    const primaryLabel = submitted
        ? 'Done'
        : allAnswered
          ? 'Submit Poll'
          : 'Next Poll';

    return (
        <ScreenLayout
            fixed
            title="Live Voting"
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton label="Live voting">
                    <Vote size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    tone="gold"
                    icon={BarChart3}
                    title="Audience Interaction"
                    subtitle="Swipe polls, choose answers, and submit your vote"
                />
            }
        >
            <ContentSheet>
                {showSuccess ? (
                    <VoteSuccess
                        answeredCount={answeredCount}
                        onDone={() => navigation.goBack()}
                        onReview={handleReview}
                    />
                ) : (
                    <>
                        <PollDots
                            count={POLLS.length}
                            scrollX={scrollX}
                            pageWidth={pageWidth}
                        />

                        {/* Full-bleed pager: cancels the sheet's horizontal padding */}
                        <View style={styles.pager} onLayout={handlePagerLayout}>
                            {pageWidth > 0 && (
                                <ScrollView
                                    ref={pagerRef}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    onScroll={event =>
                                        scrollX.setValue(
                                            event.nativeEvent.contentOffset.x,
                                        )
                                    }
                                    onMomentumScrollEnd={handleMomentumEnd}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {POLLS.map(poll => (
                                        <View key={poll.id} style={{ width: pageWidth }}>
                                            <ScrollView
                                                nestedScrollEnabled
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={styles.page}
                                            >
                                                <VotePollCard
                                                    poll={poll}
                                                    selectedId={answers[poll.id]}
                                                    locked={submitted}
                                                    onSelect={optionId =>
                                                        handleSelect(poll.id, optionId)
                                                    }
                                                />
                                            </ScrollView>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        <View style={{ paddingBottom: insets.bottom + 16 }}>
                            <PollFooter
                                primaryLabel={primaryLabel}
                                canGoBack={index > 0}
                                canGoForward={index < POLLS.length - 1}
                                onBack={() => goTo(index - 1)}
                                onForward={() => goTo(index + 1)}
                                onPrimary={handlePrimary}
                            />
                        </View>
                    </>
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default LiveVotingScreen;

const styles = StyleSheet.create({
    pager: {
        flex: 1,
        marginHorizontal: -16,
    },
    page: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
});
