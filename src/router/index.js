import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/Discover.vue'

const routes = [
  {
    path: '/',
    name: 'Discover',
    component: Discover
  },
  {
    path: '/my',
    name: 'My',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/friend',
    name: 'Friend',
    component:{}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
