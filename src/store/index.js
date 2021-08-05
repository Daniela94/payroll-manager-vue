import { createStore } from 'vuex'
import { auth } from "../utils/firebase";

export default createStore({
  state: {
    user: undefined
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    reloadUser({commit}) {
      // console.log("estamos en actions/reloadUser");
      auth.onAuthStateChanged((user) => {
        // console.log(user);
        commit("setUser", {...user})
      })
    }
  },
  modules: {
  }
})
