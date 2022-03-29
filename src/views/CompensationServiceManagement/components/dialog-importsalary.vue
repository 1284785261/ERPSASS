<!-- 导入薪酬弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="入账项目" prop="ProjectId" class="select">
          <el-select ref="project" v-model="operateform.ProjectId" filterable remote clearable placeholder="搜索选择项目" :remote-method="ProjectMethod" @clear="ProjectMethod('')">
            <el-option v-for="item in Projectlist" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
            <div v-if="Projectlist.length > 99" class="search-keyword">
              <span>只显示前100条结果，请完善搜索关键字</span>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="入账年月" prop="month">
          <el-date-picker v-model="operateform.month" class="erpsearchinput" type="month" placeholder="选择入账年月"></el-date-picker>
        </el-form-item>
        <el-form-item label="入账批次" class="counternumber">
          <el-input-number v-model.number="operateform.SalaryBatchId" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="输入导入的工作表名称">
          <el-input v-model="operateform.SheetName" clearable placeholder="输入工作表名称" />
        </el-form-item>
        <el-form-item label="客户工资表标题起始行">
          <el-input v-model="operateform.StartRow" clearable placeholder="表格内的行数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="客户工资表的标题起始列">
          <el-input v-model="operateform.StartCol" clearable placeholder="表格内的列数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="选择要导入的表格" class="multilevel">
          <el-input v-model="fileters.name" title="点击右侧选择文件" disabled accept=".xls,.xlsx" placeholder="点击右侧选择文件" />
          <div class="operate">
            <svg-icon icon-class="setting"></svg-icon>
            <input class="upfile" type="file" name="" id="" @change="uploadFile">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer three-footer">
        <el-button class="erpbtn" size="small" @click="closedialog">取消</el-button>
        <el-button class="erpbtn" size="small" @click="save">开始导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetProjectList } from '@/api/projectManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    }
  },
  data () {
    return {
      dialogVisible: false,
      operateform: {
        SalaryBatchId: '',
        SheetName: '',
        StartRow: '',
        StartCol: '',
        ProjectId: '',
        SalaryYear: '',
        SalaryMonth: '',
        month: '', // 自定义的月份
      },
      fileters: {}, // 上传文件
      rules: {
        ProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        month: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      param: null,
      fileloading: false,
      Projectlist: [], // 项目列表
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
    }
  },
  created () {
    this.ProjectMethod('')
  },
  methods: {
    // 搜索项目列表
    ProjectMethod (value) {
      let obj = {
        Name: value,
        SysUserName: '',
        Status: -1,
        BusinessType: -1,
        Priority: -1,
        CompanyId: 0,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.Projectlist = response.Data
          } else {
            this.Projectlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 上传文件
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      if (!this.operateform.StartRow || !this.operateform.StartCol) {
        this.$message({
          message: '请先输入映射表的起始行和起始列',
          type: 'warning'
        })
        return false
      }
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'xls' || ext == 'xlsx') {
        } else {
          this.$message({
            message: '不支持该格式文件上传',
            type: 'warning'
          })
          e.target.value = []
          return false
        }
        if (files.size > (20 * 1024 * 1024)) {
          this.$message({
            message: '文件大小超过最大限制',
            type: 'warning'
          })
          e.target.value = []
          return false
        } else {
          console.log(files);
          this.fileters = files
        }
      }
    },
    // 输入框
    handleChange () {

    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          // 处理月份
          if (this.operateform.month) {
            this.operateform.SalaryYear = this.operateform.month.getFullYear()
            this.operateform.SalaryMonth = this.operateform.month.getMonth() + 1
          }
          // 处理文件
          if (this.fileters.name) {
            this.param = new FormData()
            this.param.append('file', this.fileters)
            this.param.append('SheetName', this.operateform.SheetName)
            this.param.append('StartRow', this.operateform.StartRow)
            this.param.append('StartCol', this.operateform.StartCol)
            this.param.append('ProjectId', this.operateform.ProjectId)
            this.param.append('SalaryYear', this.operateform.SalaryYear)
            this.param.append('SalaryMonth', this.operateform.SalaryMonth)
            this.$emit('savesalary', this.param)
          } else {
            this.$message({
              message: '请选择上传文件',
              type: 'warning'
            })
          }
        }
      })
    },
    closedialog () {
      this.$refs.operateform.resetFields()
      this.$emit('closedialog')
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .dialog-footer.three-footer {
  text-align: center;
  > button {
    width: auto;
    height: auto;
    background-color: $erpbtncolor;
    color: $erpcolor;
  }
  > button + button {
    margin-left: 24px;
  }
}
</style>