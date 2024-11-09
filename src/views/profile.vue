<template>
  <div class="d-flex flex-column align-items-center vh-100 position-relative background-wrapper">
    <!-- Header Section -->
    <div class="header-section w-100 text-center">
      <h2>Welcome to Your Profile</h2>
      <h5>Manage your events, notifications, and settings here</h5>
    </div>
    
    <!-- Profile Container -->
    <div class="card profile-container shadow-lg border-0">
      <div class="profile-header text-center text-white p-3 position-relative">
        <button @click="goBack" class="btn btn-light position-absolute top-0 start-0 mt-2 ms-3">
          Back
        </button>
        <div class="profile-picture mb-3" v-if="profileData && profileData.avatar_url">
          <img v-bind:src="profileData.avatar_url" alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
        </div>

        <div v-else>
          <label for="avatar-upload" class="avatar-upload-label">
            <input type="file" id="avatar-upload" @change="handleFileChange" class="d-none">
            <div class="avatar-upload-placeholder rounded-circle border border-white d-flex justify-content-center align-items-center" style="width: 165px; height: 170px;">
              <div class="plus-icon">+</div>
            </div>
          </label>
        </div>
        <h2 class="profile-name" v-if="profileData && profileData.username">{{ profileData.username }}</h2>
        <div class="d-inline-flex mt-2">
          <RouterLink class="nav-link" to="/edit_profile">
            <button class="btn btn-light me-2">Edit Profile</button>
          </RouterLink>
        </div>
      </div>

      <!-- Profile Options -->
      <div class="card-body p-0 d-flex flex-column">
        <div class="list-group list-group-flush flex-grow-1">
          <a href="#" @click="handleEventsCalendar" class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-calendar-alt me-3"></i> Events calendar</span>
          </a>

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
          <router-link to="/LikedEvents"class="list-group-item d-flex justify-content-between align-items-center">
            <span><i class="fas fa-heart me-3"></i> Liked Events</span>
          </router-link>
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

import { getProfile } from '../../utils/supabaseRequests';
import { supabase } from '../../utils/supabaseClient';

export default {
  name: 'ProfilePage',
  data() {
    return {
      events: [],
      campusEaseCalendarId: null,
      userEmail: null,
      user: null,
      profileData: null
    };
  },
  async mounted(){
    this.fetchUser().then(() => {
      if (this.user) {
        this.fetchProfile(this.user.id);
      }
    });
  },
  methods: {

    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        this.user = data.user; // Update the reactive user variable
        console.log('User Details:', this.user.id);
      }
    },
    async fetchProfile(user){
      try {
        const profile = await getProfile(user);
        console.log('Fetched Profile:', profile[0]);
        this.profileData = profile[0];
        console.log("Profile Data:", this.profileData);
        console.log("Avatar URL:", this.profileData.avatar_url);
      } catch (error){
        console.error('Error fetching profile data:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    initClient() {
      return gapi.client.init({
        apiKey: "AIzaSyAdMutgjV2OcfJgxr8ywiyj3Z1smkAiMRM",
        clientId: "689557435886-91ofkj6r70cg7k3dsphhe54cn3s51ftj.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      });
    },
    async handleEventsCalendar() {
      gapi.load('client:auth2', async () => {
        await this.initClient();
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signIn();

        this.userEmail = authInstance.currentUser.get().getBasicProfile().getEmail();

        const calendarExists = await this.checkCampusEaseCalendar();
        if (!calendarExists) {
          await this.createCampusEaseCalendar();
        }

        await this.insertOrUpdateEvents();
        window.open(`https://calendar.google.com/calendar/u/0/r?cid=${this.userEmail}`, "_blank");
      });
    },
    async checkCampusEaseCalendar() {
      try {
        const response = await gapi.client.calendar.calendarList.list();
        const calendars = response.result.items;
        const campusEaseCalendar = calendars.find(calendar => calendar.summary === 'CampusEase Events');
        if (campusEaseCalendar) {
          this.campusEaseCalendarId = campusEaseCalendar.id;
          return true;
        }
      } catch (error) {
        console.error("Error checking CampusEase Calendar:", error);
      }
      return false;
    },
    async createCampusEaseCalendar() {
      try {
        const response = await gapi.client.calendar.calendars.insert({
          resource: {
            summary: 'CampusEase Events',
            timeZone: 'Asia/Singapore'
          }
        });
        this.campusEaseCalendarId = response.result.id;
      } catch (error) {
        console.error("Error creating CampusEase Calendar:", error);
      }
    },
    async insertOrUpdateEvents() {
      const dummyEvents = [
        {
          summary: 'Tech Talk: AI in Business',
          description: 'Exploring AI applications in business with guest speakers',
          start: { dateTime: '2024-11-10T15:00:00', timeZone: 'Asia/Singapore' },
          end: { dateTime: '2024-11-10T17:00:00', timeZone: 'Asia/Singapore' }
        },
        {
          summary: 'Hackathon 2024',
          description: '24-hour coding event with exciting prizes',
          start: { dateTime: '2024-11-15T10:00:00', timeZone: 'Asia/Singapore' },
          end: { dateTime: '2024-11-15T11:00:00', timeZone: 'Asia/Singapore' }
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
          start: { dateTime: '2024-11-14T09:00:00', timeZone: 'Asia/Singapore' },
          end: { dateTime: '2024-11-14T12:00:00', timeZone: 'Asia/Singapore' }
        },


      ];

      for (const event of dummyEvents) {
        const existingEvent = await this.findEventByDescription(event.description);
        if (existingEvent) {
          await gapi.client.calendar.events.delete({
            calendarId: this.campusEaseCalendarId,
            eventId: existingEvent.id
          });
        }
        await gapi.client.calendar.events.insert({
          calendarId: this.campusEaseCalendarId,
          resource: event
        });
      }
    },
    async findEventByDescription(description) {
      try {
        const response = await gapi.client.calendar.events.list({
          calendarId: this.campusEaseCalendarId,
          q: description,
          timeMin: new Date().toISOString(),
          singleEvents: true
        });
        return response.result.items[0];
      } catch (error) {
        console.error("Error finding event by description:", error);
      }
      return null;
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
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black */
  color: white;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 5px;
}


.profile-container {
  width: 40vw;
  height: 70%;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  overflow: hidden;
}
</style>
