<!-- 添加共享客户 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="600px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="tree-box">
        <div class="left-box">
          <div class="title">选择需要共享客户的同事</div>
          <div class="choose-box">
            <el-input v-model="SysUserName" size="small" placeholder="请输入查询您要共享的同事名称" @keyup.enter.native="chooseSys" @blur="chooseSys"></el-input>
            <el-tree class="erpscroll" :data="newarray" key="1" node-key="userId" ref="tree" v-loading="treeloading" show-checkbox default-expand-all :props="defaultProps" :expand-on-click-node="false" @check="handleCheckChange">
              <div slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </div>
            </el-tree>
          </div>
        </div>
        <div class="rght-box">
          <div class="title">已选择{{checkList.length}}人</div>
          <div class="content-customer erpscroll">
            <div v-for="(item, index) in checkList" :key="index">
              <el-checkbox class="erpcheck" v-model="item.ischecked" @change="choosechecked">
                {{item.name}}
              </el-checkbox>
              <svg-icon class="cursor-pointer" icon-class="Close" @click.stop="checkdelete(index, item)" />
            </div>
          </div>
          <div class="operate">
            <el-checkbox class="erpcheck" v-model="checked" @change="allchecked">全选</el-checkbox>
            <el-button size="small" class="erpdelete" @click="alldelete" round>删除</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AddCustomersShared } from '@/api/CustomerManagement.js'
import { GetSysOrgListAndUserInfo, GetSysOrgListAndUserInfoMerge } from '@/api/SystemSetting.js'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: ['title', 'visible', 'contentdata'],
  data () {
    return {
      dialogVisible: false,
      SysUserName: '',
      newarray: [], // 处理过的数据树状图数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeloading: false,
      checkList: [],
      checked: false,
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {

      } else {

      }
    }
  },
  created () {
    this.getSysOrgListAndUserInfo()
  },
  methods: {
    // 获取组织关联用户信息
    getSysOrgListAndUserInfo () {
      let obj = {
        SysUserName: this.SysUserName,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.treeloading = true
      GetSysOrgListAndUserInfoMerge(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          // this.newarray = []
          // this.changetree(this.newarray, undefined, response.Data)
          // console.log(JSON.stringify(this.newarray));
          this.newarray = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.treeloading = false
      })
    },
    // tree数据处理
    changetree(newarray, index, array) {
      if (index==undefined) {
        for (let i = 0; i < array.length; i++) {
          newarray.push({
            name: array[i].OrgName,
            orgId: array[i].Id,
            children: []
          })
          // console.log(newarray[i].children);
          
          if (array[i].SysOrgList && array[i].SysOrgList.length) {
            for (let j = 0; j < array[i].SysOrgList.length; j++) {
              newarray[i].children.push({
                name: array[i].SysOrgList[j].SysUserName,
                Id: array[i].SysOrgList[j].SysUserId,
                children: []
              })
            }
          } else {
  
          }
          if (array[i].children && array[i].children.length) {
            this.changetree(newarray, i, array[i].children)
          }
        }
      } else {
        for (let i = 0; i < array.length; i++) {
          if (newarray[index]) {
            newarray[index].children.push({
              name: array[i].OrgName,
              orgId: array[i].Id,
              children: []
            })
            if (array[i].SysOrgList && array[i].SysOrgList.length) {
              for (let j = 0; j < array[i].SysOrgList.length; j++) {
                newarray[index].children[i].children.push({
                  name: array[i].SysOrgList[j].SysUserName,
                  Id: array[i].SysOrgList[j].SysUserId,
                  children: []
                })
              }
            } else {
  
            }
          } else {

          }
          if (array[i].children && array[i].children.length) {
            this.changetree(newarray, i, array[i].children)
          }
        }
      }
    },
    // 选择客户人员
    chooseSys() {
      this.getSysOrgListAndUserInfo()
    },
    // 复选框选择
    handleCheckChange() {
      var arry = this.$refs.tree.getCheckedNodes()
      this.checkList = []
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].userId) {
          let obj = {
            name: arry[i].name,
            Id:  arry[i].userId,
            ischecked: false
          }
          this.checkList.push(obj)
        }
      }
    },
    // 单个删除
    checkdelete(index, item) {
      this.checkList.splice(index, 1)
      this.$refs.tree.setChecked(item, false);
    },
    // 多选删除
    alldelete() {
      this.checkList = this.checkList.filter(v => {
        if (v.ischecked == false) {
          return v
        }
      })
      this.allchecked = false
      this.$refs.tree.setCheckedNodes(this.checkList)
    },
    // 单个选 择
    choosechecked() {
      var ischeck = this.checkList.every(v => {
        return v.ischecked == true
      })
      this.checked = ischeck
    },
    // 全选
    allchecked(e) {
      for (let i = 0; i < this.checkList.length; i++) {
        this.checkList[i].ischecked = e
      }
    },
    closedialog () {
      this.SysUserName = ''
      this.checkList = []
      this.$emit('closedialog', false)
    },
    save () {
      let array = []
      for (let i = 0; i < this.checkList.length; i++) {
        array.push({
          Id: 0,
          SysUserId: this.checkList[i].Id
        })
      }
      if (array && array.length) {
        this.$emit('savesharecustomer', array)
      } else {
        this.$message({
          message: '请选择要共享的同事',
          type: 'warning'
        })
      }
      // return
      // AddCustomersShared(qs.stringify(obj)).then(response => {
      //   if (response.IsSuccess) {
      //     this.$message({
      //       message: '添加成功',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: response.MessageContent,
      //       type: 'error'
      //     })
      //   }
      // })
    }
  },
}
</script>

<style lang="scss" scoped>
.tree-box {
  display: flex;
  height: 400px;
  overflow-y: auto;
  justify-content: space-between;
  .title {
    background-color: #fff;
  }
  .left-box {
    width: 320px;
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
      .el-input {
        margin-bottom: 6px;
      }
    }
  }
  /deep/ .rght-box {
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
        align-items: center;
      }
      padding: 16px;
      overflow-y: auto;
      height: 333px;
      .el-checkbox {
        margin: 0;
      }
      svg {
        line-height: 20px;
        font-size: 16px;
        cursor: pointer;
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
  /deep/ .el-tree-node__content {
    height: auto;
  }
  /deep/ .el-tree {
    background-color: $erinputbgc;
    overflow-y: auto;
    height: 300px;

    .el-checkbox {
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        background-color: #A3B1CC;
        // border-color: #638DF8;
        border: none;

        &::after {
          border: 2px solid #fff;
          border-left: 0;
          border-top: 0;
          height: 10px;
          left: 6px;
        }
      }

      .el-checkbox__label {
        font-size: $f16;
        color: $erp333;
        vertical-align: middle;
      }
      .is-indeterminate {
        .el-checkbox__inner {
          &::before {
            top: 7px;
          }
        }
      }
    }
  }
}
</style>