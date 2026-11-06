import {
    CalendarDays,
    Users,
    Contact,
    MapPin,
    BarChart3,
    MessageSquare,
    Folder,
    Briefcase,
    Wifi,
    Utensils,
    Accessibility,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import type { RootStackParamList } from '../../../core/navigation/types';

/* ---------- Quick access ---------- */

export type ToolCategory = 'Event' | 'Interactive' | 'Tools';

export interface QuickAccessItem {
    id: string;
    label: string;
    labelEn: string;
    labelAr: string;
    description: string;
    descriptionEn: string;
    descriptionAr: string;
    tag: ToolCategory;
    tagEn: ToolCategory;
    tagAr: string;
    displayTag?: string;
    Icon: LucideIcon;
    route?: keyof RootStackParamList;
}

export const QUICK_ACCESS_CATEGORIES = ['All', 'Event', 'Interactive', 'Tools'];

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
    {
        id: 'agenda',
        label: 'Agenda',
        labelEn: 'Agenda',
        labelAr: 'الجدول',
        description: 'View full congress schedule',
        descriptionEn: 'View full congress schedule',
        descriptionAr: 'عرض جدول المؤتمر الكامل',
        tag: 'Event',
        tagEn: 'Event',
        tagAr: 'حدث',
        Icon: CalendarDays,
        route: 'Agenda',
    },
    {
        id: 'speakers',
        label: 'Speakers',
        labelEn: 'Speakers',
        labelAr: 'المتحدثون',
        description: 'Explore global medical experts',
        descriptionEn: 'Explore global medical experts',
        descriptionAr: 'اكتشف الخبراء الطبيين العالميين',
        tag: 'Event',
        tagEn: 'Event',
        tagAr: 'حدث',
        Icon: Users,
        route: 'Speakers',
    },
    {
        id: 'name-tag',
        label: 'Name Tag',
        labelEn: 'Name Tag',
        labelAr: 'بطاقة الاسم',
        description: 'Access your digital badge',
        descriptionEn: 'Access your digital badge',
        descriptionAr: 'استعرض شارتتك الرقمية',
        tag: 'Event',
        tagEn: 'Event',
        tagAr: 'حدث',
        Icon: Contact,
        route: 'NameTag',
    },
    {
        id: 'venue',
        label: 'Venue',
        labelEn: 'Venue',
        labelAr: 'المكان',
        description: 'Location, facilities and directions',
        descriptionEn: 'Location, facilities and directions',
        descriptionAr: 'الموقع والمرافق والاتجاهات',
        tag: 'Event',
        tagEn: 'Event',
        tagAr: 'حدث',
        Icon: MapPin,
        route: 'Venue',
    },
    {
        id: 'voting',
        label: 'Voting',
        labelEn: 'Voting',
        labelAr: 'التصويت',
        description: 'Join live polls and votes',
        descriptionEn: 'Join live polls and votes',
        descriptionAr: 'شارك في الاستطلاعات والتصويتات المباشرة',
        tag: 'Interactive',
        tagEn: 'Interactive',
        tagAr: 'تفاعلي',
        Icon: BarChart3,
    },
    {
        id: 'ask-qa',
        label: 'Ask Q&A',
        labelEn: 'Ask Q&A',
        labelAr: 'الأسئلة',
        description: 'Send questions to speakers',
        descriptionEn: 'Send questions to speakers',
        descriptionAr: 'أرسل أسئلتك إلى المتحدثين',
        tag: 'Interactive',
        tagEn: 'Interactive',
        tagAr: 'تفاعلي',
        Icon: MessageSquare,
    },
    {
        id: 'resources',
        label: 'Resources',
        labelEn: 'Resources',
        labelAr: 'الموارد',
        description: 'Download congress materials',
        descriptionEn: 'Download congress materials',
        descriptionAr: 'حمّل مواد المؤتمر',
        tag: 'Tools',
        tagEn: 'Tools',
        tagAr: 'أدوات',
        Icon: Folder,
    },
    {
        id: 'exhibitors',
        label: 'Exhibitors',
        labelEn: 'Exhibitors',
        labelAr: 'المعروضون',
        description: 'Discover event partners',
        descriptionEn: 'Discover event partners',
        descriptionAr: 'اكتشف شركاء الحدث',
        tag: 'Tools',
        tagEn: 'Tools',
        tagAr: 'أدوات',
        Icon: Briefcase,
    },
];

