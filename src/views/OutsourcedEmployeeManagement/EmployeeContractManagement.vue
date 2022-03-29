<!-- 员工合同管理 -->
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="员工姓名" label-width="90px">
            <el-input v-model="searchObject.StaffName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入员工姓名" />
          </el-form-item>
          <el-form-item label="用工单位" label-width="90px">
            <el-input v-model="searchObject.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入用工单位" />
          </el-form-item>
          <el-form-item label="就职项目" label-width="90px">
            <el-input v-model="searchObject.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入就职项目" />
          </el-form-item>
          <el-form-item label="入职公司" label-width="90px">
            <el-input v-model="searchObject.BfCompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入入职公司" />
          </el-form-item>
          <el-form-item label="合同状态" label-width="80px">
            <el-select v-model="searchObject.TermStatus" clearable placeholder="请选择合同状态" size="mini" class="select-input">
              <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.id" />
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
          <el-button class="operation-button" v-if="$operatebtn(operates, 'Import')" size="small" type="primary" @click="ContractImport('Import')">合同导入</el-button>
          <el-button class="operation-button" v-if="$operatebtn(operates, 'Add')" size="small" type="primary" @click="AddContract('Add')">添加合同</el-button>
          <div class="screening-compent">
            <!-- 筛选列组件 -->
            <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
          </div>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="StaffContractList" class="role-table erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" label="序号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Code',checkboxVal)" prop="Code" label="合同编号" min-width="160">
            <template slot-scope="scope">
              <a @click="lookContract(scope.row, 'View')" style="color:#1588F8;">{{scope.row.Code}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StaffName',checkboxVal)" prop="StaffName" label="员工姓名" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('TypeText',checkboxVal)" prop="TypeText" label="合同类型" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="入职公司" min-width="120" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="ProjectName" label="就职项目" width="120" show-overflow-tooltip /> -->
          <el-table-column align="center" v-if="$getColumsFlag('Salary',checkboxVal)" prop="Salary" label="合同工资(￥)" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('contractlimit',checkboxVal)" prop="contractlimit" label="试用期限" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('limit',checkboxVal)" prop="limit" label="合同期限" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SignDate',checkboxVal)" prop="SignDate" label="合同签订日期" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.SignDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SignType',checkboxVal)" prop="SignType" label="合同签订模式" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.SignType | SignType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="合同添加时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('TermStatusText',checkboxVal)" prop="TermStatusText" label="合同状态" min-width="120" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="Status" label="存档状态">
            <template slot-scope="scope">
              <span>{{scope.row.Status | archiveType}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete','RenewContract']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.TermStatusType == '2' && $operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'RenewContract')" @click.native="RenewContract(scope.row,'RenewContract')">续签合同</el-dropdown-item>
                    <!-- <el-dropdown-item v-if="scope.row.Status == '0'" @click.native="UploadStatus(scope.row,'SetRights')">转交存档</el-dropdown-item> -->
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation">
        <!-- <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" size="mini" @click="sharecustomer('Delete')">转交存档</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 续签合同 -->
    <RenewContract :showRenewContract="showRenewContract" :title="RenewTitle" @ContractSave="ContractSave" @closeRenewContract="closeRenewContract"></RenewContract>
    <!-- 转交存档 -->
    <Archive :showArchive="showArchive" @closeArchive="closeArchive"></Archive>
    <!-- 导入合同 -->
    <ImportContract :showImportContract="showImportContract" @ImportContractSave="ImportContractSave" @closeImportContract="closeImportContract"></ImportContract>

    <!-- 导入合同成功显示详情 -->
    <ImportTitle :TitleShow="TitleShow" :errorData="errorData" :title="ImportTitle" @closeTitle="closeTitle"></ImportTitle>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import Archive from './components/Archive'
import RenewContract from '@/components/OutsourcedEmployeeManagement/renewContract'
import ImportContract from '@/components/OutsourcedEmployeeManagement/ImportContract'
import ImportTitle from '@/components/publicComponents/ImportTitle'
import { GetStaffContractList, DeleteStaffContract, RenewalStaffContract, ImportStaffContract } from '@/api/OutsourcedEmployeeManagement.js'
import { MenuIdDate, showLoading, hideLoading, datemonth } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    Archive,
    RenewContract,
    ImportContract,
    ImportTitle,
    ScreeningComponent
  },
  data () {
    return {
      tableloading: false,
      searchObject: {
        CompanyName: '',
        ProjectName: '',
        BfCompanyName: '',
        StaffName: '',
        TermStatus: -1
      },
      StaffContractList: [],
      multipleSelection: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      statusList: [{
        id: -1,
        label: '全部'
      }, {
        id: 0,
        label: '有效期限内'
      }],
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "合同编号", prop: "Code" },
        { label: "员工姓名", prop: "StaffName" },
        { label: "合同类型", prop: "TypeText" },
        { label: "入职公司", prop: "BfCompanyName" },
        { label: "合同工资(￥)", prop: "Salary" },
        { label: "试用期限", prop: "contractlimit" },
        { label: "合同期限", prop: "limit" },
        { label: "合同签订日期", prop: "SignDate" },
        { label: "合同签订模式", prop: "SignType" },
        { label: "合同添加时间", prop: "AddTime" },
        { label: "合同状态", prop: "TermStatusText" },
      ],
      checked: false,
      RenewTitle: '续签合同',
      showArchive: false,
      showRenewContract: false,
      showImportContract: false,
      ContractId: '',
      ImportTitle: '合同导入信息',
      TitleShow: false,
      errorData: {},//合同导入信息
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getContract(this.operatiOBj)
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
    //搜索
    search () {
      this.currentPage = 1
      this.getContract(this.operatiOBj)
    },
    //获取合同列表
    getContract (operat) {
      this.tableloading = true
      const obj = {
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        BfCompanyName: this.searchObject.BfCompanyName,
        StaffName: this.searchObject.StaffName,
        TermStatus: this.searchObject.TermStatus,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetStaffContractList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.StaffContractList = response.Data
            for (let i = 0; i < this.StaffContractList.length; i++) {
              if (this.StaffContractList[i].ExpireDate && this.StaffContractList[i].StartDate) {
                this.StaffContractList[i].limit = datemonth(this.StaffContractList[i].ExpireDate, this.StaffContractList[i].StartDate)
              }
              if (this.StaffContractList[i].TryExpireDate && this.StaffContractList[i].TryStartDate) {
                this.StaffContractList[i].contractlimit = datemonth(this.StaffContractList[i].TryExpireDate, this.StaffContractList[i].TryStartDate)
              }
            }
            this.total = response.Total
          } else {
            this.StaffContractList = []
            this.total = 0
          }

        } else {
          this.StaffContractList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //删除合同
    roledetele (value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      if (value.Status == 0) {
        this.$confirm('确认删除当前合同吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteStaffContract(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getContract(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '当前合同已存档，无法删除！'
        })
      }
    },
    //添加合同
    AddContract (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddContract'
      })
    },
    //修改合同
    handleEdit (data, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddContract',
        query: {
          Id: data.Id
        }
      })
    },
    //查看合同
    lookContract (data, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/OutsourcedEmployeeManagement/LookContract',
        query: {
          Id: data.Id
        }
      })
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.StaffContractList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    //打开续签合同
    RenewContract (Data, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ContractId = Data.Id
      this.showRenewContract = true
    },
    //保存续签合同
    ContractSave (obj) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      obj.Id = this.ContractId
      this.tableloading = true
      obj.menuid = operating.MenuId
      obj.operationcode = operating.OperationCode
      RenewalStaffContract(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '续签合同成功!'
          })
          this.showRenewContract = false
          this.getContract(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭续签合同
    closeRenewContract (val) {
      this.showRenewContract = val
    },
    // 打开导入合同
    ContractImport (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.showImportContract = true
    },
    //导入合同事件是否成功信息
    ImportContractSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      ImportStaffContract(data).then(response => {
        if (response.IsSuccess) {
          this.errorData = response
          this.TitleShow = true
          this.showImportContract = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })

    },
    //关闭合同导入详情
    closeTitle (val) {
      this.TitleShow = val
    },
    //关闭导入合同
    closeImportContract (val) {
      this.showImportContract = val
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getContract(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getContract(this.operatiOBj)
    },
    //转交存档
    sharecustomer () {
      this.showArchive = true
    },
    //考虑一下
    closeArchive (val) {
      this.showArchive = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.screening-compent {
  float: right;
  // margin-bottom: 10px;
}
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
}
</style>