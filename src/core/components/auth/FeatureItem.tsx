import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../theme/colors';

const FeatureItem = ({
    icon,
    label,
    tone = 'blue',
}: {
    icon: React.ReactNode;
    label: string;
    tone?: 'blue' | 'gold';
}) => (
    <View style={styles.container}>
        <View
            style={[
                styles.iconBox,
                tone === 'gold' && styles.iconBoxGold,
            ]}
        >
            {icon}
        </View>
        <Text style={styles.text}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(67,133,216,0.20)',
        borderWidth: 1,
        borderColor: 'rgba(79,179,246,0.45)',
    },
    iconBoxGold: {
        backgroundColor: 'rgba(245,181,46,0.12)',
        borderColor: 'rgba(245,181,46,0.40)',
    },
    text: {
        color: Colors.white,
        fontSize: 9,
        fontWeight: '600',
        lineHeight: 12,
    },
});

export default FeatureItem;
