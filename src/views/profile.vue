<template>
  <div class="d-flex flex-column align-items-center vh-100 position-relative background-wrapper">
    <!-- Header Section -->
    <div class="header-section text-center">
      <h1>Welcome to Your Profile</h1> <br>
      <h5>Manage your events, notifications, and settings here</h5>
    </div>

    <!-- Profile Container -->
    <div class="card profile-container shadow-lg border-0">
      <!-- Profile Header -->
      <div class="profile-header text-center text-white p-4 position-relative">
        <button @click="goBack" class="btn btn-light position-absolute top-0 start-0 mt-3 ms-3">
          Back
        </button>
        <div class="profile-picture mb-3 mt-5">
          <img src="" alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
        </div>
        <h2 class="profile-name mt-3">Name</h2>
        <div class="d-inline-flex mt-3 mb-4">
          <RouterLink class="nav-link" to="/edit_profile">
            <button class="btn btn-light me-3">Edit Profile</button>
          </RouterLink>
          <button class="btn btn-light">Share Profile</button>
        </div>
      </div>

      <!-- Profile Options -->
      <div class="card-body p-0 d-flex flex-column">
        <div class="list-group list-group-flush flex-grow-1">
          <a href="#" @click="fetchGoogleCalendar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span><i class="fas fa-calendar-alt me-3"></i> Events calendar</span>
          </a>
          <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span><i class="fas fa-bell me-3"></i> Notifications</span>
          </a>
          <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span><i class="fas fa-history me-3"></i> Past Events</span>
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

          <div class="text-center mt-4">
            <RouterLink class="nav-link" to="/SignIn">
              <button class="btn btn-danger mt-3">Logout</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  margin-top: 50px;
  background-color: transparent;
  color: white;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.7);
  padding: 20px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.profile-container {
  width: 40vw; 
  height: 70%;
  margin-top: 0; 
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 15px;
  overflow: hidden;
}

.profile-header {
  padding: 20px;
}

.profile-name {
  margin-top: 15px;
}

.list-group-item {
  font-size: 1.1rem;
  padding: 15px;
}

.btn-danger {
  margin-top: 20px;
}
</style>
