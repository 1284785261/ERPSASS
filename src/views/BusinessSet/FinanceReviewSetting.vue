<template>
  <!-- 项目审核流程设置 -->
  <div class="projectreviewset-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">审核流名称</div>
        <el-input class="erpsearchinput" placeholder="请输入审核流名称" size="small" v-model="searchform.name">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">应用业务</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" class="selet erpselect" clearable size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">应用功能</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" class="selet erpselect" clearable size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">启用状态</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" class="selet erpselect" clearable size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="content">
      <div class="operate-top clearfix">
        <el-button size="small" class="addmenu erpbtn" @click="addenumerate">新添加财务审核流程</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" type="index" width="55" label="编号" />
          <el-table-column align="center" prop="address" label="审核流名称" />
          <el-table-column align="center" type="name" label="审核人" />
          <el-table-column align="center" type="PositionName" label="适用对象" />
          <el-table-column align="center" type="PositionName" label="应用业务" />
          <el-table-column align="center" type="PositionName" label="应用功能" />
          <el-table-column align="center" type="PositionName" label="启用状态" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="view(scope.row)">查看</el-dropdown-item>
                    <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="enable(scope.row)">启用</el-dropdown-item>
                    <el-dropdown-item @click.native="disable(scope.row)">禁用</el-dropdown-item>
                    <el-dropdown-item @click.native="invalid(scope.row)">作废</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="erpdelete" @click="alldeletes">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchform: {
        name: '',
        id: ''
      },
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: [{ Id: 1, date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { Id: 2, date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }],
      tableloading: false,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      PageSize: 10,
      currentPage: 1,
      total: 0,
      issave: false,
      allchecked: false,
      Ids: [], // 多个选中id
    }
  },
  methods: {
    // 搜索
    searchtable () {
      console.log('search...');

    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
    addenumerate () {
      this.titlename = '新增审核人'
      this.dialogvisible = true
      this.contentdata = {}
      this.issave = true
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 操作
    view () { },
    update () {
      this.titlename = '修改枚举'
      this.dialogvisible = true
      this.contentdata = {
        name: 'ceshi',
        id: '111'
      }
      this.issave = false
    },
    enable () {

    },
    disable () {

    },
    invalid () {

    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 多选删除
    alldeletes () {
    }
  },
}
</script>

<style lang="scss">
.projectreviewset-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
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
      }
    }
  }
  .operate-top {
    .addmenu {
      margin-bottom: 16px;
      float: right;
      // width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>