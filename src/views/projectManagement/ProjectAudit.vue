<!-- 项目指派管理 -->
<template>
  <div class="project-audit-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="项目名称" label-width="80px">
            <el-input v-model="searchObject.Name" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入项目名称" @keyup.enter.native="search" />
          </el-form-item>
          <el-form-item label="负责人名称" label-width="110px">
            <el-input v-model="searchObject.SysUserName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入负责人名称" @keyup.enter.native="search" />
          </el-form-item>
          <el-form-item label="项目业务类型" label-width="110px">
            <el-select v-model="searchObject.BusinessType" clearable placeholder="请选择项目业务类型" size="mini" class="select-input" @keyup.enter.native="search">
              <el-option v-for="item in BusinessList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目优先级" label-width="100px">
            <el-select v-model="searchObject.Priority" clearable placeholder="请选择项目优先级" size="mini" class="select-input" @keyup.enter.native="search">
              <el-option v-for="item in PriorityList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-button class="erpbtn" size="small" @click="search">
            搜索
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="table-content">
      <div>
        <div class="tab clearfix">
          <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
        </div>
        <!-- <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent> -->
        <div class="roletable-box">
          <el-table ref="industrtTable" v-loading="tableloading" :data="ProjectList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="60" />
            <el-table-column align="center" prop="Code" width="140" label="项目编码" />
            <el-table-column align="center" prop="Name" min-width="150" label="项目名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="PorjectDetails(scope.row, 'View')" style="color:#1588F8;">{{scope.row.Name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="BusinessTypeText" width="100" label="项目类型" />
            <el-table-column align="center" prop="Priority" width="100" label="项目优先级">
              <template slot-scope="scope">
                <span>{{scope.row.Priority | Priority}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AdminName" min-width="100" label="项目管理员" show-overflow-tooltip />
            <el-table-column align="center" prop="CompanyName" min-width="150" label="相关客户" show-overflow-tooltip />
            <el-table-column align="center" prop="AddTime" width="120" label="项目新建日期">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StartDate" width="120" label="项目合同起始日期">
              <template slot-scope="scope">
                <span>{{scope.row.StartDate | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FollowCount" width="120" label="项目沟通记录">
              <template slot-scope="scope">
                <span>{{scope.row.FollowCount}}条</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StatusText" width="100" label="项目状态" />
            <el-table-column align="center" prop="StatusText" width="120" label="转交审核状态" />
            <el-table-column align="center" prop="SysUserName" width="100" label="项目创建人" />
            <el-table-column align="center" prop="AssignerName" width="100" label="项目指派人" />
            <!-- <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item @click.native="watchdetail(scope.row)">查看</el-dropdown-item>
                      <el-dropdown-item @click.native="Assignprojectmanager(scope.row)">指派项目管理员</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column> -->
          </el-table>
          <div class="pagina-fonter">
            <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
      <!-- <div class="dialog">
        <appointee :title="appointeename" :visible="appointeevisible" :contentdata="appointeecontentdata" @closedialog="closedialog" @saveappointee="saveappointee"></appointee>
      </div> -->
    </div>
  </div>
</template>

<script>
import { GetProjectBusinessType, GetProjectAssignList, AddProjectAssign, EditProjectAssign } from '@/api/projectManagement.js'
import filters from '@/utils/filters.js'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import appointee from './components/dialog-designate.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    // appointee
    ScreeningComponent
  },
  data () {
    return {
      searchObject: {
        Name: '',
        SysUserName: '',
        BusinessType: '',
        Priority: '',
        Status: -1
      },
      BusinessList: [], // 项目业务类型
      PriorityList: [{
        value: 0,
        describe: '低'
      }, {
        value: 1,
        describe: '中'
      }, {
        value: 2,
        describe: '高'
      }],//项目优先级
      tabidx: -1, // tab栏默认选择
      tablist: [{
        value: -1,
        describe: '全部'
      }, {
        value: 3,
        describe: '待审核'
      }, {
        value: 5,
        describe: '审核完成'
      }, {
        value: 4,
        describe: '审核失败'
      }],
      ProjectList: [],
      tableloading: false,
      checked: false,

      appointeename: '指派项目管理员',
      treetitle: '请选择要指派的同事',
      placetitle: '搜索要指派的同事',
      appointeevisible: false,
      appointeecontentdata: {},

      multipleSelection: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      formTheadOptions:[
      {label: "项目编码", prop: "Code"},
      {label: "项目名称", prop: "Name"},
      {label: "项目类型", prop: "BusinessTypeText"},
      {label: "项目优先级", prop: "Priority"},
      {label: "项目管理员", prop: "AdminName"},
      {label: "相关客户", prop: "CompanyName"},
      {label: "项目新建日期", prop: "AddTime"},
      {label: "项目合同起始日期", prop: "StartDate"},
      {label: "项目沟通记录", prop: "FollowCount"},
      {label: "项目状态", prop: "StatusText"},
      {label: "转交审核状态", prop: "AuditStatus"},
      {label: "项目创建人", prop: "SysUserName"},
      {label: "项目指派人", prop: "AssignerName"}],
      operates: [], // 获取页面权限
    }
  },
  created () {
    this.operates = this.$route.meta.operations
    console.log(JSON.parse(JSON.stringify(this.operates)))

    this.getProjectAssignList()
    this.getCatagoryType()
  },
  methods: {
    // 搜索
    search () {
      this.currentPage = 1
      this.getProjectAssignList()
    },
    getProjectAssignList () {
      let obj = {
        Name: this.searchObject.Name,
        SysUserName: this.searchObject.SysUserName,
        Status: this.tabidx,
        BusinessType: this.searchObject.BusinessType === '' ? -1 : this.searchObject.BusinessType,
        Priority: this.searchObject.Priority === '' ? -1 : this.searchObject.Priority,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetProjectAssignList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.ProjectList = response.Data
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    //获取项目类型数据
    getCatagoryType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response
        }
      })
    },
    //跳转项目详情
    PorjectDetails (data, op) {
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
        path: '/projectManagement/ProjectDetail',
        query: {
          Id: data.Id,
          isSys: true
        }
      })
      window.open(href, '_blank')
    },
    // 指派项目管理员
    Assignprojectmanager (e) {
      this.Id = e.Id
      this.appointeevisible = true
    },
    // 保存项目指派人员
    saveappointee (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let arry = []
      for (let i = 0; i < e.length; i++) {
        if (e[i].Type && e[i].Type.length) {
          for (let j = 0; j < e[i].Type.length; j++) {
            arry.push({
              Type: e[i].Type[j],
              UserId: e[i].Id,
              Remark: e[i].Remark
            })
          }
        } else {
          arry.push({
            Type: e[i].Type[0],
            UserId: e[i].Id,
            Remark: e[i].Remark
          })
        }
      }
      let obj = {
        // Id: 
        ProjectId: this.Id,
        // Members: JSON.stringify(arry)
        Members: arry,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      AddProjectAssign(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.appointeevisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    closedialog () {
      this.appointeevisible = false
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.ProjectList.length
      this.multipleSelection = value
    },
    // 选择tab栏
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.getProjectAssignList()
      }
    },
    //分页处理
    handleSizeChange (val) {
      this.currentPage = 1
      this.PageSize = val
      this.getProjectAssignList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectAssignList()
    },
  },
}
</script>

<style lang="scss" scoped>
.project-audit-container {
  .table-content {
    position: relative;
    background: #f0f4fa;
    padding: 0;
    .roletable-box {
      background: #fff;
      padding: 20px;
    }
  }
}
</style>