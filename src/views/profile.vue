<template>
  <div class="d-flex flex-column align-items-center vh-100 position-relative background-wrapper">
    <!-- Header Section -->
    <div class="header-section bg-black text-white py-3 w-100 text-center">
      <h1>Welcome to Your Profile</h1>
      <p>Manage your events, notifications, and settings here</p>
    </div>
    
    <!-- Profile Container -->
    <div class="card profile-container shadow-lg border-0">
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
          <a href="#" @click="fetchGoogleCalendar" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-calendar-alt me-3"></i> Events calendar</span>
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
          </a>
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-history me-3"></i> Past Events</span>
          </a>
          <div class="text-center">
            <RouterLink class="nav-link" to="/SignIn">
              <button class="btn btn-danger">Logout</button>
            </RouterLink>
          </div>
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
      events: [],
      campusEaseCalendarId: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); 
    },
    initClient() {
      gapi.client.init({
        apiKey: 'AIzaSyAdMutgjV2OcfJgxr8ywiyj3Z1smkAiMRM',  
        clientId: '689557435886-91ofkj6r70cg7k3dsphhe54cn3s51ftj.apps.googleusercontent.com', 
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          this.fetchGoogleCalendar();
        });
      });
    },
    createCampusEaseCalendar() {
      gapi.client.calendar.calendars.insert({
        resource: {
          summary: 'CampusEase Events',
          timeZone: 'Asia/Singapore' 
        }
      }).then((response) => {
        console.log('CampusEase Calendar Created:', response);
        this.campusEaseCalendarId = response.result.id;
        this.listUpcomingEvents(this.campusEaseCalendarId);
      }).catch((error) => {
        console.error('Error creating CampusEase Calendar:', error);
      });
    },
    listUpcomingEvents(calendarId = 'primary') {
      gapi.client.calendar.events.list({
        calendarId: calendarId, 
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }).then((response) => {
        const events = response.result.items;
        if (events.length > 0) {
          this.events = events;
        } else {
          console.log('No upcoming events found.');
        }
      });
    },
    fetchGoogleCalendar() {
      gapi.load('client:auth2', () => {
        this.initClient();
        if (!this.campusEaseCalendarId) {
          this.createCampusEaseCalendar();
        } else {
          this.listUpcomingEvents(this.campusEaseCalendarId);
        }
      });
    }
  }
}
</script>

<style scoped>
@import '../assets/profile.css';

.background-wrapper {
  background-image: url('@/assets/images/bg-3.jpg'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}

.header-section {
  background-color: black;
  color: white;
  width: 100%;
}

.profile-container {
  width: 60vw; 
  height: 100%;
  margin-top: 0; 
  background-color: rgba(255, 255, 255, 0.9); 
  border-radius: 15px;
  overflow: hidden;
}
</style>
