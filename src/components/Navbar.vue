<!-- <script setup>
    import { SignedIn, SignedOut, SignOutButton } from 'vue-clerk'
</script> -->

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <!-- Logo and Brand Name -->
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/CElogo1.1.png" alt="Logo" id="navbarLogo"/> &nbsp;CampusEase
      </router-link> 

      <!-- Collapsable button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Profile Icon -->
      <router-link class="account-icon order-lg-last" to="/profile">
        <i class="fas fa-user"></i>
      </router-link>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">HOME</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">ABOUT</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">EVENTS</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style setup>
  /* Navbar Fixed Styling */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f8f9fa;
    z-index: 1000; /* Ensures navbar is above other content */
    justify-content: space-between;
    align-items: center;
    display: flex;
    transition: background-color 0.3s ease;
    border-bottom: none;
    box-shadow: none;
  }

  /* Logo Styling */
  #navbarLogo {
    height: 40px;
    width: 40px;
  }

  /* Toggler Button Styling */
  .navbar-toggler {
    margin-left: auto;
    margin-right: 10px;
  }

  /* Navbar Links Styling */
  .navbar-nav .nav-link {
    color: #333;
    transition: background-color 0.3s ease;
  }

  .navbar-nav .nav-link:hover {
    background-color: #e2e6ea;
    border-radius: 5px;
  }

  .navbar-brand {
    display: inline-flex;
    align-items: center;
    width: auto;
  }

  /* Account Icon Styling */
  .account-icon {
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }

  /* Spacing Adjustment for Fixed Navbar */
  body {
    padding-top: 70px; /* Adjust based on navbar height */
  }
</style>
