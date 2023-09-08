import defaultSettings from '@/settings'

const { tagsView, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber } = defaultSettings

const state = {
  showSettings: false,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  uniqueOpened: uniqueOpened,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // https://blog.csdn.net/outsider76557/article/details/130193472
    // 新版本的ESLint中禁止直接调用Object.proptotype的内置属性开关
    // if (state.hasOwnProperty(key)) {
    //   state[key] = value
    // }
    // 解决方案一
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }

    // 解决方案二
    // if (Object.keys(this).includes(key)) {
    //   this[key] = value
    // }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
