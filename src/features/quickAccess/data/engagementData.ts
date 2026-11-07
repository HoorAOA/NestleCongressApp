import { BookOpen, FileText, PlaySquare } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

/* ---------- Live voting ---------- */

export interface PollOption {
    id: string;
    label: string;
    labelEn: string;
    labelAr: string;
    votes: number;
}

export interface Poll {
    id: string;
    category: string;
    categoryEn: string;
    categoryAr: string;
    question: string;
    questionEn: string;
    questionAr: string;
    options: PollOption[];
}

export const POLLS: Poll[] = [
    {
        id: 'poll-1',
        category: 'Audience Feedback',
        categoryEn: 'Audience Feedback',
        categoryAr: 'ملاحظات الحضور',
        question: 'How would you rate the current session?',
        questionEn: 'How would you rate the current session?',
        questionAr: 'كيف تقيم الجلسة الحالية؟',
        options: [
            { id: 'excellent', label: 'Excellent', labelEn: 'Excellent', labelAr: 'ممتاز', votes: 55 },
            { id: 'very-good', label: 'Very Good', labelEn: 'Very Good', labelAr: 'جيد جدًا', votes: 30 },
            { id: 'good', label: 'Good', labelEn: 'Good', labelAr: 'جيد', votes: 10 },
            { id: 'fair', label: 'Fair', labelEn: 'Fair', labelAr: 'مقبول', votes: 5 },
        ],
    },
    {
        id: 'poll-2',
        category: 'Content Preferences',
        categoryEn: 'Content Preferences',
        categoryAr: 'تفضيلات المحتوى',
        question: 'Which topic would you like more coverage on?',
        questionEn: 'Which topic would you like more coverage on?',
        questionAr: 'ما الموضوع الذي ترغب في تغطيته أكثر؟',
        options: [
            { id: 'pediatric', label: 'Pediatric nutrition', labelEn: 'Pediatric nutrition', labelAr: 'تغذية الأطفال', votes: 41 },
            { id: 'research', label: 'Clinical research', labelEn: 'Clinical research', labelAr: 'الأبحاث السريرية', votes: 32 },
            { id: 'gut', label: 'Gut health & immunity', labelEn: 'Gut health & immunity', labelAr: 'صحة الجهاز الهضمي والمناعة', votes: 19 },
            { id: 'digital', label: 'Digital health tools', labelEn: 'Digital health tools', labelAr: 'أدوات الصحة الرقمية', votes: 11 },
        ],
    },
    {
        id: 'poll-3',
        category: 'Impact',
        categoryEn: 'Impact',
        categoryAr: 'الأثر',
        question: 'How likely are you to apply what you learned today?',
        questionEn: 'How likely are you to apply what you learned today?',
        questionAr: 'ما مدى احتمال تطبيق ما تعلمته اليوم؟',
        options: [
            { id: 'very-likely', label: 'Very likely', labelEn: 'Very likely', labelAr: 'مرجح جدًا', votes: 48 },
            { id: 'likely', label: 'Likely', labelEn: 'Likely', labelAr: 'مرجح', votes: 36 },
            { id: 'unlikely', label: 'Unlikely', labelEn: 'Unlikely', labelAr: 'غير محتمل', votes: 9 },
            { id: 'not-sure', label: 'Not sure', labelEn: 'Not sure', labelAr: 'لست متأكدًا', votes: 7 },
        ],
    },
];

/* ---------- Ask Q&A ---------- */

export const QUESTION_CATEGORIES = ['General', 'Nutrition', 'Research', 'Clinical'];
export const QUESTION_CATEGORIES_AR = ['عام', 'التغذية', 'البحث', 'السريري'];
export const QUESTION_SORTS = ['Popular', 'Recent', 'Answered'];
export const QUESTION_SORTS_AR = ['الأكثر تصويتاً', 'الأحدث', 'تمت الإجابة'];

export interface Question {
    id: string;
    text: string;
    textEn: string;
    textAr: string;
    category: string;
    categoryEn: string;
    categoryAr: string;
    votes: number;
    upvoted: boolean;
    answered: boolean;
    author: string;
    authorEn: string;
    authorAr: string;
    createdAt: number;
}

const HOUR = 60 * 60 * 1000;
const NOW = Date.now();

