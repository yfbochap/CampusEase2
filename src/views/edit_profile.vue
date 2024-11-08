<template>
  <div class="d-flex flex-column align-items-center vh-100 position-relative background-wrapper">
    <!-- Header Section -->
    <div class="header-section w-100 text-center">
      <h2>Welcome to Your Profile</h2>
      <h5>Edit your profile details here</h5>
    </div>
    
    <!-- Edit Information Container -->
    <div class="card profile-container shadow-lg border-0">
      <div class="profile-header text-center text-white p-3 position-relative">
        <button @click="goBack" class="btn btn-light position-absolute top-0 start-0 mt-2 ms-3">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <div class="profile-picture mb-3">
          <img src=" " alt="Profile Picture" class="rounded-circle border border-white" style="width: 165px; height: 170px;">
          <button class="btn btn-primary position-absolute bottom-0 end-0 rounded-circle p-1">
            <i class="fas fa-edit text-white"></i>
          </button>
        </div>
      </div>
      
      <!-- Edit Information Section -->
      <div class="card-body">
        <h3 class="card-title text-center">Your Information</h3>
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
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      mobile: "",
      email: "",
      password: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import '../assets/edit_profile.css';

.background-wrapper {
  background-image: url('@/assets/images/bg-6.png'); 
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
  height: auto;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  overflow: hidden;
}

.profile-header {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.form-label {
  font-weight: 500;
}
</style>
