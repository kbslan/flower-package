import { register, login, logout, passwordReset, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getMobile, setMobile, removeMobile, getPassword, setPassword, removePassword, getRememberMe, setRememberMe, removeRememberMe, getPermissions, setPermissions, removePermissions } from '@/utils/auth'

const user = {
  state: {
    // 用户信息
    user: {},
    // 用户密码，用于记住我，自动填充
    mobile: getMobile(),
    password: getPassword(),
    rememberMe: getRememberMe(),
    // 用户token令牌
    token: getToken(),
    // 是否是管理员
    isAdmin: false,
    // 权限列表
    permissions: getPermissions()

  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_PASSWORD: (state, password) => {
      state.password = password
    },
    SET_REMEMBER_ME: (state, rememberMe) => {
      state.rememberMe = rememberMe
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 注册
    Register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo)
          .then((data) => {
            const rememberMe = Boolean(getRememberMe())
            setMobile(userInfo.mobile, rememberMe)
            setPassword(userInfo.password, rememberMe)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((data) => {
            setToken(data.token, userInfo.rememberMe)
            commit('SET_TOKEN', data.token)
            commit('SET_USER', data)
            commit('SET_REMEMBER_ME', userInfo.rememberMe)
            commit('SET_ADMIN', data.admin)
            commit('SET_PERMISSIONS', data.permissions)
            if (userInfo.rememberMe) {
              setMobile(userInfo.mobile, userInfo.rememberMe)
              setPassword(userInfo.password, userInfo.rememberMe)
              setPermissions(data.permissions, userInfo.rememberMe)
              setRememberMe(userInfo.rememberMe)
              commit('SET_MOBILE', userInfo.mobile)
              commit('SET_PASSWORD', userInfo.password)
            } else {
              removeMobile()
              removePassword()
              removeRememberMe()
              removePermissions()
              commit('SET_MOBILE', '')
              commit('SET_PASSWORD', '')
            }
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 修改密码
    Reset({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        passwordReset(userInfo)
          .then((data) => {
            const rememberMe = Boolean(getRememberMe())
            removeToken()
            setMobile(userInfo.mobile, rememberMe)
            setPassword(userInfo.password, rememberMe)
            commit('SET_TOKEN', '')
            commit('SET_MOBILE', userInfo.mobile)
            commit('SET_PASSWORD', userInfo.password)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((data) => {
            commit('SET_USER', data)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            commit('SET_USER', '')
            commit('SET_MOBILE', '')
            commit('SET_PASSWORD', '')
            commit('SET_TOKEN', '')
            commit('SET_ADMIN', false)
            commit('SET_PERMISSIONS', [])
            removeToken()
            removeMobile()
            removePassword()
            removePermissions()
          })
      })
    }

  }
}

export default user
