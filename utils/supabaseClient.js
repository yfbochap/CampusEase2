import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY



// export const supabaseClient = async(supabaseToken) => {
//     const supabase = createClient(
//         SUPABASE_URL, SUPABASE_ANON_KEY,
//         {
//             global: {headers: {Authorization: `Bearer ${supabaseToken}`}}
//         }
//     );

//     return supabase;
// }

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)