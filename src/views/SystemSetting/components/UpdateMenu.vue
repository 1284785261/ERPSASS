<template>
  <div>
    <el-dialog :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="480px"
      :lock-scroll="false"
      custom-class="erpdialog"
      @close="closedialog">
      <el-form :model="menuform" label-position="top" :rules="rules" ref="menuform" label-width="100px" class="menuform">
        <el-form-item label="父级ID" prop="ParentId">
          <el-input v-model="menuform.ParentId"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="Title">
          <el-input v-model="menuform.Title"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="LinkUrl">
          <el-input v-model="menuform.LinkUrl"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="menuform.Ico"></el-input>
        </el-form-item>
        <el-form-item label="排序" class="counternumber">
          <el-input-number v-model="menuform.Sort" @change="handleChange" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="menuform.Remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="使用状态" class="useraido">
          <el-radio-group v-model="menuform.note">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['title', 'visible', 'contentdata'],
  data() {
    return {
      dialogVisible: false,
      menuform: {
        ParentId: '',
        Title: '',
        LinkUrl: '',
        Ico: '',
        Sort: 1,
        Remark: ''
      },
      rules: {
        Title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
        ],
        ParentId: [
          { required: true, message: '请输入父级ID', trigger: 'blur' },
        ],
        LinkUrl: [
          { required: true, message: '请输入url', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.menuform = this.contentdata
      } else {
        this.menuform = {
          ParentId: 0,
          Title: '',
          LinkUrl: '',
          Ico: '',
          Sort: 1,
          Remark: ''
        }
      }
    }
  },
  methods: {
    closedialog() {
      this.$refs.menuform.resetFields()
      this.$emit('closedialog', false)
    },
    save() {
      this.$refs.menuform.validate(v => {
        if (v) {
          this.$emit('savedialog', this.menuform)
        }
      })
    },
    handleChange() {

    }
  },
}
</script>

<style lang="scss">
  .menuform {
    .el-form-item {
      // margin-bottom: 9px;
      // .el-form-item__label {
      //   line-height: 28px;
      //   font-weight: 400;
      //   padding-bottom: 0;
      //   color: $erp666;
      // }
      // .el-form-item__content {
      //   .el-input__inner {
      //     border-radius: 8px;
      //     background-color: $erinputbgc;
      //     border-color: #fff;
      //   }
      // }
      // &.useraido {
      //   .el-radio-group {
      //     width: 100%;
      //     height: 40px;
      //     .el-radio-button {
      //       width: 50%;
      //       .el-radio-button__inner {
      //         width: 100%;
      //         height: 100%;
      //         background-color: #E5E5E5;
      //       }
      //       &.is-active {
      //         .el-radio-button__inner {
      //           background-color: #638DF8;
      //         }
      //       }
      //     }
      //   }
      // }
      // &.text {
      //   .el-form-item__content {
      //     height: 120px;
      //     .el-textarea__inner {
      //       background-color: $erinputbgc;
      //       border: none;
      //     }
      //   }
      // }
    }
  }
</style>