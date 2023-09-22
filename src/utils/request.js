import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { jumpLogin, downloadFile } from '@/utils'
import Config from '@/settings'
import { getToken } from '@/utils/auth' // getToken from cookie

let loadingInstance = null
let requestNum = 0

const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++
  if (requestNum === 1) {
    loadingInstance = Loading.service({
      text: '正在努力加载中....',
      background: 'rgba(0, 0, 0, 0)'
    })
  }
}

const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  requestNum--
  if (requestNum === 0) loadingInstance?.close()
}

export const createAxiosByinterceptors = (config) => {
  const instance = axios.create({
    timeout: Config.timeout,
    // 允许跨域
    withCredentials: true,
    ...config
  })

  // 添加请求拦截器
  instance.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      const { loading = true } = config
      config.headers[Config.TokenKey] = getToken()
      config.headers['Content-Type'] = 'application/json'
      if (loading) addLoading()
      return config
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      const { loading = true } = response.config
      if (loading) cancelLoading()
      const { code, data, message } = response.data

      // config设置responseType为blob 处理文件下载
      if (response.data instanceof Blob) {
        return downloadFile(response)
      } else {
        if (code === Config.successCode) return data
        else if (code === '1010' || code === '1011' || code === '1012' || code === '1013' || code === '1014') {
          jumpLogin()
        } else {
          Message.error(message)
          return Promise.reject(response.data)
        }
      }
    },
    function(error) {
      // 对响应错误做点什么
      const { loading = true } = error.config
      if (loading) cancelLoading()
      if (error.response) {
        const code = error.response.status
        if (code === '1010' || code === '1011' || code === '1012' || code === '1013' || code === '1014') {
          jumpLogin()
        }
      }
      Message.error(error?.response?.data?.message || '服务端异常')
      return Promise.reject(error)
    }
  )
  return instance
}

const request = createAxiosByinterceptors({ baseURL: '' })

export default request
