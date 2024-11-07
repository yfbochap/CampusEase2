import './assets/main.css';

import { createApp, ref, provide } from 'vue';
import { createPinia } from 'pinia';
import { supabase } from '../utils/supabaseClient';
import piniaPersistedState from 'pinia-plugin-persistedstate';


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPersistedState);

app.use(pinia);
app.use(router);

app.mount('#app')
