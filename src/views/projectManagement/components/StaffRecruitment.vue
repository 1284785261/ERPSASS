<!-- 招聘员工管理 -->
<template>
  <div class="staff-recruitment-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称进行查询" size="small" v-model="searchform.UserName" clearable>
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" size="small" v-model="searchform.IdCode" clearable>
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金打款账号查询" size="small" v-model="searchform.Comprehensive" clearable>
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchform: {
        UserName: '',
        IdCode: '',
        Comprehensive: ''
      }
    }
  },
  methods: {
    searchtable () {

    }
  },
}
</script>

<style lang="scss" scoped>
.staff-recruitment-container /deep/ {
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
        .el-input__inner {
          // border-color: $erpplaceholder !important;
          background-color: $erpbgcolor;
        }
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      width: 96px;
    }
  }
}
</style>