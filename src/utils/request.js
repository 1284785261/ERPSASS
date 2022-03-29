import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { hideLoading, getCookie, debounce } from './CustomValidation.js'
import store from '@/store'
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    // 'content-type': 'application/json'
  }
})

// axios 请求拦截器
service.interceptors.request.use(
  config => {
    // const DocToken = document.cookie
    let Token = getCookie('Token')
    // if (DocToken) {
    //   var arr = DocToken.split("=")
    //   Token = arr[1]
    // }
    // config.headers['token'] = Token  //564bbad04e594effb6e1a322269a2415
    // console.log(config);
    // if (config.url === '/Salary/ImportMedicalToExcelOrErpMapping') {
    //   config.baseURL = 'http://192.168.1.109:63483/api'
    // }
    config.headers['token'] = Token
    const data = qs.parse(config.data)
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'menuid') {
          config.headers['menuid'] = data[key]
        }
        if (key === 'operationcode') {
          config.headers['operationcode'] = data[key]
        }
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

var isgo = true
// axios 请求结果拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.MessageCode === 11 || res.MessageCode === 12 || res.MessageCode === 15) {
      if (isgo) {
        isgo = false
        Message({
          message: res.MessageContent,
          type: 'error',
          duration: 2 * 1000
        })
      }
      setTimeout(() => {
        localStorage.clear()
        sessionStorage.clear()
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        location.href = '#/login'
      }, 2000)
      hideLoading()
      return Promise.reject(new Error(res.MessageContent || 'Error'))
    } else {
      return res
    }

  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    hideLoading()
    return Promise.reject(error)
  }
)

export default service