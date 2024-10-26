<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabaseClient";
import router from "../router/index";

const email = ref("");
const password = ref("");

const handleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    const { user } = data;
    console.log(data)

    if (!user?.email_confirmed_at) {
      throw new Error("Please verify your email before signing in.");
    }

    // Redirect to home or dashboard after successful sign-in
    router.push("/home");
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 background-image">
    <div class="w-full max-w-md p-4 bg-white shadow rounded">
      <h2 class="text-center mb-4">Sign In</h2>
      <form @submit.prevent="handleSignIn">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
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
          <label class="form-label" for="password">Password</label>
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
            class="btn btn-dark text-white"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div class="mt-3 text-center">
        <p>
          Don't have an account? 
          <router-link to="/SignUp" class="text-primary">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}
.background-image {
  background-image: url('../assets/images/campus-background.png');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Full height to cover the screen */
}
</style>
