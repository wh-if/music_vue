import { createStore } from 'vuex'

export default createStore({
  state: {
    loginDialogIsShow:false,
  },
  mutations: {
    changeLoginDialogShow: (state) => {
      state.loginDialogIsShow=!state.loginDialogIsShow
    }
  },
  actions: {

  },
  modules: {
    
  }
})