/** Used by the Home quick access grid (matched by label). */
export const QUICK_ACCESS_ROUTES: Record<string, keyof RootStackParamList | undefined> =
    QUICK_ACCESS_ITEMS.reduce(
        (acc, item) => ({ ...acc, [item.label]: item.route }),
        {} as Record<string, keyof RootStackParamList | undefined>,
    );

/* ---------- Agenda ---------- */

export type AgendaCategory = 'Keynote' | 'Nutrition' | 'Research';
export type AgendaDay = 1 | 2;

export interface AgendaSession {
    id: string;
    day: AgendaDay;
    order: number;
    time: string;
    period: 'AM' | 'PM';
    category: AgendaCategory;
    title: string;
    place: string;
    featured?: boolean;
}

export const AGENDA_DAYS = [
    { day: 1 as AgendaDay, label: 'Day 1', shortDate: 'May 22', fullDate: 'Thursday, May 22, 2026' },
    { day: 2 as AgendaDay, label: 'Day 2', shortDate: 'May 23', fullDate: 'Friday, May 23, 2026' },
];

export const AGENDA_CATEGORIES = ['All', 'Keynote', 'Nutrition', 'Research'];

export const AGENDA_SESSIONS: AgendaSession[] = [
    { id: 'd1-1', day: 1, order: 1, time: '08:30', period: 'AM', category: 'Keynote', title: 'Opening Ceremony', place: 'Main Auditorium', featured: true },
    { id: 'd1-2', day: 1, order: 2, time: '09:30', period: 'AM', category: 'Keynote', title: 'Welcome & Introduction', place: 'Dr. Hassan Ali' },
    { id: 'd1-3', day: 1, order: 3, time: '10:30', period: 'AM', category: 'Nutrition', title: 'Future of Pediatric Nutrition', place: 'Dr. Sarah Johnson' },
    { id: 'd1-4', day: 1, order: 4, time: '11:45', period: 'AM', category: 'Research', title: 'Advances in Clinical Research', place: 'Dr. Ahmed Khalid' },
    { id: 'd1-5', day: 1, order: 5, time: '01:30', period: 'PM', category: 'Nutrition', title: 'Gut Health & Immunity', place: 'Dr. Layla Hamdan' },
    { id: 'd2-1', day: 2, order: 1, time: '09:00', period: 'AM', category: 'Keynote', title: 'Day 2 Opening Address', place: 'Main Auditorium' },
    { id: 'd2-2', day: 2, order: 2, time: '10:00', period: 'AM', category: 'Research', title: 'Evidence-Based Nutrition', place: 'Dr. Omar Farouk' },
    { id: 'd2-3', day: 2, order: 3, time: '11:15', period: 'AM', category: 'Nutrition', title: 'Infant Nutrition Innovations', place: 'Dr. Sarah Johnson' },
    { id: 'd2-4', day: 2, order: 4, time: '02:00', period: 'PM', category: 'Keynote', title: 'Closing Panel & Awards', place: 'Main Auditorium' },
];

/* ---------- Speakers ---------- */

export type SpeakerCategory = 'Nutrition' | 'Research' | 'Pediatrics';

export interface Speaker {
    id: string;
    name: string;
    nameEn: string;
    nameAr: string;
    initials: string;
    role: string;
    roleEn: string;
    roleAr: string;
    country: string;
    countryEn: string;
    countryAr: string;
    topic: string;
    topicEn: string;
    topicAr: string;
    categories: SpeakerCategory[];
    featured?: boolean;
    favorite?: boolean;
}

export const SPEAKER_CATEGORIES = ['All', 'Nutrition', 'Research', 'Pediatrics'];

