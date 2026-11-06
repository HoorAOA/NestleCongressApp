import React from 'react';
import { I18nManager, View, Text, StyleSheet } from 'react-native';
import { Bookmark } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

type SessionItem = {
    time: string;
    tag: string;
    title: string;
    place: string;
    Icon: React.ComponentType<{ size?: number; color?: string; fill?: string }>;
};

type SessionListProps = {
    items: SessionItem[];
};

const SessionList = ({ items }: SessionListProps) => {
    const isRTL = I18nManager.isRTL;

    return (
        <View style={styles.sessionList}>
            {items.map(({ time, tag, title, place, Icon }) => (
                <View key={title} style={[styles.sessionCard, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Text style={[styles.sessionTime, { textAlign: isRTL ? 'right' : 'left' }]}>{time}</Text>

                    <View style={styles.sessionIcon}>
                        <Icon size={18} color={Colors.blueBright} />
                    </View>

                    <View style={styles.sessionBody}>
                        <Text style={[styles.sessionTag, { textAlign: isRTL ? 'right' : 'left' }]}>{tag}</Text>
                        <Text style={[styles.sessionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{title}</Text>
                        <Text style={[styles.sessionPlace, { textAlign: isRTL ? 'right' : 'left' }]}>{place}</Text>
                    </View>

                    <Bookmark size={18} color={Colors.whiteSoftAlt3} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sessionList: {
        gap: 12,
    },
    sessionCard: {
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 18,
        backgroundColor: Colors.sessionCardBackground,
        borderWidth: 1,
        borderColor: Colors.sessionCardBorder,
    },
    sessionTime: {
        width: 52,
        color: Colors.white,
        fontSize: 12,
        fontFamily: Typography.bold,
    },
    sessionIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.sessionIconBackground,
    },
    sessionBody: {
        flex: 1,
        gap: 2,
    },
    sessionTag: {
        color: Colors.gold,
        fontSize: 8,
        fontFamily: Typography.bold,
        letterSpacing: 0.8,
    },
    sessionTitle: {
        color: Colors.white,
        fontSize: 13,
        fontFamily: Typography.bold,
    },
    sessionPlace: {
        color: Colors.whiteSoftAlt3,
        fontSize: 10,
        fontFamily: Typography.medium,
    },
});

export default SessionList;
export type { SessionItem };
