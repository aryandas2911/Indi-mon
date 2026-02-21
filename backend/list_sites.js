import supabase from "./config/supabase.js";

async function listSites() {
  const { data, error } = await supabase.from('heritage_sites').select('id, title, coordinates, verification_status');
  if (error) {
    console.error('Error fetching sites:', error);
  } else {
    console.log('Current sites in DB:', data.length);
    console.log(JSON.stringify(data, null, 2));
  }
}

listSites();
