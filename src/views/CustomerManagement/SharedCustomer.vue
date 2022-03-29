<!-- 共享客户 -->
<template>
  <div class="share-container">
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.index}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.name}}</div>
    </div>
    <div class="content">
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">客户名称</div>
          <el-input class="erpsearchinput input" placeholder="请输入客户名称进行查询" size="small" v-model="searchform.Name" @keyup.enter.native="searchtable">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">负责人名称</div>
          <el-input class="erpsearchinput input" placeholder="请输入负责人名称进行查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
            <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
          </el-input>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
        </div>
        <!-- <div class="operate-top">
          <el-button size="small" class="addmenu erpbtn" @click="derive">导出</el-button>
        </div> -->
      </div>

      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" key="0" v-if="tabidx===0" />
          <el-table-column align="center" prop="ischoose" width="55" fixed="left" label="单选" key="1" v-if="tabidx===1">
            <template slot-scope="scope">
              <el-radio v-model="ischoose" :label="scope.row.Id">{{""}}</el-radio>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" type="index" width="55" label="序号" key="3" v-if="tabidx===0" /> -->
          <el-table-column align="center" prop="Code" width="150" fixed="left" label="编号" />
          <el-table-column align="center" prop="Name" min-width="150" fixed="left" label="客户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchcustom(scope.row, 'View')">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SizeText" width="100" label="客户等级" />
          <el-table-column align="center" prop="SysUserName" width="80" label="负责人" />
          <el-table-column align="center" prop="TypeText" width="100" label="客户状态" />
          <el-table-column align="center" prop="NCCode" width="180" label="NC码" />
          <el-table-column align="center" prop="AddTime" width="160" label="报备时间">
            <template slot-scope="scope">
              {{scope.row.AddTime | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="FollowDate" width="160" label="最近跟进时间">
            <template slot-scope="scope">
              {{scope.row.FollowDate | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ProjectNumber" width="120" label="相关项目数量" />
          <el-table-column align="center" prop="FollowNumber" width="120" label="跟进信息数量">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchfollow(scope.row, 'View')">{{scope.row.FollowNumber}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="Status" width="55" label="状态">
            <template slot-scope="scope">
              {{scope.row.Status}}
            </template>
          </el-table-column> -->
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Modify', 'AddFollow', 'CancelShare', 'CancelShare', 'AddRemind'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row, 'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddFollow')" @click.native="addfollow(scope.row, 'AddFollow')">添加跟进信息</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'CancelShare')" v-show="tabidx==1" @click.native="cancel(scope.row, 'CancelShare')">取消共享</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'CancelShare')" v-show="tabidx==0" @click.native="quitshare(scope.row, 'CancelShare')">退出共享</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddRemind')" @click.native="addremind(scope.row, 'AddRemind')">添加提醒</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-if="tabidx===0" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <!-- <el-button size="small" class="erpdelete" @click="alldeletes">删除</el-button> -->
        <!-- <el-button size="small" class="erpdelete" @click="alldeletes">批量删除</el-button> -->
        <el-button v-if="tabidx==1 && $operatebtn(operates, 'CancelShare')" size="small" class="addmenu erpbtn" @click="cancels('CancelShare')">取消共享</el-button>
        <el-button v-if="tabidx==0 && $operatebtn(operates, 'CancelShare')" size="small" class="addmenu erpbtn" @click="quitshares('CancelShare')">退出共享</el-button>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="attentcustomer">关注客户</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- <updateuoerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateuoerate> -->
      <dialogfollow :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></dialogfollow>
      <el-dialog :close-on-click-modal="false" title="取消共享客户" :visible.sync="shareVisible" destroy-on-close width="480px" :lock-scroll="false" custom-class="erpdialog cancelshare" @close="closedialog">
        <div class="share-box">
          <div class="title">目前与<span>{{ShareList.length}}</span>人共享当前客户</div>
          <div class="share-content">
            <div class="share-con" v-for="(item, index) in ShareList" :key="index">
              <el-checkbox class="erpcheck" v-model="item.ischecked" @change="choosechange">{{item.SysUserName}}</el-checkbox>
              <!-- <svg-icon icon-class="Close" /> -->
            </div>
          </div>
          <div class="allcheck">
            <el-checkbox class="erpcheck" v-model="Sharechecked" @change="sharechange(Sharechecked)">全选</el-checkbox>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sharesave">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加提醒 -->
    <AddRemind :showRemind="showRemind" :title="remindtitle" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
  </div>
</template>

<script>
// import updateuoerate from './components/UpdateOperate'
import dialogfollow from './components/dialog-follow'
import { GetCompanyPageList, AddCompanyFollow, GetCompanyShareList, DelCompanyShareById, DelCompanyShareInitiative } from '@/api/CustomerManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import AddRemind from '@/components/publicComponents/AddRemind'
import { AddReminds } from '@/api/Remind.js'
import qs from 'qs'
export default {
  components: {
    dialogfollow,
    AddRemind
  },
  data () {
    return {
      tabidx: 1,
      ischoose: '',
      tablist: [{
        index: 1,
        name: '我共享的客户'
      }, {
        index: 0,
        name: '共享给我的客户'
      }],
      searchform: {
        Name: '',
        SysUserName: '',
        ContactName: '',
        StartDate: '',
        EditDate: '',
        Share: 1
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
      Sharechecked: false, // 弹框全选
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      ShareList: [], // 客户共享人列表
      shareVisible: false, // 取消共享弹窗
      issave: false,
      Ids: [],
      Id: '',

      showRemind: false,
      remindtitle: '添加客户提醒'
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
      this.ischoose = ''
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Name: this.searchform.Name,
        SysUserName: this.searchform.SysUserName,
        ContactName: this.searchform.ContactName,
        StartDate: this.searchform.StartDate,
        EditDate: this.searchform.EditDate,
        Status: -1,
        Type: 1,
        Share: this.tabidx,
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
          // this.tableData = response.Data
          this.tableData.splice(0, this.tableData.length, ...response.Data)
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
    // 切换tab栏
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.index) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.index
        this.getCompanyPageList()
      }
    },
    // 打开客户详情
    watchcustom (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const operating = this.$operatedata(this.operates, op)
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
    // // 新增操作
    // addoperate() {
    //   this.titlename = '新建操作'
    //   this.dialogvisible = true
    //   this.contentdata = {}
    //   this.issave = true
    // },
    // 导出
    derive () {

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
    addfollow (e, op) {
      this.titlename = '添加客户跟进信息'
      this.dialogvisible = true
      this.contentdata = {
        SysUserId: '',
        Content: '',
        FollowTime: '',
        Step: '',
        TaskId: '',
      }
      this.Id = e.Id
      this.issave = true
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
    },
    cancel (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      // 获取客户共享人列表数据
      this.Id = e.Id
      let obj = {
        CompanyId: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      GetCompanyShareList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          for (let i = 0; i < response.Data.length; i++) {
            response.Data[i].ischecked = false
          }
          this.ShareList = response.Data
          this.shareVisible = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
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
      this.shareVisible = false
    },
    // 取消共享
    cancels (op) {
      console.log(this.ischoose);
      if (this.ischoose) {
        let obj = {
          Id: this.ischoose
        }
        this.cancel(obj, op)
      } else {
        this.$message({
          message: '请选择要取消的客户',
          type: 'warning'
        })
      }
    },
    // 退出共享
    quitshare (e, op) {
      const operating = this.$operatedata(this.operates, op)
      let obj = {
        CompanyIdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      DelCompanyShareInitiative(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '成功退出共享',
            type: 'success'
          })
          this.searchtable()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    quitshares (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
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
        CompanyIdArr: array,
      }
      showLoading()
      DelCompanyShareInitiative(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '共享取消成功',
            type: 'success'
          })
          this.searchtable()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 关注客户
    attentcustomer () {

    },
    // 保存弹框
    savedialog (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      if (this.issave) {
        // 添加
        let obj = {
          CompanyId: this.Id,
          SysUserId: data.SysUserId,
          Step: data.Step,
          TaskId: data.TaskId,
          FollowTime: data.FollowTime,
          Content: data.Content,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddCompanyFollow(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogvisible = false
            this.searchtable()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        // 修改
      }
    },
    // 取消共享保存
    sharesave () {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      var arry = []
      for (let i = 0; i < this.ShareList.length; i++) {
        if (this.ShareList[i].ischecked) {
          arry.push(this.ShareList[i].Id)
        }
      }
      if (arry.length == 0) {
        this.$message({
          message: '请选择要取消的共享人',
          type: 'warning'
        })
        return
      }
      let obj = {
        IdArr: arry.join(','),
        CompanyId: this.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      DelCompanyShareById(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '共享取消成功',
            type: 'success'
          })
          this.shareVisible = false
          this.searchtable()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 添加提醒
    addremind (e, op) {
      // 记录操作码,
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
      data.menuid = operating.MenuId,
        data.operationcode = operating.OperationCode
      data.Type = 0
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

    // 单选
    choosechange (e) {
      let istrue = this.ShareList.every(v => {
        return v.ischecked
      })
      this.Sharechecked = istrue
    },
    // 全选
    sharechange (e) {
      for (let i = 0; i < this.ShareList.length; i++) {
        this.ShareList[i].ischecked = e
      }
    },
  },
}
</script>

<style lang="scss">
.share-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    // padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 24px;
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
      .erpsearchinput.input {
        .el-input__inner {
          background-color: $erinputbgc !important;
        }
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
      width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 20px;
    padding: 20px;
    border-radius: 0px 0px 0px 8px;
    // .operate-table {
    //   // 右侧菜单栏固定的样式
    //   th.is-leaf {
    //     background: $tableHeader;
    //     font-weight: 700;
    //     color: $erp333;
    //     font-size: $f16;
    //   }
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
.erpdialog.cancelshare {
  .share-box {
    .title {
      font-size: $f14;
      color: $erp666;
      line-height: 28px;
      span {
        color: $erpcolor;
      }
    }
    .share-content {
      padding: 24px;
      overflow-y: auto;
      height: 300px;
      background-color: $erinputbgc;
      border-radius: 8px 8px 0 0;
      .share-con {
        line-height: 38px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        svg {
          width: 16px;
          font-size: $f16;
          display: inline-block;
        }
      }
    }
    .allcheck {
      padding: 0 0 24px 24px;
      border-radius: 0 0 8px 8px;
      background-color: $erinputbgc;
    }
  }
}
</style>