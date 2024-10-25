import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import profile from '@/views/profile.vue'
import edit_profile from '@/views/edit_profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: Dashboard
    },
    {
      path:'/profile',
      name:'profile',
      component: profile
    },
    {
      path:'/edit_profile',
      name:'edit_profile',
      component: edit_profile
    }
  ]
})

export default router
