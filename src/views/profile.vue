<template>
  <div class="d-flex flex-column vh-100">
    <!-- Profile Container -->
    <div class="card profile-container w-100 h-100 shadow-lg border-0">
      <!-- Profile Header -->
      <div class="profile-header text-center text-white p-3 position-relative">
        <button @click="goBack" class="btn btn-light position-absolute top-0 start-0 mt-2 ms-3">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <div class="profile-picture mb-3">
          <img src="" alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
        </div>
        <h2 class="profile-name">Name</h2>
        <div class="d-inline-flex mt-2">
          <RouterLink class="nav-link" to="/edit_profile">
            <button class="btn btn-light me-2">Edit Profile</button>
          </RouterLink>
          <button class="btn btn-light">Share Profile</button>
        </div>
        <button class="btn btn-light position-absolute top-0 end-0 mt-2 me-3">
          <i class="fas fa-cog"></i> Settings
        </button>
      </div>

      <!-- Profile Options -->
      <div class="card-body p-0 d-flex flex-column">
        <div class="list-group list-group-flush flex-grow-1">
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-heart me-3"></i> Favourites</span>
            <i class="fas fa-chevron-right"></i>
          </a>
          <!-- Calendar Fetch Button -->
          <a href="#" @click="fetchGoogleCalendar" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-calendar-alt me-3"></i> Events Calendar</span>
            <i class="fas fa-chevron-right"></i>
          </a>
          <!-- Show Fetched Calendar Events -->
          <div v-if="events.length > 0" class="p-3">
            <h4>Your Upcoming Events</h4>
            <ul>
              <li v-for="event in events" :key="event.id">{{ event.summary }} - {{ event.start.dateTime || event.start.date }}</li>
            </ul>
          </div>
          <hr class="my-0" />
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-bell me-3"></i> Notifications</span>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-history me-3"></i> Past Events</span>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center text-danger">
            <span><i class="fas fa-sign-out-alt me-3"></i> Logout</span>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gapi } from 'gapi-script';
export default {
  name: 'ProfilePage',
  data() {
    return {
      events: [] // To hold fetched events
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); 
    },
    // Initialize Google API Client
    initClient() {
      gapi.client.init({
        apiKey: 'AIzaSyAdMutgjV2OcfJgxr8ywiyj3Z1smkAiMRM',  
        clientId: '689557435886-91ofkj6r70cg7k3dsphhe54cn3s51ftj.apps.googleusercontent.com', 
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      }).then(() => {
        // Prompt the user to authenticate
        gapi.auth2.getAuthInstance().signIn().then(() => {
          this.listUpcomingEvents();
        });
      });
    },
    // Fetch the user's upcoming calendar events
    listUpcomingEvents() {
      gapi.client.calendar.events.list({
        calendarId: 'primary', // Primary calendar
        timeMin: (new Date()).toISOString(), // Get events starting from today
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }).then((response) => {
        const events = response.result.items;
        if (events.length > 0) {
          this.events = events; // Store the events in the component state
        } else {
          console.log('No upcoming events found.');
        }
      });
    },
    // Function to be called when the user clicks on "Events Calendar"
    fetchGoogleCalendar() {
      gapi.load('client:auth2', this.initClient);
    }
  }
};
</script>

<style scoped>
@import '../assets/profile.css';

.navbar-custom {
  background-color: black;
}
.navbar-brand {
  margin: 0 auto;
  font-size: 24px;
  color: white;
}
.nav-link {
  color: #FFEF12;
}
.logo {
  height: 40px;
  width: 40px;
}
</style>
  
  
  