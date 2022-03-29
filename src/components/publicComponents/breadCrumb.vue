<template>
  <div class="Breadcrumb-header">
    <p class="return" @click="goBack" v-if="ShowButton"><i class="el-icon-arrow-left" /><span>返回</span></p>
    <el-breadcrumb separator="/">
      <span class="location"><span>当前位置：</span></span>
      <el-breadcrumb-item v-for="(item,index) in urlList" :key="index">
        <router-link v-if="item.router" :to="item.router">{{ item.name }}</router-link>
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  props: {
    urlList: {
      type: Array,
      default: false
    },
    ShowButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    goBack () {
      this.$router.go(-1)
      // this.$router.push({
      //   path: this.urlList[0].router
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.Breadcrumb-header {
  overflow: hidden;
  .return {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 27px 40px 0 0;
    float: left;
    cursor: pointer;
    i {
      font-size: $f22;
      color: $erp666;
      // font-weight: 600;
    }
    span {
      font-size: $f22;
      // font-weight: 600;
      vertical-align: initial;
      color: $erp666;
    }
  }
  .el-breadcrumb {
    display: inline-block;
    background: #fff;
    padding: 12px 20px;
    border-radius: 6px;
    color: $erp666;
    font-weight: 500;
    margin-top: 24px;
    vertical-align: sub;
    font-size: $f16;
    line-height: 16px;
    .location {
      // font-size: 14px;
      float: left;
      // > span {
      //   font-size: 12px;
      // }
    }
    .el-breadcrumb__item {
      &:last-child {
        /deep/ .el-breadcrumb__inner {
          color: $erp333 !important;
        }
      }
      /deep/ .el-breadcrumb__separator {
        color: $erp666;
        margin: 0 2px;
        font-weight: 500;
      }
      .el-breadcrumb__inner {
        font-size: $f18;
        a {
          color: $erp666;
          font-weight: 500;
          &:hover {
            color: #638df8;
          }
        }
      }
      /deep/ &:nth-child(1) {
        .el-breadcrumb__separator {
          display: none;
        }
      }
    }
  }
}
// /deep/ .el-breadcrumb__inner {
//   color: #999;
//   font-size: 14px;
// }
// /deep/ .el-breadcrumb__separator {
//   color: #999;
//   font-size: 14px;
// }
</style>
