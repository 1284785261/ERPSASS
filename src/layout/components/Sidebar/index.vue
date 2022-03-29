<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="false" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText" :collapse-transition="true" mode="vertical">
        <sidebar-item v-for="(route,index) in routes" :key="route.path +index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
// 导入导航栏颜色样式
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'leftRouter',
      'activeIndex'
    ]),
    routes () {
      // console.log(this.leftRouter);
      
      // 获取所有路由信息
      return this.leftRouter
      // return this.$router.options.routes
    },
    activeMenu () {
      // 获取当前路由信息
      // console.log(this.leftRouter)
      const route = this.$route
      const { meta } = route
      // console.log(this.leftRouter);
      // console.log(route.path);
      // 如果设置路径，侧栏将突出显示您设置的路径 如果不设置则显示当前路由地址
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return route.path
    },
    showLogo () {
      return this.$store.state.setting.sidebarLogo
    },
    variables () {
      // 返回为一个颜色对象
      return variables
    },
    isCollapse () {
      // 是否折叠 Vuex中sidebar的状态
      return !this.sidebar.opened
    }
  }
}
</script>
