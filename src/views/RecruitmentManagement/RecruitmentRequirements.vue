// 招聘需求管理
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">项目名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入项目名称查询" size="small" v-model="searchform.ProjectName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">招聘岗位</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入招聘岗位查询" size="small" v-model="searchform.PositionName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">招聘负责人</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入招聘负责人查询" size="small" v-model="searchform.RecruiterName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      <!-- <el-button class="operation-button tableHeader-button" size="small" type="primary" v-if="$operatebtn(operates, 'Add')" @click="AddProject('Add')">新建项目</el-button> -->
    </div>
    <div class="table-content">
      <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="RecruitAssignList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('PositionName',checkboxVal)" prop="PositionName" label="招聘岗位" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" @click="LookDetails(scope.row)" style="color:#1588f8;">{{scope.row.PositionName}}</a>
              <span v-else>{{scope.row.PositionName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('NeedNum',checkboxVal)" prop="NeedNum" label="岗位人数" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('MgrFee',checkboxVal)" prop="MgrFee" label="管理费（人/月）" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.MgrFee}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Recruits',checkboxVal)" prop="Recruits" label="已招人数" min-width="120">
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" @click="LookNumberCalled(scope.row)" style="color:#1588f8;">{{scope.row.Recruits}}</a>
              <span v-else>{{scope.row.Recruits}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('TryTime',checkboxVal)" prop="TryTime" label="试用期限" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SiFund',checkboxVal)" prop="SiFund" label="五险一金" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Salary',checkboxVal)" prop="Salary" label="试用期薪资" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Salary}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Salarys',checkboxVal)" prop="Salary" label="综合薪资" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Salary}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('LiveEat',checkboxVal)" prop="LiveEat" label="是否包吃住" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AreaName',checkboxVal)" prop="AreaName" label="上岗地址" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.Address}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('RecruiterName',checkboxVal)" prop="RecruiterName" label="招聘负责人" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('RecruitStatusText',checkboxVal)" prop="RecruitStatusText" label="招聘需求状态" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '1' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitment(scope.row,'Modify')">编辑项目招聘信息</el-dropdown-item>
                    <el-dropdown-item v-if="(scope.row.RecruitStatus == '1' || scope.row.RecruitStatus == '4') && $operatebtn(operates, 'ModifyRecruiter')" @click.native="EditRecruiters(scope.row,'ModifyRecruiter')">修改招聘人员</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '1' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,2)">开始招聘</el-dropdown-item>
                    <el-dropdown-item v-if="(scope.row.RecruitStatus == '1' || scope.row.RecruitStatus == '2') && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,4)">取消招聘</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '2' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,3)">暂停招聘</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '2' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,5)">已完成</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '5' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,1)">重新招聘</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '3' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,2)">继续招聘</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.RecruitStatus == '4' && $operatebtn(operates, 'Modify')" @click.native="EditRecruitStatus(scope.row,1)">重启招聘</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 50, 100, 1000]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <!-- 修改招聘人员 -->
      <ModifyStaff :title="ModifyStaffTitle" :visible="ModifyStaffVisible" :ModifyStaffData="ModifyStaffData" @CloseModifyStaff="CloseModifyStaff" @ModifyStaffSave="ModifyStaffSave"></ModifyStaff>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetProjectRecruitList, EditRecruitAssignRecruiter, GetRecruitAssignList } from '@/api/RecruitmentManagement.js'
