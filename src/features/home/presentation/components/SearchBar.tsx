import React from 'react';
import { I18nManager, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

const SearchBar = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={[styles.searchBar, { flexDirection: 'row' }]}>
            <Search size={18} color={Colors.whiteSoft} />
            <TextInput
                style={[styles.searchInput, { textAlign: 'start' }]}
                placeholder={t('home.searchPlaceholder')}
                placeholderTextColor={Colors.whiteSoftAlt}
                numberOfLines={1}
            />
            <Pressable style={styles.filterButton}>
                <SlidersHorizontal size={18} color={Colors.white} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        paddingLeft: 16,
        paddingRight: 6,
        height: 54,
        borderRadius: 18,
        backgroundColor: Colors.searchBarBackground,
        borderWidth: 1,
        borderColor: Colors.searchBarBorder,
    },
    searchInput: {
        flex: 1,
        color: Colors.white,
        fontSize: 13,
        fontFamily: Typography.medium,
        paddingVertical: 0,
    },
    filterButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blueBright,
    },
});

export default SearchBar;
