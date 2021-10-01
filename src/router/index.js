import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/Discover.vue'
import DiscoverRecommend from '../views/discover/Recommend.vue'
import DiscoverTopList from '../views/discover/TopList.vue'
import DiscoverPlaylist from '../views/discover/PlayList.vue'
import DiscoverArtist from '../views/discover/Artist.vue'
import DiscoverAlbum from '../views/discover/Album.vue'
import { ElMessage } from 'element-plus'


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
        component: DiscoverRecommend
      },
      {
        path: 'toplist',
        name: 'Toplist',
        component: DiscoverTopList
      },
      {
        path: 'playlist',
        name: 'Playlist',
        component: DiscoverPlaylist
      },
      {
        path: 'artist',
        name: 'Artist',
        component: DiscoverArtist
      },
      {
        path: 'album',
        name: 'Album',
        component: DiscoverAlbum
      },
    ]
  },
  {
    path: '/my',
    name: 'My',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/My.vue'),

  },
  {
    path: '/friend',
    name: 'Friend',
    meta: { requiresAuth: true },
    component: () => import('../views/Friend.vue')
  }, {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue')
  }, {
    path: '/musician',
    name: 'Musician',
    component: () => import('../views/Musician.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let profile = JSON.parse(sessionStorage.getItem('profile') || '{}')
    if (profile.userId) {
      next()
    } else {
      ElMessage.error('请先登录！')
    }
  } else {
    next()
  }
})

export default router
