import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/Discover.vue'
 import Recommend from  '../views/discover/Recommend.vue'
const routes = [
  {
    path: '/',
    name: 'Discover',
    alias: '/discover',
    component: Discover,
    children: [
      {
        path: '',
        name: 'Recommend',
        component : Recommend
      },
      {
        path: 'toplist',
        name: 'Toplist',
        component: {}
      },
      {
        path: 'playlist',
        name: 'Playlist',
        component: {}
      },

      {
        path: 'djradio',
        name: 'Djradio',
        component: {}
      },
      {
        path: 'artist',
        name: 'Artist',
        component: {}
      },
      {
        path: 'album',
        name: 'Album',
        component: {}
      },
    ]
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
    component: {}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
