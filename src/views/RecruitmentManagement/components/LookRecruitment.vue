<!--查看推荐入职明细-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="查看推荐入职明细" class="dialog-box" append-to-body :visible.sync="showLookRecruitment" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms" :rules="ruleForms">
        <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="入职员工姓名" prop="StaffName">
          <el-input v-model="dataObject.StaffName" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="推荐项目" prop="ProjectName">
          <el-input v-model="dataObject.ProjectName" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="推荐岗位" prop="PositionName">
          <el-input v-model="dataObject.PositionName" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="招聘计提类型" prop="RecruitProvisionTypeText">
          <el-input v-model="dataObject.RecruitProvisionTypeText" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="招聘类型" prop="RecruitTypeText">
          <el-input v-model="dataObject.RecruitTypeText" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="在职状态" class="DepartureText" prop="Status">
          <el-input v-model="dataObject.DepartureText" disabled size="mini" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="入职时间" prop="EntryTime" class="Date">
          <el-date-picker v-model="dataObject.EntryTime" disabled value-format="yyyy-MM-dd" type="date">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="上班天数" prop="WorkDays">
          <el-input v-model="dataObject.WorkDays" disabled size="small"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="离职日期" prop="DepartureTime" class="Date">
          <el-date-picker v-model="dataObject.DepartureTime" disabled value-format="yyyy-MM-dd" type="date">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="奖金" prop="Bonus">
          <el-input v-model="dataObject.Bonus" disabled size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="推荐人" prop="RecommenderName">
          <el-input v-model="dataObject.RecommenderName" disabled size="small" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="推荐部门" prop="SysOrgName">
          <el-input v-model="dataObject.SysOrgName" disabled size="small" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="渠道类型" prop="ChannelTypeText">
          <el-input v-model="dataObject.ChannelTypeText" disabled size="small" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="汇总状态" prop="StatusText">
          <el-input v-model="dataObject.StatusText" disabled size="small" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="审批状态" prop="ExamineStatusText">
          <el-input v-model="dataObject.ExamineStatusText" disabled size="small" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="录入时间" prop="EntryTime" class="Date">
          <el-date-picker v-model="dataObject.EntryTime" disabled value-format="yyyy-MM" type="month">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="操作人" prop="SysUserName" class="Date">
          <el-input v-model="dataObject.SysUserName" disabled size="small">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'LookRecruitment',
  props: ['LookRecruitmentVisible', 'DialogData'],
  data () {
    return {
      dataObject: {
        StaffName:'',
        ProjectName:'',
        PositionName:'',
        RecruitProvisionTypeText:'',
        RecruitTypeText:'',
        DepartureText:'',
        EntryTime:'',
        WorkDays:'',
        DepartureTime:'',
        Bonus:'',
        RecommenderName:'',
        SysOrgName:'',
        ChannelTypeText:'',
        StatusText:'',
        ExamineStatusText:'',
        EntryTime:'',
        SysUserName:'',
        Remark:'',
        SettleYearMonth: '',
      },
      ruleForms:{
        DepartureText:[{required: true, message: "请输入入职员工姓名", trigger: "blur"}],
        StaffName:[{required: true, message: "请输入入职员工姓名", trigger: "blur"}],
        ProjectName:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        PositionName:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        RecruitProvisionTypeText:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        RecruitTypeText:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        Status:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        EntryTime:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        WorkDays:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        DepartureTime:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        Bonus:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        Remark:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        RecommenderName:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        SysOrgName:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        ChannelTypeText:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        StatusText:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        ExamineStatusText:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        EntryTime:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
        SysUserName:[{required: true, message: "请选择渠道类型", trigger: "blur"}],
      },
      showLookRecruitment: false
    }
  },
  created () {

  },
  watch: {
    LookRecruitmentVisible (newvalue, oldvalue) {
      this.showLookRecruitment = newvalue
      this.dataObject = this.DialogData
    }
  },
  methods: {
    //关闭导入事件
    close () {
      this.$emit('CloseLookRecruitment', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 100%;
    float: left;
    .el-form-item__label {
      width: 100%;
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
    &:nth-child(odd) {
      padding-right: 20px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      height: 26px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
        }
      }
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .textarea-note {
    width: 100%;
    .el-textarea.is-disabled .el-textarea__inner{
      background: $erinputbgc;
    }
  }
}
</style>