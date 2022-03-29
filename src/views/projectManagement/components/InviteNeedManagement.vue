<!-- 招聘需求 -->
<template>
  <div class="invite-need-management-container">
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <!-- <el-table-column align="center" type="selection" width="55" fixed label="全选" /> -->
          <el-table-column align="center" prop="Id" width="55" fixed label="编号" />
          <el-table-column align="center" prop="PositionName" min-width="150" fixed label="招聘岗位" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchpost(scope.row)">{{scope.row.PositionName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="NeedNum" width="100" label="岗位人数" />
          <el-table-column align="center" prop="MgrFee" width="130" label="管理费(人/月)" />
          <!-- <el-table-column align="center" prop="Email" label="合同期限" /> -->
          <el-table-column align="center" prop="AreaName" min-width="150" label="上岗地址" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.AreaName | AreaName}} {{scope.row.Address}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Status" width="100" label="提交状态">
            <template slot-scope="scope">
              {{scope.row.Status | substatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" width="80" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="scope.row.Status == '0'">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item v-if="BusineType == 4 || BusineType == 5" @click.native="OpenRecruiters(scope.row)">指派招聘负责人</el-dropdown-item>
                    <el-dropdown-item @click.native="submitaudit(scope.row)">提交审核</el-dropdown-item>
                    <el-dropdown-item @click.native="deletes(scope.row)">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <recruitment :title="recruitmenttitle" :visible="recruitmentvisible" :iswatch="iswatch" :contentdata="recruitmentdata" @closerecruitment="closerecruitment" @saverecruitment="saverecruitment"></recruitment>
    <!-- 招聘指派人 -->
    <ModifyStaff :title="ModifyStaffTitle" :visible="ModifyStaffVisible" @CloseModifyStaff="CloseModifyStaff" @ModifyStaffSave="ModifyStaffSave"></ModifyStaff>
  </div>
</template>

<script>
import { GetProjectRecruit, EditdProjectRecruit, DeleteProjectRecruitStatus, ProjectRecruitApproval } from '@/api/projectManagement.js'
import { AddRecruitAssign } from '@/api/RecruitmentManagement.js'
import recruitment from './dialog-recruitment'
import ModifyStaff from './dialog-ModifyStaff.vue'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    recruitment,
    ModifyStaff
  },
  props: ['BusinessType'],
  data () {
    return {
      searchform: {
        IdCode: '',
        Comprehensive: '',
      },
      tableloading: false,
      tableData: [],
      ProjectId: '',

      recruitmenttitle: '修改招聘信息',
      recruitmentvisible: false,
      recruitmentdata: {}, // 招聘详情
      iswatch: false, // 是否查看
      ModifyStaffVisible: false,
      ModifyStaffTitle: '指派招聘负责人',
      BusineType: '',
      ProjectRecruitId: ''
    }
  },
  filters: {
    substatus (value) {
      const val = parseInt(value)
      let msg = ''
      switch (val) {
        case 0: msg = '待审批'; break
        case 1: msg = '审批中'; break
        case 2: msg = '审批未通过'; break
        case 3: msg = '待招聘'; break
        case 4: msg = '招聘中'; break
        case 5: msg = '已完成'; break
        case 6: msg = '已暂停'; break
        case 6: msg = '已取消'; break
        default:
          msg = ''
      }
      return msg
    },
    AreaName (value) {
      if (value) {
        return value.split(',').join(' ')
      } else {
        return ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.ProjectId = this.$route.query.Id
      this.BusineType = this.BusinessType
      this.getProjectRecruit()
    })
  },
  methods: {
    // 获取列表
    getProjectRecruit () {
      let obj = {
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetProjectRecruit(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.tableData = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 查看详情
    watchpost (e) {
      this.recruitmenttitle = '查看招聘详情'
      this.recruitmentvisible = true
      this.iswatch = true
      this.recruitmentdata = copy(e)
    },
    // 修改
    update (e) {
      this.recruitmenttitle = '修改招聘详情'
      this.recruitmentvisible = true
      this.iswatch = false
      this.recruitmentdata = copy(e)
    },
    // 提交审核
    submitaudit (e) {
      this.$confirm('你确定提交该项目招聘需求吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ProjectRecruitApproval(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交项目招聘需求成功!'
            })
            this.getProjectRecruit()
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
    // 删除
    deletes (e) {
      this.$confirm('此操作将删除该条招聘信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectRecruitStatus(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 关闭招聘弹框
    closerecruitment () {
      this.recruitmentvisible = false
    },
    // 保存招聘信息
    saverecruitment (e) {
      // 修改
      let obj = e
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      showLoading()
      EditdProjectRecruit(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.recruitmentvisible = false
          this.getProjectRecruit()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    OpenRecruiters (data) {
      this.ProjectRecruitId = data.Id
      this.ModifyStaffVisible = true
    },
    //保存指派项目招聘人
    ModifyStaffSave (data) {
      let AddRecruitAssignList = []
      for (let i = 0; i < data.length; i++) {
        AddRecruitAssignList.push({
          ProjectRecruitId: this.ProjectRecruitId,
          Recruiter: data[i].Id
        })
      }
      let obj = {
        AddRecruitAssignList: AddRecruitAssignList,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddRecruitAssign(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '指派招聘负责人成功',
            type: 'success'
          })
          this.ModifyStaffVisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    CloseModifyStaff (val) {
      this.ModifyStaffVisible = val
    }
  },
}
</script>

<style lang="scss" scoped>
.invite-need-management-container /deep/ {
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
        .el-input__inner {
          border-color: transparent !important;
          background-color: $erpbgcolor;
        }
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      width: 96px;
    }
  }
}
</style>