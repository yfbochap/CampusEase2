<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabaseClient";
import router from "../router/index";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isEmailValid = (email) => {
  const emailDomain = "smu.edu.sg";
  return email.endsWith(emailDomain);
};

const handleSignup = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match.");
      return;
    }

    if (!isEmailValid(email.value)) {
      throw new Error("Email must end with @smu.edu.sg");
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
<div class="video-background">
  <!-- Video Background -->
  <video autoplay loop muted playsinline class="background-video">
    <source src="@/assets/images/bg-video11.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div class="d-flex align-items-center justify-content-center min-vh-100 background-image">
    <div class="col-md-6">
      <div class="card ">
        <div class="card-body ">
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
                class="btn submit"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div class="d-flex justify-content-center mt-3">
              <button
                class="btn back"
                @click="router.push('/SignIn')"
              >
                Back to Sign In
              </button>
            </div>
        </div>
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

.overlay {
  position: relative;
  z-index: 1; /* Ensure it sits above the video */
}

.card {
  border-radius: 1rem;
  background-color: #333435;
  color: white;
}
input[type="text"],input[type="email"],input[type="password"]{
  background-color: #545454;
  color: #fafefb;
  border-color: #777676;
}
.submit{
  background-color: rgba(187, 182, 182, 0.9);
  width: 20%

}
.back{
  background-color: rgba(187, 182, 182, 0.9);
  width: 20%;
}
.submit, .back{
  transition: background-color 0.3s ease, color 0.3s ease;
}

.submit:hover, .back:hover{
  background-color: rgba(239, 238, 238, 0.9);
  color: rgb(39, 39, 39);
}

</style>
