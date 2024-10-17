<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
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
  /* Optionally add height or padding to the header if needed */
}

main {
  padding: 20px; /* Optional padding for main content */
}
</style>