import { GetProjectRecruitEnumRecruitStatus, EditdProjectRecruitRecruitStatus } from '@/api/projectManagement.js'
import ModifyStaff from './components/dialog-ModifyStaff.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    ModifyStaff,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        ProjectName: '',
        PositionName: '',
        RecruiterName: '',
        RecruitStatus: 0
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "招聘岗位", prop: "PositionName" },
        { label: "岗位人数", prop: "NeedNum" },
        { label: "管理费（人/月）", prop: "MgrFee" },
        { label: "已招人数", prop: "Recruits" },
        { label: "试用期限", prop: "TryTime" },
        { label: "五险一金", prop: "SiFund" },
        { label: "试用期薪资", prop: "Salary" },
        { label: "综合薪资", prop: "Salarys" },
        { label: "是否包吃住", prop: "LiveEat" },
        { label: "上岗地址", prop: "AreaName" },
        { label: "招聘负责人", prop: "RecruiterName" },
        { label: "招聘需求状态", prop: "RecruitStatusText" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      RecruitAssignList: [],
      tableloading: false, // 加载动画
      showAddBank: false,
      AddBankTitle: '',
      tempData: {},
      tabidx: 0,
      tablist: [],
      checked: false,
      ShowclaimList: false,
      ModifyStaffVisible: false,
      ModifyStaffTitle: '修改招聘人员',
      ProjectRecruitId: '',
      ModifyStaffData: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query',
        IdArr: ''
      }
    }
  },
  created () {
    this.GetProjectRecruitEnumRecruitStatus()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      if (this.$route.query && this.$route.query.IdArr) {
        this.PageSize = 1000
        this.operatiOBj.IdArr = this.$route.query.IdArr
      }
      this.getRecruitment(this.operatiOBj)
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //获取全部招聘状态
    GetProjectRecruitEnumRecruitStatus () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectRecruitEnumRecruitStatus(qs.stringify(obj)).then(response => {
        this.tablist = response
        this.tablist.unshift({ value: 0, describe: "全部" })
      })
    },
    searchtable () {
      this.currentPage = 1
      this.getRecruitment(this.operatiOBj)
    },
    // 切换tab栏
    choosetab (e) {
      console.log(e)
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.searchform.RecruitStatus = e.value
        this.getRecruitment(this.operatiOBj)
      }
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getRecruitment(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRecruitment(this.operatiOBj)
    },
    //获取招聘需求列表数据
    getRecruitment (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 10
      data.IdArr = operat.IdArrs || ''
      data.menuid = operat.menuid || MenuIdDate()
      data.operationcode = operat.OperationCode || '1'
      GetProjectRecruitList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess && response.Data.length > 0) {
            this.RecruitAssignList = response.Data
            this.total = response.Total
          //   console.log(this.RecruitAssignList);
          // } else {
          //   this.RecruitAssignList = []
          //   this.total = 0
          //   console.log(this.RecruitAssignList);
          // }
        } else {
          this.RecruitAssignList = []
            // console.log(this.RecruitAssignList);
          this.total = 0
          // this.$message({
          //   message: response.MessageContent,
          //   type: 'error'
          // })
        }
      })
    },
    //查看项目招聘需求
    LookDetails (data) {
      const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/RecruitmentRrequirementDetails',
        query: {
          Id: data.Id
        }
      })
      window.open(href, '_blank')
    },
    //查看已招人员
    LookNumberCalled (data) {
      const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/NumberCalled',
        query: {
          Id: data.Id
        }
      })
      window.open(href, '_blank')
    },
    //修改项目招聘需求
    EditRecruitment (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/RecruitmentManagement/RecruitmentService',
        query: {
          Id: data.Id
        }
      })
    },
    //修改招聘人员
    EditRecruiters (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.ProjectRecruitId = data.Id
      let obj = {
        'ProjectRecruitId': this.ProjectRecruitId,
        'menuid': MenuIdDate(),
        'operationcode': '1'
      }
      GetRecruitAssignList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.ModifyStaffData = response.Data
            for (let i = 0; i < response.Data.length; i++) {
              this.ModifyStaffData[i].Type = 0
              this.ModifyStaffData[i].Id = response.Data[i].Recruiter
              this.ModifyStaffData[i].UserName = response.Data[i].RecruiterName
              this.ModifyStaffData[i].ischecked = true
            }
          }
        }
        this.ModifyStaffVisible = true
      })

    },
    ModifyStaffSave (data) {
      console.log(data)
      let EditRecruitAssignRecruiterList = []
      for (let i = 0; i < data.length; i++) {
        EditRecruitAssignRecruiterList.push({
          Recruiter: data[i].Id
        })

      }
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      let obj = {
        ProjectRecruitId: this.ProjectRecruitId,
        EditRecruitAssignRecruiterList: EditRecruitAssignRecruiterList,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      EditRecruitAssignRecruiter(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '修改招聘人员成功',
            type: 'success'
          })
          this.ModifyStaffVisible = false
          this.getRecruitment(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    CloseModifyStaff (val) {
      this.ModifyStaffVisible = val
    },
    //修改招聘状态
    EditRecruitStatus (item, status) {
      this.$confirm('此操作将变更当前招聘需求状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: item.Id,
          RecruitStatus: status,
          menuid: MenuIdDate(),// operating.MenuId,
          operationcode: '1' // operating.OperationCode
        }
        EditdProjectRecruitRecruitStatus(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: response.MessageContent,
              type: 'success'
            })
            this.getRecruitment(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.social-security-management-container {
  .search-bar {
    padding: 24px 24px 12px 24px;
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
    margin-bottom: 16px;
  }
  .operate-table {
    margin-bottom: 20px;
  }
  .content {
    background-color: #fff;
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

  .table-content {
    border-radius: 0;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
}
</style>