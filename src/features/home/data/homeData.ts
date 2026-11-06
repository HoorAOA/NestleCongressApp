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
    labelEn: string;
    labelAr: string;
    Icon: LucideIcon;
    route?: keyof import('../../../core/navigation/types').RootStackParamList;
}

export const HOME_QUICK_ACCESS: HomeQuickAccessItem[] = [
    { labelEn: 'Agenda', labelAr: 'الجدول', Icon: CalendarDays, route: 'Agenda' },
    { labelEn: 'Speakers', labelAr: 'المتحدثون', Icon: Users, route: 'Speakers' },
    { labelEn: 'Name Tag', labelAr: 'بطاقة الاسم', Icon: Contact, route: 'NameTag' },
    { labelEn: 'Venue', labelAr: 'المكان', Icon: MapPin, route: 'Venue' },
    { labelEn: 'Voting', labelAr: 'التصويت', Icon: BarChart3 },
    { labelEn: 'Ask Q&A', labelAr: 'الأسئلة', Icon: MessageSquare },
    { labelEn: 'Resources', labelAr: 'الموارد', Icon: Folder },
    { labelEn: 'Exhibitors', labelAr: 'المعروضون', Icon: Briefcase },
];

export interface HomeSessionItem {
    timeEn: string;
    timeAr: string;
    tagEn: string;
    tagAr: string;
    titleEn: string;
    titleAr: string;
    placeEn: string;
    placeAr: string;
    Icon: LucideIcon;
}

export const HOME_SESSIONS: HomeSessionItem[] = [
    {
        timeEn: '08:30 AM',
        timeAr: '08:30 صباحاً',
        tagEn: 'KEYNOTE',
        tagAr: 'مقدمة رئيسية',
        titleEn: 'Opening Ceremony',
        titleAr: 'حفل الافتتاح',
        placeEn: 'Main Auditorium',
        placeAr: 'القاعة الرئيسية',
        Icon: Mic,
    },
    {
        timeEn: '09:30 AM',
        timeAr: '09:30 صباحاً',
        tagEn: 'KEYNOTE',
        tagAr: 'مقدمة رئيسية',
        titleEn: 'Welcome & Introduction',
        titleAr: 'الترحيب والمقدمة',
        placeEn: 'Dr. Hassan Ali',
        placeAr: 'د. حسن علي',
        Icon: Mic,
    },
];
