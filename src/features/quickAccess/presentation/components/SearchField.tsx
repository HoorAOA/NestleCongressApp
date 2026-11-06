import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface SearchFieldProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    autoFocus?: boolean;
    /** Shows the filter icon on the right when provided. */
    onFilterPress?: () => void;
}

const SearchField = ({
    value,
    onChangeText,
    placeholder,
    autoFocus,
    onFilterPress,
}: SearchFieldProps) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={[styles.field, { flexDirection: 'row' }]}>
            <Search size={19} color={Colors.mutedText} />

            <TextInput
                style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.mutedText}
                autoFocus={autoFocus}
                autoCorrect={false}
                returnKeyType="search"
            />

            {onFilterPress && (
                <Pressable onPress={onFilterPress} hitSlop={10}>
                    <SlidersHorizontal size={19} color={Colors.primary} />
                </Pressable>
            )}
        </View>
    );
};

export default SearchField;

const styles = StyleSheet.create({
    field: {
        alignItems: 'center',
        gap: 12,
        height: 54,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        fontSize: 13,
        fontFamily: Typography.medium,
        color: Colors.navyText,
    },
});
