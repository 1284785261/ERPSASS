// 入职办理
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContent" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="选择入职公司" prop="BfCompanyId" class="textarea-note">
          <el-select v-model="dataObject.BfCompanyId" filterable clearable remote placeholder="请查询或下拉选择入职公司" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading">
            <el-option v-for="item in MainBbodyList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'dialog-Induct',
  props: {
    showInduct: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '入职办理'
    },
    itemMap: {
      type: Object,
    },
  },
  data () {
    return {
      dataObject: {
        BfCompanyId: ''
      },
      loading: false,
      MainBbodyList: [],
      showContent: false
    }
  },
  watch: {
    showInduct (newvalue, oldvalue) {
      this.showContent = newvalue
      this.remoteCompany()
    }
  },
  created () {
  },
  methods: {
    //查询主体公司
    remoteCompany (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          PageIndex: 1,
          PageSize: 99,
          Name: query,
          Status: 1,
          Level: -1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetBfCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.MainBbodyList = response.Data
            } else {
              this.MainBbodyList = []
            }
          } else {
            this.MainBbodyList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    //清空主体公司
    clearCompany () {
      this.remoteCompany()
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$emit('SuccInduct', this.dataObject)
    },
    close () {
      this.dataObject = this.$options.data().dataObject
      this.$emit('CloseInduct', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
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
      }
    }
  }

  /deep/ .textarea-note {
    textarea {
      resize: none;
      background: $erinputbgc;
      border: none;
    }
    .el-input__count {
      bottom: 2px;
      height: 30px;
      line-height: 30px;
      right: 20px;
      background: $erinputbgc;
    }
  }
}
</style>