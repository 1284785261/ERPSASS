import defaultSettings from '@/settings'
// import { GetCatagoryClassType } from '@/api/System-settings'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
import { MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  CatagoryList: '1'
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CATAGORY_CLASS: (state, payload) => {
    state.CatagoryList = payload
  }
}

const actions = {
  // 获取枚举分类管理的类型值
  abtain({ commit, state }) {
    return new Promise((resolve, reject) => {
      let obj = {
        MenuId: MenuIdDate(),
        OperationCode: '1'
      }
      // GetCatagoryClassType(qs.stringify(obj)).then(response => {
      //   commit('CATAGORY_CLASS', response)
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

