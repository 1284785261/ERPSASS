//查看团队人员
<template>
  <div class="industry-box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="button-operation">
      <el-button class="operation-button" size="mini" round @click="AddStaff('Add')">
        添加人员
      </el-button>
    </div>
    <div class="table-content All-table">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="StaffList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
          <el-table-column align="center" prop="UserName" label="姓名" />
          <el-table-column align="center" prop="OrgList" label="所属部门">
            <template slot-scope="scope">
              <span>{{scope.row.OrgList | OrgLists}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <AddAccount :showAddaccount="showAddaccount" @closeAccount="closeAccount" :tempData="tempData" @AccountSave="AccountSave" :title="AccountTile"></AddAccount>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetSysUserListByOrgId, AddSysUser } from '@/api/SystemSetting.js'
import AddAccount from '@/components/SystemManagement/addAccount'
import {
  MenuIdDate,
  showLoading,
  hideLoading,
} from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    AddAccount,
  },
  data() {
    return {
      urlList: [
        {
          name: '团队管理',
          router: '/SystemSetting/TeamManagement',
        },
        {
          name: '查看团队人员',
          router: '',
        },
      ],
      StaffList: [],
      tableloading: false,
      Id: '',
      tempData: {
        OrgList: [
          {
            OrgId: '',
            OrgName: '',
          },
        ],
        Orgdisabled: true,
      },
      showAddaccount: false,
      AccountTile: '添加人员',
    }
  },
  filters: {
    OrgLists(arr) {
      let OrgName = ''
      if (arr.length > 0) {
        if (arr.length == 1) {
          OrgName = arr[0].OrgName
        } else {
          for (let i = 0; i < arr.length; i++) {
            OrgName += arr[i].OrgName + ','
          }
        }
      }
      return OrgName
    },
  },
  created() {
    if (this.$route.query && this.$route.query.Id) {
      this.Id = this.$route.query.Id
      this.tempData.OrgList = [
        {
          OrgId: this.Id,
          OrgName: this.$route.query.OrgName,
        },
      ]
      this.getStaff()
    }
  },
  methods: {
    // 获取账号列表
    getStaff(Id) {
      this.tableloading = true
      const obj = {
        OrgId: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      GetSysUserListByOrgId(qs.stringify(obj)).then((response) => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.StaffList = response.Data
        } else {
          this.StaffList = []
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    //添加人员
    AddStaff() {
      this.AccountTile = '添加人员'
      this.showAddaccount = true
    },
    AccountSave(data) {
      showLoading()
      data.menuid = MenuIdDate()
      data.operationcode = 1
      AddSysUser(qs.stringify(data)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加人员成功!',
          })
          this.showAddaccount = false
          this.getStaff()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    closeAccount(value) {
      this.showAddaccount = value
    },
  },
}
</script>
<style lang="scss" scoped>
.bread {
  margin-left: 24px;
}
.button-operation {
  text-align: right;
  padding: 20px;
}
.All-table {
  /deep/ .el-table__body-wrapper {
    overflow: auto;
    max-height: 600px;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      -webkit-box-shadow: inset 0 0 5px #a3b1cc;
      background: #a3b1cc;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px #a3b1cc;
      border-radius: 4px;
      background: #a3b1cc;
    }
  }
}
</style>