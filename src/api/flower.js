import request from '@/utils/request'

// 包花记录分页查询
export const flowerList = (data) =>
  request({ url: '/api/package/flower/record/page', method: 'POST', data })

// 逻辑删除
export const flowerDel = (params) =>
  request({ url: '/api/package/flower/record/delete', params })

// 新增、保存
export const flowerSave = (data) =>
  request({ url: '/api/package/flower/record/save', method: 'POST', data })

// 批量保存（批量提报数据）
export const flowerBatchSave = (data) =>
  request({ url: '/api/package/flower/record/save/batch', method: 'POST', data })

// 管理员审核
export const flowerAudit = (params) =>
  request({ url: '/api/package/flower/record/audit', params })

// 管理员评价
export const flowerRemark = (params) =>
  request({ url: '/api/package/flower/record/remark', params })

// 一键通过查询结果数据
export const auditAll = (data) =>
  request({ url: '/api/package/flower/record/auditAll', method: 'POST', data })
