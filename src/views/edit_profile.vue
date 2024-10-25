<template>
    <div>
      
      <!-- Header Section -->
      <div class="container-fluid text-white p-2" style="background-color:#353EC5;">
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-light btn-sm"><i class="fas fa-arrow-left"></i> Back</button>
          <h2 class="mb-0" style="margin: auto;">Edit Profile</h2>
        </div>
      </div>
  
      <!-- Profile Picture Section -->
      <div class="text-center mt-4">
        <div class="position-relative d-inline-block">
          <img src=" " alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
          <button class="btn btn-primary position-absolute bottom-0 end-0 rounded-circle p-1">
            <i class="fas fa-plus text-white"></i>
          </button>
        </div>
      </div>
  
      <!-- Edit Information Section -->
      <div class="container mt-4">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="card-title">Your Information</h3>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
              <div class="mb-3">
                <label for="mobile" class="form-label">Mobile</label>
                <input type="text" class="form-control" id="mobile" v-model="mobile">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" v-model="email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/Navbar.vue';

  export default {
    data() {
      return {
        name: "",
        surname: "",
        mobile: "",
        email: "",
        password: "",
      };
    },
  };
  </script>
  
  <style scoped>
  @import '../assets/edit_profile.css';
  </style>
  