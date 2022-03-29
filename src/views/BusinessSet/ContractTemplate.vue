// 合同模板管理
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="合同模板名称" label-width="120px">
            <el-input v-model="searchObject.ContractName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入合同模板名称" />
          </el-form-item>
          <el-form-item label="适用业务" label-width="80px">
            <el-select v-model="searchObject.BusinessType" clearable placeholder="请选择适用业务" size="mini" class="select-input">
              <el-option v-for="item in BusinessList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态" label-width="80px">
            <el-select v-model="searchObject.Status" placeholder="请选择" size="mini" class="select-input">
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
          <el-button class="operation-button" v-if="$operatebtn(operates, 'Add')" size="mini" round @click="handleCreate('Add')">
            添加合同模板
          </el-button>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="ContractList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="Id" label="编号" />
          <el-table-column align="center" prop="ContractName" label="合同模板名称" />
          <el-table-column align="center" prop="BusinessTypeText" label="适用业务" />
          <el-table-column align="center" prop="SysUserName" label="创建人" />
          <el-table-column align="center" prop="AddTime" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | YYMMddhhmmssTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="UpdateTime" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.UpdateTime | YYMMddhhmmssTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.Status | usestatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','Modify','Disabled','Enabled','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookContract(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">编辑</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 0 && $operatebtn(operates, 'Enabled')" @click.native="UploadStatus(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')" @click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button del-button" v-if="$operatebtn(operates,'Delete')" size="mini" @click="Alldelete('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 查看合同模板 -->
    <LookContract :showlookContract="showlookContract" :tempData="tempData" :title="lookContractTitle" @closelookContract="closelookContract"></LookContract>
    <!-- 编辑合同模板 -->
    <AddContract :showAddContract="showAddContract" :tempData="tempData" @ContractSave="ContractSave" @closeContract="closeContract" :title="ContractTile"></AddContract>
  </div>
</template>
<script>
import AddContract from './components/addContract'
import LookContract from './components/lookContract'
import { GetContractTemplateBusinessType, GetContractTemplateList, AddContractTemplate, EditContractTemplate, EditContractTemplateStatus, GetContractTemplate, DeleteContractTemplate } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    AddContract,
    LookContract
  },
  data () {
    return {
      tableloading: false,
      showAddContract: false,
      ContractTile: '添加合同模板',
      showlookContract: false,
      lookContractTitle: '查看合同模板',
      BusinessList: [],
      searchObject: {
        ContractName: '',
        BusinessType: '',
        Status: -1
      },
      BusinessType: [],
      multipleSelection: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      checked: false,
      ContractList: [],
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
      tempData: {},
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    this.getType()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getContractList(this.operatiOBj)
    }
  },
  methods: {
    //获取模板业务类型
    getType () {
      let data = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetContractTemplateBusinessType(qs.stringify(data)).then(response => {
        this.BusinessList = response
      })
    },
    //获取列表数据
    getContractList (operat) {
      this.tableloading = true
      const obj = {
        ContractName: this.searchObject.ContractName,
        BusinessType: this.searchObject.BusinessType > '-1' ? this.searchObject.BusinessType : '-1',
        Status: this.searchObject.Status,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetContractTemplateList(qs.stringify(obj)).then(res => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.ContractList = res.Data
          this.total = res.Total
        } else {
          this.ContractList = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查询列表
    search () {
      this.currentPage = 1
      this.getContractList(this.operatiOBj)
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.ContractList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    LookContract (data, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetContractTemplate(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showlookContract = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //关闭查看模板
    closelookContract (val) {
      this.showlookContract = val
    },
    //新增合同模板
    handleCreate (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.ContractTile = '添加合同模板'
      this.showAddContract = true
    },
    //关闭合同模板窗口
    closeContract (val) {
      this.showAddContract = val
    },
    //打开修改合同模板窗口
    handleEdit (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.ContractTile = '修改合同模板'
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetContractTemplate(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddContract = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存添加合同
    ContractSave (data) {
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating'))
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditContractTemplate(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改合同模板成功!'
            })
            this.showAddContract = false
            this.getContractList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddContractTemplate(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加合同模板成功!'
            })
            this.showAddContract = false
            this.getContractList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    },
    //修改状态
    UploadStatus (data, str) {
      const operating = this.$operatedata(this.operates, str)
      let param = {
        Id: data.Id,
        Status: '',
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      let strPrompt = '', successPrompt = ''
      if (data.Status == '1') {
        param.Status = '0'
        strPrompt = '你确定禁用此合同模板吗?'
        successPrompt = '禁用账号成功！'
      } else if (data.Status == '0') {
        param.Status = '1'
        strPrompt = '你确定启用此合同模板吗?'
        successPrompt = '启用账号成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditContractTemplateStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: successPrompt
            })
            this.getContractList(this.operatiOBj)
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
          message: '已取消操作'
        })
      })
    },
    // 单个删除
    roledetele (value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该合同模板', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteContractTemplate(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getContractList(this.operatiOBj)
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
    },
    // 批量删除
    Alldelete (strs) {
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        const obj = {
          Id: arr.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        this.$confirm('此操作将批量删除选中的合同模板', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteContractTemplate(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getContractList(this.operatiOBj)
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
          type: 'warning',
          message: '请选择要删除的合同模板'
        })
      }
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getContractList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getContractList(this.operatiOBj)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.tableHeader-operation {
  text-align: right;
  margin-bottom: 20px;
}
</style>