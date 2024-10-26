<template>
  <div class="d-flex justify-content-center align-items-center vh-100 position-relative">
    <!-- Profile Container -->
    <div class="card profile-container shadow-lg border-0 position-relative">
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
          <a href="#" class="list-group-item d-flex justify-content-between align-items-center text-danger">
            <span><i class="fas fa-sign-out-alt me-3"></i> Logout</span>
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
      events: [], // To hold fetched events
      campusEaseCalendarId: null // Store the exclusive CampusEase calendar ID
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
          this.fetchGoogleCalendar();
        });
      });
    },
    // Create an exclusive CampusEase calendar if not already created
    createCampusEaseCalendar() {
      gapi.client.calendar.calendars.insert({
        resource: {
          summary: 'CampusEase Events',
          timeZone: 'Asia/Singapore' 
        }
      }).then((response) => {
        console.log('CampusEase Calendar Created:', response);
        // Save the newly created calendar ID to use later for listing events
        this.campusEaseCalendarId = response.result.id;
        // Fetch events for the new calendar if any are added
        this.listUpcomingEvents(this.campusEaseCalendarId);
      }).catch((error) => {
        console.error('Error creating CampusEase Calendar:', error);
      });
    },
    // Fetch the user's upcoming events from the CampusEase calendar
    listUpcomingEvents(calendarId = 'primary') {
      gapi.client.calendar.events.list({
        calendarId: calendarId, 
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
      gapi.load('client:auth2', () => {
        this.initClient();
        if (!this.campusEaseCalendarId) {
          this.createCampusEaseCalendar(); // Create exclusive calendar if it doesn't exist
        } else {
          // If the calendar exists, list events from it
          this.listUpcomingEvents(this.campusEaseCalendarId);
        }
      }
      )
    }
  }
}

//     // Insert a dummy event for testing purposes
//     addDummyEvent() {
//       if (!this.campusEaseCalendarId) {
//         alert('CampusEase Calendar has not been created yet.');
//         return;
//       }
      
//       const event = {
//         summary: 'CampusEase Test Event',
//         location: 'SMU Campus',
//         description: 'This is a test event for CampusEase.',
//         start: {
//           dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour from now
//           timeZone: 'Asia/Singapore'
//         },
//         end: {
//           dateTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
//           timeZone: 'Asia/Singapore'
//         }
//       };

//       gapi.client.calendar.events.insert({
//         calendarId: this.campusEaseCalendarId,
//         resource: event
//       }).then((response) => {
//         console.log('Dummy event created:', response);
//         alert('Dummy event added to CampusEase calendar!');
//         // Optionally refresh the events list to show the newly added event
//         this.listUpcomingEvents(this.campusEaseCalendarId);
//       }).catch((error) => {
//         console.error('Error creating dummy event:', error);
//       });
//     }
//   },
//   mounted() {
//     this.campusEaseCalendarId = localStorage.getItem('campusEaseCalendarId') || null;
//   }
  
// };


</script>

<style scoped>
@import '../assets/profile.css';

.profile-container {
  width: 60vw; 
  height: 100vh;
  margin: auto; 
}

.d-flex.justify-content-center.align-items-center {
  position: relative;
  z-index: 1;
  /* background: rgba(0, 0, 0, 0.5);  */
  border-radius: 15px;
}
</style>
