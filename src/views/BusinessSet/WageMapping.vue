//工资映射管理
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="相关公司" label-width="80px">
            <el-input v-model="searchObject.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入相关公司" />
          </el-form-item>
          <el-form-item label="相关项目" label-width="80px">
            <el-input v-model="searchObject.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入相关项目" />
          </el-form-item>
          <el-form-item label="规则配置人" label-width="100px">
            <el-input v-model="searchObject.SysUserName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入规则配置人" />
          </el-form-item>
          <el-form-item label="使用状态" label-width="80px">
            <el-select v-model="searchObject.Status" clearable placeholder="请选择" size="mini" class="select-input">
              <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
    <div class="table-content">
      <div>

        <div class="tableHeader-operation">
          <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Import')" type="primary" @click="uploadFile('Import')">导入表头映射</el-button>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="WageList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="Id" label="编号" />
          <el-table-column align="center" prop="CompanyName" label="相关公司" show-overflow-tooltip />
          <el-table-column align="center" prop="ProjectName" label="相关项目" show-overflow-tooltip />
          <el-table-column align="center" prop="SysUserName" label="规则添加人" />
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
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="lookWage(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">编辑</el-dropdown-item>
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
  </div>
</template>
<script>
import { GetSalaryMapList, EditSalaryMapStatus, DeleteSalaryMap } from '@/api/BusinessSet.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
  },
  data () {
    return {
      tableloading: false,
      searchObject: {
        UserId: '',
        CompanyName: '',
        ProjectName: '',
        SysUserName: '',
        Status: -1
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
      tabidx: 1,
      tablist: [{
        describe: '正常薪资映射',
        value: 1
      }, {
        describe: '奖金映射',
        value: 2
      }, {
        describe: '全年奖金映射',
        value: 3
      }, {
        describe: '补偿映射',
        value: 4
      }, {
        describe: '其它类型所得映射',
        value: 5
      }],
      checked: false,
      WageList: [],
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
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getWageList(this.operatiOBj)
    }
  },
  methods: {
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
        this.getWageList(this.operatiOBj)
      }
    },
    //搜索
    search () {
      this.currentPage = 1
      this.getWageList(this.operatiOBj)
    },
    //获取列表数据
    getWageList (operat) {
      this.tableloading = true
      const obj = {
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        SysUserName: this.searchObject.SysUserName,
        Type: this.tabidx,
        Status: this.searchObject.Status,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetSalaryMapList(qs.stringify(obj)).then(res => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.WageList = res.Data
          this.total = res.Total
        } else {
          this.WageList = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
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
        strPrompt = '你确定禁用此工资映射表吗?'
        successPrompt = '禁用工资映射表成功！'
      } else if (data.Status == '0') {
        param.Status = '1'
        strPrompt = '你确定启用此工资映射表吗?'
        successPrompt = '启用工资映射表成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditSalaryMapStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: successPrompt
            })
            this.getWageList(this.operatiOBj)
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
          strPrompt = '你确定批量禁用选中的工资映射表吗?'
          successPrompt = '批量禁用工资映射表成功！'
        } else if (val == '0') {
          param.Status = '1'
          strPrompt = '你确定批量启用选中的工资映射表吗?'
          successPrompt = '批量启用工资映射表成功！'
        }
        this.$confirm(strPrompt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          EditSalaryMapStatus(qs.stringify(param)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: successPrompt
              })
              this.getWageList(this.operatiOBj)
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
          message: '请选择要操作的工资映射表'
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
      this.$confirm('此操作将删除该工资映射表', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteSalaryMap(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getWageList(this.operatiOBj)
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
    Alldelete (str) {
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
        this.$confirm('此操作将批量删除选中的工资映射表', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteSalaryMap(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getWageList(this.operatiOBj)
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
          message: '请选择要删除的工资映射表'
        })
      }
    },
    //导入表头映射
    uploadFile (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/BusinessSet/ImportWagest',
        query: {
          Type: this.tabidx
        }
      })
    },
    //查看表头映射
    lookWage (data, str) {
      this.$router.push({
        path: '/BusinessSet/lookWages',
        query: {
          Id: data.Id,
          ProjectId: data.ProjectId,
          Type: this.tabidx
        }
      })
    },
    //修改表头映射
    handleEdit (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/BusinessSet/ImportWagest',
        query: {
          Id: data.Id,
          ProjectId: data.ProjectId,
          Type: this.tabidx
        }
      })
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.WageList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getWageList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getWageList(this.operatiOBj)
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
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  .smaellFile {
    width: 116px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    display: inline-block;
    z-index: 100;
    cursor: pointer;
    &::-webkit-file-upload-button {
      height: 0;
    }
  }
}
.table-content {
  border-radius: 0;
}
</style>