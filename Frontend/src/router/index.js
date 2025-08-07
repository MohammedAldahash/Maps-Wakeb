import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MapView from '../views/MapView.vue'
import DashboardView from '../views/DashboardView.vue'
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
      component: MapView,
      meta: { requiresAuth: true } // <-- protected
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // <-- protected
    }
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' }); // redirect to login
  } else {
    next(); // proceed normally
  }
});

export default router
