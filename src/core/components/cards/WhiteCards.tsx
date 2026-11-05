import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { Colors } from '../../theme/colors';

interface WhiteCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
}

const WhiteCard: React.FC<WhiteCardProps> = ({
    children,
    style,
    padding = 20,
}) => {
    return (
        <View style={[styles.card, { padding }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        width: '100%',
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    },
});

export default WhiteCard;