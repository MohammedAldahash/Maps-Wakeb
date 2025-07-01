import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MapView from '../views/MapView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
  ],
})

export default router
