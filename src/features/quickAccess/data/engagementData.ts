import { BookOpen, FileText, PlaySquare } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

/* ---------- Live voting ---------- */

export interface PollOption {
    id: string;
    label: string;
    votes: number;
}

export interface Poll {
    id: string;
    category: string;
    question: string;
    options: PollOption[];
}

export const POLLS: Poll[] = [
    {
        id: 'poll-1',
        category: 'Audience Feedback',
        question: 'How would you rate the current session?',
        options: [
            { id: 'excellent', label: 'Excellent', votes: 55 },
            { id: 'very-good', label: 'Very Good', votes: 30 },
            { id: 'good', label: 'Good', votes: 10 },
            { id: 'fair', label: 'Fair', votes: 5 },
        ],
    },
    {
        id: 'poll-2',
        category: 'Content Preferences',
        question: 'Which topic would you like more coverage on?',
        options: [
            { id: 'pediatric', label: 'Pediatric nutrition', votes: 41 },
            { id: 'research', label: 'Clinical research', votes: 32 },
            { id: 'gut', label: 'Gut health & immunity', votes: 19 },
            { id: 'digital', label: 'Digital health tools', votes: 11 },
        ],
    },
    {
        id: 'poll-3',
        category: 'Impact',
        question: 'How likely are you to apply what you learned today?',
        options: [
            { id: 'very-likely', label: 'Very likely', votes: 48 },
            { id: 'likely', label: 'Likely', votes: 36 },
            { id: 'unlikely', label: 'Unlikely', votes: 9 },
            { id: 'not-sure', label: 'Not sure', votes: 7 },
        ],
    },
];

/* ---------- Ask Q&A ---------- */

export const QUESTION_CATEGORIES = ['General', 'Nutrition', 'Research', 'Clinical'];
export const QUESTION_SORTS = ['Popular', 'Recent', 'Answered'];

export interface Question {
    id: string;
    text: string;
    category: string;
    votes: number;
    upvoted: boolean;
    answered: boolean;
    author: string;
    createdAt: number;
}

const HOUR = 60 * 60 * 1000;
const NOW = Date.now();

export const INITIAL_QUESTIONS: Question[] = [
    {
        id: 'q-1',
        text: 'How can pediatric nutrition plans be personalized for children with different growth patterns?',
        category: 'Nutrition',
        votes: 24,
        upvoted: false,
        answered: true,
        author: 'Dr. Ahmed',
        createdAt: NOW - 1 * HOUR,
    },
    {
        id: 'q-2',
        text: 'What are the latest guidelines on early allergen introduction for infants?',
        category: 'Clinical',
        votes: 18,
        upvoted: false,
        answered: false,
        author: 'Dr. Mariam',
        createdAt: NOW - 2 * HOUR,
    },
    {
        id: 'q-3',
        text: 'How reliable are real-world evidence studies compared with randomized trials?',
        category: 'Research',
        votes: 12,
        upvoted: false,
        answered: false,
        author: 'Dr. Khalid',
        createdAt: NOW - 3 * HOUR,
    },
    {
        id: 'q-4',
        text: 'Will the session recordings be available after the congress?',
        category: 'General',
        votes: 7,
        upvoted: false,
        answered: true,
        author: 'Dr. Sara',
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
    description: string;
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
        description: 'Complete schedule and session details',
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
        description: 'Clinical reference material',
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
        description: 'The Next Era of Nutrition & Health',
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
        description: 'Hands-on workshop materials',
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
        description: 'Exhibition map and room guide',
        size: '1.3 MB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileName: 'venue-floor-plan.pdf',
        mime: PDF_MIME,
        Icon: FileText,
    },
];

export const RESOURCE_FILTERS = ['All', 'PDF', 'Slides', 'Videos', 'Saved'];
