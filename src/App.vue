<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getrouter, getmenu } from '@/router/addrouter.js'
import { getCookie, showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation.js'
import { GetSysRoleMenu } from './api/SystemSetting.js'
import qs from 'qs'
export default {
  data () {
    return {

    }
  },
  created () {
    /**
     * 解决刷新 addRouter 失效问题
     */
    console.log('刷新了');
    // 判断是否登录
    const login = getCookie('Token')
    if (login) {
      this.$nextTick(() => {
        this.$store.dispatch('app/chooseRouter', {
          amount: '1'
        })
      })
      let addrouter = JSON.parse(window.localStorage.getItem('setRouter'))
      if (addrouter && addrouter.length) {
        this.$router.addRoutes(getrouter(addrouter).concat([{
          path: '*',
          redirect: '/404'
        }]))
      } else {
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
              // this.$store.dispatch('app/setRouter', erprouter)
              window.localStorage.setItem('setRouter', JSON.stringify(response.Data))
              this.$router.addRoutes(erprouter.concat([{
                path: '*',
                redirect: '/404'
              }]))
              // console.log(222);

              // this.$nextTick(() => {
              //   this.$store.dispatch('app/chooseRouter', {
              //     amount: '1'
              //   })
              // })
            }
          } else {
            Message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }
  },
}
</script>

<style lang="scss">
</style>
