<!-- 服务人员设置 -->
<template>
  <div>
    <div class="tableHeader-operation">
      <el-button class="operation-button" size="small" type="primary" @click="AddDivided">添加服务人员</el-button>
    </div>
    <div class="Commission-Form">
      <el-form ref="ruleForm">
        <div class="Commission-public">
          <el-form-item label="服务提成类型" label-width="120px">
            <span>{{BusinessTypeText}}</span>
          </el-form-item>
          <el-form-item label="提成变动类型" label-width="120px">
            <span>{{ChangeTypeText}}</span>
          </el-form-item>
        </div>
        <div class="Commission-multiple">
          <div v-for="(item,index) in dataObject" :key="index" class="Object">
            <div style="margin-right: 134px">
              <el-form-item label="服务人员" label-width="120px">
                <span>{{item.SysUserName}}</span>
              </el-form-item>
              <el-form-item label="服务提成占比" label-width="120px">
                <span>{{item.CommScale}}<span class="way">%</span></span>
              </el-form-item>
              <el-form-item label="审批状态" label-width="120px">
                <span>{{item.StatusText}}</span>
              </el-form-item>
            </div>
            <div class="buttons">
              <span class="Edit" title="修改" v-if="item.Status == '0' || item.Status == '3'" @click="EditList(item)"><i class="el-icon-edit-outline"></i></span>
              <span class="Edit" title="审批" v-if="item.Status == '0'" @click="BatchList(item)"><i class="el-icon-coordinate"></i></span>
              <span class="Edit" title="再次审批" v-if="item.Status == '3'" @click="BatchList(item)"><i class="el-icon-coordinate"></i></span>
              <span class="del" title="删除" v-if="item.Status == '0' || item.Status == '3'" @click="DelList(item)"><i class="el-icon-delete"></i></span>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 服务设置 -->
    <ServiceSet :showServiceSet="showServiceSet" :TypeObj="TypeObj" @closeshowServiceSet="closeshowServiceSet" @ServiceSetSave="ServiceSetSave"></ServiceSet>
    <!-- 修改人员分成 -->
    <EditService :showEditService="showEditService" :tempObj="tempObj" @closeshowEditService="closeshowEditService" @EDitServiceSave="EDitServiceSave"></EditService>
  </div>
</template>
<script>
import ServiceSet from './Serviceset.vue'
import EditService from './EditService.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import { GetProjectSrvCommisionList, DeleteProjectSrvCommision, AddProjectSrvCommision, EditProjectSrvCommision, ProjectSrvCommisionApproval } from '@/api/projectManagement.js'
import qs from 'qs'
export default {
  components: {
    ServiceSet,
    EditService
  },
  data () {
    return {
      ProjectId: '',
      dataObject: [],
      BusinessTypeText: '',
      ChangeTypeText: '',
      TypeObj: {
        BusinessType: '',
        ChangeType: '',
        disabled: ''
      },
      tempObj: {},
      showServiceSet: false,
      showEditService: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.ProjectId = this.$route.query.Id
      this.getService(this.ProjectId)
    })
  },
  methods: {
    getService (Id) {
      let obj = {
        ProjectId: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectSrvCommisionList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.dataObject = response.Data
            this.BusinessTypeText = response.Data[0].BusinessTypeText
            this.ChangeTypeText = response.Data[0].ChangeTypeText
          } else {
            this.dataObject = []
            this.BusinessTypeText = "未设置"
            this.ChangeTypeText = "未设置"
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //删除服务提成分配
    DelList (data) {
      this.$confirm('此操作将删除该项目的服务人员提成和业绩占比, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          IdArr: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectSrvCommision(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getService(this.ProjectId)
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
    //添加服务人员
    AddDivided () {
      if (this.dataObject.length > 0) {
        this.TypeObj.BusinessType = this.dataObject[0].BusinessType
        this.TypeObj.ChangeType = this.dataObject[0].ChangeType
        this.TypeObj.disabled = true
      } else {
        this.TypeObj.disabled = false
      }
      this.showServiceSet = true
    },
    //保存添加服务人员
    ServiceSetSave (data) {
      data.forEach((item, index, array) => {
        item.ProjectId = this.ProjectId
      })
      let obj = {
        AddProjectSrvCommisionList: data,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddProjectSrvCommision(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加服务人员提成和业绩成功!'
          })
          this.showServiceSet = false
          this.getService(this.ProjectId)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭设置分成窗口
    closeshowServiceSet (val) {
      this.showServiceSet = val
    },
    //修改服务员分成
    EditList (data) {
      this.tempObj = data
      this.showEditService = true
    },
    closeshowEditService (val) {
      this.showEditService = val
    },
    EDitServiceSave (data) {
      data.menuid = MenuIdDate()
      data.operationcode = '1'
      data.ProjectId = this.ProjectId
      showLoading()
      EditProjectSrvCommision(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '修改服务人员提成和业绩成功!'
          })
          this.showEditService = false
          this.getService(this.ProjectId)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //提交业务人员到OA审批
    BatchList (data) {
      this.$confirm('你确定提交该服务人员提成设置审批吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ProjectSrvCommisionApproval(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交服务人员提成设置审批成功!'
            })
            this.getService(this.ProjectId)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;
}
.Commission-Form {
  margin-bottom: 20px;
  overflow: hidden;
  /deep/ .Commission-public {
    display: flex;
    justify-content: flex-start;
    background: #e0edff;
    height: 40px;
    border-radius: 8px;
    .el-form-item {
      min-width: 50%;
      span {
        color: #999999;
      }
    }
  }
  /deep/ .Commission-multiple {
    .Object {
      width: calc(50% - 40px);
      float: left;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      margin: 20px;
      .el-form-item {
        min-width: 180px;
        display: inline-block;
        margin-bottom: 0;
        span {
          color: #999999;
          .way {
            color: #999999;
          }
        }
      }
      .buttons {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
        .Edit,
        .del {
          font-size: 20px;
          line-height: 40px;
          margin: 0 12px;
          cursor: pointer;
          &:hover {
            color: #1588f8;
          }
        }
        .del {
          &:hover {
            color: #f56262;
          }
        }
      }
      .del {
        &:hover {
          color: #f56262;
        }
      }
      &:hover {
        background: #f0f4fa;
      }
    }
  }
}
</style>