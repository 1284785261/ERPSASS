<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">

        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" :isedit="onlyOneChild.meta.edit && onlyOneChild.meta.MemberId != 0" :metaId="onlyOneChild.meta.id" :metaType="onlyOneChild.meta.type" :item="onlyOneChild" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object | 路由对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    // 路由地址
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function 使用呈现函数重构
    this.onlyOneChild = null // 判断后有子元素的父元素
    return {}
  },
  created () {
    // console.log(this.item);
  },
  methods: {
    /** 只有一个子元素
     * @param {arry} children = [] 子元素数组
     * @param {object} parent 父元素对象
     * @returns {Boolean}
     */
    hasOneShowingChild (children = [], parent) {
      // 创建一个方法测试数组的子元素
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child) | Temp set(如果只有一个显示子元素，则使用)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default | 当只有一个子路由器时，默认情况下显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display | 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        console.log(routePath)

        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
