import React from 'react';
import { ShieldCheck, type LucideIcon } from 'lucide-react-native';

import GradientBadge from './GradientBadge';

interface ShieldBadgeProps {
    size?: number;
    icon?: LucideIcon;
    iconSize?: number;
    radius?: number;
}

const ShieldBadge = ({
    size = 42,
    icon = ShieldCheck,
    iconSize,
    radius = 18,
}: ShieldBadgeProps) => (
    <GradientBadge
        size={size}
        icon={icon}
        iconSize={iconSize}
        radius={radius}
    />
);

export default ShieldBadge;
