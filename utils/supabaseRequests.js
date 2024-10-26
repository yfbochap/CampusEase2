import { supabase } from "./supabaseClient";

// export const getEvents = async ({ userId, token }) => {
//     const supabase = await supabase(token);
//     console.log("this happens");
//     const { data: event} = await supabase
//         .from("event")
//         .select("*")
//         .eq("user_id", userId);
//     return event;
// }

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