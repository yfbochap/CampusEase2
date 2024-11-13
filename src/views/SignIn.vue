<script setup>
import { ref, inject } from "vue";
import { supabase } from "../../utils/supabaseClient";
import router from "../router/index";

const email = ref("");
const password = ref("");

// Validate email domain before signing in
const isEmailValid = (email) => {
  const emailDomain = "smu.edu.sg";
  return email.endsWith(emailDomain);
};

const handleSignIn = async () => {
  try {

    // Check if the email ends with "smu.edu.sg"
    if (!isEmailValid(email.value)) {
      throw new Error("Email must end with @smu.edu.sg");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    const { user } = data;
    // console.log(data)

    if (!user?.email_confirmed_at) {
      throw new Error("Please verify your email before signing in.");
    }

    // Redirect to home or dashboard after successful sign-in
    router.push("/home");
  } catch (error) {
    alert(error.error_description || error.message);
  }
};

const handleGoogleSignIn = async () => {
  try {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'profile email',
        redirectTo: 'https://campus-ease2.vercel.app', // Change this to your redirect URL
      }
    });
    if (error) throw error;

        // // Extract the user's email after successful sign-in
        // const userEmail = data.user.email;

        // // Validate the email domain
        // const isEmailValid = (email) => {
        //   const emailDomain = "smu.edu.sg";
        //   return email.endsWith(emailDomain);
        // };

        // // If the email is invalid, show an error message
        // if (!isEmailValid(userEmail)) {
        //   throw new Error("Email must end with @smu.edu.sg");
        // }

  } catch (error) {
    alert(error.message);
  }
};

</script>

<template>
<div class="video-background">
    <!-- Video Background -->
    <video autoplay loop muted playsinline class="background-video">
      <source src="@/assets/images/bg-video13.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  <div class="d-flex align-items-center justify-content-center min-vh-100 background-image">
    <div class="w-full max-w-md p-4 bg-white shadow rounded">
      <h2 class="text-center text-black mb-4">Sign In</h2>
      <form @submit.prevent="handleSignIn">
        <div class="mb-3">
          <label class="form-label text-black" for="email">Email</label>
          <input
            class="form-control"
            id="email"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label text-black" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-dark text-white w-100"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <div class="mt-3 text-center text-black">
        <p>
          Don't have an account? 
          <router-link to="/SignUp" class="text-primary">Sign Up</router-link>
        </p>
      </div>

      <div class="separator mt-4">
        <span>Or continue to</span>
      </div>

      <!-- Google Sign-In Button -->
      <div class="mt-3 text-center">
        <button
          class="btn btn-outline-primary w-100"
          @click="handleGoogleSignIn"
        >
        <i class="fab fa-google"></i>
          Sign In with Google
        </button>
      </div>

    </div>
  </div>
</div>



</template>

<style scoped>
.video-background {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place behind other content */
}

.bg-light {
  background-color: #f8f9fa !important;
}
.background-image {
  background-image: url('../assets/images/campus-background.png');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Full height to cover the screen */
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #6c757d; /* Optional: color for the 'or' text */
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #d3d3d3; /* Color for the line */
}

.separator:not(:empty)::before {
  margin-right: 0.75em;
}

.separator:not(:empty)::after {
  margin-left: 0.75em;
}


</style>
