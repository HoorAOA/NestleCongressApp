import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainBackground } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';

import ScreenHeader from './ScreenHeader';

interface ScreenLayoutProps {
    title: string;
    onBack: () => void;
    headerRight?: React.ReactNode;
    top?: React.ReactNode;
    padded?: boolean;
    fixed?: boolean;
    children: React.ReactNode;
}

const ScreenLayout = ({
    title,
    onBack,
    headerRight,
    top,
    padded = false,
    fixed = false,
    children,
}: ScreenLayoutProps) => {
    const insets = useSafeAreaInsets();

    const header = (
        <View style={styles.headerArea}>
            <ScreenHeader title={title} onBack={onBack} right={headerRight} />
            {top}
        </View>
    );

    if (fixed) {
        return (
            <View
                style={[styles.container, { paddingTop: insets.top + 12 }]}
            >
                <MainBackground />
                {header}
                <View style={styles.fixedBody}>{children}</View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MainBackground />

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingTop: insets.top + 12 },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces
            >
                {header}

                <View style={[styles.body, padded && styles.bodyPadded]}>
                    {children}
                </View>
            </ScrollView>
        </View>
    );
};

export default ScreenLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flexGrow: 1,
    },
    headerArea: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 18,
    },
    body: {
        flexGrow: 1,
    },
    bodyPadded: {
        paddingHorizontal: 20,
        paddingBottom: 32,
        gap: 16,
    },
    fixedBody: {
        flex: 1,
    },
});