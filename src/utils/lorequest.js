import axios from 'axios'
import { hideLoading, getCookie } from './CustomValidation.js'
import { MessageBox, Message } from 'element-ui'

const loquest = axios.create({
  baseURL: process.env.VUE_APP_LOGIN_API,
  headers: {
    // 'content-type': 'application/json'
  }
})

loquest.interceptors.request.use(
  config => {
    if (config.url.indexOf('MemberLoginOut') != '-1') {
      // const DocToken = document.cookie
      // let Token = ''
      // if (DocToken) {
      //   var arr = DocToken.split("=")
      //   Token = arr[1]
      // }
      let Token = getCookie('Token')
      config.headers['token'] = Token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

loquest.interceptors.response.use(
  response => {
    const res = response.data
    if (res.MessageCode === 11 || res.MessageCode === 12) {
      Message({
        message: res.MessageContent,
        type: 'error',
        duration: 2 * 1000
      })
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
    hideLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default loquest
