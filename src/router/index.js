import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/Discover.vue'
import DiscoverRecommend from '../views/discover/Recommend.vue'
import DiscoverTopList from '../views/discover/TopList.vue'
import DiscoverPlaylist from '../views/discover/PlayList.vue'
import DiscoverArtist from '../views/discover/Artist.vue'
import DiscoverAlbum from '../views/discover/Album.vue'
import MyArtistList from '../views/my/ArtistList.vue'
import MyPlayList from "../views/my/PlayList.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/My.vue'),
    children: [
      {
        path: '',
        name: 'ArtistList',
        alias: '/artist',
        component: MyArtistList
      }, {
        path: 'playlist',
        name: 'PlayList',
        component: MyPlayList
      }
    ]
  },
  {
    path: '/friend',
    name: 'Friend',
    component: () => import('../views/Friend.vue')
  }, {
    path: '/store',
    name: 'Store',
    component: {}
  }, {
    path: '/musician',
    name: 'Musician',
    component: {}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
