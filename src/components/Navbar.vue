<!-- <script setup>
    import { SignedIn, SignedOut, SignOutButton } from 'vue-clerk'
</script> -->

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      
      <!--image-->
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/CE-LogoTransNW.png" alt="Logo" id="navbarLogo"/> &nbspCampusEase
      </router-link> 
      <!-- Not sure how to fix this it seems like the router-link tag takes up all the space in the nav when image is used -->

      <!-- Collapsable button -->
      <button class="navbar-toggler col-lg-1" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">HOME</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">ABOUT</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">EVENTS</RouterLink>
          </li>
          <li class="nav-item">
            <a href="LoginPage.html" class="account-icon">
              <i class="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* Add your styles here or use Bootstrap classes */
#navbarLogo{
  height: 5%;
  width: 5%;
}
.navbar {
          background-color: #f8f9fa;
          padding: 0px;
          width: 100%;
          justify-content: space-between;
          align-items: center;
      }

  .navbar-nav .nav-link {
      color: #333;
      transition: background-color 0.3s ease;
  }

  .navbar-nav .nav-link:hover {
      background-color: #e2e6ea;
      border-radius: 5px;
  }

  .navbar-brand {
      display: flex;
      align-items: center;
  }

  /* .navbar-brand img {
      height: 50px;
  } */

  .nav-item {
      padding-right: 20px;
  }

  .container {
      text-align: center;
      margin-top: 50px;
  }

  .logo-placeholder {
      height: 50px; /* Adjust as needed */
      background-color: #e0e0e0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 200px;
      margin-bottom: 150px;
      margin-left: auto;
      margin-right: auto;
      width: 50px; /* Adjust as needed */
  }

  .logo-placeholder img {
      max-width: 300px; /* Adjust logo size as needed */
      max-height: 300px; /* Adjust logo size as needed */
  }

  .tagline-top {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-style: oblique;
      font-size: 60px;
  }

  .tagline-bottom {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 40px;
      margin-bottom: 50px;
  }

  .get-started-btn {
      padding: 15px 25px;
      font-size: 20px;
      background-color: #14406c;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 50px;
      cursor: pointer;
  }

  .account-icon {
      font-size: 24px;
      color: #333;
      cursor: pointer;
  }

  
  </style>
  