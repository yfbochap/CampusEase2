<template>
  <div class="d-flex flex-column align-items-center vh-100 position-relative background-wrapper">
    <!-- Header Section -->
    <div class="header-section bg-black text-white py-3 w-100 mb-5 text-center">
    <div class="header-section py-3 w-100 text-center">
      <h1>Welcome to Your Profile</h1>
      <h5>Manage your events, notifications, and settings here</h5>
    </div>
    </div>
    <!-- Profile Container -->
    <div class="card profile-container shadow-lg border-0">
      <!-- Profile Header -->
      <div class="profile-header text-center text-white p-3 position-relative">
        <button @click="goBack" class="btn btn-light position-absolute top-0 start-0 mt-2 ms-3">
          Back
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
              <li v-for="event in events" :key="event.id">
                <strong>{{ event.summary }}</strong><br>
                Date: {{ formatDate(event.start.dateTime || event.start.date) }}<br>
                Day: {{ formatDay(event.start.dateTime || event.start.date) }}<br>
                Start Time: {{ formatTime(event.start.dateTime) }}<br>
                End Time: {{ formatTime(event.end.dateTime) }}
              </li>
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
const calendar_api = import.meta.env.VITE_CALENDAR_API;
const client_id = import.meta.env.VITE_CLIENT_ID;
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
        apiKey: "AIzaSyAdMutgjV2OcfJgxr8ywiyj3Z1smkAiMRM",
        clientId: '689557435886-91ofkj6r70cg7k3dsphhe54cn3s51ftj.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          this.fetchGoogleCalendar();
        });
      });
    },
    async createCampusEaseCalendar() {
  try {
    const response = await gapi.client.calendar.calendars.insert({
      resource: {
        summary: 'CampusEase Events',
        timeZone: 'Asia/Singapore'
      }
    });
    console.log('CampusEase Calendar Created:', response);
    this.campusEaseCalendarId = response.result.id;

    await this.insertEventsToCampusEase(); 
  } catch (error) {
    console.error('Error creating CampusEase Calendar:', error);
  }
},

async insertEventsToCampusEase() {
  const dummyEvents = [
    {
      summary: 'Tech Talk: AI in Business',
      description: 'Exploring AI applications in business with guest speakers',
      start: { dateTime: '2024-11-20T15:00:00', timeZone: 'Asia/Singapore' },
      end: { dateTime: '2024-11-20T17:00:00', timeZone: 'Asia/Singapore' }
    },
    {
      summary: 'Hackathon 2024',
      description: '24-hour coding event with exciting prizes',
      start: { dateTime: '2024-11-15T10:00:00', timeZone: 'Asia/Singapore' },
      end: { dateTime: '2024-11-15T10:00:00', timeZone: 'Asia/Singapore' }
    },
    {
      summary: 'Orientation Day',
      description: 'Welcome event for new students',
      start: { dateTime: '2024-11-12T09:00:00', timeZone: 'Asia/Singapore' },
      end: { dateTime: '2024-11-12T12:00:00', timeZone: 'Asia/Singapore' }
    },
    {
      summary: 'Career Talk',
      description: 'Network with potential employees',
      start: { dateTime: '2024-11-30T09:00:00', timeZone: 'Asia/Singapore' },
      end: { dateTime: '2024-11-30T12:00:00', timeZone: 'Asia/Singapore' }
    },
    {
      summary: 'Pitch It competition',
      description: 'Showcase the best design',
      start: { dateTime: '2024-11-09T09:00:00', timeZone: 'Asia/Singapore' },
      end: { dateTime: '2024-11-09T12:00:00', timeZone: 'Asia/Singapore' }
    }

  ];

  const insertPromises = dummyEvents.map(event => {
    return gapi.client.calendar.events.insert({
      calendarId: this.campusEaseCalendarId,
      resource: event
    }).then(response => {
      console.log('Dummy event added:', response);
    }).catch(error => {
      console.error('Error adding dummy event:', error);
    });
  });

  await Promise.all(insertPromises); 
},

fetchGoogleCalendar() {
  gapi.load('client:auth2', async () => {
    await this.initClient();

    if (!this.campusEaseCalendarId) {
      await this.createCampusEaseCalendar();
    }

    await this.listUpcomingEvents(this.campusEaseCalendarId);
    
    this.$router.push({ name: 'calendar', query: { events: JSON.stringify(this.events) } });
  });
},


  listUpcomingEvents(calendarId) {
    return gapi.client.calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
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
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString();
    },
    formatDay(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },
    formatTime(dateTime) {
      if (!dateTime) return 'N/A';
      const time = new Date(dateTime);
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
@import '../assets/profile.css';

.background-wrapper {
  background-image: url('@/assets/images/bg-8.png'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}

.header-section {
  background-color: transparent; /* Make the background transparent */
  color: black; /* Change text color to black */
  width: 100%;
}


.profile-container {
  width: 40vw; 
  height: 70%;
  margin-top: 0; 
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 15px;
  overflow: hidden;
}
</style>

