<template>
    <div class="d-flex flex-column vh-100">
    <!-- Navbar -->
    <NavBar />
   
      <!-- Profile Container -->
      <div class="card profile-container w-100 h-100 shadow-lg border-0">
        <!-- Profile Header -->
        <div class="profile-header text-center text-white p-3 position-relative">
          <button class="btn btn-light position-absolute top-0 start-0 mt-2 ms-3">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <div class="profile-picture mb-3">
            <img src=" " alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
          </div>
          <h2 class="profile-name">Name</h2>
          <div class="d-inline-flex mt-2">
            <button class="btn btn-light me-2">Edit Profile</button>
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
            <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fas fa-calendar-alt me-3"></i> Calendar</span>
              <i class="fas fa-chevron-right"></i>
            </a>
            <hr class="my-0" />
            <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fas fa-language me-3"></i> Language</span>
              <i class="fas fa-chevron-right"></i>
            </a>
            <a href="#" class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fas fa-map-marker-alt me-3"></i> Location</span>
              <i class="fas fa-chevron-right"></i>
            </a>
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
  import NavBar from '@/components/Navbar.vue';
  export default {
  name: 'Profile Page',
  components: {
        NavBar
    },
  methods: {
    goBack() {
      // Logic for the "Back" button
      this.$router.go(-1); 
    },
    editProfile() {
      // Logic for editing the profile
      console.log("Edit profile");
    },
    shareProfile() {
      // Logic for sharing the profile
      console.log("Share profile");
    },
    openSettings() {
      // Logic for opening settings
      console.log("Open settings");
    }
  }
}
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
  
  
  