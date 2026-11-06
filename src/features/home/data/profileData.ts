import {
    CalendarCheck,
    Bookmark,
    Award,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export const PROFILE_USER = {
    name: 'Huda Latheef',
    initials: 'HL',
    role: 'Medical Congress Attendee',
    badgeId: 'NMC-2026-001',
    email: 'huda@example.com',
    phone: '+971 56 283 4212',
    location: 'Dubai, UAE',
};

export interface ProfileStatItem {
    value: string;
    label: string;
    Icon: LucideIcon;
}

export const PROFILE_STATS: ProfileStatItem[] = [
    { value: '12', label: 'Sessions', Icon: CalendarCheck },
    { value: '05', label: 'Saved', Icon: Bookmark },
    { value: '03', label: 'Certificates', Icon: Award },
];

export interface ProfileInfoItem {
    label: string;
    value: string;
    Icon: LucideIcon;
}

export const PROFILE_INFO: ProfileInfoItem[] = [
    { label: 'Email', value: PROFILE_USER.email, Icon: Mail },
    { label: 'Phone', value: PROFILE_USER.phone, Icon: Phone },
    { label: 'Location', value: PROFILE_USER.location, Icon: MapPin },
];
