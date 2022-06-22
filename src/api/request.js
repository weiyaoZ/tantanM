// 对于 axios 进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 在当前模块中引入 store
import store from '@/store'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start：进度条开始  done：进度条结束
// 1. 利用 axios 对象方法 create，去创建一个 axios 实例
const requests = axios.create({ // 配置项
  // 配置请求接口的前缀 /api
  baseURL: '/api',
  // 代表请求超时的时间 5s
  timeout: 5000,
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(
  config => {
    if(store.state.detail.uuid_token){
      // 给请求头添加一个字段 userTempId(必须为这个属性)
      config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带 token 访问服务器
    if(store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
  }
)
// 响应拦截器
requests.interceptors.response.use(
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
  response => {
    // 进度条结束
    nprogress.done()
    return response.data
  },
  error => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)
// 对外暴露
export default requests