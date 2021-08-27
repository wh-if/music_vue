import { createStore } from 'vuex'

export default createStore({
  state: {
    loginDialogIsShow: false,
    playSongId: localStorage.getItem('playSongId')
  },
  mutations: {
    closeLoginDialog: (state) => {
      state.loginDialogIsShow = false
    },
    openLoginDialog: (state) => {
      state.loginDialogIsShow = true
    },
    changePlaySong: (state, payload) => {
      localStorage.setItem('playSongId', payload.id)
      state.playSongId = payload.id
    }
  },
  actions: {

  },
  modules: {

  }
})
