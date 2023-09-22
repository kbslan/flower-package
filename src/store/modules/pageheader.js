
const pageheader = {
  state: {
    // 标题
    content: '马龙包花管理'
  },

  mutations: {
    SET_CONTENT: (state, content) => {
      state.content = content
    }
  },

  actions: {
    // 设置标题
    SetContent({ commit }, content) {
      return new Promise((resolve, reject) => {
        commit('SET_CONTENT', content)
        resolve()
      })
    }

  }
}

export default pageheader
