<!-- 参与结算 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="colleague-box">
        <!-- <el-input v-model="input" size="small" placeholder="请输入要查询的员工名称"></el-input> -->
        <el-table ref="multipleTable" :data="tableData" :height="tableheight" style="width: 100%">
          <el-table-column prop="isshow" width="50">
            <template slot-scope="scope">
              <el-checkbox class="erpcheck" @change="changecheck" v-model="scope.row.isshow"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="IdCode" label="身份证" align="center">
          </el-table-column>
          <el-table-column prop="Amount" label="实发工资" align="center">
          </el-table-column>
        </el-table>
        <div class="operate-bottom">
          <el-checkbox class="erpcheck" @change="allselect" v-model="ischecked">全选</el-checkbox>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean
    },
    contentdata: {
      type: Array
    }
  },
  data() {
    return {
      input: '',
      dialogVisible: false,
      tableData: [],
      ischecked: false,
      tableheight: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableheight = window.innerHeight - 450
    })
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      this.tableData = this.contentdata
      // 判断是否全选
      this.ischecked = this.tableData.every(v => {
        return v.isshow
      })
    }
  },
  methods: {
    closedialog() {
      this.$emit('closeset')
    },
    save() {
      this.$emit('saveset', this.tableData)
    },
    handleSelectionChange() {

    },
    // 全选
    allselect(e) {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].isshow = e
      }
    },
    changecheck(e) {
      this.ischecked = this.tableData.every(v => {
        return v.isshow
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  /deep/ .colleague-box {
    .el-input {
      .el-input__inner {
        background-color: $erinputbgc;
        border-radius: 8px;
        border-color: transparent;
      }
    }
    .operate-bottom {
      margin-top: 10px;
      padding-left: 10px;
    }
  }
</style>