<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar2.vue';
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <Footer />
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
