export interface HeritageSite {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number]; // [longitude, latitude]
    category: 'temple' | 'fort' | 'monument' | 'shrine';
    image?: string;
}

export const heritageSites: HeritageSite[] = [
    {
        id: '1',
        name: 'Hampi - Virupaksha Temple',
        description: 'The main shrine dedicated to Lord Virupaksha. The tower casts an inverted shadow in the inner sanctum.',
        coordinates: [76.4590, 15.3350],
        category: 'temple',
        image: '/assets/temple (2).jpg'
    },
    {
        id: '2',
        name: 'Stone Chariot',
        description: 'A shrine built in the form of a temple chariot. Legend says the wheels could once turn.',
        coordinates: [76.4673, 15.3389],
        category: 'monument',
        image: '/assets/temple.jpg'
    },
    {
        id: '3',
        name: 'Lotus Mahal',
        description: 'Zenana Enclosure\'s primary palace with lotus-like archways.',
        coordinates: [76.4682, 15.3326],
        category: 'shrine',
        image: '/assets/temple.jpg'
    },
    {
        id: '4',
        name: 'Golgumbaz',
        description: 'The tomb of Mohammed Adil Shah, Sultan of Bijapur.',
        coordinates: [75.7364, 16.8271],
        category: 'fort',
        image: '/assets/Golgumbaz.jpg'
    },
    {
        id: '5',
        name: 'Ajanta Caves',
        description: 'Buddhist cave monuments which date from the 2nd century BCE.',
        coordinates: [75.7485, 20.5519],
        category: 'monument',
        image: '/assets/images.jpg'
    },
    {
        id: '6',
        name: 'Thanjavur Brihadeeshwara Temple',
        description: 'A Hindu temple dedicated to Shiva located in South bank of Kaveri river in Thanjavur.',
        coordinates: [79.1318, 10.7828],
        category: 'temple',
        image: '/assets/Thanjavur-Brihadeeshwara-Temple.jpg'
    },
    {
        id: '7',
        name: 'Akshardham Temple',
        description: 'A spiritual-cultural campus in Delhi, India.',
        coordinates: [77.2773, 28.6127],
        category: 'temple',
        image: '/assets/Akshardham-Temple-New-Delhi.jpg'
    }
];
