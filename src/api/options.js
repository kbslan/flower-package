import request from '@/utils/request'

// 配置分页查询
export const optionsPage = (data) =>
  request({ url: '/api/option/config/page', method: 'POST', data })

// 配置新增、编辑
export const optionsSave = (data) =>
  request({ url: '/api/option/config/save', method: 'POST', data })

// 状态变更
export const optionsYn = (data) =>
  request({ url: '/api/option/config/yn', method: 'POST', data })

// 配置列表查询
export const optionsList = (data) =>
  request({ url: '/api/option/config/list', method: 'POST', data })
