<!-- 待关联NC的客户 -->
<template>
  <div class="public-container">
    <!-- <h2>公共客户</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">客户名称</div>
        <el-input class="erpsearchinput" placeholder="请输入客户名称进行查询" size="small" v-model="searchform.Name" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">负责人</div>
        <el-input class="erpsearchinput" placeholder="请输入负责人名称进行查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Code" width="150" fixed="left" label="编号" />
          <el-table-column align="center" prop="Name" min-width="150" fixed="left" label="客户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchcustom(scope.row, 'View')">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="BusinessTypeArr" width="160" label="业务类型" />
          <el-table-column align="center" prop="TypeText" width="160" label="客户类型" />
          <el-table-column align="center" prop="CorpTypeText" width="160" label="合作类型" />
          <el-table-column align="center" prop="SysUserName" width="120" label="负责人" />
          <el-table-column align="center" prop="AddTime" width="160" label="预备时间">
            <template slot-scope="scope">
              {{scope.row.AddTime | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ProjectNumber" width="120" label="相关项目数量" />
          <el-table-column align="center" prop="Status" width="120" label="使用状态">
            <template slot-scope="scope">
              <span v-if="scope.row.Status == 1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['AddNC', 'Enabled', 'Disabled'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddNC')" @click.native="AddNCcode(scope.row, 'AddNC')">添加NC编码</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 0 && $operatebtn(operates, 'Enabled')" @click.native="enable(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')" @click.native="disable(scope.row,'Disabled')">禁用</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <dialognc :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></dialognc>
  </div>
</template>

<script>
import { GetNoNCCodeCompanyPageList, EditCompanyStatus, EditCompanyNCCode } from '@/api/CustomerManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import dialognc from './components/dialog-nc'
import qs from 'qs'
export default {
  components: {
    dialognc
  },
  data () {
    return {
      searchform: {
        Name: '',
        SysUserName: ''
      },
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: '', // 弹框内容
      CompanyId: '',
      operates: []
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    this.getCompanyPageList()
  },
  methods: {
    // 获取数据
    getCompanyPageList () {
      const operating = this.$operatedata(this.operates, 'Query')
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Name: this.searchform.Name,
        SysUserName: this.searchform.SysUserName,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
      }
      this.tableloading = true
      GetNoNCCodeCompanyPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.tableData = response.Data
            this.total = response.Total
          } else {
            this.tableData = []
            this.total = 0
          }

        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 打开客户详情
    watchcustom (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const operating = this.$operatedata(this.operates, op)
      console.log(operating)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (!operating.MenuId) {
        this.$message({
          message: '没有权限查看',
          type: 'warning'
        })
        return
      }
      const { href } = this.$router.resolve({
        path: '/CustomerManagement/CustomerDetail',
        query: {
          id: e.Id
        }
      })
      window.open(href, '_blank')
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getCompanyPageList()
    },
    // 启用
    enable (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      let obj = {
        IdArr: e.Id,
        Status: 1,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditCompanyStatus(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '当前客户已经被启用',
            type: 'success'
          })
          this.getCompanyPageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 禁用
    disable (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      let obj = {
        IdArr: e.Id,
        Status: 0,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditCompanyStatus(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '当前客户已经被禁用',
            type: 'success'
          })
          this.getCompanyPageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    AddNCcode (e, op) {
      this.contentdata = e.NCCode
      this.CompanyId = e.Id
      if (this.contentdata) {
        this.titlename = '修改客户NC编码'
      } else {
        this.titlename = '添加客户NC编码'
      }
      this.dialogvisible = true
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getCompanyPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCompanyPageList()
    },
    // 关闭弹框
    closedialog () {
      this.dialogvisible = false
    },
    // 保存NC弹框
    savedialog (data) {
      let obj = {
        CompanyId: this.CompanyId,
        NCCode: data.NCCode,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      EditCompanyNCCode(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加客户NC编码成功!'
          })
          this.dialogvisible = false
          this.getCompanyPageList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    }
  },
}
</script>

<style lang="scss">
.public-container {
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
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 24px;
    border-radius: 8px 0px 0px 8px;
    // .operate-table {
    //   .el-table__header-wrapper {
    //     // height: 56px;
    //     border-radius: 8px;
    //     overflow: hidden;
    //     .has-gutter {
    //       // height: 56px;
    //       th {
    //         line-height: 33px;
    //         background-color: $tableHeader;
    //         font-size: $f16;
    //         color: $erp333;
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .el-table__body-wrapper {
    //     tr {
    //       td {
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //         }
    //         .watchcode {
    //           cursor: pointer;
    //           color: $erpcolor;
    //         }
    //         &:first-child {
    //           border-radius: 8px 0 0 8px;
    //         }
    //         &:last-child {
    //           border-radius: 0 8px 8px 0;
    //         }
    //       }
    //     }
    //   }
    // }
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