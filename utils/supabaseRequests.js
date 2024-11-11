import { supabase } from "./supabaseClient";
// Add diff functions for same purpose so not that many api calls are made
// getLikedByEvents -> get all
// getLikedByEventId -> one specifc

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
    let thumbnailPath;
    if (typeof thumbnailFile === 'string') {
        // If it's a URL, use it directly
        thumbnailPath = thumbnailFile;
        console.log('Using existing thumbnail path:', thumbnailPath);
    } else {
        // If it's a File object, upload it
        thumbnailPath = await uploadImage(thumbnailFile, 'thumbnail', eventName);
    }
    
    const nonNullAdditionalFiles = additionalFiles.filter(file => file !== null);

    // Upload additional files
    const additionalImagePaths = nonNullAdditionalFiles.length > 0 
        ? await Promise.all(
            nonNullAdditionalFiles.map((file, index) => uploadImage(file, 'additional', eventName, index))
          )
        : []; // Return an empty array if no additional files

    // Now create an array with the non-null values at the front and nulls at the end
    const fullAdditionalImagePaths = [
        ...additionalImagePaths, // Add all the uploaded images first
        ...additionalFiles.filter(file => file === null) // Add the nulls at the end
    ];

    return { thumbnailPath, additionalImagePaths: fullAdditionalImagePaths };
}


export async function addEvent(eventData, thumbnailPath, additionalImagePaths) {
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
          place_lat: eventData.place_lat,
          place_lng: eventData.place_lng,
          location_short: eventData.location_short,
          description: eventData.description,
          organisation: eventData.organisation,
          external_url: eventData.external_url,
          event_type: eventData.event_type,
          thumbnail: thumbnailPath,
          photos: [...additionalImagePaths],
        }])
        .select('id');
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
        console.error('Error adding event:', error.message);
        return null;
    }
};

export async function updateEvent(eventData, thumbnailPath, additionalImagePaths, eventId) {
    try {

        console.log("Updating event with ID:", eventId); // Log the event ID
        console.log("Event data to update:", eventData); // Log the event data


      const { data, error } = await supabase
        .from('event') 
        .update([{
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
          thumbnail: thumbnailPath,
          photos: [...additionalImagePaths],
        }])
        .eq('id', eventId)
        .select('venue');
  
      if (error) {
        throw error;
      }
      if(data) {
        console.log(data);
        console.log("Success! Event Updated!");
        return true;
      }

    } catch (error) {
        console.error('Error updating event:', error.message);
        return null;
    }
};

export async function checkEventExists (eventName){
    const { data, error } = await supabase
      .from('event')
      .select('id') // Column selected doesn't matter
      .eq('event_name', eventName)
      .single(); // Use .single() if you expect only one result
  
      return !!data; // Return true if an event exists, otherwise false
};

export async function getEventByEventId(eventId) {
    try {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .eq('id', eventId)
        .single(); 
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
};

export async function getEventsByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .eq('created_by', userId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
};

export async function deleteImage(filePath) {
    const { error } = await supabase.storage.from('eventPhotos').remove([filePath]);

    if (error) {
        console.error('Error deleting image:', error);
        return false;
    }
    return true;
};

export async function getProfile(userId){
  try {
    const {data, error} = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);
    if (error) throw error;
    return data;
  } catch (error){
    console.error('Error fetching profile:', error);
    return null;
  }
    
}

export async function checkUserLike(profile_id){
  try{
    const {data, error} = await supabase
    .from('participant')
    .select('event_id')
    .eq('profile_id', profile_id);
    if (error) throw error;
    return data.map(item => item.event_id);
  } catch (error){
    console.log("Error checking user like", error)
  }
}

export async function addUserLike(event_id, profile_id){
  try{
    const {data, error} = await supabase
    .from('participant')
    .insert([{
      event_id: event_id,
      profile_id: profile_id
    }]);
    if (error) throw error;
    return data;
  } catch (error){
    console.log("Error liking event", error)
  }
}

export async function removeUserLike(event_id, profile_id){
  try{
    const {data, error} = await supabase
    .from('participant')
    .delete()
    .eq('event_id', event_id)
    .eq('profile_id', profile_id);
    if (error) throw error;
    return data;
  } catch (error){
    console.log("Error un-liking event", error)
  }
}

export async function getLikedUsersByEvents() {
  try {
    const { data, error } = await supabase
      .from('participant')
      .select('event_id, profile_id') 
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error retrieving participants for event", error);
  }
}

export async function getLikedUsersByEventId(event_id) {
  try {
    const { data, error } = await supabase
      .from('participant')
      .select('event_id, profile_id')
      .eq('event_id', event_id); 
    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error retrieving participants for event", error);
  }
}


export async function deleteEventByEventID(id){
  console.log(id)
  try {
    const { data, error } = await supabase
      .from('event') 
      .delete()
      .eq('id', id); 
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting event:', error);
  }

}
