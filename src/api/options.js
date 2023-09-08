import request from '@/utils/request'

// 配置分页查询
export const configList = (data) =>
  request({ url: '/option/config/page', data })

// 配置新增、编辑
export const configSave = (data) =>
  request({ url: '/option/config/save', data })

// 逻辑删除
export const configDel = (params) =>
  request({ url: '/option/config/delete', params })
