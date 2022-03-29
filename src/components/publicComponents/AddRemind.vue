//添加提醒
<template>
  <div class="remind-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :show-close="false" :visible.sync="remindVisible" :destroy-on-close="false" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="remindform" :rules="rules">
        <el-form-item label="提醒类型" prop="Type" label-width="110px" v-if="showType">
          <el-select v-model="remindform.Type" placeholder="请选择提醒类型">
            <el-option v-for="item in typelist" :key="item.value" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提醒截止时间" prop="RemindTime" label-width="110px">
          <el-date-picker v-model="remindform.RemindTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="dates" size="mini" :picker-options="pickerOptions" placeholder="选择截止时间" />
        </el-form-item>
        <el-form-item label="提醒规则" prop="Repeat" label-width="110px">
          <el-select v-model="remindform.Repeat" size="small" placeholder="请选择" @change="chooserepeat">
            <el-option v-for="(item, index) in rulelist" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isshow" label="" prop="BeforeType" style="float: right;margin-top: -58px;margin-right: 135px;" label-width="0">
          <el-select v-model="remindform.BeforeType" multiple size="small" placeholder="请选择" class="small">
            <el-option v-for="item in myoptions" :key="item.value" :label="item.describe" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="提醒内容" prop="Content" class="textarea-note" label-width="110px">
          <el-input :rows="5" v-model="remindform.Content" type="textarea" maxlength="500" show-word-limit />
        </el-form-item>
      </el-form>
      <el-transfer v-model="remindform.SysUserId" class="shuttle" filterable :titles="['可选用户','已选用户']" filter-placeholder="请搜索查询用户名称进行查询" :props="shuttleprops" :data="SysUserlist" />
      <div slot="footer" class="dialog-footer">
        <el-button round size="mini" class="sassbtn" @click="dialogtrue">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetRemindTypeEnum } from '@/api/Remind.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'AddRemind',
  // props: ['showRemind'],
  props: {
    showRemind: {
      type: Boolean
    },
    title: {
      type: String,
      default: '添加项目提醒'
    },
    showType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 穿梭框数据
      // title: '添加项目提醒',
      rulelist: [{
        value: 0,
        label: '不重复'
      }, {
        value: 1,
        label: '重复'
      }],
      shuttleprops: {
        label: 'UserName',
        key: 'Id'
      },
      SysUserlist: [],
      typelist: [], // 项目类型
      myoptions: [{
        value: 0,
        describe: '活动前15分钟'
      }, {
        value: 1,
        describe: '活动前1小时'
      }, {
        value: 2,
        describe: '活动前1天'
      }, {
        value: 3,
        describe: '活动前1个月'
      }],
      remindVisible: false,
      remindform: {
        Type: '',
        RemindTime: '',
        Content: '',
        Repeat: '',
        SysUserId: [],
        BeforeType: []
      },
      isshow: false,
      rules: {
        Type: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
        RemindTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        Repeat: [{ required: true, message: '请选择提醒规则', trigger: 'change' }],
        BeforeType: [{ required: true, message: '请选择提醒规则', trigger: 'change', type: 'array' }],
        Content: [{ required: true, message: '请输入提醒内容', trigger: 'change' }]
      },
      pickerOptions: {
        selectableRange: `${new Date().Format('hh:mm:ss')} - 23:59:59`,
        disabledDate: (time) => {
          const data = new Date()
          const preDate = new Date(data.getTime() - 24 * 60 * 60 * 1000)
          return time.getTime() <= preDate
        }
      },
      SysUserindex: 1
    }
  },
  watch: {
    showRemind (newvalue, oldvalue) {
      this.remindVisible = newvalue
      if (newvalue) {
        this.SysUserindex = 1
        this.SysUserMethod()
        this.getRemindTypeEnum()
      }
    },
  },
  created () {
  },
  methods: {
    // 搜索用户
    SysUserMethod () {
      let obj = {
        UserId: '',
        UserName: '',
        Status: 1,
        PageIndex: this.SysUserindex || 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.SysUserlist = response.Data
            if (response.PageSize > response.Data.length) {
              return
            } else {
              const num = Math.ceil(response.Total / 100)
              for (let i = 0; i < num - 1; i++) {
                this.SysUserindex++
                this.getAllSysUser()
              }
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getAllSysUser () {
      const obj = {
        UserId: '',
        UserName: '',
        Status: 1,
        PageIndex: this.SysUserindex || 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.SysUserlist = this.SysUserlist.concat(response.Data)
          }

        }
      })
    },
    // 获取分类列表
    getRemindTypeEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetRemindTypeEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.typelist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    dialogtrue () {
      // 调用接口,保存数据
      this.$refs.ruleForm.validate(v => {
        if (v) {
          if (!this.remindform.SysUserId || !this.remindform.SysUserId.length) {
            this.$message({
              message: '请选择用户',
              type: 'warning'
            })
            return
          }
          const data = JSON.parse(JSON.stringify(this.remindform))
          console.log(data.BeforeType);

          data.SysUserId = data.SysUserId.join(',')
          data.BeforeType = data.BeforeType.join(',')
          this.$emit('AddRemindSave', data)
        }
      })
    },
    close () {
      this.remindform = {
        Type: '',
        RemindTime: '',
        Content: '',
        Repeat: '',
        SysUserId: [],
        BeforeType: []
      }
      this.isshow = false
      this.$emit('closeshowAddRemind', false)
      this.$refs.ruleForm.resetFields()
    },
    // 已选中人
    handleChange (value, direction, movedKeys) {
    },
    // 监听提醒次数
    chooserepeat (e) {
      this.remindform.BeforeType = []
      if (e == 0) {
        this.isshow = false
      } else {
        this.isshow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .shuttle {
  margin: 20px 0;
  text-align: center;
  .el-transfer-panel {
    .el-transfer-panel__body {
      .el-checkbox-group {
        &::-webkit-scrollbar {
          width: 8px;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-track-piece {
          background-color: #fff;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          -webkit-box-shadow: inset 0 0 5px #a3b1cc;
          background: #a3b1cc;
        }
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px #a3b1cc;
          border-radius: 4px;
          background: #a3b1cc;
        }
      }
    }
  }
}
</style>
