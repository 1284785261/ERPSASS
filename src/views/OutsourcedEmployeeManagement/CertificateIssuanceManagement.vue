<!-- 证明开具管理 -->
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="申请人姓名" label-width="100px">
            <el-input v-model="searchObject.UserName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入申请人姓名" />
          </el-form-item>
          <el-form-item label="身份证号码" label-width="100px">
            <el-input v-model="searchObject.IdCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入身份证号码" />
          </el-form-item>
          <el-form-item label="就职项目" label-width="90px">
            <el-input v-model="searchObject.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入就职项目" />
          </el-form-item>
          <el-form-item label="用工单位" label-width="90px">
            <el-input v-model="searchObject.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入用工单位" />
          </el-form-item>
          <el-form-item label="证明类型" label-width="90px">
            <el-select v-model="searchObject.ProveType" clearable placeholder="请选择证明类型" size="mini" class="select-input">
              <el-option v-for="item in CatagoryList" :key="item.ClassName" :label="item.ClassName" :value="item.Id" />
            </el-select>
          </el-form-item>
          <el-form-item label="证明状态" label-width="90px">
            <el-select v-model="searchObject.Status" clearable placeholder="请选择证明状态" size="mini" class="select-input">
              <el-option v-for="item in ProveApplyList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="table-content">
      <div>
        <div class="tableHeader-operation">
          <el-button class="operation-button" v-if="$operatebtn(operates, 'ProveOpens')" size="small" type="primary" @click="OpenProve('ProveOpens')">证明开具</el-button>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="ProveList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="Id" label="序号" width="60" />
          <el-table-column align="center" prop="StaffName" label="申请人" width="100" show-overflow-tooltip />
          <el-table-column align="center" prop="IdCode" label="身份证号码" width="180" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="ProjectName" label="就职项目" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyName" label="用工单位" min-width="140" show-overflow-tooltip /> -->
          <el-table-column align="center" prop="ProveTypeName" label="证明类型" width="140" show-overflow-tooltip />
          <el-table-column align="center" prop="UsedFor" label="证明用途" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="StatusText" label="状态" width="100" show-overflow-tooltip />
          <el-table-column align="center" prop="UserName" label="收件人姓名" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="Tel" label="收件人联系方式" width="160" show-overflow-tooltip />
          <el-table-column align="center" prop="SysUserName" label="受理人" width="100" show-overflow-tooltip />
          <el-table-column align="center" prop="AddTime" label="申请时间" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="HandleTime" label="受理时间" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.HandleTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates,['Modify','View'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <!-- <el-dropdown-item v-if="scope.row.Status == '0'" @click.native="SubAudit(scope.row,'SetRights')">提交审核</el-dropdown-item> -->
                    <!-- <el-dropdown-item v-if="scope.row.Status == '1'" @click.native="UploadStatus(scope.row,'SetRights')">取消审核</el-dropdown-item> -->
                    <!-- <el-dropdown-item v-if="scope.row.Status == '3'" @click.native="UploadStatus(scope.row,'SetRights')">变更状态</el-dropdown-item> -->
                    <el-dropdown-item v-if="scope.row.Status == '4' && $operatebtn(operates, 'View')" @click.native="LookProve(scope.row,'View')">查看</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation">
        <!-- <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" size="mini" @click="SubAudit(0,'Delete')">提交审核</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 证明开具 -->
    <ProveOpens :showAddProve="showAddProve" :title="ProveTitle" :tempData="tempData" @ProveSave="ProveSave" @closeProve="closeProve"></ProveOpens>
    <!-- 提交审核 -->
    <SubmitAudit :showAudit="showAudit" @closeAudit="closeAudit"></SubmitAudit>
    <!-- 变更状态 -->
    <!-- <ChangeStatus :showChange="showChange" @closeChange="closeChange" @ChangeSave="ChangeSave"></ChangeStatus> -->
    <!-- 查看证明开具 -->
    <LookProve :showLookProve="showLookProve" :tempData="tempData" @closelookProve="closelookProve"></LookProve>
  </div>
</template>

<script>
import { GetProveApplyEnumStatus, GetProveApplyPageList, EditProveApplyStatus, AddProveApply, EditProveApply, GetProveApplyInfo } from '@/api/OutsourcedEmployeeManagement.js'
import { GetCatagoryList } from '@/api/Public.js'
import SubmitAudit from './components/SubmitAudit'
import ChangeStatus from './components/ChangeStatus'
import LookProve from './components/LookProves'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import ProveOpens from '@/components/OutsourcedEmployeeManagement/ProveOpens.vue'
import qs from 'qs'
export default {
  components: {
    ProveOpens,
    SubmitAudit,
    // ChangeStatus,
    LookProve
  },
  data () {
    return {
      tableloading: false,
      searchObject: {
        UserName: '',
        IdCode: '',
        ProjectName: '',
        CompanyName: '',
        ProveType: '',
        Status: ''
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      statusList: [{
        id: -1,
        label: '全部'
      }, {
        id: 0,
        label: '禁用'
      },
      {
        id: 1,
        label: '启用'
      }],
      CatagoryList: [],//证明类型
      ProveApplyList: [],//证明状态
      ProveList: [],
      multipleSelection: [],
      checked: false,
      tempData: {},
      ProveTitle: '',
      showAddProve: false,
      showAudit: false,
      changeId: '',//变更ID
      showChange: false,
      showLookProve: false,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    this.getProveType()
    this.getCatagoryType()
    console.log(JSON.stringify(this.$route.meta.operations))
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetProveApplyPage(this.operatiOBj)
    }
  },
  methods: {
    //获取证明状态
    getProveType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProveApplyEnumStatus(qs.stringify(obj)).then(response => {
        if (response) {
          this.ProveApplyList = response
        }
      })
    },
    //获取证明类型数据
    getCatagoryType () {
      let obj = {
        status: 1,
        ClassType: 6,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.Data) {
          this.CatagoryList = response.Data
        }
      })
    },
    //搜索
    search () {
      this.currentPage = 1
      this.GetProveApplyPage(this.operatiOBj)
    },
    //获取证明开具列表
    GetProveApplyPage (operat) {
      this.tableloading = true
      const obj = {
        UserName: this.searchObject.UserName,
        IdCode: this.searchObject.IdCode,
        ProjectName: this.searchObject.ProjectName,
        CompanyName: this.searchObject.CompanyName,
        TermStatus: this.searchObject.TermStatus,
        ProveType: this.searchObject.ProveType > 0 ? this.searchObject.ProveType : '-1',
        Status: this.searchObject.Status > 0 ? this.searchObject.Status : '-1',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetProveApplyPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.ProveList = response.Data
          this.total = response.Total
        } else {
          this.ProveList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存添加和修改
    ProveSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditProveApply(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改证明开具成功!'
            })
            this.showAddProve = false
            this.GetProveApplyPage(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddProveApply(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '新增证明开具成功!'
            })
            this.showAddProve = false
            this.GetProveApplyPage(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.GetProveApplyPage(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetProveApplyPage(this.operatiOBj)
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.ProveList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    //新增证明开具
    OpenProve (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProveTitle = '新增证明开具';
      this.showAddProve = true;
    },
    //修改证明开具
    handleEdit (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProveTitle = '修改证明开具';
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProveApplyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddProve = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存变更状态
    ChangeSave (data) {
      let obj = {
        IdArr: this.changeId,
        Status: data.Status
      }
      EditProveApplyStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '变更状态成功!'
          })
          this.showChange = false
          this.GetProveApplyPage(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //提交审核
    SubAudit (data) {
      this.showAudit = true
    },
    //考虑一下审核
    closeAudit (val) {
      this.showAudit = val
    },
    //变更状态
    UploadStatus (data) {
      // this.changeId = data.Id
      // this.showChange = true
    },
    //查看证明开具
    LookProve (data, op) {
      const operating = this.$operatedata(this.operates, op)
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetProveApplyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showLookProve = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //关闭查看证明窗口
    closelookProve (val) {
      this.showLookProve = val
    },
    //关闭证明开具窗口
    closeProve (val) {
      this.showAddProve = val;
    },
    //关闭变更状态窗口
    closeChange (val) {
      this.showChange = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
}
</style>