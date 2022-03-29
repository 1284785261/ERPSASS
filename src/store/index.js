import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import setting from './modules/settings'
import systemsetting from './modules/systemsetting'
import BusinessSet from './modules/BusinessSet'
import CompensationServiceManagement from './modules/CompensationServiceManagement'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
  modules: {
    app,
    setting,
    systemsetting,
    BusinessSet,
    CompensationServiceManagement
  },
  getters
})
