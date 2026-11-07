import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();
        const isRTL = i18n.dir(i18n.language) === 'rtl';
    const isArabic = i18n.language.startsWith('ar');
    const insets = useSafeAreaInsets();

    const pagerRef = useRef<any>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const localizedPolls = useMemo(
        () =>
            POLLS.map(poll => ({
                ...poll,
                category: isArabic ? poll.categoryAr : poll.categoryEn,
                question: isArabic ? poll.questionAr : poll.questionEn,
                options: poll.options.map(option => ({
                    ...option,
                    label: isArabic ? option.labelAr : option.labelEn,
                })),
            })),
        [isArabic],
    );

    const [pageWidth, setPageWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const answeredCount = localizedPolls.filter(poll => answers[poll.id]).length;
    const allAnswered = answeredCount === localizedPolls.length;

    const goTo = useCallback(
        (target: number) => {
            const next = Math.max(0, Math.min(localizedPolls.length - 1, target));
            setIndex(next);
            // In RTL the scroll view content is mirrored, so invert the offset
            // to land on the correct visual page.
            const offset = isRTL ? (localizedPolls.length - 1 - next) * pageWidth : next * pageWidth;
            pagerRef.current?.scrollTo({ x: offset, animated: true });
        },
        [pageWidth, isRTL, localizedPolls.length],
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

        if (index <= localizedPolls.length - 1) {
            goTo(index + 1);
        } else {
            const firstOpen = localizedPolls.findIndex(poll => !answers[poll.id]);
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
            const rawIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
            // In RTL the content offset is mirrored, so flip the index back.
            const next = isRTL ? localizedPolls.length - 1 - rawIndex : rawIndex;
            setIndex(Math.max(0, Math.min(localizedPolls.length - 1, next)));
        }
    };

    const handlePagerLayout = (event: LayoutChangeEvent) => {
        setPageWidth(event.nativeEvent.layout.width);
    };

    const primaryLabel = submitted
        ? t('quickAccess.votingDone')
        : allAnswered
          ? t('quickAccess.votingSubmitPoll')
          : t('quickAccess.votingNextPoll');

    return (
        <ScreenLayout
            fixed
            title={t('quickAccess.liveVotingTitle')}
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton label={t('quickAccess.liveVotingHeaderLabel')}>
                    <Vote size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    tone="gold"
                    icon={BarChart3}
                    title={t('quickAccess.liveVotingHeaderTitle')}
                    subtitle={t('quickAccess.liveVotingHeaderSubtitle')}
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
                            count={localizedPolls.length}
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
                                    {localizedPolls.map(poll => (
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
                                canGoForward={index < localizedPolls.length - 1}
                                isRTL={isRTL}
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
