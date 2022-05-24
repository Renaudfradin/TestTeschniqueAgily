import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Info from '../views/Info.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/info/:city',
      name: 'info',
      component: Info
    }
  ]
})

export default router
