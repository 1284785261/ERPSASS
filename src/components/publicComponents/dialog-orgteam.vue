<!-- 组织结构弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="orgtitle" class="dialog-box dialog-account" append-to-body :visible.sync="showOrg" :show-close="false" :destroy-on-close="true" width="480px" @close="closeorg">
      <i class="el-icon-circle-close closeButton" @click="closeorg"></i>
      <div class="choose-box">
        <el-input v-model="OrgName" size="small" placeholder="输入组织名查询" @keyup.enter.native="chooseOrg" @blur="chooseOrg"></el-input>
        <el-tree :data="newarray" key="1" node-key="Id" ref="tree" v-loading="treeloading" default-expand-all :props="defaultProps" :expand-on-click-node="false" class="erpscroll">
          <div slot-scope="{ node, data }">
            <span>
              <el-radio v-if="data.Id" v-model="radio" :label="data.Id" @change="radiochoose(data)">{{ node.label }}</el-radio>
              <span v-else>{{ node.label }}</span>
            </span>
          </div>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogorg">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysOrgList } from '@/api/SystemSetting.js'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: {
    orgtitle: {
      type: String,
      default: '选择组织'
    },
    visible: {
      type: Boolean
    },
    temporary: {
      type: Object
    }
  },
  data() {
    return {
      newarray: [],
      OrgName: '',
      treeloading: false,
      showOrg: false,
      radio: '',
      defaultProps: {
        children: 'children',
        label: 'OrgName'
      },
      data: {},
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.showOrg = newvalue
      console.log(this.temporary);
      if (this.temporary.Id) {
        this.radio = this.temporary.Id
        this.data = {
          Id: this.temporary.Id,
          OrgName: this.temporary.OrgName
        }
      } else {
        this.radio = ''
      }
    },
  },
  created() {
    this.chooseOrg()
  },
  methods: {
    // 查询组织
    chooseOrg() {
      let data1 = {
        OrgName: this.OrgName,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      this.treeloading = true
      GetSysOrgList(qs.stringify(data1)).then(response => {
        if (response.IsSuccess) {
          this.newarray = response.Data
          this.treeloading = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择组织
    radiochoose(e) {
      this.data = {
        Id: e.Id,
        OrgName: e.OrgName
      }
    },
    // 保存弹框
    dialogorg() {
      this.$emit('saveorg', this.data)
    },
    // 关闭弹框
    closeorg() {
      this.$emit('closeorg')
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .dialog-account {
  .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
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