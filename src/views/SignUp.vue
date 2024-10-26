<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabaseClient";
import router from "../router/index";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSignup = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: username.value
        },
        emailRedirectTo: "http://localhost:5173/SignIn"
      }
    });

    if (error) throw error;

    // You may want to store the username in your database
    // This can be done with a separate API call or by using the Supabase database
    const userId = data.user.id;
    console.log(userId);
    console.log(data);
    // console.log(data.user.identities.identity_data.email_verified);

    // const { error: insertError } = await supabase
    //   .from("profiles")
    //   .insert([{ id: userId, username: username.value, email: email.value }]);

    // if (insertError) throw insertError;

    router.push("/SignIn");
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 background-image">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Create Account</h2>
          <form @submit.prevent="handleSignup">
            <div class="mb-3">
              <label class="form-label" for="username">Username</label>
              <input
                class="form-control"
                id="username"
                type="text"
                placeholder="Username"
                v-model="username"
                required
              />
            </div>
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
                placeholder="*********"
                v-model="password"
                required
              />
            </div>
            <div class="mb-4">
              <label class="form-label" for="confirm-password">Confirm Password</label>
              <input
                class="form-control"
                id="confirm-password"
                type="password"
                placeholder="*********"
                v-model="confirmPassword"
                required
              />
            </div>
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-dark text-white"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
}
.background-image {
  background-image: url('../assets/images/community-service.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Full height to cover the screen */
}
</style>
