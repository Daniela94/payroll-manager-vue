import { createRouter, createWebHistory } from 'vue-router'
import Payrolls from "../views/Payrolls.vue";

const routes = [
  {
    path: '/',
    name: 'Payrolls',
    component: Payrolls
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
