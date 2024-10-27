import { supabase } from "./supabaseClient";

export const getEvents = async () => {
    const { data, error } = await supabase
        .from("event")
        .select("*");
    if (error) console.error("Error fetching events:", error);
    return data;
}

// export const addEvent = async ({ userId, token, event}) => {
//     const supabase = await supabase(token);
//     const { data, error} = await supabase
//         .from("event")
//         .insert(
//             {
//                 user_id: userId,
//                 event_name: "HARDCODED TEST",
//                 date_time: Date.now(),
//                 place_name: "Hardcoded Location",
//                 place_id: "Hardcoded ID"
//             },
//         );
//     if (error){
//         console.error("Error inserting event:", error);
//         throw new Error(error.message);
//     }
//     return data;
// }