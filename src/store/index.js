import { createStore } from 'vuex'

export default createStore({
  state: {
    loginStatus: sessionStorage.getItem('profile') != null,//用户登录状态
    loginDialogIsShow: false,//登录对话框显示状态
    playSongIndex: localStorage.getItem('playSongIndex') || 0,//当前播放歌曲在播放列表中的索引
    playSongList: JSON.parse(localStorage.getItem('playSongList') || '[]')//播放列表
  },
  mutations: {
    changeLoginStatus: (state, { type }) => {
      state.loginStatus = type
      if (!type) {
        sessionStorage.setItem('profile', '')
        sessionStorage.setItem('cookie', '')
      }
    },
    changeLoginDialog: (state, { type }) => {
      state.loginDialogIsShow = type
    },

    changePlaySong: (state, payload) => {
      localStorage.setItem('playSongIndex', payload.index)
      state.playSongIndex = payload.index
    },
    changePlaySongList: (state, payload) => {
      let changedList
      if (Array.isArray(payload.source)) {
        changedList = Array.from(new Set(payload.source))
      } else {
        changedList = Array.from(new Set([payload.source, ...state.playSongList]))
      }
      state.playSongIndex = 0
      state.playSongList = changedList
      localStorage.setItem('playSongIndex', 0)
      localStorage.setItem('playSongList', JSON.stringify(changedList))
    }
  },
  actions: {

  },
  modules: {

  }
})
