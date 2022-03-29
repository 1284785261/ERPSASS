const state = {
  detailType: []
}

const mutations = {
  // 明细类型
  GET_DETAIL_TYPE: (state, value) => {
    console.log(value);
    
    state.detailType = value
  }
}

const actions = {
  getdetaillist ({ commit }, data) {
    commit('GET_DETAIL_TYPE', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}