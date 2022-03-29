// 柜号设置
<template>
  <div class="operate-container">
    <!-- <h2>柜号设置</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">查询</div>
        <el-input class="erpsearchinput" placeholder="请输入编号首字母/柜子位置进行查询" size="small" v-model="searchform.name">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <!-- <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
      </div> -->
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="addoperate">新增柜号</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" type="index" width="55" label="编号" />
          <el-table-column align="center" prop="name" label="编号首字母" />
          <el-table-column align="center" prop="name" label="编号规则" />
          <el-table-column align="center" prop="name" label="编号起始值" />
          <el-table-column align="center" prop="name" label="编号最大值" />
          <el-table-column align="center" prop="name" label="总数量" />
          <el-table-column align="center" prop="name" label="已使用数量" />
          <el-table-column align="center" prop="name" label="柜子位置" />
          <el-table-column align="center" prop="name" width="55" label="状态" />
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
                    <el-dropdown-item @click.native="deletes(scope.row)">删除</el-dropdown-item>
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
    <div class="dialog">
      <!-- <updateuoerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateuoerate> -->
    </div>
  </div>
</template>

<script>
// import updateuoerate from './components/UpdateOperate'
export default {
  components: {
    // updateuoerate
  },
  data () {
    return {
      searchform: {
        name: '',
        id: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      tableloading: false,
      tableData: [{ date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }],
      allchecked: false, // 全选
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      issave: false,
      Ids: []
    }
  },
  methods: {
    // 新增操作
    addoperate () {
      this.titlename = '新建操作'
      this.dialogvisible = true
      this.contentdata = {}
      this.issave = true
    },
    // 搜索
    searchtable () {
      console.log('search...');

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
      this.titlename = '修改操作'
      this.dialogvisible = true
      this.contentdata = {
        name: 'ceshi',
        id: '111'
      }
      this.issave = false
    },
    deletes () { },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 多选删除
    alldeletes () { },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 关闭弹框
    closedialog () {
      this.dialogvisible = false
    },
    // 保存弹框
    savedialog (data) {
      console.log(data);
      if (this.issave) {
        // 保存
      } else {
        // 修改
      }
    }
  },
}
</script>

<style lang="scss">
.operate-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
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
    float: right;
    .addmenu {
      // width: 96px;
      margin-bottom: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 24px;
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