<template>
  <div>
    <el-dialog :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="480px"
      :lock-scroll="false"
      custom-class="erpdialog"
      @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="开票公司" class="select">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开票申请人">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开票申请部门">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开票时间">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开票总额">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="增值税专用发票开票科目">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="增值税专用发票开票金额">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="增值税普通发票开票科目">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="增值税普通发票开票金额">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="收款方式">
          <el-input v-model="operateform.Subject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="6" v-model="operateform.Skills" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer three-footer">
        <el-button class="erpbtn" @click="closedialog">取 消</el-button>
        <el-button class="erpbtn" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
    contentdata: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      operateform: {

      },
      rules: {}
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
    }
  },
  methods: {
    closedialog() {

    },
    save() {

    },
  },
}
</script>

<style lang="scss" scoped>
  /deep/ .dialog-footer.three-footer {
    text-align: center;
    > button {
      width: auto;
      height: auto;
      background-color: $erpbtncolor;
      color: $erpcolor;
    }
  }
</style>