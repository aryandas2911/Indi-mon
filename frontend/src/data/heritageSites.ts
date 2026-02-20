export interface HeritageSite {
    id: string;
    name: string;
    description: string;
    history?: string;
    activities?: string[];
    coordinates: [number, number]; // [longitude, latitude]
    category: 'temple' | 'fort' | 'monument' | 'shrine';
    image?: string;
    region: 'Delhi' | 'Kerala' | 'Rajasthan' | 'Hampi';
    status: 'Verified' | 'Pending' | 'Undiscovered';
    discoveredOn?: string;
    isRare?: boolean;
    teaser?: string;
    visitorCount?: number;
    comments?: {
        id: string;
        user: string;
        avatar?: string;
        text: string;
        image?: string;
        date: string;
    }[];
}

export const heritageSites: HeritageSite[] = [
    {
        id: '1',
        name: 'Hampi - Virupaksha Temple',
        description: 'The main shrine dedicated to Lord Virupaksha. The tower casts an inverted shadow in the inner sanctum.',
        history: 'Dating back to the 7th century, it is one of the oldest functioning temples in India. It survived the 1565 destruction of Vijayanagara and remains a major pilgrimage site.',
        activities: ['Witnessing Morning Aarti', 'Viewing the Inverted Shadow', 'Feeding Lakshmi the Elephant'],
        coordinates: [76.4590, 15.3350],
        category: 'temple',
        image: '/assets/Golgumbaz.jpg',
        region: 'Hampi',
        status: 'Verified',
        discoveredOn: '05 Oct',
        visitorCount: 12450,
        comments: [
            {
                id: 'c1',
                user: 'Aaryan Sharma',
                avatar: '/assets/profile-pic (1).jpg',
                text: 'The architecture is breathtaking. The inverted shadow is real!',
                date: '2 days ago'
            },
            {
                id: 'c2',
                user: 'Priya Iyer',
                text: 'A must-visit for anyone interested in history. The carvings are so detailed.',
                image: '/assets/temple.jpg',
                date: '1 week ago'
            }
        ]
    },
    {
        id: '2',
        name: 'Vittala Temple - Stone Chariot',
        description: 'A masterpiece of Vijayanagara architecture, featuring the famous stone chariot and musical pillars.',
        history: 'Built in the 15th century, the Chariot is actually a shrine dedicated to Garuda. The pillars are known to emit musical notes when tapped.',
        activities: ['Photography', 'Music Pillar Tour', 'Walk to Hampi Bazaar'],
        coordinates: [76.4811, 15.3427],
        category: 'monument',
        image: '/assets/Thanjavur-Brihadeeshwara-Temple.jpg',
        region: 'Hampi',
        status: 'Verified',
        discoveredOn: '12 Oct',
        isRare: true,
        visitorCount: 8900,
        comments: [
            {
                id: 'c3',
                user: 'Vikram Singh',
                text: 'Iconic spot! Took so many photos here.',
                image: '/assets/temple (2).jpg',
                date: '3 days ago'
            }
        ]
    },
    {
        id: '3',
        name: 'Lotus Mahal',
        description: "Zenana Enclosure's primary palace with lotus-like archways.",
        history: 'A brilliant example of Indo-Islamic fusion architecture. It served as a summer palace for the royal women of the Vijayanagara Empire.',
        activities: ['Garden Walks', 'Studying Arched Architecture'],
        coordinates: [76.4682, 15.3326],
        category: 'shrine',
        image: '/assets/temple.jpg',
        region: 'Hampi',
        status: 'Pending',
        discoveredOn: '15 Oct',
        visitorCount: 4500
    },
    {
        id: '4',
        name: 'Humayun\'s Tomb',
        description: 'The first garden-tomb on the Indian subcontinent, an inspiration for the Taj Mahal.',
        history: 'Built in 1570, it was commissioned by Humayun\'s first wife, Bega Begum. It represents the start of the massive Mughal architectural style.',
        activities: ['Photography', 'Architecture Study'],
        coordinates: [77.2507, 28.5933],
        category: 'monument',
        image: '/assets/humayun tomb.jpg',
        region: 'Delhi',
        status: 'Pending',
        discoveredOn: '20 Nov',
        visitorCount: 15600
    },
    {
        id: '5',
        name: 'Qutub Minar',
        description: 'The tallest brick minaret in the world, a masterpiece of Indo-Islamic architecture.',
        history: 'Construction began in 1192 by Qutb-ud-din Aibak. It is part of the Qutub complex, a UNESCO World Heritage Site.',
        activities: ['Viewing Iron Pillar', 'Exploring Ruins'],
        coordinates: [77.1855, 28.5245],
        category: 'monument',
        image: '/assets/qutub minar.jpg',
        region: 'Delhi',
        status: 'Verified',
        discoveredOn: '01 Nov',
        visitorCount: 25000,
        comments: [
            {
                id: 'c4',
                user: 'Neha Gupta',
                text: 'Standing tall and proud. The height is truly impressive.',
                date: '4 days ago'
            }
        ]
    },
    {
        id: '6',
        name: 'Bada Gumbad',
        description: 'A large tomb located in the Lodi Gardens, Delhi.',
        history: 'Constructed during the Lodi dynasty in the late 15th century. It is believed to be a gateway to the mosque of the Lodi era.',
        activities: ['Morning Walks', 'Historical Research'],
        coordinates: [77.2195, 28.5889],
        category: 'monument',
        image: '/assets/Bada_Gumbad_Lodi_Gardens-featured.webp',
        region: 'Delhi',
        status: 'Verified',
        discoveredOn: '10 Nov',
        visitorCount: 7800
    },
    {
        id: '7',
        name: 'Sri Padmanabhaswamy Temple',
        description: 'A Hindu temple located in Thiruvananthapuram, Kerala, known for its immense wealth.',
        history: 'The temple is built in an intricate fusion of the indigenous Kerala style and the Tamil style (Dravidian) of architecture.',
        activities: ['Temple Viewing', 'Thiruvananthapuram Tour'],
        coordinates: [76.9437, 8.4831],
        category: 'temple',
        image: '/assets/sri padmanabaswamy temple kerala.jpg',
        region: 'Kerala',
        status: 'Verified',
        discoveredOn: '05 Dec',
        visitorCount: 32000,
        comments: [
            {
                id: 'c5',
                user: 'Rahul Nair',
                text: 'Divine experience. The gold work is stunning.',
                date: '1 day ago'
            }
        ]
    },
    {
        id: '8',
        name: 'Jatayu Earth Center',
        description: 'A park and tourism center featuring the largest bird sculpture in the world.',
        teaser: 'A mythical bird turned to stone near the southern peaks...',
        coordinates: [76.8653, 8.8647],
        category: 'monument',
        image: '/assets/kerala-jatayu-para.jpg',
        region: 'Kerala',
        status: 'Undiscovered',
        teaser: 'A mythical bird turned to stone near the southern peaks...',
        visitorCount: 1200
    },
    {
        id: '9',
        name: 'Kuthira Malika Palace',
        description: 'A 19th-century palace in Thiruvananthapuram, known for its wooden carvings.',
        history: 'Built by Swathi Thirunal Rama Varma, this palace features 122 carved wooden horses in its brackets.',
        activities: ['Museum Visit', 'Art Study'],
        coordinates: [76.9442, 8.4828],
        category: 'monument',
        image: '/assets/kuthiramalika-palace-1723218703_2ad259a2c2795562b102.webp',
        region: 'Kerala',
        status: 'Verified',
        discoveredOn: '12 Dec',
        visitorCount: 5600
    },
    {
        id: '10',
        name: 'Amer Palace',
        description: 'A majestic fort on a hilltop, known for its artistic Hindu style elements.',
        history: 'Built by Raja Man Singh I in 1592, the palace is high on a hill overlooking Maotha Lake.',
        activities: ['Elephant Rides', 'Mirror Palace Tour'],
        coordinates: [75.8513, 26.9855],
        category: 'fort',
        image: '/assets/amer-palace-jaipur.jpg',
        region: 'Rajasthan',
        status: 'Verified',
        discoveredOn: '15 Nov',
        isRare: true,
        visitorCount: 22000,
        comments: [
            {
                id: 'c6',
                user: 'Anjali Sharma',
                text: 'The elephant ride up was amazing! The Sheesh Mahal is a dream.',
                image: '/assets/The-Royal-Heritage-of-Rajasthan.jpg',
                date: '5 days ago'
            }
        ]
    },
    {
        id: '11',
        name: 'Jaisalmer Fort',
        description: 'One of the largest fully preserved fortified cities in the world.',
        history: 'Built in 1156 AD by the Rajput Rawal Jaisal, it is known as the Sonar Quila (Golden Fort) because of its yellow sandstone.',
        activities: ['Old City Walk', 'Sunset Views'],
        coordinates: [70.9126, 26.9124],
        category: 'fort',
        image: '/assets/1532789117_Jaisalmer-Fort1.jpg',
        region: 'Rajasthan',
        status: 'Verified',
        discoveredOn: '20 Nov',
        visitorCount: 18000
    },
    {
        id: '12',
        name: 'Kumbhalgarh Fort',
        description: 'A Mewar fortress on the westerly range of Aravalli Hills, featuring the second longest wall in the world.',
        teaser: 'The invincible cloud-fortress with a wall like the Great Serpent...',
        coordinates: [73.5855, 25.1485],
        category: 'fort',
        image: '/assets/Kumbhalgarh-Fort.jpg',
        region: 'Rajasthan',
        status: 'Undiscovered',
        teaser: 'The invincible cloud-fortress with a wall like the Great Serpent...',
        visitorCount: 3400
    }
];
