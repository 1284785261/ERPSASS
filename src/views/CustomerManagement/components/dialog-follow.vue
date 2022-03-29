<!-- 跟进信息 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="跟进人" prop="SysUserId" class="select">
          <el-select v-model="operateform.SysUserId" filterable remote clearable placeholder="搜索选择跟进人" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in useroptions" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
            <div v-if="useroptions.length > 49" class="search-keyword">
              <span>只显示前50条结果，请完善搜索关键字</span>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间">
          <el-date-picker v-model="operateform.FollowTime" type="date" placeholder="选择跟进时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="跟进内容" class="text">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="operateform.Content"></el-input>
        </el-form-item>
        <el-form-item label="跟进阶段" class="select">
          <el-select v-model="operateform.Step" placeholder="请选择跟进阶段">
            <el-option v-for="item in followoptions" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联待办任务" class="select">
          <el-select v-model="operateform.TaskId" placeholder="请选择关联待办任务">
            <el-option v-for="item in options" :key="item.Id" :label="item.Content" :value="item.Id">
            </el-option>
          </el-select>
          <!-- <div class="operate" @click="addTask">
            <svg-icon icon-class="setting"></svg-icon>
          </div> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="提示" :visible.sync="taskvisible" width="480px" custom-class="erpdialog" :before-close="taskClose">
      <el-form :model="stakform" label-position="top" :rules="stakformrules" ref="stakform" label-width="100px" class="operateform">
        <el-form-item label="任务名称">
          <el-input v-model="stakform.name"></el-input>
        </el-form-item>
        <el-form-item label="跟进阶段" class="select">
          <el-select v-model="stakform.name" placeholder="请选择跟进阶段">
            <el-option v-for="item in projectptions" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" class="text">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="stakform.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskvisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetRelatedAgencyTask } from '@/api/Remind.js'
import { GetCompanyFollowEnumStep } from '@/api/Public.js'
import { GetSysUserList } from '@/api/SystemSetting.js'
import { copy, MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: ['title', 'visible', 'contentdata'],
  data () {
    return {
      followoptions: [],
      options: [],
      loading: false,
      useroptions: [],
      projectptions: [],
      operateform: {
        SysUserId: '',
        Content: '',
        FollowTime: '',
        Step: '',
        TaskId: '',
      },
      user: {},
      stakform: {
        name: ''
      },
      dialogVisible: false,
      taskvisible: false,
      rules: {
        SysUserId: [
          { required: true, message: '请选择跟进人', trigger: 'change' }
        ]
      },
      stakformrules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['followenumlist'])
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.operateform = this.contentdata
        console.log(this.contentdata)
        if (this.contentdata.TaskId) {
          this.options = [{
            Id: this.contentdata.TaskId,
            Content: this.contentdata.TaskContent
          }]
        }
        if (this.contentdata.SysUserId) {
          this.useroptions = [{
            Id: this.contentdata.SysUserId,
            UserName: this.contentdata.SysUserName
          }]
        } else {
          this.remoteMethod('')
          this.user = JSON.parse(window.localStorage.getItem('Current'))
          this.operateform.SysUserId = this.user.currentUser
          this.operateform.FollowTime = new Date()
        }
        this.getRelatedAgencyTask()
      } else {
        this.operateform = {
          SysUserId: '',
          Content: '',
          FollowTime: '',
          Step: '',
          TaskId: '',
        }
      }
    }
  },
  created () {
    this.getCompanyFollowEnumStep()
  },
  methods: {
    // 获取代办任务
    getRelatedAgencyTask () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetRelatedAgencyTask(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.options = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取客户跟进阶段枚举
    getCompanyFollowEnumStep () {
      if (this.followenumlist && this.followenumlist.length) {
        this.followoptions = this.followenumlist
      } else {
        let obj = {
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCompanyFollowEnumStep(qs.stringify(obj)).then(response => {
          if (response) {
            this.followoptions = response
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 搜索跟进人
    remoteMethod (queryString) {
      let obj = {
        UserId: '',
        UserName: queryString,
        Status: 1,
        PageIndex: 1,
        PageSize: 50,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.useroptions = response.Data
            } else {
              this.useroptions = []
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          this.loading = false
        })
      }, 500);
    },
    // 选择跟进信息
    handleSelect () {

    },
    // 新建代办任务
    addTask () {
      this.taskvisible = true
    },
    taskClose () {
      this.taskvisible = false
    },
    // 关闭
    closedialog () {
      this.$refs.operateform.resetFields()
      this.$emit('closedialog', false)
    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          let obj = copy(this.operateform)
          if (obj.SysUserId === this.user.currentUser) {
            obj.SysUserId = this.user.currentId
          }
          this.$emit('savedialog', obj)
        }
      })
    }
  },
}
</script>

<style lang="scss">
.search-keyword {
  text-align: center;
  padding: 3px 0;
  color: #ccc;
  font-size: 13px;
}
</style>