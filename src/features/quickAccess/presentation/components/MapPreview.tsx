import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, {
    Defs,
    LinearGradient,
    Path,
    Rect,
    Stop,
} from 'react-native-svg';
import { MapPin } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface MapPreviewProps {
    onPress: () => void;
}

/** Stylised map preview. Tapping it opens the maps app with directions. */
const MapPreview = ({ onPress }: MapPreviewProps) => (
    <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Open directions to the venue"
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
        <Svg
            width="100%"
            height="100%"
            viewBox="0 0 340 200"
            preserveAspectRatio="xMidYMid slice"
            style={StyleSheet.absoluteFill}
        >
            <Defs>
                <LinearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={Colors.mapBlueLight} />
                    <Stop offset="1" stopColor={Colors.mapBlueDark} />
                </LinearGradient>
            </Defs>

            <Rect width="340" height="200" fill="url(#mapBg)" />

            <Path
                d="M0 130 C90 100 200 95 340 105"
                stroke="#FFFFFF"
                strokeWidth={5}
                fill="none"
                opacity={0.95}
            />
            <Path
                d="M108 0 C128 60 118 140 96 200"
                stroke="#FFFFFF"
                strokeWidth={2.5}
                fill="none"
                opacity={0.85}
            />
            <Path
                d="M232 0 C218 60 250 130 300 200"
                stroke="#FFFFFF"
                strokeWidth={2.5}
                fill="none"
                opacity={0.85}
            />
        </Svg>

        <View style={styles.pill}>
            <Text style={styles.pillText}>Map Preview</Text>
        </View>

        <View style={styles.pin}>
            <MapPin size={26} color={Colors.navyText} fill={Colors.navyText} />
        </View>
    </Pressable>
);

export default MapPreview;

const styles = StyleSheet.create({
    card: {
        height: 200,
        borderRadius: 30,
        overflow: 'hidden',
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
    pin: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gold,
        shadowColor: Colors.gold,
        shadowOpacity: 0.55,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },
});
