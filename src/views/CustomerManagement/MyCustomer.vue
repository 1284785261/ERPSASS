<!-- 我的客户 -->
<template>
  <div class="operate-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">客户名称</div>
        <el-input class="erpsearchinput" placeholder="请输入客户名称进行查询" size="small" v-model="searchform.Name" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">负责人名称</div>
        <el-input class="erpsearchinput" placeholder="请输入负责人名称进行查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
      <div class="operate-top">
        <!-- <el-button size="small" class="addmenu erpbtn" @click="derive">导出</el-button>
        <el-button size="small" class="addmenu erpbtn" @click="channel">导入</el-button> -->
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'Add')" @click="reportcustomer('Add')">客户报备</el-button>
      </div>
    </div>
    <div class="content">
      <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" tooltip-effect="dark" :data="tableData" max-height="600" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" min-width="55" fixed="left" label="全选" />
          <el-table-column key="1" v-if="$getColumsFlag('Code',checkboxVal)" align="center" prop="Code" min-width="150" fixed="left" label="编号" />
          <el-table-column key="2" v-if="$getColumsFlag('Name',checkboxVal)" align="center" prop="Name" min-width="150" fixed="left" label="客户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchcustom(scope.row, 'View')">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column key="3" v-if="$getColumsFlag('BusinessTypeArr',checkboxVal)" align="center" prop="BusinessTypeArr" label="业务类型" min-width="100" show-overflow-tooltip />
          <el-table-column key="4" v-if="$getColumsFlag('LevelText',checkboxVal)" align="center" prop="LevelText" min-width="100" label="客户等级" />
          <el-table-column key="5" v-if="$getColumsFlag('SysUserName',checkboxVal)" align="center" prop="SysUserName" min-width="80" label="负责人" />
          <el-table-column key="6" v-if="$getColumsFlag('TypeText',checkboxVal)" align="center" prop="TypeText" min-width="100" label="客户状态" />
          <el-table-column key="7" v-if="$getColumsFlag('NCCode',checkboxVal)" align="center" prop="NCCode" min-width="180" label="NC码" />
          <el-table-column key="8" v-if="$getColumsFlag('AddTime',checkboxVal)" align="center" prop="AddTime" min-width="160" label="报备时间">
            <template slot-scope="scope">
              {{scope.row.AddTime | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column key="9" v-if="$getColumsFlag('FollowDate',checkboxVal)" align="center" prop="FollowDate" min-width="160" label="最近跟进时间">
            <template slot-scope="scope">
              {{scope.row.FollowDate | YYMMddhhmmssTime}}
            </template>
          </el-table-column>
          <el-table-column key="10" v-if="$getColumsFlag('ProjectNumber',checkboxVal)" align="center" prop="ProjectNumber" min-width="120" label="相关项目数量" />
          <el-table-column key="11" v-if="$getColumsFlag('FollowNumber',checkboxVal)" align="center" prop="FollowNumber" min-width="120" label="跟进信息数量">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchfollow(scope.row, 'View')">{{scope.row.FollowNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column key="12" v-if="$getColumsFlag('Status',checkboxVal)" align="center" prop="Status" min-width="100" label="使用状态">
            <template slot-scope="scope">
              {{scope.row.Status | usestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Modify', 'AddFollow', 'Disabled', 'Enabled', 'AddRemind'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row, 'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddFollow')" @click.native="addfollow(scope.row, 'AddFollow')">添加跟进信息</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Disabled')" v-show="scope.row.Status == 1" @click.native="disable(scope.row, 'Disabled')">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Enabled')" v-show="scope.row.Status == 0" @click.native="enable(scope.row, 'Enabled')">启用</el-dropdown-item>
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
        <!-- <el-button size="small" class="erpdelete" @click="alldeletes">删除</el-button> -->
        <!-- <el-button size="small" class="erpdelete" @click="alldeletes">批量删除</el-button> -->
        <el-button size="small" v-if="$operatebtn(operates, 'ConvertShare')" class="addmenu erpbtn" @click="sharecustomer('ConvertShare')">转为共享客户</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'ConvertCommon')" class="addmenu erpbtn" @click="changecustomer('ConvertCommon')">转为公共客户</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'ModificationPerson')" class="addmenu erpbtn" @click="updatecustomer('ModificationPerson')">修改负责人</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Enabled')" class="addmenu erpbtn" @click="enables('Enabled')">启用</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Disabled')" class="erpdelete" @click="disables('Disabled')">禁用</el-button>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="attentcustomer">关注客户</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 1000]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <dialogfollow :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></dialogfollow>
      <dialogsharecustomer :title="sharename" :visible="sharevisible" :contentdata="sharecontentdata" @closedialog="closedialog" @savesharecustomer="savesharecustomer"></dialogsharecustomer>
      <dialogupdateprincipal :title="principalname" :visible="principalvisible" :contentdata="principalcontentdata" @closedialog="closedialog" @saveprincipal="saveprincipal"></dialogupdateprincipal>
    </div>
    <AddRemind :showRemind="showRemind" :title="remindtitle" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
  </div>
</template>

<script>
import dialogfollow from './components/dialog-follow'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import dialogsharecustomer from './components/dialog-sharecustomer'
import dialogupdateprincipal from './components/dialog-updateprincipal'
import { GetCompanyPageList, AddCompanyFollow, EditCompanyStatus, EditCompanyType, AddCustomersShared, EditCompanySysUserId } from '@/api/CustomerManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import AddRemind from '@/components/publicComponents/AddRemind'
import { AddReminds } from '@/api/Remind.js'
import qs from 'qs'
export default {
  components: {
    dialogfollow,
    dialogsharecustomer,
    dialogupdateprincipal,
    AddRemind,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        Name: '',
        SysUserName: '',
        ContactName: '', // 暂时没这个搜索条件
        StartDate: '',
        EditDate: ''
      },
      tableloading: false,
      tableData: [],
      allchecked: false, // 全选
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      sharename: '', // 弹框名
      sharevisible: false,
      sharecontentdata: {}, // 弹框内容
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      principalname: '修改负责人',
      principalvisible: false,
      principalcontentdata: {},
      issave: false,
      Ids: [],
      Id: '',
      messageconent: '', // 弹框消息提示
      formTheadOptions: [
        { label: "编号", prop: "Code" },
        { label: "客户名称", prop: "Name" },
        { label: "业务类型", prop: "BusinessTypeArr" },
        { label: "客户等级", prop: "LevelText" },
        { label: "负责人", prop: "SysUserName" },
        { label: "客户状态", prop: "TypeText" },
        { label: "NC码", prop: "NCCode" },
        { label: "报备时间", prop: "AddTime" },
        { label: "最近跟进时间", prop: "FollowDate" },
        { label: "相关项目数量", prop: "ProjectNumber" },
        { label: "跟进信息数量", prop: "FollowNumber" },
        { label: "使用状态", prop: "Status" },
      ],
      checkboxVal: [],
      // CheckedScreeAll: true,
      // showScreen: true,
      showRemind: false,
      remindtitle: '添加客户提醒',

      operates: [], // 获取页面权限
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    console.log(this.operates);

    if (this.$route.query && this.$route.query.IdArr) {
      this.PageSize = 1000
      this.getCompanyPageList(this.$route.query.IdArr)
    } else {
      this.getCompanyPageList()
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }

  },
  mounted () {
  },
  methods: {
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    // getColumsFlag (str) {
    //   let flag = false
    //   for (let i = 0; i < this.checkboxVal.length; i++) {
    //     if (this.checkboxVal[i] == str) {
    //       flag = true
    //     }
    //   }
    //   return flag
    // },
    // onShowScreen () {
    //   this.showScreen = !this.showScreen
    // },
    // CheckedScreenAll () {
    //   console.log(this.CheckedScreeAll)
    //   if (this.CheckedScreeAll) {
    //     for (let i = 0; i < this.formTheadOptions.length; i++) {
    //       this.checkboxVal.push(this.formTheadOptions[i].prop)
    //     }
    //   } else {
    //     this.checkboxVal = []
    //   }
    // },
    // SelectScreen () {
    //   console.log(this.checkboxVal)
    // },
    // 获取数据
    getCompanyPageList (IdArrs) {
      const operating = this.$operatedata(this.operates, 'Query')
      let obj = {
        IdArr: IdArrs || '',
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Name: this.searchform.Name,
        SysUserName: this.searchform.SysUserName,
        StartDate: this.searchform.StartDate,
        EditDate: this.searchform.EditDate,
        Type: -1,
        Status: -1,
        OpenPermission: true,
        QueryScope: 0,
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
      if (!operating.MenuId) {
        this.$message({
          message: '没有权限查看',
          type: 'warning'
        })
        return
      }
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
    // 导出
    derive () {

    },
    // 导入
    channel () {

    },
    // 客户报备
    reportcustomer (op) {
      // 记录这个页面的地址,填充面包屑
      // console.log(this.$route);
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      this.$router.push({
        path: '/CustomerManagement/AddCustomer'
      })

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
    view () { },
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
    attention () {

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
      this.$router.push({
        path: '/CustomerManagement/AddCustomer',
        query: {
          id: e.Id
        }
      })
    },
    // 多选禁用
    disables (op) {
      var array = ''
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      if (this.Ids.length === 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      } else {
        array = this.Ids.join(',')
      }
      let obj = {
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1',
        IdArr: array,
        Status: 0,
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
    // 多选启用
    enables (op) {
      const operating = this.$operatedata(this.operates, op)
      var array = ''
      if (this.Ids.length === 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      } else {
        array = this.Ids.join(',')
      }
      let obj = {
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1',
        IdArr: array,
        Status: 1,
      }
      showLoading()
      EditCompanyStatus(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '当前客户已经被启用',
            type: 'success',
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
      this.sharevisible = false
      this.principalvisible = false
    },
    // 共享客户
    sharecustomer (op) {
      // this.sharecontentdata = {
      //   Id: e.Id
      // }
      // 操作码
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      var array = ''
      if (this.Ids.length === 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      }
      this.sharename = "共享客户"
      this.sharevisible = true
    },
    // 转为公客
    changecustomer (op) {
      // 操作码
      const operating = this.$operatedata(this.operates, op)
      // window.localStorage.setItem('operating', JSON.stringify(operating))
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
        Type: 2,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1',
        IdArr: array,
      }
      this.messageconent = '转为公公共客户后，当前客户将进入共享客户池，您确认转出当前客户吗？'
      this.$confirm(`${this.messageconent}`, '客户转为公客提示', {
        confirmButtonText: '确定',
        confirmButtonClass: 'erpdelete',
        cancelButtonText: '取消',
        cancelButtonClass: 'erpbtn',
        customClass: 'erpconfirm',
      }).then(() => {
        showLoading()
        EditCompanyType(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getCompanyPageList()
          } else {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '<span style="line-height:20px;">' + response.MessageContent + '</span>',
              type: 'error'
            })
          }
          hideLoading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 修改负责人
    updatecustomer (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      var array = ''
      if (this.Ids.length == 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      }
      this.principalvisible = true
    },
    // 关注客户
    attentcustomer () {

    },
    // 启用
    enable (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      let obj = {
        IdArr: e.Id,
        Status: 1,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
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
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
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
          menuid: operating.MenuId || MenuIdDate(),
          operationcode: operating.OperationCode || '1'
        }
        showLoading()
        AddCompanyFollow(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getCompanyPageList()
            this.dialogvisible = false
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
    // 保存共享
    savesharecustomer (e) {
      var arry = []
      // for (let i = 0; i < e.length; i++) {
      //   arry.push(e[i])
      //   for (let j = 0; j < this.Ids.length; j++) {
      //     console.log(this.Ids[j]);

      //     e[i].CompanyId = this.Ids[j]
      //   }
      // }
      // 选择人数限制
      if (e.length > 50) {
        this.$message({
          message: '请选择少于50人',
          type: 'warning'
        })
        return
      }
      for (let i = 0; i < this.Ids.length; i++) {
        for (let j = 0; j < e.length; j++) {
          arry.push({
            Id: e[j].Id,
            SysUserId: e[j].SysUserId,
            CompanyId: this.Ids[i]
          })
        }
      }
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let obj = {
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1',
        AddCompanyShareList: arry,
      }
      showLoading()
      AddCustomersShared(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '共享成功',
            type: 'success'
          })
          this.sharevisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    // 修改负责人
    saveprincipal (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let obj = {
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1',
        IdArr: this.Ids.join(','),
        SysUserId: e,
      }
      showLoading()
      EditCompanySysUserId(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '负责人修改成功',
            type: 'success'
          })
          this.principalvisible = false
          this.getCompanyPageList()
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
      data.menuid = operating.MenuId || MenuIdDate(),
      data.operationcode = operating.OperationCode || '1'
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
  },
}
</script>

<style lang="scss">
.operate-container {
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
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .screening-compent {
      float: right;
      margin-bottom: 10px;
    }
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
    //           .watchcode {
    //             cursor: pointer;
    //             color: $erpcolor;
    //           }
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