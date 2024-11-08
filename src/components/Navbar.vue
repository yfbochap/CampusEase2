<template> 
  
  <nav class="navbar navbar-expand-sm navbar-light">
  <div class="container-fluid">
    <!-- Logo and Brand -->
    <router-link class="navbar-brand" to="/">
      <img src="@/assets/images/CElogo1-1.png" alt="Logo" id="navbarLogo" style="width: 40px;" /> &nbsp CampusEase
    </router-link>

    <!-- Navbar Toggle Button -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Account Icon or Sign In Button -->
    <a v-if="user" class="btn account-icon order-lg-last order-md-last order-sm-last" data-bs-toggle="offcanvas" href="#sidebar" role="button" aria-controls="offcanvasExample">
      <i class="fas fa-user"></i>
    </a>
    <router-link v-else to="/signin" class="order-lg-last order-md-last order-sm-last">
      <button class="btn bg-dark text-white" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">
        <span>Sign In</span>
      </button>
    </router-link>

    <!-- Collapsible Nav Links -->
    <div :class="['collapse', 'navbar-collapse', { show: menuOpen }]" id="navbarNav">
      <ul class="navbar-nav ms-auto">
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
        <li class="sidebar_link"><router-link to="/your_events">Edit Your Events</router-link></li> 
      </ul> 
      <div @click=logout class="btn" id="logout" style="width:217px"> <!-- position:absolute;bottom: 20px; --> 
        Log Out 
      </div> 
    </div> 
  </div> 
</template> 
 
<script setup> 
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../utils/supabaseClient';
  import { useUserStore } from '@/stores/counter';

  

  const user = ref(null);
  const userStorage = useUserStore()

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
      userStorage.setAuthToken(null)
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
  background-color: white;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: fixed !important;
  top: 0 !important;
  z-index: 9000;
}

.navbar-toggler {
  margin-left: auto;
  margin-right: 10px;
  display: none;
}

.navbar-nav .nav-link {
  color: rgb(56, 53, 53);
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


/* Responsive styling for smaller screens */
@media (max-width: 768px) {
  .navbar-toggler {
    display: inline; /* Show toggle button on small screens */
  }
  .navbar-collapse {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 10px;
    border-top: 1px solid #e2e6ea;
    overflow: hidden; /* Prevent content overflow */
  }

  .navbar-collapse.show {
    display: block !important; /* Show menu when toggled */
  }

  .navbar-nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-item {
    padding: 10px 0;
  }
}
/* Additional styling for the 576px to 768px range */
@media (max-width: 768px) and (min-width: 576px) {
  .navbar-collapse {
    display: none; /* Hidden until .show is added */
  }

  .navbar-collapse.show {
    display: flex; /* Ensure navbar appears when .show is active */
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-nav {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-item {
    width: 100%;
  }

  .navbar-nav .nav-link {
    padding: 10px;
    width: 100%;
    text-align: left;
  }
}
 
  .offcanvas{ 
    width: 250px; 
  } 
  #sidebar{
    background-color: #434242;
    
  }
  .sidebar_link{ 
    list-style: none; 
    font-size: 18px; 
    padding-bottom: 10px;
  } 

  .sidebar_link a {
  color: #c4c0c0;
  text-decoration: none;
  
  }

  .sidebar_link a:hover {
    color: #007bff;
    background-color: transparent;
  }

 
  .account-icon { 
      font-size: 24px; 
      color: rgb(56, 53, 53); 
      cursor: pointer; 
  } 
  #logout{
    background-color: #c4c0c0 ;

  }
  #logout:hover {
  background-color: rgb(183, 42, 42); /* Background color on hover */
  color: white; /* Text color on hover */
}

 
</style>
