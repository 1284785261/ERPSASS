<!-- 添加所属客户 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form ref="operateform" class="forms">
        <div v-for="(item,index) in dataObject" :key="index" class="Object">
          <el-form-item label="所属客户" label-width="100px">
            <el-select v-model="item.CompanyId" size="small" filterable clearable remote placeholder="请选择所属客户" @clear="getCompanyPageList('', item)" :remote-method="value => getCompanyPageList(value, item)" :loading="loading">
              <el-option v-for="items in item.CompanyList" :key="items.Id" :label="items.Name" :value="items.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <a class="Add" v-if="index == dataObject.length -1" @click="AddList"><i class="el-icon-circle-plus-outline"></i>添加</a>
          <span class="del" title="删除" v-if="index < dataObject.length-1" @click="DelList(index)">
            <svg-icon icon-class="del" />
          </span>
        </div>
        <div class="footer-button">
          <el-button class="operation-button" type="primary" @click="closedialog">取消</el-button>
          <el-button class="operation-button" type="primary" @click="dialogtrue">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: {
    showAddCompany: {
      type: Boolean
    }
  },
  data() {
    return {
      title: '添加所属客户',
      dialogVisible: false,
      OldCompanyList: [],
      loading: false,
      dataObject: [{
        CompanyId: '',
        CompanyList: []
      }]
    }
  },
  watch: {
    showAddCompany(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        // 获取客户列表
      }
    },
  },
  created() {
    let obj = {
      PageIndex: 1,
      PageSize: 99,
      Name: '',
      SysUserName: '',
      ContactName: '',
      StartDate: '',
      EndDate: '',
      Type: -1,
      Status: 1,
      OpenPermission: false,
      menuid: MenuIdDate(),
      operationcode: '1'
    }
    this.loading = true
    GetCompanyPageList(qs.stringify(obj)).then(response => {
      this.loading = false
      if (response.IsSuccess) {
        this.OldCompanyList = response.Data
        this.dataObject[0].CompanyList = response.Data
      } else {
        this.$message({
          message: response.Data,
          type: 'warning'
        })
      }
    })
  },
  methods: {
    getCompanyPageList(value, item) {
      if (value) {
        let obj = {
          PageIndex: 1,
          PageSize: 99,
          Name: value,
          SysUserName: '',
          ContactName: '',
          StartDate: '',
          EndDate: '',
          Type: -1,
          Status: 1,
          OpenPermission: false,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        this.loading = true
        GetCompanyPageList(qs.stringify(obj)).then(response => {
          this.loading = false
          console.log();
          if (response.IsSuccess) {
            item.CompanyList = response.Data
          } else {
            this.$message({
              message: response.Data,
              type: 'warning'
            })
          }
        })
      } else {
        item.CompanyList = copy(this.OldCompanyList)
      }
    },
    AddList() {
      this.dataObject.push({
        CompanyId: '',
        CompanyList: copy(this.OldCompanyList)
      })
    },
    DelList(index) {
      this.dataObject.splice(index, 1)
    },
    closedialog() {
      this.dataObject = [{
        CompanyId: '',
        CompanyList: copy(this.OldCompanyList)
      }]
      this.$emit('closeshowCompany')
    },
    // 保存
    dialogtrue() {
      let obj = []
      for (let i = 0; i < this.dataObject.length; i++) {
        if (this.dataObject[i].CompanyId !== '') {
          obj.push(this.dataObject[i].CompanyId)
        }
      }
      if (obj.length === 0) {
        this.$message({
          message: '请选择所属公司',
          type: 'warning'
        })
        return
      }
      this.$emit('CompanySave', obj)
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .forms {
  .el-form-item {
    float: left;
  }
  .el-form-item__label {
    line-height: 40px !important;
  }
  .Add {
    font-size: 16px;
    line-height: 40px;
    margin-left: 20px;
    color: #a4b2cc;
    i {
      margin-right: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    &:hover {
      color: #1588f8;
    }
  }
  .Edit {
    font-size: 16px;
    line-height: 40px;
    margin: 0 8px;

    cursor: pointer;
    &:hover {
      color: #1588f8;
    }
  }
  .del {
    font-size: 16px;
    line-height: 40px;
    margin: 0 8px;
    margin-left: 20px;
    color: #a4b2cc;
    cursor: pointer;
    &:hover {
      color: #f56262;
    }
  }
}
.footer-button {
  margin: 40px 0 24px 0;
  text-align: center;
  button {
    margin: 0 12px;
  }
}
</style>