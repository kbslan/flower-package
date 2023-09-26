import request from '@/utils/request'

// 柱状图统计
export const barStatistics = (params) =>
  request({ url: '/api/statics/bar', params })
