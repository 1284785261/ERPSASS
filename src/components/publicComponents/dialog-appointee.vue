<!-- 选择人弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" destroy-on-close width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="tree-box">
        <div class="title">{{treetitle}}</div>
        <div class="choose-box">
          <el-input v-model="SysUserName" size="small" :placeholder="placetitle" @keyup.enter.native="chooseSys" @blur="chooseSys"></el-input>
          <el-tree :data="newarray" key="1" node-key="userId" ref="tree" v-loading="treeloading" default-expand-all :props="defaultProps" :expand-on-click-node="false" class="erpscroll">
            <div slot-scope="{ node, data }">
              <span>
                <!-- <input type="radio" name="Id" @click="radiochoose(node, data)" :id="data.Id"> -->
                <el-radio v-if="data.userId" v-model="radio" :label="data">{{ node.label }}</el-radio>
                <span v-else>{{ node.label }}</span>
              </span>
            </div>
          </el-tree>
        </div>
        <div class="project-title">已选择</div>
        <div class="project-box">
          <div class="tip" v-if="radio.name">{{radio.name}}
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
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
import { AddCustomersShared } from "@/api/CustomerManagement.js";
import { GetSysOrgListAndUserInfo, GetSysOrgListAndUserInfoMerge } from "@/api/SystemSetting.js";
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from "qs";
export default {
  props: ["title", "visible", "contentdata", "treetitle", 'placetitle'], // treetitle=> 标题 placetitle=> 输入框提示
  data () {
    return {
      dialogVisible: false,
      SysUserName: "",
      newarray: [], // 处理过的数据树状图数据
      defaultProps: {
        children: "children",
        label: "name"
      },
      treeloading: false,
      checkList: [],
      checked: false,
      Id: '',
      radio: '',
    };
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue;
      if (newvalue) {
      } else {
      }
    }
  },
  created () {
    this.getSysOrgListAndUserInfo();
  },
  methods: {
    // 获取组织关联用户信息
    getSysOrgListAndUserInfo () {
      let obj = {
        SysUserName: this.SysUserName,
        menuid: MenuIdDate(),
        operationcode: '1'
      };
      this.treeloading = true;
      GetSysOrgListAndUserInfoMerge(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          // this.newarray = [];
          // this.changetree(this.newarray, undefined, response.Data);
          // console.log(JSON.stringify(this.newarray));
          this.newarray = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        this.treeloading = false;
      });
    },
    // tree数据处理
    changetree (newarray, index, array) {
      if (index == undefined) {
        for (let i = 0; i < array.length; i++) {
          newarray.push({
            name: array[i].OrgName,
            orgId: array[i].Id,
            children: []
          });
          if (array[i].SysOrgList && array[i].SysOrgList.length) {
            for (let j = 0; j < array[i].SysOrgList.length; j++) {
              newarray[i].children.push({
                name: array[i].SysOrgList[j].SysUserName,
                Id: array[i].SysOrgList[j].SysUserId,
                children: []
              });
            }
          } else {
          }
          if (array[i].children && array[i].children.length) {
            this.changetree(newarray, i, array[i].children);
          }
        }
      } else {
        for (let i = 0; i < array.length; i++) {
          newarray[index].children.push({
            name: array[i].OrgName,
            orgId: array[i].Id,
            children: []
          });
          if (array[i].SysOrgList && array[i].SysOrgList.length) {
            for (let j = 0; j < array[i].SysOrgList.length; j++) {
              newarray[index].children[index].children.push({
                name: array[i].SysOrgList[j].SysUserName,
                Id: array[i].SysOrgList[j].SysUserId,
                children: []
              });
            }
          } else {
          }
          if (array[i].children && array[i].children.length) {
            this.changetree(newarray, i, array[i].children);
          }
        }
      }
    },
    // 选择客户人员
    chooseSys () {
      this.getSysOrgListAndUserInfo();
    },
    // radiochoose(node, data) {
    //   console.log(data);
    //   if (data.Id) {
    //     this.Id = data.Id
    //   }
    // },
    closedialog () {
      this.SysUserName = "";
      this.radio = ''
      this.$emit("closedialog", false);
    },
    save () {
      if (this.radio) {
        this.$emit("saveappointee", this.radio);
      } else {
        this.$message({
          message: "请选择要指派的同事",
          type: "warning"
        });
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
  }
};
</script>

<style lang="scss" scoped>
.tree-box {
  // height: 400px;
  // overflow-y: auto;
  justify-content: space-between;
  .title {
    background-color: #fff;
  }
  .title {
    font-size: $f14;
    color: $erp666;
    line-height: 28px;
  }
  .choose-box {
    padding: 16px;
    border-radius: 8px;
    background-color: $erinputbgc;
    .el-input {
      margin-bottom: 6px;
    }
  }
  /deep/ .el-tree-node__content {
    height: auto;
  }
  .el-tree {
    background-color: $erinputbgc;
    overflow-y: auto;
    height: 300px;
  }
  .project-title {
    font-size: $f14;
    color: $erp666;
    line-height: 28px;
  }
  .project-box {
    padding: 16px;
    background-color: $erinputbgc;
    .el-radio {
      display: block;
      line-height: 40px;
    }
  }
}
</style>