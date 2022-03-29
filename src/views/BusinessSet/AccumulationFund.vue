//公积金计算规则
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="公积金规则名称" label-width="130px">
            <el-input v-model="searchObject.RuleName" clearable suffix-icon="el-icon-search" class="select-input" placeholder="请输入公积金规则名称" />
          </el-form-item>
          <el-form-item label="规则配置人" label-width="120px">
            <el-input v-model="searchObject.SysUserName" clearable suffix-icon="el-icon-search" class="select-input" placeholder="请输入规则配置人" />
          </el-form-item>
          <el-form-item label="启用状态" label-width="120px">
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
            新建公积金计算规则
          </el-button>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="AccumulationList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="Id" label="编号" />
          <el-table-column align="center" prop="RuleName" label="公积金规则名称" />
          <el-table-column align="center" prop="SysUserName" label="规则配置人" />
          <el-table-column align="center" prop="AddTime" label="配置时间">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Status" label="使用状态">
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
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="lookAccumu(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改公积金计算规则</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Enabled')" @click.native="UploadStatus(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == '1' && $operatebtn(operates, 'Disabled')" @click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation" v-if="($operatebtns(operates,['Disabled','Enabled','Delete']))">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" v-if="$operatebtn(operates,'Enabled')" size="mini" @click="AllStatus(0,'Enabled')">启用</el-button>
        <el-button round class="operation-button" v-if="$operatebtn(operates,'Disabled')" size="mini" @click="AllStatus(1,'Disabled')">禁用</el-button>
        <el-button round class="operation-button del-button" v-if="$operatebtn(operates,'Delete')" size="mini" @click="Alldelete('Delete')">批量删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 查看公积金 -->
    <LookAccumulation :showlookAccumulation="showlookAccumulation" :tempData="tempData" :title="lookAccumulationTitle" @closelookAccumulation="closelookAccumulation"></LookAccumulation>
    <!-- 新增公积金窗口 -->
    <AddAccumulation :showAddAccumulation="showAddAccumulation" :tempData="tempData" @AccumulationSave="AccumulationSave" @closeAddAccumulation="closeAddAccumulation" :title="AccumulatiopnTitle"></AddAccumulation>
  </div>
</template>
<script>
import { GetFundRuleList, GetFundRule, EditFundRuleStatus, EditFundRule, AddFundRule, DeleteFundRule } from '@/api/BusinessSet.js'
import filters from '@/utils/filters'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import AddAccumulation from './components/addAccumulation'
import LookAccumulation from './components/lookAccumulation'
export default {
  components: {
    AddAccumulation,
    LookAccumulation
  },
  data () {
    return {
      tableloading: false,
      showAddAccumulation: false,
      showlookAccumulation: false,
      lookAccumulationTitle: '查看公积金计算规则',
      AccumulatiopnTitle: '',
      searchObject: {
        RuleName: '',
        SysUserName: '',
        Status: -1
      },
      multipleSelection: [],
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
      tempData: {},
      checked: false,
      AccumulationList: [],
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
      console.log(this.operates)

      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getAccumulation(this.operatiOBj)
    }
  },
  methods: {
    //搜索
    search () {
      this.currentPage = 1
      this.getAccumulation(this.operatiOBj)
    },
    //获取列表数据
    getAccumulation (operat) {
      this.tableloading = true
      const obj = {
        RuleName: this.searchObject.RuleName,
        SysUserName: this.searchObject.SysUserName,
        Status: this.searchObject.Status,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetFundRuleList(qs.stringify(obj)).then(res => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.AccumulationList = res.Data
          this.total = res.Total
        } else {
          this.AccumulationList = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //打开查看公积金窗口
    lookAccumu (data, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetFundRule(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showlookAccumulation = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //关闭查看公积金窗口
    closelookAccumulation (val) {
      this.showlookAccumulation = val
    },
    //打开新建公积金规则窗口
    handleCreate (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.AccumulatiopnTitle = '新建公积金计算规则'
      this.showAddAccumulation = true
    },
    //打开修改公积金模板窗口
    handleEdit (data, str) {
      this.AccumulatiopnTitle = '修改公积金计算规则'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFundRule(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddAccumulation = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存添加公积金窗口
    AccumulationSave (data) {
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating'))
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditFundRule(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改公积金计算规则成功!'
            })
            this.showAddAccumulation = false
            this.getAccumulation(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddFundRule(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '新建公积金计算规则成功!'
            })
            this.showAddAccumulation = false
            this.getAccumulation(this.operatiOBj)
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
        strPrompt = '你确定禁用此公积金计算规则吗?'
        successPrompt = '禁用公积金计算规则成功！'
      } else if (data.Status == '0') {
        param.Status = '1'
        strPrompt = '你确定启用此公积金计算规则吗?'
        successPrompt = '启用公积金计算规则成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditFundRuleStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: successPrompt
            })
            this.getAccumulation(this.operatiOBj)
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
    //批量启用禁用
    AllStatus (val, str) {
      if (this.multipleSelection.length) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].Status != val) {
            this.$message({
              type: 'error',
              message: '不能操作相同状态的数据'
            })
            return
          }
        }
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        let param = {
          Id: arr.join(','),
          Status: '',
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        let strPrompt = '', successPrompt = ''
        if (val == '1') {
          param.Status = '0'
          strPrompt = '你确定批量禁用此公积金计算规则吗?'
          successPrompt = '批量禁用公积金计算规则成功！'
        } else if (val == '0') {
          param.Status = '1'
          strPrompt = '你确定批量启用此公积金计算规则吗?'
          successPrompt = '批量启用公积金计算规则成功！'
        }
        this.$confirm(strPrompt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          EditFundRuleStatus(qs.stringify(param)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: successPrompt
              })
              this.getAccumulation(this.operatiOBj)
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要操作的公积金计算规则'
        })
      }
    },
    // 单个删除
    roledetele (value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该公积金计算规则', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteFundRule(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAccumulation(this.operatiOBj)
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
        this.$confirm('此操作将批量删除选中的公积金计算规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteFundRule(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAccumulation(this.operatiOBj)
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
          message: '请选择要删除的公积金计算规则'
        })
      }
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.AccumulationList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getAccumulation(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAccumulation(this.operatiOBj)
    },
    //关闭公积金窗口
    closeAddAccumulation (value) {
      this.showAddAccumulation = value
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
  text-align: right;
  margin-bottom: 20px;
}
</style>