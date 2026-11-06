import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';

interface HeaderIconButtonProps {
    onPress?: () => void;
    label: string;
    children: React.ReactNode;
}

export const HeaderIconButton = ({
    onPress,
    label,
    children,
}: HeaderIconButtonProps) => (
    <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
    >
        {children}
    </Pressable>
);

interface ScreenHeaderProps {
    title: string;
    onBack: () => void;
    right?: React.ReactNode;
}

const ScreenHeader = ({ title, onBack, right }: ScreenHeaderProps) => (
    <View style={styles.row}>
        <HeaderIconButton onPress={onBack} label="Go back">
            <ChevronLeft size={22} color={Colors.white} />
        </HeaderIconButton>

        <AppTitle
            title={title}
            size={20}
            color={Colors.white}
            weight="extraBold"
            style={styles.title}
        />

        {right ?? <View style={styles.spacer} />}
    </View>
);

export default ScreenHeader;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    title: {
        flex: 1,
    },
    button: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.glassButton,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    spacer: {
        width: 44,
    },
});
