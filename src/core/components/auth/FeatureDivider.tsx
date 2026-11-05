import React from 'react';
import { View, StyleSheet } from 'react-native';

const FeatureDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    divider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
});

export default FeatureDivider;
