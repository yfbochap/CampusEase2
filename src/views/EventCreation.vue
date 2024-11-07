<template>
  <div class="container-fluid">

    
    <form class="mt-4 d-flex">
      <div class="left-column">
        <label for="thumbnailPhoto" class="form-label">Thumbnail Photo (Mandatory)</label>
        <div class="thumbnail-box" style="border-radius: 10px;">
          <input type="file" id="thumbnailPhoto" @change="handleThumbnailPhoto" accept="image/*" required>
          <div class="plus-icon">+</div>
          <img v-if="thumbnailPhoto" :src="thumbnailPreview" alt="Thumbnail" class="thumbnail-preview">
          <button v-if="thumbnailPhoto" @click="removeThumbnail" class="remove-icon">X</button>
        </div>

        <label for="eventPhotos1" class="form-label">Additional Photos (Optional)</label>
        <div class="small-photo-wrapper">
          <div class="small-photo-box" v-for="(photo, index) in 3" :key="index" style="border-radius: 7px;">
            <input type="file" class="form-control" :id="'eventPhotos' + (index + 1)" @change="(e) => { handlePhotos(index)(e); }" accept="image/*">
            <div class="plus-icon">+</div>
            <img v-if="eventPhotosPreview[index]" :src="eventPhotosPreview[index]" alt="Event Photo" class="small-photo-preview">
            <button v-if="eventPhotosPreview[index]" @click="removePhoto(index)" class="remove-icon">X</button>
          </div>
        </div>
      </div>

      <div class="right-column ms-4">
        <div class="mb-3 d-flex location-venue-container">
          <div class="flex-half">
          <label for="eventName" class="form-label">Event Name</label>
          <input type="text" class="form-control" id="eventName" v-model="eventName" required>
        </div>

        <div class="flex-half ms-2">
          <label for="eventType" class="form-label">Event Category</label>
          <select id="eventType" class="form-control" v-model="eventType" required>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Arts">Arts</option>
            <option value="Networking">Networking</option>
            <option value="Charity">Charity</option>
            <option value="Community">Community</option>
            <option value="Welfare">Welfare</option>
            <option value="Others">Others</option>
          </select>
        </div>
        </div>

        <div class="mb-3 d-flex location-venue-container">
          <div class="flex-half">
          <label for="location" class="form-label">Location</label>
          <select id="location" class="form-control" v-model="selectedLocation" required>
            <option value="Administration Building">Administration Building</option>
            <option value="Campus Green">Campus Green</option>
            <option value="Lee Kong Chian School of Business">Lee Kong Chian School of Business</option>
            <option value="Li Ka Shing Library">Li Ka Shing Libraryy</option>
            <option value="Prinsep Street Residences">Prinsep Street Residences</option>
            <option value="School of Accountancy">School of Accountancy</option>
            <option value="School of Computing & Information Systems 1">School of Computing & Information Systems 1</option>
            <option value="School of Economics/School of Computing & Information Systems 2">School of Economics/School of Computing & Information Systems 2</option>
            <option value="School of Social Sciences/College of Integrative Studies">School of Social Sciences/College of Integrative Studies</option>
            <option value="SMU Connexion">SMU Connexion</option>
            <option value="Yong Pung How School of Law/Kwa Geok Choo Law Library">Yong Pung How School of Law/Kwa Geok Choo Law Library</option>
            <option value="T-Junction">T-Junction</option>
            <option value="Other">Other</option>
          </select>
        </div>
        &nbsp;&nbsp;
        <div v-if="selectedLocation === 'Other'" class="mb-3">
          <label for="otherLocation" class="form-label">Google Maps Address</label>
          <input type="text" id="otherLocation" v-model="otherLocation" class="form-control" placeholder="Specify location" required>
        </div>

        <div class="flex-half ms-2">
          <label for="eventVenue" class="form-label">Venue</label>
          <input type="text" class="form-control" id="eventVenue" v-model="eventVenue" required>
        </div>
      </div>

        <div class="mb-3">
          <label for="eventStartDateTime" class="form-label">Start Date</label>
          <input type="datetime-local" class="form-control" id="eventStartDateTime" v-model="eventStartDateTime" required>
        </div>

        <div class="mb-3">
          <label for="eventEndDateTime" class="form-label">End Date</label>
          <input type="datetime-local" class="form-control" id="eventEndDateTime" v-model="eventEndDateTime" required>
        </div>

        <div class="mb-3">
          <label for="eventDescription" class="form-label">Description</label>
          <textarea class="form-control" id="eventDescription" rows="3" v-model="eventDescription" required></textarea>
        </div>

        <div class="mb-3">
          <label for="eventOrganisation" class="form-label">Organisation (Optional)</label>
          <input type="text" class="form-control" id="eventOrganisation" v-model="eventOrganisation">
        </div>

        <div class="mb-3">
          <label for="eventSignUp" class="form-label">Sign-up Link (Optional)</label>
          <input type="url" class="form-control" id="eventSignUp" v-model="eventSignUp" placeholder="https://example.com/sign-up">
        </div>

        <button type="button" @click="submitEvent" class="btn text-white" id="submitButton">Create Event</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, onMounted } from 'vue';
  import { supabase } from '../../utils/supabaseClient';
  import { addEvent, uploadFiles, checkEventExists } from '../../utils/supabaseRequests';

  const user = ref(null);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data.user; // Update the reactive user variable
    console.log('User Details', user.value.id);
  };

  onMounted(() => {
    fetchUser(); // Call the function when the component is mounted
  });

  const locations = reactive({
      "Administration Building": { lat: 1.2960323, lng: 103.8472966, location_short: "Admin Building" },
      "Campus Green": { lat: 1.29698, lng: 103.8496, location_short: "Campus Green" },
      "Lee Kong Chian School of Business": { lat: 1.295172, lng: 103.8505, location_short: "SOB" },
      "Li Ka Shing Library": { lat: 1.2964100987760936, lng: 103.85004366519945, location_short: "LKS Library" },
      "Prinsep Street Residences": { lat: 1.3021338939464382, lng: 103.8513315958835, location_short: "Prinsep Street Residences" },
      "School of Accountancy": { lat: 1.2961631509838585, lng: 103.84984088054155, location_short: "SOA" }, 
      "School of Computing & Information Systems 1": { lat: 1.2977150530105908, lng: 103.84942902287054, location_short: "SCIS1" }, 
      "School of Economics/School of Computing & Information Systems 2": { lat: 1.2976677192242823, lng: 103.84897900703378, location_short: "SOE/SCIS2" },
      "School of Social Sciences/College of Integrative Studies": { lat: 1.294767, lng: 103.8485, location_short: "SOSS/CIS" },
      "SMU Connexion": { lat: 1.295547, lng: 103.8493, location_short: "SMU Connex" },
      "Yong Pung How School of Law/Kwa Geok Choo Law Library": { lat: 1.295057, lng: 103.849, location_short: "YPHSOL" },
      "T-Junction": { lat: 1.296684, lng: 103.8504, location_short: "T-Junction" },
      "Other": { lat: null, lng: null } // For custom locations
  })

  const thumbnailPreview = ref('');
  const eventPhotosPreview = ref(Array(3).fill(''));

  const handleThumbnailPhoto = (event) => {
    thumbnailPhoto.value = event.target.files[0];
    if (thumbnailPhoto.value) {
      thumbnailPreview.value = URL.createObjectURL(thumbnailPhoto.value);
    } else {
      thumbnailPreview.value = null;
    }
  };

  const handlePhotos = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      eventPhotos.value[index] = file; // Store the file
      eventPhotosPreview.value[index] = URL.createObjectURL(file); // Create preview URL
    } else {
      eventPhotosPreview.value[index] = null; // Clear the preview if no file is selected
    }
  };

  const removeThumbnail = () => {
    thumbnailPhoto.value = null;
    thumbnailPreview.value = ''; // Clear preview
  };

  const removePhoto = (index) => {
    eventPhotos.value[index] = null; // Clear the file
    eventPhotosPreview.value[index] = ''; // Clear the preview
  };


  const selectedLocation = ref('');
  const place_lat = ref(null);
  const place_lng = ref(null);
  const location_short = ref(null);
  const eventName = ref('');
  const eventVenue = ref('');
  const eventStartDateTime = ref('');
  const eventEndDateTime = ref('');
  const eventDescription = ref('');
  const eventOrganisation = ref('');
  const eventSignUp = ref('');
  const eventPhotos = ref(Array(3).fill(null));
  const thumbnailPhoto = ref(null);
  const otherLocation = ref('');
  const eventType = ref('');

  watch(selectedLocation, (newLocation) => {
    const locationData = locations[newLocation];
    if (locationData) {
      place_lat.value = locationData.lat;
      place_lng.value = locationData.lng;
      location_short.value = locationData.location_short;
    } else {
      place_lat.value = null;
      place_lng.value = null;
      location_short.value = null;
    }
  });

  const submitEvent = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form'); 
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const eventExists = await checkEventExists(eventName.value);
  
    if (eventExists) {
      alert('An event with this name already exists. Please choose a different name.');
      return; // Stop the submission if the event exists
    }

    const newEvent = {
      created_by: user.value.id,
      name: eventName.value,
      venue: eventVenue.value,
      place_lat: place_lat.value,
      place_lng: place_lng.value,
      location_short: location_short.value,
      start_date_time: eventStartDateTime.value,
      end_date_time: eventEndDateTime.value,
      description: eventDescription.value,
      organisation: eventOrganisation.value,
      external_url: eventSignUp.value,
      location: selectedLocation.value === 'Other' ? otherLocation.value : selectedLocation.value,
      event_type: eventType.value,
    };

    console.log('New event created:', newEvent);
    // alert('Event Created: ' + newEvent.name);

    if (!thumbnailPhoto) {
        alert('Please upload a thumbnail image before creating the event.');
        return;
    }

    const { thumbnailPath, additionalImagePaths } = await uploadFiles(thumbnailPhoto.value, eventPhotos.value, eventName.value);

    const createdEvent = await addEvent(newEvent, thumbnailPath, additionalImagePaths || []);
            
      if (createdEvent) {
          console.log('Event added successfully:', createdEvent);

          // Clear form fields
          eventName.value = '';
          eventVenue.value = '';
          eventStartDateTime.value = '';
          eventEndDateTime.value = '';
          eventDescription.value = '';
          eventOrganisation.value = '';
          eventSignUp.value = '';
          eventPhotos.value = Array(3).fill(null);
          eventPhotosPreview.value = Array(3).fill('');
          thumbnailPhoto.value = null;
          selectedLocation.value = '';
          otherLocation.value = '';
      }

    else {
        console.error('Error: Failure to create event.');
        alert('Error: Failure to create event.');
    }




  };

