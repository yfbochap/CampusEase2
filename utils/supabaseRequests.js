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

export async function uploadImage(file, type, eventName, index) {
    const filePath = type === 'thumbnail' 
        ? `thumbnails/${eventName}/${file.name}` 
        : `images/${eventName}/${index}_${file.name}`;

    const { data, error } = await supabase.storage
        .from('eventPhotos')
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    return data.path; // Returns the path of the uploaded image
}

export async function uploadFiles(thumbnailFile, additionalFiles, eventName) {
    const thumbnailPath = await uploadImage(thumbnailFile, 'thumbnail', eventName);
    const additionalImagePaths = await Promise.all(
        additionalFiles.map((file, index) => uploadImage(file, 'additional', eventName, index))
    );

    return { thumbnailPath, additionalImagePaths };
}


export async function addEvent(eventData, thumbnailPath, additionalImagePaths) {
    try {

    // const thumbnailPath = await uploadImage(thumbnailFile, 'thumbnail', eventName);
    // const additionalImagePaths = await Promise.all(additionalFiles.map((file, index) => uploadImage(file, 'additional', eventName, index)));
  

      const { data, error } = await supabase
        .from('event') 
        .insert([{
          created_by: eventData.created_by,
          event_name: eventData.name,
          start_date_time: eventData.start_date_time,
          end_date_time: eventData.end_date_time,
          location: eventData.location,
          venue: eventData.venue,
          place_lat: eventData.place_lat,
          place_lng: eventData.place_lng,
          location_short: eventData.location_short,
          description: eventData.description,
          organisation: eventData.organisation,
          external_url: eventData.external_url,
          event_type: eventData.event_type,
          photos: [thumbnailPath, ...additionalImagePaths.filter(path => path != null)],
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

// export async function checkEventExists (eventName){
//     const { data, error } = await supabase
//       .from('event')
//       .select('id') // Column selected doesn't matter
//       .eq('event_name', eventName)
//       .single(); // Use .single() if you expect only one result
  
//       return !!data; // Return true if an event exists, otherwise false
// };