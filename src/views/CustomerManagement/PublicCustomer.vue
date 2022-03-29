<!-- 公共客户 -->
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
        <div class="search-name">原负责人</div>
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
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="Code" width="150" fixed="left" label="编号" />
          <el-table-column align="center" prop="Name" min-width="150" fixed="left" label="客户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchcustom(scope.row, 'View')">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="LevelText" width="100" label="客户等级" />
          <!-- <el-table-column align="center" prop="SysUserName" label="原负责人" /> -->
          <el-table-column align="center" prop="AddTime" width="160" label="入库时间">
            <template slot-scope="scope">
              {{scope.row.AddTime | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="FollowSysUserName" width="120" label="最近跟进人" />
          <el-table-column align="center" prop="FollowDate" width="160" label="最近跟进时间">
            <template slot-scope="scope">
              {{scope.row.FollowDate | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="NCCode" width="180" label="NC码" />
          <el-table-column align="center" prop="ProjectNumber" width="120" label="相关项目数量" />
          <el-table-column align="center" prop="FollowNumber" width="120" label="跟进信息数量">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchfollow(scope.row, 'View')">{{scope.row.FollowNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Modify', 'ConvertMy', 'AddRemind'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row, 'Modify')">修改</el-dropdown-item> -->
                    <el-dropdown-item v-if="$operatebtn(operates, 'ConvertMy')" @click.native="changemycustom(scope.row, 'ConvertMy')">转为我的客户</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddRemind')" @click.native="addremind(scope.row, 'AddRemind')">添加提醒</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'ConvertMy')" @click="changemycustoms('ConvertMy')">转为我的客户</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- <updateuoerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateuoerate> -->
    </div>
    <AddRemind :showRemind="showRemind" :title="remindtitle" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
  </div>
</template>

<script>
// import updateuoerate from './components/UpdateOperate'
import { GetCompanyPageList, EditCompanySysUserId } from '@/api/CustomerManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import AddRemind from '@/components/publicComponents/AddRemind'
import { AddReminds } from '@/api/Remind.js'
import qs from 'qs'
export default {
  components: {
    // updateuoerate
    AddRemind
  },
  data () {
    return {
      searchform: {
        Name: '',
        SysUserName: '',
        StartDate: '',
        EditDate: ''
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
      tableData: [],
      allchecked: false, // 全选
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      issave: false,
      Ids: [],

      showRemind: false,
      remindtitle: '添加客户提醒',
      operates: []
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    console.log(this.operates);
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
        StartDate: this.searchform.StartDate,
        EditDate: this.searchform.EditDate,
        Type: 2,
        Status: -1,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
      }
      this.tableloading = true
      GetCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            for (let i = 0; i < response.Data.length; i++) {
              response.Data[i].isview = false
            }
          }
          this.tableData = response.Data
          this.total = response.Total
          this.tableloading = false
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
      let operatingIndex = this.operates.findIndex(v=>v.OperationCode==op)
      console.log(operatingIndex)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      const { href } = this.$router.resolve({
        path: '/CustomerManagement/CustomerDetail',
        query: {
          id: e.Id
        }
      })
      if(operatingIndex!=-1){
        window.open(href, '_blank')
      }else{
         this.$message({
          message: '暂无查看权限',
          type: 'warning'
        })
      }
      
    },
    // 查看跟进信息
    watchfollow (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (e.FollowNumber == 0) {
        this.$message({
          message: '暂无跟进信息',
          type: 'warning'
        })
        return
      }
      const { href } = this.$router.resolve({
        path: '/CustomerManagement/followdetail',
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
    update (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      // 修改
      this.$router.push({
        path: '/CustomerManagement/AddCustomer',
        query: {
          id: e.Id
        }
      })
    },
    // 转为我的客户
    changemycustom (e, op) {
      const operating = this.$operatedata(this.operates, op)
      let user = JSON.parse(window.localStorage.getItem('Current'))
      let obj = {
        IdArr: e.Id,
        SysUserId: user.currentId,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditCompanySysUserId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '客户已转移成功，请前往我的客户的页面查看！',
            type: 'success'
          })
          this.getCompanyPageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    // 批量转为我的客户
    changemycustoms (op) {
      const operating = this.$operatedata(this.operates, op)
      let user = JSON.parse(window.localStorage.getItem('Current'))
      var array = ''
      if (this.Ids.length == 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      } else {
        array = this.Ids.join(',')
      }
      let obj = {
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
        SysUserId: user.currentId,
        IdArr: array,
      }
      showLoading()
      EditCompanySysUserId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '客户已转移成功，请前往我的客户的页面查看！',
            type: 'success'
          })
          this.getCompanyPageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
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
    // 保存弹框
    savedialog (data) {
      console.log(data);
      if (this.issave) {
        // 保存
      } else {
        // 修改
      }
    },

    // 添加提醒
    addremind (e, op) {
      // 记录操作码
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.showRemind = true
    },
    // 关闭提醒
    closeshowAddRemind () {
      this.showRemind = false
    },
    // 保存提醒
    AddRemindSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.Type = 4
      data.menuid = operating.MenuId,
        data.operationcode = operating.OperationCode
      showLoading()
      AddReminds(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加项目提醒成功!'
          })
          this.showRemind = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
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