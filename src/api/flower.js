import request from '@/utils/request'

// 包花记录分页查询
export const flowerList = (data) =>
  request({ url: '/bag/flower/record/page', data })

// 逻辑删除
export const flowerDel = (params) =>
  request({ url: '/bag/flower/record/delete', params })

// 新增、保存
export const flowerSave = (data) =>
  request({ url: '/bag/flower/record/save', data })

// 批量保存（批量提报数据）
export const flowerBatchSave = (data) =>
  request({ url: '/bag/flower/record/save/batch', data })

// 管理员审核
export const flowerAudit = (data) =>
  request({ url: '/bag/flower/record/audit', data })
