import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: import('@/views/Dashboard.vue') // do not lazy load
    },
    {
      path:'/profile',
      name:'profile',
      component: () => import('@/views/profile.vue')
    },
    {
      path:'/edit_profile',
      name:'edit_profile',
      component: ()=>import('@/views/edit_profile.vue') 
    },
    {
      path:'/SignIn',
      name:'SignIn',
      component: ()=>import('@/views/SignIn.vue')
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path:'/event',
      name:'event',
      component: () => import('../views/Events.vue')
    },
    {
      path:'/eventCreation',
      name:'eventCreation',
      component: () => import('../views/EventCreation.vue')
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/calendar.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating
    return { top: 0 };
  }
})

export default router
