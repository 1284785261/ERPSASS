<template>
  <div>
    <svg-icon :icon-class="icon" />
    <span slot="title" :title="title">{{ title }}</span>
    <!-- <img v-if="item" class="selectImg" src="../../../assets/logo.png"> -->
    <el-dropdown v-if="isedit" class="groupoperate">
      <span class="operate">
        ...
      </span>
      <el-dropdown-menu slot="dropdown">
        <ul class="popout-list">
          <el-dropdown-item @click.native="edit">修改</el-dropdown-item>
          <el-dropdown-item class="delete" @click.native="deletes">删除</el-dropdown-item>
        </ul>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :close-on-click-modal="false" title="修改分组" :visible.sync="dialogVisible" :append-to-body=true custom-class="modifier-dialog" width="400px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="活动名称" prop="title">
          <el-input size="mini" v-model="ruleForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="sassbtn" size="mini" round @click="dialogVisible = false">取 消</el-button>
        <el-button class="sassbtn" size="mini" round @click="savegroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { GetProjectGroup, DeleteResumeGroup, EditResumeGroup } from '@/api/pipeline.js'
// import { DeleteProjectGroup, EditProjectGroup } from '@/api/project.js'
// import { DeleteEmployerGroup, EditEmployerGroup } from '@/api/company.js'
import qs from 'qs'
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isedit: {
      type: Boolean,
      default: false
    },
    metaId: {
      type: Number,
    },
    metaType: {
      type: String,
    },
    item: {
      type: Object
    }
  },
  watch: {
    dialogVisible () {
      this.ruleForm.title = this.title
    }
  },
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        title: ''
      },
      rules: {
        title: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
      }
    }
  },
  methods: {
    edit () {
      this.dialogVisible = true
    },
    // 删除分组
    // deletes () {
    //   this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let obj = {
    //       Id: this.metaId,
    //       MenuId: this.item.meta.menuid,
    //       OperationCode: 'Delete'
    //     }
    //     if (this.metaType == '0') { // 删除项目组
    //       DeleteProjectGroup(qs.stringify(obj)).then(response => {
    //         if (response.IsSuccess) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功'
    //           })
    //           this.$router.go(0)
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: response.MessageContent
    //           })
    //         }
    //       })
    //     } else if (this.metaType == '1') { // 删除人才组
    //       DeleteResumeGroup(qs.stringify(obj)).then(response => {
    //         if (response.IsSuccess) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功'
    //           })
    //           this.$router.go(0)
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: response.MessageContent
    //           })
    //         }
    //       })
    //     } else if (this.metaType == '2') { // 删除客户组
    //       DeleteEmployerGroup(qs.stringify(obj)).then(response => {
    //         if (response.IsSuccess) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功'
    //           })
    //           this.$router.go(0)
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: response.MessageContent
    //           })
    //         }
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 保存分组
    savegroup () {
      let obj = {
        Id: this.metaId,
        GroupName: this.ruleForm.title,
        Sort: 999,
        MenuId: this.item.meta.menuid,
        OperationCode: 'Modify'
      }
      if (this.metaType == '0') { // 修改项目分组
        EditProjectGroup(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.go(0)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else if (this.metaType == '1') { // 修改人才分组
        EditResumeGroup(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.go(0)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else if (this.metaType == '2') {
        EditEmployerGroup(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.go(0)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.el-dropdown.groupoperate {
  float: right;
  height: 40px;
  .operate {
    display: block;
    width: 20px;
    text-align: center;
  }
}
.selectImg {
  position: absolute;
  left: 20%;
  top: 50%;
  display: none;
  transform: translate(0, -50%);
}
.router-link-active {
  .is-active {
    img {
      display: inline-block;
    }
  }
}
</style>
