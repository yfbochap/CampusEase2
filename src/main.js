import './assets/main.css';

import { createApp, ref } from 'vue';
import { createPinia } from 'pinia';
import { supabase } from '../utils/supabaseClient';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const user = ref(null);

supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null; // Update user on sign-in/sign-out
});

app.mount('#app')
