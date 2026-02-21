import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpYm1rcm9iZ2p5Z21tc3JoeWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1Njk3OTksImV4cCI6MjA4NzE0NTc5OX0.eJC3-RiUbB8tbk1WFbqmgy4l_FZ-25RErCZsUcguTPE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  const email = `seeder_${Date.now()}@example.com`;
  const password = "password123";

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }

  const userId = authData.user.id;
  console.log('Signed up seeder user:', userId);

  const newSites = [
    {
      title: "Vitthala Temple",
      image_url: "https://images.unsplash.com/photo-1627814442145-a45e99882208?q=80&w=1000",
      history: "Famous for its musical pillars and the Stone Chariot, it is the highlight of Hampi's ruins.",
      coordinates: [76.4671, 15.3350],
      category: "temple",
      region: "Karnataka",
      verification_status: "verified",
      visitor_count: 85200,
      created_by: userId,
      ai_confidence: 0.98
    },
    {
      title: "Rani ki Vav Stepwell",
      image_url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000",
      history: "An intricate subterranean stepwell in Patan, built in the 11th century to honor a king.",
      coordinates: [72.1022, 23.8589],
      category: "monument",
      region: "Gujarat",
      verification_status: "verified",
      visitor_count: 42300,
      created_by: userId,
      ai_confidence: 0.95
    },
    {
      title: "Mehrangarh Fort",
      image_url: "https://images.unsplash.com/photo-1590050752117-23a9d7fc217d?q=80&w=1000",
      history: "One of the largest forts in India, built in 1459 by Rao Jodha on a perpendicular cliff.",
      coordinates: [73.0189, 26.2978],
      category: "fort",
      region: "Rajasthan",
      verification_status: "verified",
      visitor_count: 125000,
      created_by: userId,
      ai_confidence: 0.99
    },
    {
      title: "Chand Baori Stepwell",
      image_url: "https://images.unsplash.com/photo-1616422304193-94c67923497d?q=80&w=1000",
      history: "One of the deepest and largest stepwells in India, located in the village of Abhaneri.",
      coordinates: [76.5989, 27.0072],
      category: "monument",
      region: "Rajasthan",
      verification_status: "verified",
      visitor_count: 31000,
      created_by: userId,
      ai_confidence: 0.94
    },
    {
      title: "Bekal Fort",
      image_url: "https://images.unsplash.com/photo-1608933390052-192518e9894e?q=80&w=1000",
      history: "The largest fort in Kerala, spreading over 40 acres and overlooking the Arabian Sea.",
      coordinates: [75.0298, 12.3924],
      category: "fort",
      region: "Kerala",
      verification_status: "verified",
      visitor_count: 28400,
      created_by: userId,
      ai_confidence: 0.96
    },
    {
      title: "Konark Sun Temple",
      image_url: "https://images.unsplash.com/photo-1594911776510-45949e6f30d0?q=80&w=1000",
      history: "A 13th-century temple built in the shape of a massive chariot with 24 carved stone wheels.",
      coordinates: [86.0945, 19.8876],
      category: "temple",
      region: "Odisha",
      verification_status: "verified",
      visitor_count: 98000,
      created_by: userId,
      ai_confidence: 0.97
    },
    {
      title: "Sanchi Stupa",
      image_url: "https://images.unsplash.com/photo-1565463773177-3e19864273df?q=80&w=1000",
      history: "One of the oldest stone structures in India, an important Buddhist monastery built by Emperor Ashoka.",
      coordinates: [77.7410, 23.4811],
      category: "monument",
      region: "Madhya Pradesh",
      verification_status: "verified",
      visitor_count: 54000,
      created_by: userId,
      ai_confidence: 0.99
    },
    {
      title: "Shore Temple Mahabalipuram",
      image_url: "https://images.unsplash.com/photo-1581430873902-04b281ad1249?q=80&w=1000",
      history: "An 8th-century structural temple overlooking the Bay of Bengal, built with blocks of granite.",
      coordinates: [80.1983, 12.6163],
      category: "temple",
      region: "Tamil Nadu",
      verification_status: "verified",
      visitor_count: 67000,
      created_by: userId,
      ai_confidence: 0.96
    },
    {
      title: "Watchtower of Hampi",
      image_url: "https://images.unsplash.com/photo-1554101185-5a507a2d3986?q=80&w=1000",
      history: "Ancient watchtower located near the Zenana Enclosure in Hampi ruins.",
      coordinates: [76.4674, 15.3320],
      category: "monument",
      region: "Karnataka",
      verification_status: "verified",
      visitor_count: 15600,
      created_by: userId,
      ai_confidence: 0.92
    },
    {
      title: "Ancient Lotus Mahal",
      image_url: "https://images.unsplash.com/photo-1627814442220-332be8075624?q=80&w=1000",
      history: "A beautiful pavilion within the Zenana Enclosure, known for its lotus-like dome structures.",
      coordinates: [76.4660, 15.3315],
      category: "monument",
      region: "Karnataka",
      verification_status: "verified",
      visitor_count: 32000,
      created_by: userId,
      ai_confidence: 0.95
    }
  ];

  const { data, error } = await supabase.from('heritage_sites').insert(newSites);
  if (error) {
    console.error('Error seeding sites:', error);
  } else {
    console.log('Successfully seeded 10 new heritage sites.');
  }
}

seed();
