import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigationDrawerVisible: false,
    token: localStorage.getItem('token') || '',
    user: {
      email: localStorage.getItem('email') || '',
      name: localStorage.getItem('name') || '',
      surname: localStorage.getItem('surname') || '',
      userType: localStorage.getItem('userType') || '',
      fingerprintID: localStorage.getItem('fingerprintID') || ''
    }
  },
  mutations: {
    toggle_navigation_drawer (state) {
      state.navigationDrawerVisible = !state.navigationDrawerVisible
    },
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    setUser (state, user) {
      localStorage.setItem('email', user.email)
      localStorage.setItem('name', user.name)
      localStorage.setItem('surname', user.surname)
      localStorage.setItem('userType', user.userType)
      localStorage.setItem('fingerprintID', user.fingerprintID)
      state.user = user
    },
    unsetToken (state) {
      localStorage.removeItem('token')
      state.token = ''
    },
    unsetUser (state) {
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('surname')
      localStorage.removeItem('userType')
      localStorage.removeItem('fingerprintID')
      state.user = { email: '', name: '', surname: '', userType: '', fingerprintID: '' }
    }
  },
  actions: {
    async toggleNavigationDrawer ({commit}) {
      commit('toggle_navigation_drawer')
    }
  },
  getters: {
    navigationDrawerVisible: state => state.navigationDrawerVisible,
    isLoggedIn: state => !!state.token,
    user: state => state.user
  }
})