</script>

<style scoped>

/* Adjusting top margin for the app container */
.container-fluid {
  color: white;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 25px;
  background-color: #1e1d1d;
}

input[type="text"],input[type="datetime-local"],input[type="url"], select, textarea {
  background-color: #6e6868;
  color: #fafefb;
  border-color: #777676;
}

textarea:focus{
  background-color: #6e6868;
  color: #fafefb;
}

.thumbnail-box,
.small-photo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
  border: 1px dashed #e4dede;
  
}


.thumbnail-box:hover,
.small-photo-box:hover {
  border-color: #007bff;
}

.thumbnail-box input[type="file"],
.small-photo-box input[type="file"] {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.thumbnail-preview {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 10px;
  position: absolute;
}

.small-photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
  position: absolute;
}

.thumbnail-box .plus-icon,
.small-photo-box .plus-icon {
  font-size: 2rem;
  color: #ccc;
}
.thumbnail-box:hover .plus-icon,
.small-photo-box:hover .plus-icon {
  color: #007bff;
}

.remove-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
}
.remove-icon:hover {
    background: darkred;
}


.left-column {
  width: 40%;
  margin-right: 2%;
}
.right-column {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.small-photo-wrapper {
  display: flex;
  gap: 30px;
}
.small-photo-box {
  width: 100px;
  height: 100px;
}
#submitButton {
  align-self: flex-end;
  margin-top: auto;
  background-color: #000000;
  border-color: #ccc;
}
#brandname {
  font-size: 24px;
}
.links {
  color: rgb(249, 234, 27);
}
.location-venue-container {
  display: flex;
}
.flex-half {
  flex: 1;
}
</style>

<!-- testing  -->