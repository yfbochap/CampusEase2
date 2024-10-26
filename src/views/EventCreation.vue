<template>
    <!-- Navigation Bar -->
    <nav class="d-flex align-items-center">
      <!-- Placeholder for logo and brand name -->
      <img src="./photo_2024-10-16 13.47.32.jpeg" alt="Logo" style="width: 40px; height: 40px; margin-right: 10px;">
      <a href="#" class="navbar-brand" id="brandname">CampusEase</a>
      <!-- Placeholder links -->
      <div class="ms-auto">
        <a href="#" class="links">Home</a>
        <a href="#" class="links">Events</a>
        <a href="#" class="links">About</a>
        <a href="#" class="links">Contact</a>
      </div>
    </nav>
  
    <!-- Vue app -->
    <div id="app" class="container">
      <h2>Create Event</h2>
      <form @submit.prevent="submitEvent" class="mt-4 d-flex">
        <!-- Left Column: Thumbnail and Additional Photos -->
        <div class="left-column">
          <!-- Thumbnail Photo (Mandatory) -->
          <label for="thumbnailPhoto" class="form-label">Thumbnail Photo (Mandatory)</label>
          <div class="thumbnail-box" style="border-radius: 10px;">
            <input type="file" id="thumbnailPhoto" @change="handleThumbnailPhoto" accept="image/*" required>
            <div class="plus-icon">+</div>
          </div>
  
          <!-- Additional Photos (Optional) -->
          <label for="eventPhotos" class="form-label">Additional Photos (Optional)</label>
          <div class="small-photo-wrapper">
            <div class="small-photo-box" style="border-radius: 7px;">
              <input type="file" class="form-control" id="eventPhotos1" @change="handlePhotos" accept="image/*">
              <div class="plus-icon">+</div>
            </div>
            <div class="small-photo-box" style="border-radius: 7px;">
              <input type="file" class="form-control" id="eventPhotos2" @change="handlePhotos" accept="image/*">
              <div class="plus-icon">+</div>
            </div>
            <div class="small-photo-box" style="border-radius: 7px;">
              <input type="file" class="form-control" id="eventPhotos3" @change="handlePhotos" accept="image/*">
              <div class="plus-icon">+</div>
            </div>
          </div>
        </div>
  
        <!-- Right Column: Event Fields -->
        <div class="right-column ms-4">
          <!-- Event Name -->
          <div class="mb-3">
            <label for="eventName" class="form-label">Event Name</label>
            <input type="text" class="form-control" id="eventName" v-model="eventName" required>
          </div>
  
          <!-- Venue -->
          <div class="mb-3">
            <label for="eventVenue" class="form-label">Venue</label>
            <input type="text" class="form-control" id="eventVenue" v-model="eventVenue" required>
          </div>
  
          <!-- Date/Time -->
          <div class="mb-3">
            <label for="eventDateTime" class="form-label">Date/Time</label>
            <input type="datetime-local" class="form-control" id="eventDateTime" v-model="eventDateTime" required>
          </div>
  
          <!-- Description -->
          <div class="mb-3">
            <label for="eventDescription" class="form-label">Description</label>
            <textarea class="form-control" id="eventDescription" rows="3" v-model="eventDescription" required></textarea>
          </div>
  
          <!-- Organisation (Optional) -->
          <div class="mb-3">
            <label for="eventOrganisation" class="form-label">Organisation (Optional)</label>
            <input type="text" class="form-control" id="eventOrganisation" v-model="eventOrganisation">
          </div>
  
          <!-- Sign up (Optional) -->
          <div class="mb-3">
            <label for="eventSignUp" class="form-label">Sign-up Link (Optional)</label>
            <input type="url" class="form-control" id="eventSignUp" v-model="eventSignUp" placeholder="https://example.com/sign-up">
          </div>
          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Create Event</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        eventName: '',
        eventVenue: '',
        eventDateTime: '',
        eventDescription: '',
        eventOrganisation: '',
        eventSignUp: '',
        eventPhotos: [],
        thumbnailPhoto: null,
      };
    },
    methods: {
      handlePhotos(event) {
        this.eventPhotos = Array.from(event.target.files);
      },
      handleThumbnailPhoto(event) {
        this.thumbnailPhoto = event.target.files[0];
      },
      submitEvent() {
        const newEvent = {
          name: this.eventName,
          venue: this.eventVenue,
          dateTime: this.eventDateTime,
          description: this.eventDescription,
          organisation: this.eventOrganisation,
          signUpLink: this.eventSignUp,
          photos: this.eventPhotos,
          thumbnailPhoto: this.thumbnailPhoto,
        };
        console.log('New event created:', newEvent);
        alert('Event Created: ' + newEvent.name);
  
        // Clear form fields
        this.eventName = '';
        this.eventVenue = '';
        this.eventDateTime = '';
        this.eventDescription = '';
        this.eventOrganisation = '';
        this.eventSignUp = '';
        this.eventPhotos = [];
        this.thumbnailPhoto = null;
        document.getElementById('thumbnailPhoto').value = '';
        document.getElementById('eventPhotos1').value = '';
        document.getElementById('eventPhotos2').value = '';
        document.getElementById('eventPhotos3').value = '';
      },
    },
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
  #app {
    margin-top: 80px;
  }
  
  /* Styling for the thumbnail and additional photos */
  .thumbnail-box,
  .small-photo-box {
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
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
  
  .thumbnail-box .plus-icon,
  .small-photo-box .plus-icon {
    font-size: 2rem;
    color: #ccc;
  }
  
  .thumbnail-box:hover .plus-icon,
  .small-photo-box:hover .plus-icon {
    color: #007bff;
  }
  
  /* Adjusting the column layout */
  .left-column {
    width: 33.33%;
  }
  
  .right-column {
    width: 66.66%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .small-photo-wrapper {
    display: flex;
    gap: 60px;
  }
  
  .small-photo-box {
    width: 100px;
    height: 100px;
  }
  
  button[type="submit"] {
    align-self: flex-end;
    margin-top: auto;
    background-color: #656464;
    border-color: #ccc;
  }
  
  #brandname {
    font-size: 24px;
  }
  
  .links {
    color: rgb(249, 234, 27);
  }
  </style>
  