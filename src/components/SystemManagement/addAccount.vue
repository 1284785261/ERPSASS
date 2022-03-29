<!-- 添加账号 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showAccount" :show-close="false" :destroy-on-close="true" width="600px"
      @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="登录账号" prop="UserId">
          <el-input v-model="dataObject.UserId" clearable size="small" />
        </el-form-item>
        <el-form-item label="登录密码" prop="Password">
          <el-input v-model="dataObject.Password" clearable show-password :disabled="title == '修改账号'" size="small" />
        </el-form-item>
        <el-form-item label="姓名" prop="UserName">
          <el-input v-model="dataObject.UserName" clearable size="small" />
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-select v-model="dataObject.Sex" clearable size="mini" placeholder="请选择性别">
            <el-option v-for="item in genderList" :key="item.Id" :label="item.name" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="PositionName">
          <el-input v-model="dataObject.PositionName" clearable size="small" />
        </el-form-item>
        <el-form-item label="账户类型" prop="Type">
          <el-select v-model="dataObject.Type" size="mini" clearable placeholder="请选择账户类型">
            <el-option v-for="item in accountType" :key="item.Type" :label="item.title" :value="item.Type" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属组织" class="tissue">
          <!-- <treeselect ref="trees3" v-model="dataObject.OrgId" placeholder="请选择所属组织" :normalizer="normalizer" :default-expand-level="1" :options="tissue" /> -->
          <el-input v-model="orgNames" clearable size="small" :disabled="Orgdisabled" @focus="chooseorg" @clear="clearableorg" />
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="RoleIdArr" clearable collapse-tags multiple filterable size="mini" placeholder="请选择所属角色">
            <el-option v-for="item in RoleList" :key="item.Id" :label="item.RoleName" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="直接上级领导账号">
          <el-select v-model="dataObject.ParentLeader" clearable filterable remote size="mini" placeholder="请选择直接上级领导账号" :remote-method="(event) => {return remoteAccount(event, 'Parent')}"
            @clear="remoteAccount('', 'Parent')">
            <el-option v-for="item in ParentList" :key="item.Id" :label="item.UserName" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="分管领导账号">
          <el-select v-model="dataObject.GrandLeader" clearable filterable remote size="mini" placeholder="请选择分管领导账号" :remote-method="(event) => {return remoteAccount(event, 'Grand')}"
            @clear="remoteAccount('', 'Grand')">
            <el-option v-for="item in GrandList" :key="item.Id" :label="item.UserName" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="Mobile">
          <el-input v-model="dataObject.Mobile" clearable size="small" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="Email">
          <el-input v-model="dataObject.Email" clearable size="small" />
        </el-form-item>
        <!-- <el-form-item label="备注说明" prop="note" class="textarea-note">
          <el-input type="textarea" :rows="10" v-model="dataObject.note" size="small" />
        </el-form-item> -->
        <el-form-item label="微信号码" prop="WxOpenId">
          <el-input v-model="dataObject.WxOpenId" clearable size="small" />
        </el-form-item>
        <el-form-item label="启用状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="orgtitle" class="dialog-box dialog-account" append-to-body :visible.sync="showOrg" :show-close="false" :destroy-on-close="true" width="480px"
      @close="closeorg">
      <i class="el-icon-circle-close closeButton" @click="closeorg"></i>
      <div class="choose-box">
        <el-input v-model="OrgName" size="small" placeholder="输入组织名查询" @keyup.enter.native="chooseOrg" @blur="chooseOrg"></el-input>
        <el-tree :data="newarray" key="1" node-key="Id" ref="tree" v-loading="treeloading" highlight-current show-checkbox default-expand-all :props="defaultProps" :expand-on-click-node="false"
          class="erpscroll">
          <!-- <div slot-scope="{ node, data }">
            <span>
              <input type="radio" name="Id" @click="radiochoose(node, data)" :id="data.Id">
              <el-radio v-if="data.Id" v-model="radio" :label="data.Id" @change="radiochoose(data)">{{ node.label }}</el-radio>
              <span v-else>{{ node.label }}</span>
            </span>
          </div> -->
        </el-tree>
        <!-- <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
        </el-tree> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogorg">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  GetSysOrgList,
  GetSysRoleList,
  GetSysUserList,
  GetSysUserById,
} from '@/api/SystemSetting.js'
import axios from 'axios'
import { MenuIdDate, upAndDown } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  name: 'addRole',
  components: {
    Treeselect,
  },
  props: ['showAddaccount', 'title', 'tempData'],
  data() {
    return {
      dataObject: {
        Id: '',
        Type: '',
        UserId: '',
        Password: '',
        RoleId: '',
        Sex: '',
        PositionName: '',
        OrgId: null,
        Mobile: '',
        WxOpenId: '',
        Email: '',
        Status: '1',
        note: '',
        ParentLeader: '',
        GrandLeader: '',
      },
      RoleIdArr: [],
      Orgdisabled: false,
      radio1: '',
      genderList: [
        {
          name: '女',
          Id: 0,
        },
        {
          name: '男',
          Id: 1,
        },
      ],
      tissue: [],
      RoleList: [],
      accountType: [
        {
          title: '内部员工',
          Type: 0,
        },
        {
          title: '外部员工(外包派遣)',
          Type: 1,
        },
        {
          title: '用人单位(客户)',
          Type: 2,
        },
      ],
      showAccount: false,

      orgdata: [], // 选中的组织结构数组
      orgdataIds: [], // 选中的组织结构数组ID
      orgNames: '',
      orgtitle: '选择组织结构',
      showOrg: false,
      OrgName: '',
      treeloading: false,
      newarray: [],
      radio: {
        Id: '',
        OrgName: '',
      },
      defaultProps: {
        children: 'children',
        label: 'OrgName',
      },
      temporary: {},
      ParentList: [], // 上级领导账号列表
      GrandList: [], // 分管领导账号

      Formrules: {},
      // 树状图对应数据
      normalizer(node) {
        return {
          id: node.Id,
          label: node.OrgName,
          children: node.children,
        }
      },
    }
  },
  watch: {
    showAddaccount(newvalue, oldvalue) {
      this.showAccount = newvalue
      this.dataObject = this.$options.data().dataObject
      this.orgdataIds = []
      this.orgNames = ''
      if (this.title == '添加账号') {
        this.orgNames = ''
        this.getSysUserList()
      } else if (this.title == '修改账号') {
        this.dataObject = this.tempData
        this.dataObject.Status = this.tempData.Status + ''
        if (this.tempData.RoleId) {
          this.RoleIdArr = this.tempData.RoleId.split(',').map(Number)
        } else {
          this.dataObject.RoleId = ''
        }
        // 处理是否有上级领导/分管领导
        if (this.tempData.ParentLeader) {
          // 获取账号详情
          let obj = {
            Id: this.tempData.ParentLeader,
            menuid: MenuIdDate(),
            operationcode: 1,
          }
          GetSysUserById(qs.stringify(obj)).then((response) => {
            if (response.IsSuccess) {
              if (response.Data) {
                this.ParentList = [
                  {
                    Id: this.tempData.ParentLeader,
                    UserName: response.Data.UserName,
                  },
                ]
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error',
              })
            }
          })
        } else {
          this.remoteAccount('', 'Parent')
        }
        if (this.tempData.GrandLeader) {
          let obj = {
            Id: this.tempData.GrandLeader,
            menuid: MenuIdDate(),
            operationcode: 1,
          }
          GetSysUserById(qs.stringify(obj)).then((response) => {
            if (response.IsSuccess) {
              if (response.Data) {
                this.GrandList = [
                  {
                    Id: this.tempData.GrandLeader,
                    UserName: response.Data.UserName,
                  },
                ]
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error',
              })
            }
          })
        } else {
          this.remoteAccount('', 'Grand')
        }
      }
      if (this.tempData.OrgList) {
        // this.$set(this.orgdata, 'Id', this.tempData.data.Id)
        // this.$set(this.orgdata, 'OrgName', this.tempData.data.OrgName)
        // if (this.tempData.data.Orgdisabled) {
        //   this.Orgdisabled = this.tempData.data.Orgdisabled
        // }
        if (this.tempData.OrgList.length > 0) {
          for (let i = 0; i < this.tempData.OrgList.length; i++) {
            this.orgdataIds.push(this.tempData.OrgList[i].OrgId)
            this.orgNames += this.tempData.OrgList[i].OrgName + ','
          }
        }
        if(this.tempData.Orgdisabled){
            this.Orgdisabled = true
        }
      } else {
        this.orgdataIds = []
        this.orgNames = ''
        this.Orgdisabled = false
      }
    },
    showOrg(newvalue, oldvalue) {
      if (newvalue) {
        this.chooseOrg()
        if (this.orgdataIds.length > 0) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.orgdataIds)
          })
        } else {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([])
          })
        }
      }
    },
  },
  created() {
    this.getSysOrgList()
    this.getSysRoleList()
  },
  methods: {
    //获取组织结构
    getSysOrgList() {
      let data = {
        OrgName: '',
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      GetSysOrgList(qs.stringify(data)).then((response) => {
        if (response.IsSuccess) {
          this.tissue = response.Data
          upAndDown(this.tissue)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    //获取角色列表
    getSysRoleList() {
      let data = {
        RoleId: '',
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      GetSysRoleList(qs.stringify(data)).then((response) => {
        if (response.IsSuccess) {
          this.RoleList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    // 获取账号列表
    getSysUserList() {
      let obj = {
        UserId: '',
        UserName: '',
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      GetSysUserList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.ParentList = response.Data
          this.GrandList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    // 搜索账号
    remoteAccount(value, type) {
      let obj = {
        UserId: '',
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      GetSysUserList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          if (type === 'Parent') {
            this.ParentList = response.Data
          } else if (type === 'Grand') {
            this.GrandList = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    dialogtrue(form) {
      // 调用接口,保存数据
      let dataObj = this.dataObject
      this.$refs[form].validate((valid) => {
        if (valid) {
          dataObj.RoleId = this.RoleIdArr.join(',')
          if (this.title == '添加账号') {
            if (dataObj.Password !== '') {
              dataObj.Password = this.$md5(dataObj.Password).toUpperCase()
            } else {
              let test = '123456'
              dataObj.Password = this.$md5(test).toUpperCase()
            }
          }
          dataObj.OrgId = this.orgdataIds.join(',')
          delete dataObj.OrgList
          this.$emit('AccountSave', dataObj)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error',
          })
          return false
        }
      })
    },
    close() {
      this.$emit('closeAccount', false)
    },
    // 选择组织结构
    chooseorg() {
      this.showOrg = true
    },
    // 查询组织结构
    chooseOrg() {
      let data1 = {
        OrgName: this.OrgName,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      this.treeloading = true
      GetSysOrgList(qs.stringify(data1)).then((response) => {
        if (response.IsSuccess) {
          this.newarray = response.Data
          // this.rearlist(response.Data)
          this.treeloading = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    rearlist(list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          this.sums.push(list[i])
          if (list[i].children.length > 0) {
            this.rearlist(list[i].children)
          }
        }
      }
    },
    radiochoose(e) {
      this.temporary = e
    },
    clearableorg() {
      //   this.orgdata = {
      //     Id: '',
      //     OrgName: '',
      //   }
      this.orgNames = ''
      this.orgdata = []
      this.orgdataIds = []
    },
    // 关闭
    closeorg() {
      this.showOrg = false
    },
    // 保存
    dialogorg() {
      this.orgdata = this.$refs.tree.getCheckedNodes()
      this.orgdataIds = this.$refs.tree.getCheckedKeys()
      this.orgNames = ''
      if (this.orgdata.length > 0) {
        for (let i = 0; i < this.orgdata.length; i++) {
          this.orgNames += this.orgdata[i].OrgName + ','
        }
      }
      this.showOrg = false
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/publicStyle.scss';
.dialog-account {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms-Account {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 20px;
    .el-form-item__label {
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
          top: 24px;
          height: 40px;
        }
        .el-select__tags {
          background: #f0f4fa;
          top: 68%;
          border-radius: 4px;
        }
      }
    }
  }
  /deep/ .textarea-note {
    position: absolute;
    left: 280px;
    top: 387px;
    textarea {
      resize: none;
      background: $erinputbgc;
      border: none;
    }
  }
  /deep/.tissue {
    height: 64px;
    .vue-treeselect__control {
      width: 100%;
      background: $erinputbgc;
      border: none;
      line-height: 30px;
      margin-top: 4px;
      padding-left: 10px;
      height: 30px;
      outline: none;
      font-size: 12px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
        }
      }
    }
  }
}
.choose-box {
  /deep/ {
    padding: 0 40px;
    .el-input {
      margin: 10px 0;
    }
    .erpscroll {
      height: 400px;
      overflow: auto;
    }
  }
}
</style>