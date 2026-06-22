// =================================
// SUPABASE CONNECTION
// =================================

const SUPABASE_URL = "https://pxytajbqefbknqeoxlxj.supabase.co";

const SUPABASE_KEY = "sb_publishable_HxglVZZ5yjDVtR8JVMVIAg_Q9ANOCxy";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected 🚀");
