import router, { constantRoutes, createRouter } from './router'
import store from './store'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getCookie, showLoading, hideLoading, MenuIdDate, hidelogin } from './utils/CustomValidation.js'
import { GetSysRoleMenu } from './api/SystemSetting.js'
import { getrouter, getmenu } from './router/addrouter.js'
import { Message } from 'element-ui'
import qs from 'qs'

const whiteList = ['/login']

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断是否登录 判断cookie是否存在
  const tokencookie = getCookie('Token')
  hidelogin()
  if (tokencookie) {
    if (from.path === '/login') {
      // 获取菜单列表
      let obj = {
        Title: '',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysRoleMenu(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            const erprouter = getrouter(response.Data)
            // store.dispatch('app/setRouter', erprouter)
            window.localStorage.setItem('setRouter', JSON.stringify(response.Data))
            router.matcher = createRouter(constantRoutes).matcher
            router.addRoutes(erprouter.concat([{
              path: '*',
              redirect: '/404'
            }]))
            if (getmenu(response.Data).sysmenulist.length > 0) {
              window.localStorage.setItem('ShowSetting', true)
            } else {
              window.localStorage.setItem('ShowSetting', false)
            }
            setTimeout(() => {
              store.dispatch('app/chooseRouter', {
                amount: '1'
              })
            }, 1000);
            NProgress.done()
            next()
            // vux 要在页面跳转之后调用 才能使用之前 setRouter 值

          }
        } else {
          Message({
            message: response.MessageContent,
            type: 'error'
          })
          document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }).catch(() => {
        store.dispatch('app/chooseRouter', {
          amount: '1'
        })
      })
    } else if (to.path === '/login') {
      NProgress.done()
      next({ path: '/' })
    } else {
      NProgress.done()
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      NProgress.done()
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
  // NProgress.done()
  // next()
})