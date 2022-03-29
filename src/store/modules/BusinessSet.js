const state = {
  companystylelist: [],
  followenumlist: []
}

const mutations = {
  // 获取公司枚举
  GET_COMPANY_TYPE: (state, value) => {
    state.companystylelist = value
  },
  // 获取客户跟进阶段枚举
  GET_FOLLOWENUM_LIST: (state, value) => {
    state.followenumlist = value
  }
}

const actions = {
  getcompanylist ({ commit }, data) {
    commit('GET_COMPANY_TYPE', data)
  },
  getfollowenumlist ({ commit }, data) {
    commit('GET_FOLLOWENUM_LIST', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}