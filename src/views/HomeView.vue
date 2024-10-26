<script setup>
    import { ref } from 'vue';
    // import { addEvent } from '../../utils/supabaseRequests.js'
    // import { supabaseClient } from '../../utils/supabaseClient.js';

    const successMessage = ref('');
    const errorMessage = ref('');

    // const { isSignedIn, userId, getToken } = useAuth();

    // const handleAddEvent = async () => {
    //   console.log('Is Signed In:', isSignedIn.value); // This should be true
    //   console.log('User ID:', userId.value); // This should show the user ID
    //   // const token = await getToken.value();
    //   // console.log('User', token);
    //   // console.log(user)

    //   if (isSignedIn.value) {
    //     try {
    //       // Call the getToken function properly
    //       const token = await getToken.value(); // Await the token retrieval
    //       console.log('Token:', token);

    //       supabaseClient.auth.setAuth(token);
    //       const event = await addEvent({ userId: userId.value, token });
    //       successMessage.value = "Event added successfully!";
    //       console.log("Added event:", event);
    //     } catch (error) {
    //       errorMessage.value = "Error adding event: " + error.message;
    //       console.error("Error adding event:", error);
    //     }
    //   } else {
    //     errorMessage.value = "User not authenticated.";
    //   }
    // }

</script>

<template>
  <main>
    Welcome to CampusEase
    <SignedIn>
      <button v-on:click="handleAddEvent">
        RAHHH
      </button>
    </SignedIn>
  </main>
</template>
