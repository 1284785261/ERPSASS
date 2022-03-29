const state = {
  classtype: [],
  menulist: []
}

const mutations = {
  // 获取分类列表
  GET_CLASS_TYPE: (state, value) => {
    state.classtype = value
  },
  // 获取全部菜单
  GET_MENULIST: (state, value) => {
    state.menulist = value
  }
}

const actions = {
  getclasstype ({ commit }, data) {
    commit('GET_CLASS_TYPE', data)
  },
  getmenulist ({ commit }, data) {
    commit('GET_MENULIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}