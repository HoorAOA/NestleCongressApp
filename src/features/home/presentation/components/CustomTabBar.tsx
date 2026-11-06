import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, UserRound } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    const { i18n, t } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const TAB_CONFIG = {
        Home: { label: t('home.tabLabel'), Icon: House },
        Profile: { label: t('profile.tabLabel'), Icon: UserRound },
    } as const;

    return (
        <View
            style={[
                styles.bar,
                { flexDirection: 'row', paddingBottom: Math.max(insets.bottom, 10) },
            ]}
        >
            {state.routes.map((route, index) => {
                const focused = state.index === index;
                const { label, Icon } =
                    TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={[styles.tab, focused && styles.tabActive]}
                    >
                        <Icon
                            size={22}
                            color={focused ? Colors.blueBright : Colors.inactiveTab}
                            fill={
                                focused && route.name === 'Home'
                                    ? Colors.blueBright
                                    : 'none'
                            }
                        />
                        <Text
                            style={[
                                styles.label,
                                { color: focused ? Colors.white : Colors.inactiveTab },
                            ]}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        gap: 12,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.tabBarBackground,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tabActive: {
        backgroundColor: Colors.activeTabBackground,
        borderColor: Colors.activeTabBorder,
    },
    label: {
        fontSize: 11,
        fontFamily: Typography.semiBold,
    },
});

export default CustomTabBar;
