import './assets/main.css';

import { createApp, ref, provide } from 'vue';
import { createPinia } from 'pinia';
import { supabase } from '../utils/supabaseClient';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
