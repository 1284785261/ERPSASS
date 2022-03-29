<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" destroy-on-close width="960px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="custom-box">
        <div class="left-box">
          <div class="title">选择需要指派的员工</div>
          <div class="choose-box">
            <el-input v-model="UserName" size="small" placeholder="请输入查询您要指派的员工" @keyup.enter.native="chooseSys" @blur="chooseSys"></el-input>
            <div class="erpscroll">
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox class="erpcheck" :label="item" v-for="(item, index) in userlist" :key="index">{{item.UserName}}</el-checkbox>
              </el-checkbox-group> -->
              <div class="left-checkbox">
                <el-checkbox class="erpcheck" v-model="item.ischecked" :label="item.Id" v-for="(item, index) in userlist" :key="index" @change="leftchange(item)">
                  <span v-if="item.Mobile">{{item.UserName}}({{item.Mobile}})</span>
                  <span v-else>{{item.UserName}}</span>
                </el-checkbox>
              </div>
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
              <div class="conent-top">
                <el-checkbox class="erpcheck" :title="item.UserName" v-model="item.ischecked" @change="choosechecked">
                  {{item.UserName}}
                </el-checkbox>
                <el-select v-model="item.Type" multiple size="mini" placeholder="请选择角色">
                  <el-option v-for="item in options" :key="item.value" :label="item.describe" :value="item.value"></el-option>
                </el-select>
                <svg-icon icon-class="del" @click.stop="checkdelete(index, item)" />
              </div>
              <div class="conent-bottom">
                <el-input type="text" size="small" placeholder="请输入服务地区说明" v-model="item.Remark" maxlength="20" show-word-limit></el-input>
                <!-- <el-select v-model="item.provinceId" @change="chooseprovince(item.provinceId, item)" clearable @clear="clearprovince(item)" size="mini" placeholder="请选择省">
                  <el-option v-for="it in provincelist" :key="it.value" :label="it.Name" :value="it.Id"></el-option>
                </el-select>
                <el-select v-model="item.cityId" @change="choosecity(item.cityId, item)" clearable @clear="clearcity(item)" size="mini" placeholder="请选择市">
                  <el-option v-for="it in item.citylist" :key="it.value" :label="it.Name" :value="it.Id"></el-option>
                </el-select>
                <el-select v-model="item.areaId" clearable size="mini" placeholder="请选择区">
                  <el-option v-for="it in item.arealist" :key="it.value" :label="it.Name" :value="it.Id"></el-option>
                </el-select> -->
              </div>
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
import { GetSysUserList } from '@/api/SystemSetting.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import { GetProjectAssignType, GetProjectAssignMemberList } from '@/api/projectManagement.js'
import { GetAreaList } from '@/api/Public.js'
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
    },
    projectid: {
      type: [Number, String]
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
        describe: '管理员'
      }, {
        value: 1,
        describe: '薪酬专员',
      }, {
        value: 2,
        describe: '社保专员',
      }, {
        value: 3,
        describe: '公积金专员',
      }],
      leftcheck: ''
      // provincelist: [], // 省列表
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (this.dialogVisible) {
        this.currentPage = 1
        this.getProjectAssignMemberList()
        // this.chooseSys()
        this.getProjectAssignType()
      }
    }
  },
  created () {
  },
  methods: {
    // 作废
    // // 获取省
    // getAreaList() {
    //   let obj = {
    //     ParentId: 0,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetAreaList(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.provincelist = response.Data
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: response.MessageContent
    //       })
    //     }
    //   })
    // },
    // // 选择市
    // chooseprovince(value, item) {
    //   let obj = {
    //     ParentId: value,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetAreaList(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       item.citylist = response.Data
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: response.MessageContent
    //       })
    //     }
    //   })
    // },
    // // 选择区
    // choosecity(value, item) {
    //   let obj = {
    //     ParentId: value,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetAreaList(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       item.arealist = response.Data
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: response.MessageContent
    //       })
    //     }
    //   })
    // },
    // // 清除省
    // clearprovince(item) {
    //   item.citylist = []
    //   item.arealist = []
    //   item.cityId = ''
    //   item.areaId = ''
    // },
    // // 清除市
    // clearcity(item) {
    //   item.arealist = []
    //   item.areaId = ''
    // },
    // 获取项目指派人员
    getProjectAssignMemberList () {
      let obj = {
        ProjectId: this.projectid,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectAssignMemberList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          console.log(response.Data);
          // 处理数据
          if (response.Data && response.Data.length) {
            let arry = []
            let data = {}
            for (let i = 0; i < response.Data.length; i++) {
              response.Data[i].ischecked = true
              var ai = response.Data[i]
              if (!data[ai.Commissioner]) {
                arry.push(ai)
                data[ai.Commissioner] = ai
              } else {
                for (let j = 0; j < arry.length; j++) {
                  var dj = arry[j]
                  if (dj.Commissioner == ai.Commissioner) {
                    // dj.TypeText = ai.TypeText + ',' + dj.TypeText
                    dj.Type = ai.Type + ',' + dj.Type
                    // dj.Remark = ai.Remark + ',' + dj.Remark
                    break
                  }
                }
              }
            }
            for (let i = 0; i < arry.length; i++) {
              console.log(typeof arry[i].Type === 'string');
              console.log(arry[i].Type)
              if (typeof arry[i].Type === 'string') {
                arry[i].Type = [...new Set(arry[i].Type.split(','))].map(Number)
              } else {
                arry[i].Type = [JSON.parse(JSON.stringify(arry[i].Type))]
              }
              arry[i].UserName = arry[i].CommissionerName
              arry[i].Id = arry[i].Commissioner
            }
            console.log(arry);
            this.checkList = arry
            this.chooseSys()
          } else {
            this.chooseSys()
          }
        } else {
          this.chooseSys()
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 左侧选中事件
    leftchange (e) {
      if (e.ischecked) {
        // 选中
        this.checkList.push({
          UserName: e.UserName,
          ischecked: e.ischecked,
          Type: [],
          Remark: '',
          Id: e.Id
        })
      } else {
        // 未选中
        let index
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].Id === e.Id) {
            index = i
          }
        }
        this.checkList.splice(index, 1)
      }
    },
    // 获取项目人员分类
    getProjectAssignType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectAssignType(qs.stringify(obj)).then(response => {
        if (response) {
          this.options = response
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 全选
    chooseallchecked (e) {

    },
    save () {
      // if (!this.checkList.length) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择要指派员工'
      //   })
      //   return
      // }
      // 判断作废
      // // 判断只有项目管理员才可以选一个
      // let type1 = 0
      // let type2 = 0
      // let type3 = 0
      // for (let i = 0; i < this.checkList.length; i++) {
      //   if (this.checkList[i].Type === 1) {
      //     type1++
      //   } else if (this.checkList[i].Type === 2) {
      //     type2++
      //   } else if (this.checkList[i].Type === 3) {
      //     type3++
      //   }
      // }
      // console.log(type1, type2, type3);
      // if (type1 > 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '薪酬专员只能选择一个'
      //   })
      //   return
      // } else if (type2 > 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '社保专员只能选择一个'
      //   })
      //   return
      // } else if (type3 > 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '公积金专员只能选择一个'
      //   })
      //   return
      // }
      // 判断是否填写员工状态
      for (let i = 0; i < this.checkList.length; i++) {
        console.log(this.checkList[i].Type);
        if (!this.checkList[i].Type.length) {
          this.$message({
            type: 'warning',
            message: '请选择角色类型'
          })
          return
        }
      }
      console.log(this.checkList);
      this.$emit('saveappointee', this.checkList)
    },
    // 搜索员工
    chooseSys () {
      let obj = {
        UserId: '',
        UserName: this.UserName,
        Status: 1,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Diploma: -1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            for (let i = 0; i < response.Data.length; i++) {
              response.Data[i].ischecked = false
              for (let j = 0; j < this.checkList.length; j++) {
                if (response.Data[i].Id === this.checkList[j].Commissioner) {
                  response.Data[i].ischecked = true
                }
              }
              // response.Data[i].Type = []
              // response.Data[i].Remark = ''
              // response.Data[i].provinceId = ''
              // response.Data[i].cityId = ''
              // response.Data[i].citylist = []
              // response.Data[i].areaId = ''
              // response.Data[i].arealist = []
              // 处理数据
            }
            this.userlist = response.Data
            this.total = response.Total
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
    choosechecked () {
      if (this.checkList.every(v => { return v.ischecked })) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    // 删除
    checkdelete (index, item) {
      // 如果有id调用接口删除
      if (item)
        this.checkList.splice(index, 1)
    },
    // 全选
    allchecked (e) {
      for (let i = 0; i < this.checkList.length; i++) {
        // this.checkList[i].ischecked = e
        this.$set(this.checkList[i], 'ischecked', e)
      }
    },
    // 全部删除
    alldelete () {
      this.checkList = this.checkList.filter(v => {
        if (v.ischecked == false) {
          return v
        }
      })
      this.allchecked = false
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.chooseSys()
    },
    closedialog () {
      this.checkList = []
      this.$emit('closedialog')
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
    width: 45%;
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
      .conent-top {
        display: flex;
        justify-content: space-between;
        .el-select {
          flex: 1;
          line-height: 36px;
        }
      }
      .conent-bottom {
        display: flex;
        margin-right: 30px;
        margin-bottom: 24px;
        .el-input {
          margin-left: 24px;
        }
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
        width: 20px;
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
    margin-top: 14px;
  }
}
</style>