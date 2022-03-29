<template>
  <div>
    <div class="Screen-box" @click="onShowScreen">
      <div class="ScreenBtn">
        <img src="@/assets/fenlei.png">
        <span>显示列</span>
      </div>
      <div class="checkList-box" @mouseleave="mouseLeave">
        <div class="checkList erpscroll" v-show="showScreen">
          <el-checkbox v-model="CheckedScreeAll" @change="CheckedScreenAll" class="checkAll">全选</el-checkbox>
          <el-checkbox-group v-model="checkboxVals" @change="SelectScreen">
            <el-checkbox v-for="item in formTheadOptions" :label="item.prop" :key="item.prop">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScreeningComponent',
  props: {
    formTheadOptions: {
      type: Array,
    },
    checkboxVal: {
      type: Array,
    }
  },
  data () {
    return {
      checkboxVals: [],
      CheckedScreeAll: true,
      showScreen: false
    }
  },
  created () {
  },
  mounted () {
    // console.log(this.checkboxVal)
    this.checkboxVals = this.checkboxVal
  },
  methods: {
    onShowScreen () {
      this.showScreen = true
    },
    mouseLeave () {
      setTimeout(() => {
        this.showScreen = false
      }, 1000)
    },
    CheckedScreenAll () {
      // console.log(this.CheckedScreeAll)
      if (this.CheckedScreeAll) {
        for (let i = 0; i < this.formTheadOptions.length; i++) {
          this.checkboxVals.push(this.formTheadOptions[i].prop)
        }
      } else {
        this.checkboxVals = []
      }
      this.$emit('SelectCheck', this.checkboxVals)
    },
    SelectScreen () {
      // console.log(this.checkboxVals)
      if (this.formTheadOptions.length == this.checkboxVals.length) {
        this.CheckedScreeAll = true
      } else {
        this.CheckedScreeAll = false
      }
      this.$emit('SelectCheck', this.checkboxVals)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>