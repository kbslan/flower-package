import request from '@/utils/request'

// 修改密码
export const passwordReset = (data) =>
  request({ url: '/user/password/reset', data })

// 登陆接口
export const login = (data) => request({ url: '/user/login', method: 'POST', data })

// 退出登录
export const logout = () => request({ url: '/user/logout', method: 'GET' })

// 注册
export const register = (data) => request({ url: '/user/register', method: 'POST', data })

// 账号列表
export const accountList = (data) => request({ url: '/user/page', data })

// 逻辑删除
export const accountDel = (params) => request({ url: '/user/delete', params })

// 用户信息查询
export const accountInfo = (params) => request({ url: '/user/info', params })
