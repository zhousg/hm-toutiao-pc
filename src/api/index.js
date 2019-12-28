// 提供一个配置好的axios，然后导出，在main.js来使用。
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIGINT from 'json-bigint'

// 1. 默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置头部的代码不能在此处定义。
// 这个里的代码之后在刷新页面后只会执行一次。
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
axios.defaults.transformResponse = [(data) => {
  // data json格式的字符串
  return JSONBIGINT.parse(data)
}]

// 2. 请求拦截器
axios.interceptors.request.use(config => {
  // 每次请求后台的时候，如果有token，需要请求头携带token。
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => Promise.reject(err))

// 3. 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 根据当前的响应状态码是不是401去跳转登录页面
  // err 对象包含 错误的时候响应对象 err.response
  // 状态码  err.response.status 就是
  if (err.response.status === 401) {
    // 如果是vue组件中：this.$router.push('/login')  路由实例$router提供push函数
    // 如果在js模块中：导入创建好的实例对象调用push函数即可
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
