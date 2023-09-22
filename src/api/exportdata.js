import request from '@/utils/request'

// 包花记录导出
export const exportFlower = (data) =>
  request({ url: '/api/export/packageFlower', method: 'POST', data, responseType: 'blob' })

// 报损记录导出
export const exportDamage = (data) =>
  request({ url: '/api/export/damage', method: 'POST', data, responseType: 'blob' })
