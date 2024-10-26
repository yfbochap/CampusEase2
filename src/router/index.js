import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
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
    },
    {
      path:'/SignIn',
      name:'SignIn',
      component: SignIn
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component: SignUp
    },
    {
      path:'/event',
      name:'event',
      component: () => import('../views/Events.vue')
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating
    return { top: 0 };
  }
})

export default router
