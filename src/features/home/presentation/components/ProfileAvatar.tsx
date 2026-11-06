import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Pencil } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

const AVATAR = 108;

type ProfileAvatarProps = {
    initials: string;
};

const ProfileAvatar = ({ initials }: ProfileAvatarProps) => (
    <View style={styles.avatarWrap}>
        <Svg
            width={AVATAR + 8}
            height={AVATAR + 8}
            style={StyleSheet.absoluteFill}
        >
            <Defs>
                <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={Colors.gold} />
                    <Stop offset="1" stopColor={Colors.secondary} />
                </LinearGradient>
            </Defs>
            <Circle
                cx={(AVATAR + 8) / 2}
                cy={(AVATAR + 8) / 2}
                r={(AVATAR + 4) / 2}
                stroke="url(#ring)"
                strokeWidth={4}
                fill={Colors.white}
            />
        </Svg>

        <Text style={styles.initials}>{initials}</Text>

        <Pressable style={styles.editBadge}>
            <Pencil size={13} color={Colors.navy} />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    avatarWrap: {
        width: AVATAR + 8,
        height: AVATAR + 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.blueBright,
        shadowOpacity: 0.45,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 0 },
    },
    initials: {
        fontSize: 36,
        fontFamily: Typography.extraBold,
        color: Colors.royal,
    },
    editBadge: {
        position: 'absolute',
        right: 0,
        bottom: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gold,
        borderWidth: 3,
        borderColor: Colors.white,
    },
});

export default ProfileAvatar;
