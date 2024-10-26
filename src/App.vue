<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import { onMounted, ref } from 'vue'
  import { supabase } from '../utils/supabaseClient'

  const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
      if (session.value) {
        console.log("User is signed in: ", session.value.user); // Access user info here
      }
      else{
        console.log("Anonymous User")
      }
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  });
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  
}

/* main {
  padding: 20px; 
} */
</style>