export const INITIAL_QUESTIONS: Question[] = [
    {
        id: 'q-1',
        text: 'How can pediatric nutrition plans be personalized for children with different growth patterns?',
        textEn: 'How can pediatric nutrition plans be personalized for children with different growth patterns?',
        textAr: 'كيف يمكن تخصيص خطط التغذية للأطفال لتناسب أنماط النمو المختلفة لدى الأطفال؟',
        category: 'Nutrition',
        categoryEn: 'Nutrition',
        categoryAr: 'التغذية',
        votes: 24,
        upvoted: false,
        answered: true,
        author: 'Dr. Ahmed',
        authorEn: 'Dr. Ahmed',
        authorAr: 'د. أحمد',
        createdAt: NOW - 1 * HOUR,
    },
    {
        id: 'q-2',
        text: 'What are the latest guidelines on early allergen introduction for infants?',
        textEn: 'What are the latest guidelines on early allergen introduction for infants?',
        textAr: 'ما هي آخر الإرشادات حول إدخال مسببات الحساسية مبكرًا للرضع؟',
        category: 'Clinical',
        categoryEn: 'Clinical',
        categoryAr: 'السريري',
        votes: 18,
        upvoted: false,
        answered: false,
        author: 'Dr. Mariam',
        authorEn: 'Dr. Mariam',
        authorAr: 'د. مريم',
        createdAt: NOW - 2 * HOUR,
    },
    {
        id: 'q-3',
        text: 'How reliable are real-world evidence studies compared with randomized trials?',
        textEn: 'How reliable are real-world evidence studies compared with randomized trials?',
        textAr: 'كيف تكون الدراسات القائمة على الأدلة الواقعية مقارنة بالتجارب العشوائية؟',
        category: 'Research',
        categoryEn: 'Research',
        categoryAr: 'البحث',
        votes: 12,
        upvoted: false,
        answered: false,
        author: 'Dr. Khalid',
        authorEn: 'Dr. Khalid',
        authorAr: 'د. خالد',
        createdAt: NOW - 3 * HOUR,
    },
    {
        id: 'q-4',
        text: 'Will the session recordings be available after the congress?',
        textEn: 'Will the session recordings be available after the congress?',
        textAr: 'هل ستكون تسجيلات الجلسات متاحة بعد المؤتمر؟',
        category: 'General',
        categoryEn: 'General',
        categoryAr: 'عام',
        votes: 7,
        upvoted: false,
        answered: true,
        author: 'Dr. Sara',
        authorEn: 'Dr. Sara',
        authorAr: 'د. سارة',
        createdAt: NOW - 4 * HOUR,
    },
];

/* ---------- Resources ---------- */

export type ResourceType = 'PDF' | 'Slides';
export type ResourceTone = 'red' | 'blue' | 'gold';

export interface ResourceItem {
    id: string;
    type: ResourceType;
    tone: ResourceTone;
    title: string;
    titleEn: string;
    titleAr: string;
    description: string;
    descriptionEn: string;
    descriptionAr: string;
    size: string;
    url: string;
    fileName: string;
    mime: string;
    Icon: LucideIcon;
}

const PDF_MIME = 'application/pdf';
const PPTX_MIME =
    'application/vnd.openxmlformats-officedocument.presentationml.presentation';

export const RESOURCES: ResourceItem[] = [
    {
        id: 'r-1',
        type: 'PDF',
        tone: 'red',
        title: 'Congress Scientific Program',
        titleEn: 'Congress Scientific Program',
        titleAr: 'برنامج المؤتمر العلمي',
        description: 'Complete schedule and session details',
        descriptionEn: 'Complete schedule and session details',
        descriptionAr: 'جدول كامل وتفاصيل الجلسات',
        size: '4.2 MB',
        url: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
        fileName: 'congress-scientific-program.pdf',
        mime: PDF_MIME,
        Icon: FileText,
    },
    {
        id: 'r-2',
        type: 'PDF',
        tone: 'blue',
        title: 'Pediatric Nutrition Guidelines',
        titleEn: 'Pediatric Nutrition Guidelines',
        titleAr: 'إرشادات التغذية للأطفال',
        description: 'Clinical reference material',
        descriptionEn: 'Clinical reference material',
        descriptionAr: 'مواد مرجعية طبية',
        size: '2.8 MB',
        url: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-with-images.pdf',
        fileName: 'pediatric-nutrition-guidelines.pdf',
        mime: PDF_MIME,
        Icon: BookOpen,
    },
    {
        id: 'r-3',
        type: 'Slides',
        tone: 'gold',
        title: 'Keynote Presentation Slides',
        titleEn: 'Keynote Presentation Slides',
        titleAr: 'شرائح عرض الكلمة الرئيسية',
        description: 'The Next Era of Nutrition & Health',
        descriptionEn: 'The Next Era of Nutrition & Health',
        descriptionAr: 'العصر القادم للتغذية والصحة',
        size: '8.6 MB',
        url: 'https://truefilesize.com/files/powerpoint/sample-20-slides.pptx',
        fileName: 'keynote-presentation-slides.pptx',
        mime: PPTX_MIME,
        Icon: PlaySquare,
    },
    {
        id: 'r-4',
        type: 'Slides',
        tone: 'gold',
        title: 'Gut Health & Immunity Workshop',
        titleEn: 'Gut Health & Immunity Workshop',
        titleAr: 'ورشة صحة الجهاز الهضمي والمناعة',
        description: 'Hands-on workshop materials',
        descriptionEn: 'Hands-on workshop materials',
        descriptionAr: 'مواد ورشة عملية',
        size: '5.1 MB',
        url: 'https://truefilesize.com/files/powerpoint/business-template.pptx',
        fileName: 'gut-health-immunity-workshop.pptx',
        mime: PPTX_MIME,
        Icon: PlaySquare,
    },
    {
        id: 'r-5',
        type: 'PDF',
        tone: 'red',
        title: 'Venue Floor Plan',
        titleEn: 'Venue Floor Plan',
        titleAr: 'خريطة موقع المؤتمر',
        description: 'Exhibition map and room guide',
        descriptionEn: 'Exhibition map and room guide',
        descriptionAr: 'خريطة المعرض ودليل القاعات',
        size: '1.3 MB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileName: 'venue-floor-plan.pdf',
        mime: PDF_MIME,
        Icon: FileText,
    },
];

export const RESOURCE_FILTERS = ['All', 'PDF', 'Slides', 'Videos', 'Saved'];
export const RESOURCE_FILTERS_AR = ['الكل', 'PDF', 'الشرائح', 'الفيديوهات', 'المحفوظة'];
