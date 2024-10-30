<template>
  <div class="container">

    <h2>Create Event</h2>
    <form class="mt-4 d-flex">
      <div class="left-column">
        <label for="thumbnailPhoto" class="form-label">Thumbnail Photo (Mandatory)</label>
        <div class="thumbnail-box" style="border-radius: 10px;">
          <input type="file" id="thumbnailPhoto" @change="handleThumbnailPhoto" accept="image/*" required>
          <div class="plus-icon">+</div>
          <img v-if="thumbnailPhoto" :src="thumbnailPreview" alt="Thumbnail" class="thumbnail-preview">
        </div>

        <label for="eventPhotos" class="form-label">Additional Photos (Optional)</label>
        <div class="small-photo-wrapper">
          <div class="small-photo-box" v-for="(photo, index) in 3" :key="index" style="border-radius: 7px;">
            <input type="file" class="form-control" :id="'eventPhotos' + (index + 1)" @change="handlePhotos" accept="image/*">
            <div class="plus-icon">+</div>
          </div>
        </div>
      </div>

      <div class="right-column ms-4">
        <div class="mb-3">
          <label for="eventName" class="form-label">Event Name</label>
          <input type="text" class="form-control" id="eventName" v-model="eventName" required>
        </div>

        <div class="mb-3">
          <label for="eventType" class="form-label">Event Category</label>
          <select id="eventType" class="form-control" v-model="eventType">
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Arts">Arts</option>
            <option value="Networking">Networking</option>
            <option value="Charity">Charity</option>
            <option value="Community">Community</option>
            <option value="Welfare">Welfare</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <select id="location" class="form-control" v-model="selectedLocation">
            <option value="Administration Building">Administration Building</option>
            <option value="Campus Green">Campus Green</option>
            <option value="Concourse - Room/Lab">Concourse - Room/Lab</option>
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

        <div v-if="selectedLocation === 'Other'" class="mb-3">
          <label for="otherLocation" class="form-label">Google Maps Address</label>
          <input type="text" id="otherLocation" v-model="otherLocation" class="form-control" placeholder="Specify location">
        </div>

        <div class="mb-3">
          <label for="eventVenue" class="form-label">Venue</label>
          <input type="text" class="form-control" id="eventVenue" v-model="eventVenue" required>
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

        <button @click="submitEvent" class="btn text-white" id="submitButton">Create Event</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, onMounted } from 'vue';
  import { supabase } from '../../utils/supabaseClient';
  import { addEvent } from '../../utils/supabaseRequests';

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
      "Administration Building": { lat: 1.2960323, lng: 103.8472966 },
      "Campus Green": { lat: 1.29698, lng: 103.8496 },
      "Concourse - Room/Lab": { lat: 1.2903, lng: 103.8472 }, 
      "Lee Kong Chian School of Business": { lat: 1.295172, lng: 103.8505 },
      "Li Ka Shing Library": { lat: 1.2964100987760936, lng: 103.85004366519945 },
      "Prinsep Street Residences": { lat: 1.3021338939464382, lng: 103.8513315958835 },
      "School of Accountancy": { lat: 1.2961631509838585, lng: 103.84984088054155 }, 
      "School of Computing & Information Systems 1": { lat: 1.2977150530105908, lng: 103.84942902287054 }, 
      "School of Economics/School of Computing & Information Systems 2": { lat: 1.2976677192242823, lng: 103.84897900703378 },
      "School of Social Sciences/College of Integrative Studies": { lat: 1.294767, lng: 103.8485 },
      "SMU Connexion": { lat: 1.295547, lng: 103.8493 },
      "Yong Pung How School of Law/Kwa Geok Choo Law Library": { lat: 1.295057, lng: 103.849 },
      "T-Junction": { lat: 1.296684, lng: 103.8504 },
      "Other": { lat: null, lng: null } // For custom locations
  })

  const thumbnailPreview = ref('');
  const handleThumbnailPhoto = (event) => {
    thumbnailPhoto.value = event.target.files[0];
    if (thumbnailPhoto.value) {
      thumbnailPreview.value = URL.createObjectURL(thumbnailPhoto.value);
    } else {
      thumbnailPreview.value = '';
    }
  };

  const selectedLocation = ref('');
  const place_lat = ref(null);
  const place_lng = ref(null);
  const eventName = ref('');
  const eventVenue = ref('');
  const eventStartDateTime = ref('');
  const eventEndDateTime = ref('');
  const eventDescription = ref('');
  const eventOrganisation = ref('');
  const eventSignUp = ref('');
  const eventPhotos = ref([]);
  const thumbnailPhoto = ref(null);
  const otherLocation = ref('');
  const eventType = ref('');

  watch(selectedLocation, (newLocation) => {
    const locationData = locations[newLocation];
    if (locationData) {
      place_lat.value = locationData.lat;
      place_lng.value = locationData.lng;
    } else {
      place_lat.value = null;
      place_lng.value = null;
    }
  });

  // const handlePhotos = (event) => {
  //   eventPhotos.value = Array.from(event.target.files);
  // };

  // const handleThumbnailPhoto = (event) => {
  //   thumbnailPhoto.value = event.target.files[0];
  // };

  const submitEvent = () => {
    const newEvent = {
      created_by: user.value.id, // Update this as needed
      name: eventName.value,
      venue: eventVenue.value,
      place_lat: place_lat.value,
      place_lng: place_lng.value,
      start_date_time: eventStartDateTime.value,
      end_date_time: eventEndDateTime.value,
      description: eventDescription.value,
      organisation: eventOrganisation.value,
      external_url: eventSignUp.value,
      photos: eventPhotos.value,
      location: selectedLocation.value === 'Other' ? otherLocation.value : selectedLocation.value,
      event_type: eventType.value,
    };

    console.log('New event created:', newEvent);
    alert('Event Created: ' + newEvent.name);

    // Clear form fields
    eventName.value = '';
    eventVenue.value = '';
    eventStartDateTime.value = '';
    eventEndDateTime.value = '';
    eventDescription.value = '';
    eventOrganisation.value = '';
    eventSignUp.value = '';
    eventPhotos.value = [];
    thumbnailPhoto.value = null;
    selectedLocation.value = '';
    otherLocation.value = '';

    addEvent(newEvent);
  };

</script>

<style scoped>
/* Styling for the navigation bar */
nav {
  background-color: darkblue;
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}
nav .navbar-brand {
  color: white;
  font-weight: bold;
}
nav a {
  color: white;
  text-decoration: none;
  padding: 0 1rem;
}

/* Adjusting top margin for the app container */
.container {
  margin-top: 10px;
}

.thumbnail-box,
.small-photo-box {
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
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

.thumbnail-box .plus-icon,
.small-photo-box .plus-icon {
  font-size: 2rem;
  color: #ccc;
}
.thumbnail-box:hover .plus-icon,
.small-photo-box:hover .plus-icon {
  color: #007bff;
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
</style>

<!-- testing  -->