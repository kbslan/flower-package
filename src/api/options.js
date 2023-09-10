import request from '@/utils/request'

// 配置分页查询
export const optionsList = (data) =>
  request({ url: '/option/config/page', method: 'POST', data })

// 配置新增、编辑
export const optionsSave = (data) =>
  request({ url: '/option/config/save', method: 'POST', data })

// 状态变更
export const optionsYn = (data) =>
  request({ url: '/option/config/yn', method: 'POST', data })
