import React, { useMemo } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import { buildMapHtml } from '../../../../core/utils/buildMapHtml';

interface MapPreviewProps {
    latitude: number;
    longitude: number;
    onPress: () => void;
}

const MapPreview = ({ latitude, longitude, onPress }: MapPreviewProps) => {
    const html = useMemo(
        () =>
            buildMapHtml({
                latitude,
                longitude,
                markerColor: Colors.gold,
                markerIconColor: Colors.navyText,
                backgroundColor: Colors.mapBlueLight,
            }),
        [latitude, longitude],
    );

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel="Open directions to the venue"
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
        >
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <WebView
                    originWhitelist={['*']}
                    source={{ html }}
                    style={styles.webview}
                    scrollEnabled={false}
                    bounces={false}
                    overScrollMode="never"
                    javaScriptEnabled
                    startInLoadingState
                    renderLoading={() => (
                        <View style={styles.loading}>
                            <ActivityIndicator color={Colors.primary} />
                        </View>
                    )}
                />
            </View>

            <View style={styles.pill}>
                <Text style={styles.pillText}>Map Preview</Text>
            </View>
        </Pressable>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    card: {
        height: 200,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: Colors.mapBlueLight,
    },
    webview: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'transparent',
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mapBlueLight,
    },
    pill: {
        position: 'absolute',
        top: 14,
        left: 14,
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 18,
        backgroundColor: Colors.white,
    },
    pillText: {
        fontSize: 12,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
});