import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../../core/theme/colors';

const ContentSheet = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.sheet}>{children}</View>
);

export default ContentSheet;

const styles = StyleSheet.create({
    sheet: {
        flex: 1,
        padding: 16,
        paddingTop: 20,
        paddingBottom: 36,
        gap: 7,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: Colors.sheetBackground,
    },
});