export const SPEAKERS: Speaker[] = [
    {
        id: 's1',
        name: 'Dr. Sarah Johnson',
        nameEn: 'Dr. Sarah Johnson',
        nameAr: 'د. سارة جونسون',
        initials: 'SJ',
        role: 'Pediatric Nutrition Specialist',
        roleEn: 'Pediatric Nutrition Specialist',
        roleAr: 'أخصائية تغذية الأطفال',
        country: 'United Kingdom',
        countryEn: 'United Kingdom',
        countryAr: 'المملكة المتحدة',
        topic: 'Future of Pediatric Nutrition',
        topicEn: 'Future of Pediatric Nutrition',
        topicAr: 'مستقبل تغذية الأطفال',
        categories: ['Nutrition', 'Pediatrics'],
        featured: true,
        favorite: true,
    },
    {
        id: 's2',
        name: 'Dr. Hassan Ali',
        nameEn: 'Dr. Hassan Ali',
        nameAr: 'د. حسن علي',
        initials: 'HA',
        role: 'Clinical Research Director',
        roleEn: 'Clinical Research Director',
        roleAr: 'مدير الأبحاث السريرية',
        country: 'UAE',
        countryEn: 'UAE',
        countryAr: 'الإمارات العربية المتحدة',
        topic: 'Welcome & Introduction',
        topicEn: 'Welcome & Introduction',
        topicAr: 'ترحيب ومقدمة',
        categories: ['Research'],
    },
    {
        id: 's3',
        name: 'Dr. Ahmed Khalid',
        nameEn: 'Dr. Ahmed Khalid',
        nameAr: 'د. أحمد خالد',
        initials: 'AK',
        role: 'Gastroenterology Consultant',
        roleEn: 'Gastroenterology Consultant',
        roleAr: 'استشاري أمراض الجهاز الهضمي',
        country: 'Saudi Arabia',
        countryEn: 'Saudi Arabia',
        countryAr: 'المملكة العربية السعودية',
        topic: 'Advances in Clinical Research',
        topicEn: 'Advances in Clinical Research',
        topicAr: 'التطورات في الأبحاث السريرية',
        categories: ['Research', 'Nutrition'],
    },
    {
        id: 's4',
        name: 'Dr. Layla Hamdan',
        nameEn: 'Dr. Layla Hamdan',
        nameAr: 'د. ليلى حمدان',
        initials: 'LH',
        role: 'Neonatal Care Specialist',
        roleEn: 'Neonatal Care Specialist',
        roleAr: 'أخصائية رعاية حديثي الولادة',
        country: 'Jordan',
        countryEn: 'Jordan',
        countryAr: 'الأردن',
        topic: 'Gut Health & Immunity',
        topicEn: 'Gut Health & Immunity',
        topicAr: 'صحة الجهاز الهضمي والمناعة',
        categories: ['Pediatrics', 'Nutrition'],
    },
    {
        id: 's5',
        name: 'Dr. Omar Farouk',
        nameEn: 'Dr. Omar Farouk',
        nameAr: 'د. عمر فاروق',
        initials: 'OF',
        role: 'Senior Research Scientist',
        roleEn: 'Senior Research Scientist',
        roleAr: 'عالم أبحاث أول',
        country: 'Egypt',
        countryEn: 'Egypt',
        countryAr: 'مصر',
        topic: 'Evidence-Based Nutrition',
        topicEn: 'Evidence-Based Nutrition',
        topicAr: 'التغذية المبنية على الأدلة',
        categories: ['Research'],
    },
];

/* ---------- Attendee / name tag ---------- */

export const ATTENDEE = {
    name: 'Huda Latheef',
    initials: 'HL',
    headline: 'Flutter Developer • Attendee',
    badgeId: 'NMC-2026-001',
    location: 'Dubai, UAE',
    congressDates: '22 - 23 May 2026',
};

export const ABOUT_URL = 'https://www.ntamgroup.com/about-us';

/* ---------- Venue ---------- */

export const VENUE = {
    nameEn: 'Dubai International Convention & Exhibition Center',
    nameAr: 'مركز دبي الدولي للمؤتمرات والمعارض',
    datesEn: '22 - 23 May 2026',
    datesAr: '22 - 23 مايو 2026',
    addressEn: 'World Trade Centre, Dubai, United Arab Emirates',
    addressAr: 'مركز التجارة العالمي، دبي، الإمارات العربية المتحدة',
    // Dubai World Trade Centre
    coordinates: { latitude: 25.2276, longitude: 55.2888 },
};

export interface Facility {
    id: string;
    labelEn: string;
    labelAr: string;
    Icon?: LucideIcon;
    glyph?: string;
}

export const FACILITIES: Facility[] = [
    { id: 'wifi', labelEn: 'Free Wi-Fi', labelAr: 'واي فاي مجاني', Icon: Wifi },
    { id: 'parking', labelEn: 'Parking', labelAr: 'مواقف', glyph: 'P' },
    { id: 'catering', labelEn: 'Catering', labelAr: 'خدمات الطعام', Icon: Utensils },
    { id: 'accessible', labelEn: 'Accessible', labelAr: 'مناسب للعاجزين', Icon: Accessibility },
];