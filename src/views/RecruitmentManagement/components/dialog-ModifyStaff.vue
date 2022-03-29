//修改招聘人员
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" destroy-on-close width="780px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="custom-box">
        <div class="left-box">
          <div class="title">选择需要指派的员工</div>
          <div class="choose-box">
            <el-input v-model="UserName" size="small" placeholder="请输入查询您要指派的员工" @keyup.enter.native="chooseSys" @blur="chooseSys"></el-input>
            <div class="erpscroll">
              <!-- <el-checkbox-group v-model="checkList"> -->
              <div v-for="(item, index) in userlist" :key="index">
                <el-checkbox class="erpcheck" v-model="item.ischecked" @change="changeChecked(item,index)">{{item.UserName}}</el-checkbox>
              </div>
              <!-- </el-checkbox-group> -->
            </div>
            <!-- <el-checkbox class="erpcheck" v-model="choosechecked" @change="chooseallchecked">全选</el-checkbox> -->
            <el-pagination background layout="prev, pager, next" :page-size="PageSize" :current-page="currentPage" @current-change="handleCurrentChange" :pager-count="5" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="right-box">
          <div class="title">已选择{{checkList.length}}人</div>
          <div class="content-customer erpscroll">
            <div v-for="(item, index) in checkList" :key="index">
              <el-checkbox class="erpcheck" :title="item.UserName" v-model="item.ischecked" @change="choosechecked(item,index)">
                {{item.UserName}}
              </el-checkbox>
              <el-select v-model="item.Type" size="mini" placeholder="请选择角色">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <svg-icon icon-class="del" @click.stop="checkdelete(index, item)" />
            </div>
          </div>
          <div class="operate">
            <!-- <el-checkbox class="erpcheck" v-model="checked" @change="allchecked">全选</el-checkbox> -->
            <el-button size="small" class="erpdelete" @click="alldelete" round>全部删除</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="erpbtn" size="small" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysUserList } from '@/api/SystemSetting.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    ModifyStaffData: {
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: false,
      UserName: '',
      currentPage: 1,
      PageSize: 10,
      total: 0,
      checkList: [],
      userlist: [],
      checked: false,
      // choosechecked: false,
      options: [{
        value: 0,
        label: '招聘负责人'
      }]
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      this.checkList = this.ModifyStaffData
      if (this.dialogVisible) {
        this.currentPage = 1
        this.chooseSys()
      }

    }
  },
  created () {

  },
  methods: {
    // 全选
    chooseallchecked (e) {

    },
    save () {
      if (!this.checkList.length) {
        this.$message({
          type: 'warning',
          message: '请选择要指派员工'
        })
        return
      }
      this.$emit('ModifyStaffSave', this.checkList)
    },
    // 搜索员工
    chooseSys () {
      let obj = {
        UserId: '',
        UserName: this.UserName,
        Status: 1,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.userlist = response.Data
            this.total = response.Total
            for (let i = 0; i < this.userlist.length; i++) {
              this.$set(this.userlist[i], 'ischecked', false)
            }
            for (let i = 0; i < this.userlist.length; i++) {
              for (let j = 0; j < this.checkList.length; j++) {
                if (this.userlist[i].Id == this.checkList[j].Id) {
                  this.$set(this.userlist[i], 'ischecked', true)
                }
              }
            }
          } else {
            this.userlist = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.loading = false
      })
    },
    changeChecked (item, index) {
      if (this.userlist[index].ischecked) {
        let goCheck = true
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.userlist[index].Id == this.checkList[i].Id) {
            goCheck = false
            return
          }
        }
        if (goCheck) {
          this.userlist[index].Type = 0
          this.checkList.push(this.userlist[index])
        }
      } else {
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.userlist[index].Id == this.checkList[i].Id) {
            this.checkList.splice(i, 1)
          }
        }
      }

    },
    choosechecked (item, index) {
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].Id == this.checkList[index].Id) {
          this.$set(this.userlist[i], 'ischecked', false)
        }
      }
      this.checkList.splice(index, 1)
    },
    // 删除
    checkdelete (index, item) {
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].Id == this.checkList[index].Id) {
          this.$set(this.userlist[i], 'ischecked', false)
        }
      }
      this.$set(this.checkList[index], 'ischecked', false)
      this.checkList.splice(index, 1)
    },
    // 全部删除
    alldelete () {

      for (let i = 0; i < this.checkList.length; i++) {
        this.$set(this.checkList[i], 'ischecked', false)
      }
      this.checkList = []
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.chooseSys()
    },
    closedialog () {
      this.checkList = []
      this.$emit('CloseModifyStaff', false)
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-box {
  display: flex;
  height: 408px;
  overflow-y: auto;
  justify-content: space-between;
  .title {
    background-color: #fff;
  }
  .left-box {
    width: 50%;
    background-color: $erinputbgc;
    border-radius: 8px;
    // overflow-y: auto;
    .title {
      font-size: $f14;
      color: $erp666;
      line-height: 28px;
    }
    .choose-box {
      padding: 16px;
      border-radius: 8px;
      /deep/ .erpscroll {
        background-color: $erinputbgc;
        overflow-y: auto;
        height: 245px;
        margin-bottom: 10px;
        .el-checkbox.erpcheck {
          line-height: 24px;
          color: $erp666;
          display: block;
          .el-checkbox__label {
            font-size: $f14;
            color: $erp666;
          }
        }
      }
      .el-input {
        margin-bottom: 6px;
      }
    }
  }
  /deep/ .right-box {
    flex: 1;
    margin-left: 24px;
    background-color: $erinputbgc;
    border-radius: 8px;
    .title {
      font-size: $f14;
      color: $erp666;
      line-height: 28px;
    }
    .content-customer {
      > div {
        display: flex;
        justify-content: space-between;
      }
      padding: 16px;
      overflow-y: auto;
      height: 333px;
      .el-checkbox {
        margin: 0;
        line-height: 36px;
        color: $erp666;
        .el-checkbox__label {
          font-size: $f14;
          color: $erp666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100px;
        }
        .el-checkbox__input {
          vertical-align: inherit;
        }
      }
      svg {
        line-height: 20px;
        font-size: 18px;
        cursor: pointer;
        margin-top: 6px;
        margin-left: 10px;
        color: #f56262;
      }
    }
    .operate {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      .el-checkbox {
        line-height: 30px;
      }
    }
  }
  /deep/ .el-pagination {
    text-align: center;
  }
}
</style>