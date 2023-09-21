import request from '@/utils/request'

// 修改密码
export const passwordReset = (data) =>
  request({ url: '/api/user/password/reset', method: 'POST', data })

// 登陆接口
export const login = (data) =>
  request({ url: '/api/user/login', method: 'POST', data })

// 退出登录
export const logout = () => request({ url: '/api/user/logout', method: 'GET' })

// 注册
export const register = (data) =>
  request({ url: '/api/user/register', method: 'POST', data })

// 账号列表
export const accountList = (data) => request({ url: '/api/user/page', method: 'POST', data })

// 状态变更
export const accountYn = (data) => request({ url: '/api/user/yn', method: 'POST', data })

// 管理员状态变更
export const accountAdmin = (data) => request({ url: '/api/user/admin', method: 'POST', data })

// 用户信息查询
export const accountInfo = (params) => request({ url: '/api/user/info', params })

// 账号删除
export const accountDel = (params) => request({ url: '/api/user/delete', params })
