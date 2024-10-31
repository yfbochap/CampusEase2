import { supabase } from "./supabaseClient";

export const getEvents = async () => {
    const { data, error } = await supabase
        .from("event")
        .select("*");
    if (error) console.error("Error fetching events:", error);
    return data;
}

export async function searchEvents(field, search_term) {
  const { data, error } = await supabase
      .from('event')
      .select()
      .ilike(field, `%${search_term}%`);
    if (error){
       console.error("Error fetching events:", error);
    }
    return data;
}

export async function addEvent(eventData) {
    try {
      const { data, error } = await supabase
        .from('event') 
        .insert([{
          created_by: eventData.created_by,
          event_name: eventData.name,
          start_date_time: eventData.start_date_time,
          end_date_time: eventData.end_date_time,
          location: eventData.location,
          venue: eventData.venue,
          place_id: eventData.place_id,
          place_lat: eventData.place_lat,
          place_lng: eventData.place_lng,
          description: eventData.description,
          organisation: eventData.organisation,
          external_url: eventData.external_url,
          event_type: eventData.event_type,
          photos: eventData.photos,
        }]);
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error adding event:', error.message);
      return null;
    }
  }