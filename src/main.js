import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import '@/icons'
import '@/permission'
import '@/styles/index.scss'


const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.config.productionTip = false

// 从操作数组中获取具体操作
Vue.prototype.$operatedata = (array, operate) => {
  if (array && array.length) {
    let isexit = array.find(v => {
      return v.OperationCode === operate
    })
    if (isexit) {
      return isexit
    } else {
      return {}
    }
  } else {
    return {}
  }
}
// 判断操作数组中是否具有该操作
Vue.prototype.$operatebtn = (array, operate) => {
  if (array && array.length) {
    let isexit = array.find(v => {
      return v.OperationCode === operate
    })
    if (isexit) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

// 判断操作数组中是否具有操作
Vue.prototype.$operatebtns = (array, operateArr) => {
  if (array && array.length) {
    let isexit = false
    for (let i = 0; i < operateArr.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (operateArr[i] == array[j].OperationCode) {
          isexit = true
        }
      }
    }
    if (isexit) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

//筛选处理数组
Vue.prototype.$getColumsFlag = (str, arr) => {
  let flag = false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == str) {
      flag = true
    }
  }
  return flag
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
