import React from 'react';
import { I18nManager, Text, StyleSheet, TextStyle } from 'react-native';

import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface AppTitleProps {
    title: string;
    color?: string;
    size?: number;
    weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
    align?: TextStyle['textAlign'];
    style?: TextStyle;
}

const fontWeights = {
    regular: Typography.regular,
    medium: Typography.medium,
    semiBold: Typography.semiBold,
    bold: Typography.bold,
    extraBold: Typography.extraBold,
};

const AppTitle: React.FC<AppTitleProps> = ({
    title,
    color = Colors.textPrimary,
    size = 22,
    weight = 'bold',
    align,
    style,
}) => {
    const resolvedAlign = align ?? (I18nManager.isRTL ? 'right' : 'left');

    return (
        <Text
            style={[
                styles.title,
                {
                    color,
                    fontSize: size,
                    fontFamily: fontWeights[weight],
                    textAlign: resolvedAlign,
                },
                style,
            ]}
        >
            {title}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        includeFontPadding: false,
    },
});

export default AppTitle;