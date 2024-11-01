<template> 
  <nav class="navbar navbar-expand-sm navbar-light"> 
    <div class="container-fluid"> 
       
      <!--image--> 
      <router-link class="navbar-brand" to="/"> 
        <img src="@/assets/images/CElogo1-1.png" alt="Logo" id="navbarLogo" style="width: 40px;"/> &nbsp  CampusEase 
      </router-link>  
 
   
        <!-- Collapsible button for Navbar--> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
          <span class="navbar-toggler-icon"></span> 
        </button> 

        <a v-if="user" class="btn account-icon order-lg-last order-md-last order-sm-last" data-bs-toggle="offcanvas" href="#sidebar"    role="button" aria-controls="offcanvasExample">
            <i class="fas fa-user"></i> 
        </a> 

        <router-link v-else to="/signin" class="order-lg-last order-md-last order-sm-last">
          <button class="btn bg-dark text-white" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">
            <span>Sign In</span>
          </button> 
        </router-link>
 
 
        <!-- Nav Links --> 
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav"> 
          <ul class="navbar-nav"> 
            <li class="nav-item"> 
              <router-link class="nav-link" to="/">HOME</router-link> 
            </li> 
            <li class="nav-item"> 
              <router-link class="nav-link" to="/dashboard">EVENTS</router-link> 
            </li> 
            <li class="nav-item"> 
              <router-link class="nav-link" to="/about">ABOUT</router-link> 
            </li> 
          </ul> 
        </div> 
      </div> 
  </nav> 
 
  <!-- SideBar Links --> 
  <div class="offcanvas offcanvas-end" tabindex="-1" id="sidebar" aria-labelledby="offcanvasRightLabel"> 
    <div class="offcanvas-header justify-content-center pb-0"> 
      <i class="fas fa-user" style="font-size: 24px;"></i> &nbsp 
      <h5 id="sidebar" style="margin: 0px;">Profile Settings</h5> 
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> 
    </div> 
    <hr> 
    <div class="offcanvas-body" style="position: relative;"> 
      <ul class="p-0"> 
        <li class="sidebar_link"><router-link to="/profile">Profile</router-link></li> 
        <li class="sidebar_link"><router-link to="/edit_profile">Edit Profile</router-link></li> 
        <li class="sidebar_link"><router-link to="/">Events Calendar</router-link></li> 
        <li class="sidebar_link"><router-link to="/eventCreation">Create New Event</router-link></li> 
        <li class="sidebar_link"><router-link to="/">Edit Events</router-link></li> 
      </ul> 
      <div @click=logout class="btn btn-outline-danger" style="width:217px"> <!-- position:absolute;bottom: 20px; --> 
        Log Out 
      </div> 
    </div> 
  </div> 
</template> 
 
<script setup> 
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../utils/supabaseClient';

  const user = ref(null);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data.user; // Update the reactive user variable
    console.log('User State', user.value);
  };

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null; // Update user state
  });

  onMounted(() => {
    fetchUser(); // Call the function when the component is mounted
  });

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error: ', error);
    }
    else {
      user.value = null;
      console.log('User logged out successfully')
      window.location.reload()
    }
  };

</script> 
 
<style scoped> 
  #navbarLogo { 
    height: 40px; 
    width: 40px; 
  } 
   
  .navbar { 
    background-color: #f8f9fa; 
    width: 100%; 
    justify-content: space-between; 
    align-items: center; 
  } 
 
  .navbar-toggler{ 
    margin-left: auto; 
    margin-right: 10px; 
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
    display: inline-flex; 
    align-items: center; 
    width: auto; 
  } 
   
  .container { 
    text-align: center; 
    margin-top: 50px; 
} 
 
  .nav-item { 
    padding-right: 20px; 
  } 
 
  .offcanvas{ 
    width: 250px; 
  } 
  .sidebar_link{ 
    list-style: none; 
    font-size: 18px; 
    padding-bottom: 10px; 
  } 
 
.account-icon { 
    font-size: 24px; 
    color: #333; 
    cursor: pointer; 
} 
 
</style>
