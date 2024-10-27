<script setup>
    import { ref } from 'vue';
    // import { addEvent } from '../../utils/supabaseRequests.js'
    import { supabase } from '../../utils/supabaseClient.js';
    import { getEvents } from '../../utils/supabaseRequests.js';

    const handleGetEvents = async () => {
      const events = await getEvents();
      console.log(events);
    }
    
    // Example placeholder function for handling "Get Started" button click
    const handleGetStarted = () => {
      // Navigate to the LoginPage
      window.location.href = 'LoginPage.html';
    };

</script>

<template>
  <main>
      <div class="container">
        <div class="logo-placeholder">
          <img src="@/assets/images/CElogo1.1.png" alt="CampusEase Logo" />
        </div>

        <div class="tagline">
          <img src="@/assets/images/Tagline1.png" alt="Tagline" />
        </div>

        <button class="get-started-btn" @click="goToLogin">Get Started</button>

        <button v-on:click="handleGetEvents">
        RAHHH
      </button>
      </div>
  </main>
</template>

<style scoped>
/* body {

} */
main{
  background-image: url("@/assets/images/bg-1.jpeg"); /* Adjusted path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.container {
  text-align: center;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
}

.translucent-background {
  background-color: rgba(255, 255, 255, 0.250);
  padding: 30px;
  border-radius: 40px;
  display: inline-block;
}

.logo-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 50px;
}

.logo-placeholder img {
  width: 30%;
  height: 30%;
  transition: all 0.3s ease;
}

.tagline {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.tagline img {
  width: 55%;
  height: 55%;
  transition: all 0.3s ease;
}

.get-started-btn {
  padding: 15px 25px;
  font-size: 20px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 4px solid rgb(71, 206, 255);
  border-radius: 5px;
  margin: 50px;
  cursor: pointer;
  font-weight: bolder;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.get-started-btn:hover {
  background-color: rgb(71, 206, 255);
  color: white;
}

.get-started-btn:active {
  background-color: rgb(50, 170, 210);
  border-color: rgb(50, 170, 210);
  color: #fff;
}

/* Media queries for responsive design */
@media (max-width: 1200px) {
  .logo-placeholder img {
    width: 30%;
    height: 30%;
  }

  .tagline img {
    width: 55%;
    height: 55%;
  }
}

@media (max-width: 992px) {
  .logo-placeholder img {
    width: 35%;
    height: 35%;
  }

  .tagline img {
    width: 70%;
    height: 70%;
  }
}

@media (max-width: 768px) {
  .logo-placeholder img {
    width: 40%;
    height: 40%;
  }

  .tagline img {
    width: 70%;
    height: 70%;
  }
}

@media (max-width: 576px) {
  .logo-placeholder img {
    width: 35%;
    height: 35%;
  }

  .tagline img {
    width: 65%;
    height: 65%;
  }

  .get-started-btn {
    margin: 30px;
    padding: 12px 20px;
    font-size: 18px;
  }
}
</style>