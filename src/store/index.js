import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './user'
import CartStore from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserStore, CartStore
  }
})
