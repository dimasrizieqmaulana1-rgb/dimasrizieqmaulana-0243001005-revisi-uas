import { createRouter, createWebHistory } from 'vue-router'

import Loginform from '../components/Loginform.vue'
import Regisform from '../components/Regisform.vue'
import Forgotpasswordform from '../components/Forgotpasswordform.vue'
import DashboardPage from '../components/DashboardPage.vue'

import { useAuthStore } from '../stores/auth'



const routes = [
  {
    path: '/',
    component: Loginform
  },
  {
    path: '/login',
    component: Loginform
  },
  {
    path: '/register',
    component: Regisform
  },
  {
    path: '/forgot-password',
    component: Forgotpasswordform
  },
  {
    path: '/dashboard',
    component: DashboardPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Belum login tidak boleh ke dashboard
  if (to.path === '/dashboard' && !authStore.isAuthenticated) {
    return '/'
  }

  // Sudah login tidak boleh kembali ke login
  if (to.path === '/' && authStore.isAuthenticated) {
    return '/dashboard'
  }

  return true
})

export default router