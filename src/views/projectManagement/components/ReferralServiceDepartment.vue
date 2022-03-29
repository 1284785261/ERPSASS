//转交服务部门
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" destroy-on-close="true" title="转交服务部门" class="dialog-box" append-to-body :visible.sync="showContract" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"  class="forms">
        <el-form-item label="经办人" prop="responsiblePerson">
          <!-- <el-input v-model="ruleForm.responsiblePerson" style="width:300px"></el-input> -->
          <el-select v-model="ruleForm.responsiblePerson" remote filterable clearable placeholder="搜索或选择经办人" @change="SelectUser($event)"  :remote-method="(query)=>{SysUserMethods(query)}" @clear="SysUserMethods('')" style="width:300px">
            <el-option :label="ite.UserName" :value="ite.Id" v-for="(ite, index) in SysUserlist" :key="index"></el-option>
            <div v-if="SysUserlist.length > 99" class="search-keyword">
              <span>只显示前100条结果，请完善搜索关键字</span>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="经办部门" prop='transactionDepartment' class="tissue">
          <el-select v-model="ruleForm.transactionDepartment" clearable placeholder="请选择经办部门" @change="SelectOrgClick($event)"  style="width:300px">
            <el-option :label="ite.FullOrgName" :value="ite.OrgId" v-for="(ite, index) in departmentList" :key="index"></el-option>
          </el-select>
          <!-- <treeselect ref="trees3"  v-model="ruleForm.transactionDepartment" placeholder="请选择经办部门" :normalizer="normalizer" :default-expand-level="1" :options="tissue" @select="selectOrg($event,index)" style="width:300px;" /> -->
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交终审</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { showLoading,
  hideLoading,
  MenuIdDate,
  uuid,
  copy,
  upAndDown,} from '@/utils/CustomValidation'
import { GetSysOrgList, GetSysUserList, GetOrgByUserId} from '@/api/SystemSetting.js'
import qs from 'qs'
export default {
  name: 'ReferralServiceDepartment',
  props:{
    showReferralServiceDepartment: {
      type: Boolean,
    }
  },
   components: {
    Treeselect,
  },
  data () {
    return {
      ruleForm:{
        responsiblePerson:'',
        transactionDepartment:'',
      },
     
      showContract: false,
      SysUserlist:[],
      departmentList:[],
      // tissue: [],
      // 树状图对应数据
      // normalizer(node) {
      //   return {
      //     id: node.Id,
      //     label: node.OrgName,
      //     children: node.children,
      //   }
      // },
      rules: {
        responsiblePerson: [
          { required: true, message: '经办人', trigger: 'change' }
        ],
        transactionDepartment: [
          { required: true, message: '经办部门', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    showReferralServiceDepartment (newvalue, oldvalue) {
      this.showContract = newvalue;
    }
  },
  created () {
    this.SysUserMethods()
    // let data = {
    //   OrgName: '',
    //   menuid: MenuIdDate(),
    //   operationcode: 1,
    // }
    // GetSysOrgList(qs.stringify(data)).then((response) => {
    //   if (response.IsSuccess) {
    //     this.tissue = response.Data
    //     upAndDown(this.tissue)
    //   } else {
    //     this.$message({
    //       message: response.MessageContent,
    //       type: 'error',
    //     })
    //   }
    // })
  },
  methods: {
    SysUserMethods(value) {
      let obj = {
        UserId: '',
        UserName: value||'',
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      showLoading()
      GetSysUserList(qs.stringify(obj)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.SysUserlist =response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('referralSubmit', this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //选择出单人
    SelectUser(value) {
      this.ruleForm.transactionDepartment = ''
      let obj = {
        SysUserId: value,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      GetOrgByUserId(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess && response.Data) {
          this.departmentList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    //选择出单部门
    SelectOrgClick(value) {
      for (let item of this.departmentList) {
        if (value == item.OrgId) {
          let responsiblePerson=this.ruleForm.responsiblePerson
          this.ruleForm = {
            responsiblePerson,
            transactionDepartment:item.OrgId
          };
        }
      }
      // this.FileContractform.singleDetailList[index].OrgName = $event.OrgName
    },
    //关闭导入事件
    close () {
      this.ruleForm.responsiblePerson='';
      this.ruleForm.transactionDepartment='';
      this.departmentList=[];
      // this.$refs.ruleForm.resetFields()
      this.$emit('closeReferralServiceDepartment', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        .el-input__suffix {
          height: 40px;
        }
      }
    }
  }
}
// .tissue {
//   // height: 64px;
//   /deep/ .vue-treeselect__control {
//     width: 100%;
//     background: #f0f4fa;
//     line-height: 30px;
//     margin-top: 2px;
//     padding-left: 10px;
//     height: 30px;
//     outline: none;
//     font-size: 12px;
//     .vue-treeselect__value-container {
//       line-height: 30px;
//       min-height: 30px;
//       .vue-treeselect__placeholder {
//         line-height: 30px;
//         margin-left: 0;
//       }
//     }
//   }
// }
</style>