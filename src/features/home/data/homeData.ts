import {
    CalendarDays,
    Users,
    Contact,
    MapPin,
    BarChart3,
    MessageSquare,
    Folder,
    Briefcase,
    Mic,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export const HOME_USER_NAME = 'Dr. Testing';

export interface HomeQuickAccessItem {
    label: string;
    Icon: LucideIcon;
}

export const HOME_QUICK_ACCESS: HomeQuickAccessItem[] = [
    { label: 'Agenda', Icon: CalendarDays },
    { label: 'Speakers', Icon: Users },
    { label: 'Name Tag', Icon: Contact },
    { label: 'Venue', Icon: MapPin },
    { label: 'Voting', Icon: BarChart3 },
    { label: 'Ask Q&A', Icon: MessageSquare },
    { label: 'Resources', Icon: Folder },
    { label: 'Exhibitors', Icon: Briefcase },
];

export interface HomeSessionItem {
    time: string;
    tag: string;
    title: string;
    place: string;
    Icon: LucideIcon;
}

export const HOME_SESSIONS: HomeSessionItem[] = [
    {
        time: '08:30 AM',
        tag: 'KEYNOTE',
        title: 'Opening Ceremony',
        place: 'Main Auditorium',
        Icon: Mic,
    },
    {
        time: '09:30 AM',
        tag: 'KEYNOTE',
        title: 'Welcome & Introduction',
        place: 'Dr. Hassan Ali',
        Icon: Mic,
    },
];
