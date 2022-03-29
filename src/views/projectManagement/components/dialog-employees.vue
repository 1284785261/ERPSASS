<!-- 添加员工到项目 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="700px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="search-item" v-if="options.length">
        <div class="label">选择岗位</div>
        <el-select v-model="value" class="select" size="small" clearable placeholder="请选择岗位">
          <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">选择入职项目时间</div>
        <el-date-picker v-model="jobdate" class="select" size="small" type="date" placeholder="选择入职项目时间" />
      </div>
      <div class="custom-box">
        <div class="left-box">
          <div class="title">选择需要添加的员工</div>
          <div class="choose-box">
            <el-input v-model="UserName" size="small" placeholder="请输入查询您要添加的员工" @keyup.enter.native="chooseSys" @blur="chooseSys"></el-input>
            <div class="erpscroll" v-loading="checkloading">
              <el-checkbox-group v-model="checkList">
                <el-checkbox class="erpcheck" :label="item" v-for="(item, index) in userlist" :key="index">{{item | itemname}}</el-checkbox>
              </el-checkbox-group>
              <span v-show="!userlist.length">暂无数据</span>
            </div>
            <el-pagination background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :pager-count="5" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="right-box">
          <div class="title">已选择{{checkList.length}}人</div>
          <div class="content-customer erpscroll">
            <div v-for="(item, index) in checkList" :key="index">
              <el-checkbox class="erpcheck" :title="item.UserName" v-model="item.ischecked" @change="choosechecked">
                {{item.UserName}}
              </el-checkbox>
              <svg-icon icon-class="Close" @click.stop="checkdelete(index, item)" />
            </div>
          </div>
          <div class="operate">
            <el-checkbox class="erpcheck" v-model="checked" @change="allchecked">全选</el-checkbox>
            <el-button size="small" class="erpdelete" @click="alldelete" round>删除</el-button>
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
import { GetStaffPageList, GetEntryStaffPageList } from '@/api/OutsourcedEmployeeManagement'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    contentdata: {
      type: Object
    }
  },
  filters: {
    itemname(val) {
      return val.UserName + ' (' + val.IdCode + ') '
    }
  },
  data() {
    return {
      dialogVisible: false,
      UserName: '',
      currentPage: 1,
      total: 0,
      checkList: [],
      userlist: [],
      checked: false,
      checkloading: false,
      value: '', // 岗位
      options: [], // 岗位列表
      jobdate: new Date(), // 入职时间
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.currentPage = 1
        this.chooseSys()
        // console.log(this.contentdata);
        if (this.contentdata.Recruitlist && this.contentdata.Recruitlist.length) {
          this.options = []
          for (let i = 0; i < this.contentdata.Recruitlist.length; i++) {
            this.options.push({
              value: this.contentdata.Recruitlist[i].PositionName
            })
          }
        }
      }
    }
  },
  created() {

  },
  methods: {
    save() {
      if (!this.jobdate) {
        this.$message({
          type: 'warning',
          message: '请选择入职时间'
        })
        return
      }
      if (!this.checkList.length) {
        this.$message({
          type: 'warning',
          message: '请选择要添加的员工'
        })
        return
      }
      this.$emit('saveemployees', this.checkList, this.value, this.jobdate)
    },
    // 搜索员工
    chooseSys() {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: 10,
        NotProjectId: this.contentdata.Id,
        UserName: this.UserName,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.checkloading = true
      GetEntryStaffPageList(qs.stringify(obj)).then(response => {
        this.checkloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            for (let i = 0; i < response.Data.length; i++) {
              response.Data.ischecked = false
              this.userlist = response.Data
              this.total = response.Total
            }
          } else {
            this.userlist = []
            this.total = 0
          }
        } else {
          this.userlist = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    choosechecked() {
      if (this.checkList.every(v => { return v.ischecked })) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    // 删除
    checkdelete(index, item) {
      this.checkList.splice(index, 1)
    },
    // 全选
    allchecked(e) {
      for (let i = 0; i < this.checkList.length; i++) {
        // this.checkList[i].ischecked = e
        this.$set(this.checkList[i], 'ischecked', e)
      }
    },
    // 全部删除
    alldelete() {
      this.checkList = this.checkList.filter(v => {
        if (v.ischecked == false) {
          return v
        }
      })
      this.allchecked = false
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.chooseSys()
    },
    closedialog() {
      this.checkList = []
      this.UserName = ''
      this.$emit('closedialog')
    }
  },
}
</script>

<style lang="scss" scoped>
.search-item /deep/ {
  margin-bottom: 10px;
  .label {
    margin-bottom: 7px;
  }
  .select {
    width: 100%;
    .el-input__inner {
      background-color: $erinputbgc;
    }
  }
}
.custom-box {
  display: flex;
  height: 400px;
  overflow-y: auto;
  justify-content: space-between;
  .title {
    background-color: #fff;
  }
  .left-box {
    width: 420px;
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
        height: 260px;
        margin-bottom: 10px;
        > span {
          width: 100%;
          display: block;
          text-align: center;
        }
        .el-checkbox.erpcheck {
          line-height: 24px;
          color: $erp666;
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
        line-height: 24px;
        color: $erp666;
        .el-checkbox__label {
          font-size: $f14;
          color: $erp666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100px;
          vertical-align: middle;
        }
      }
      svg {
        line-height: 20px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 4px;
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
  /deep/ .disableds {
    .el-checkbox__inner {
      opacity: 0;
    }
  }
}
</style>