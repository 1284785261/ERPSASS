<!-- 人才信息详情 -->
<template>
  <div class="information-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="detail-content">
      <div class="title-name">基本信息</div>
      <div class="babel-container">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">员工姓名</div>
              <div class="content-detail">{{employeesform.UserName}}</div>
            </div>
            <div class="content">
              <div class="content-label">身份证号码</div>
              <div class="content-detail">{{employeesform.IdCode}}</div>
            </div>
            <div class="content">
              <div class="content-label">出生日期</div>
              <div class="content-detail">{{employeesform.Birthday | Birthday}}</div>
            </div>
            <div class="content">
              <div class="content-label">性别</div>
              <div class="content-detail">{{employeesform.Sex | Sex}}</div>
            </div>
            <div class="content">
              <div class="content-label">民族</div>
              <div class="content-detail">{{NationName}}</div>
            </div>
            <div class="content">
              <div class="content-label">健康体检状态</div>
              <div class="content-detail">{{employeesform.HealthyExamText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="img-box">
              <img :src="imageUrl" alt="" class="image" @click="watchphoto(imageUrl)">
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">婚姻状态</div>
              <div class="content-detail">{{employeesform.MarriedText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">紧急联系人</div>
              <div class="content-detail">{{employeesform.EmergencyPerson}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">联系电话</div>
              <div class="content-detail">{{employeesform.Mobile}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">政治面貌</div>
              <div class="content-detail">{{employeesform.Politics}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">紧急联系人</div>
              <div class="content-detail">{{employeesform.EmergencyPerson}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">紧急联系电话</div>
              <div class="content-detail">{{employeesform.EmergencyTel}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">籍贯</div>
              <div class="content-detail">{{OriginAreaName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">身份证地址</div>
              <div class="content-detail">{{RegAreaName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">详细身份证地址</div>
              <div class="content-detail">{{employeesform.RegAddress}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">居住</div>
              <div class="content-detail">{{AreaName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">详细居住地址</div>
              <div class="content-detail">{{employeesform.Address}}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="title-name" v-if="edformlist && edformlist.length">教育背景</div>
      <div class="babel-container" v-if="edformlist && edformlist.length">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">最高学历</div>
              <div class="content-detail">{{employeesform.DiplomaText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">最高学位</div>
              <div class="content-detail">{{employeesform.DegreeText}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in edformlist" :key="index">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">毕业学校</div>
              <div class="content-detail">{{item.SchoolName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">毕业年月</div>
              <div class="content-detail"><span v-if="item.StartYear">{{item.StartYear}}年{{item.StartMonth}}月 - {{item.EndYear}}年{{item.EndMonth}}月</span></div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">专业</div>
              <div class="content-detail">{{item.Major}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">学习形式</div>
              <div class="content-detail">{{item.Form | Form}}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="title-name" v-if="historyformlist && historyformlist.length">历史工作经历</div>
      <div class="babel-container" v-if="historyformlist && historyformlist.length">
        <el-row v-for="(item, index) in historyformlist" :key="index">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">工作单位</div>
              <div class="content-detail">{{item.CompanyName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">起止时间</div>
              <div class="content-detail"><span v-if="item.StartYear">{{item.StartYear}}年{{item.StartMonth}}月 - {{item.EndYear}}年{{item.EndMonth}}月</span></div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">职务</div>
              <div class="content-detail">{{item.PositionName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">职务</div>
              <div class="content-detail">{{item.Prove}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">证明人联系电话</div>
              <div class="content-detail">{{item.ProveTel}}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="title-name" v-if="familyformlist && familyformlist.length">家庭成员</div>
      <div class="babel-container" v-if="familyformlist && familyformlist.length">
        <el-row v-for="(item, index) in familyformlist" :key="index">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">姓名</div>
              <div class="content-detail">{{item.UserName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">与本人关系</div>
              <div class="content-detail">{{item.Relation}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">工作单位</div>
              <div class="content-detail">{{item.CompanyName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">职位</div>
              <div class="content-detail">{{item.PositionName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="content">
              <div class="content-label">联系电弧</div>
              <div class="content-detail">{{item.Tel}}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="title-name" v-if="filterlist.length!=0">附件</div>
      <div class="babel-container" v-if="filterlist.length!=0">
        <div class="file-cont" v-loading="fileloading">
          <div class="img-box-list" v-for="(item, index) in filterlist" :key="index" @mouseenter="item.visible=!item.visible" @mouseleave="item.visible=!item.visible">
            <!-- 上传文件成功后展示 -->
            <div class="img-box">
              <span class="filetype">{{item.name}}</span>
              <div class="filename" :title="item.Url">{{item.Url}}</div>
            </div>
            <div class="img-box-hover" v-show="item.visible==true">
              <div class="btn" @click="watch(item)">
                <svg-icon icon-class="replace" class-name="svg-a" />
                <span>预览</span>
              </div>
              <div class="btn" @click="down(item)">
                <svg-icon icon-class="del" class-name="svg-a" />
                <span>下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>

<script>
import { GetStaffInfo, GetStaffEduList, GetStaffWorkExpList, GetStaffFamilyList } from '@/api/OutsourcedEmployeeManagement.js'
import { GetAreaList, GetCatagoryList } from '@/api/Public.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
import filters from '@/utils/filters.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  filters: {
    ArmyMan (value) {
      if (value == 0) {
        return '否'
      } else if (value == 1) {
        return '是'
      } else {
        return ''
      }
    },
    LeaveAgree (value) {
      if (value == 0) {
        return '未签订'
      } else if (value == 1) {
        return '已签订'
      } else {
        return ''
      }
    },
    formula (value) {
      if (value == 0) {
        return '百分比'
      } else if (value == 1) {
        return '固定值'
      } else {
        return ''
      }
    },
    WorkType (value) {
      let msg = ''
      switch (value) {
        case 0: msg = '固定工资'; break
        case 1: msg = '计时'; break
        case 2: msg = '计件'; break
      }
      return msg
    },
    LastQuitCert (value) {
      if (value == 0) {
        return '未提交'
      } else if (value == 1) {
        return '已提交'
      } else {
        return ''
      }
    },
    SiStatus (value) {
      if (value === 0) {
        return '无需缴交'
      } else if (value === 1) {
        return '需要缴纳'
      } else if (value === 2) {
        return '已停缴'
      }
    },
    Form (value) {
      if (value === 0) {
        return '全日制'
      } else {
        return '非全日制'
      }
    }
  },
  watch: {
    // 监听籍贯
    "employeesform.OriginAreaId" (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = ''
            var cityName = ''
            var AreaName = ''
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name
            }
            this.OriginAreaName = provinceName + ' ' + cityName + ' ' + AreaName
          } else {

          }
        })
      }
    },
    // 身份证
    "employeesform.RegAreaId" (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = ''
            var cityName = ''
            var AreaName = ''
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name
            }
            this.RegAreaName = provinceName + ' ' + cityName + ' ' + AreaName + ' ' + this.employeesform.RegAddress
          } else {

          }
        })
      }
    },
    // 居住地
    "employeesform.AreaId" (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = ''
            var cityName = ''
            var AreaName = ''
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name
            }
            this.AreaName = provinceName + ' ' + cityName + ' ' + AreaName
          } else {

          }
        })
      }
    },
    // 民族
    "employeesform.Nation" (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          ClassName: '',
          Status: 1,
          ClassType: 4,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCatagoryList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.find(response.Data, newvalue)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
  },
  data () {
    return {
      urlList: [{
        name: '人才信息管理',
        router: '/RecruitmentManagement/AddInformation'
      }, {
        name: '人才详情',
        router: ''
      }],
      Id: '',
      employeesform: {

      },
      edformlist: [], // 教育背景
      historyformlist: [], // 历史工作经历
      familyformlist: [], // 家庭成员

      NationName: '', // 民族
      OriginAreaName: '',
      AreaName: '',
      RegAreaName: '',

      fileloading: false,
      filterlist: [],

      imageUrl: '', // 图片
      isImg: 1,
      previewFileUrl: '',
      iframeShow: false,
      titlename: '查看'
    }
  },
  created () {
    this.Id = this.$route.query.id
    this.getStaffInfo()
    this.getStaffEduList()
    this.getStaffWorkExpList()
    this.getStaffFamilyList()
  },
  methods: {
    // 获取外包员工信息
    getStaffInfo () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // 处理头像数据
            if (response.Data.Photo) {
              this.imageUrl = response.Data.Photo
            }
            // 处理附件
            this.filterlist = []
            if (response.Data.AttachmentUrl) {
              var arry = response.Data.AttachmentUrl.split(';')
              for (let i = 0; i < arry.length; i++) {
                var namelist = arry[i].split('.')
                this.filterlist.push({
                  name: namelist[namelist.length - 1],
                  Url: arry[i],
                  visible: false
                })
              }
            }
            this.employeesform = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取教育信息列表
    getStaffEduList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffEduList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (response.Data[i].StartYear !== '' && response.Data[i].StartMonth !== '' && response.Data[i].EndYear !== '' && response.Data[i].EndMonth !== '') {
                response.Data[i].graduate = [new Date(response.Data[i].StartYear, response.Data[i].StartMonth + 1), new Date(response.Data[i].EndYear, response.Data[i].EndMonth + 1)]
              }
            }
            this.edformlist = response.Data
          } else {
            this.edformlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取外包员工工作经历列表
    getStaffWorkExpList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffWorkExpList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (response.Data[i].StartYear !== '' && response.Data[i].StartMonth !== '' && response.Data[i].EndYear !== '' && response.Data[i].EndMonth !== '') {
                response.Data[i].Time = [new Date(response.Data[i].StartYear, response.Data[i].StartMonth + 1), new Date(response.Data[i].EndYear, response.Data[i].EndMonth + 1)]
              }
            }
            this.historyformlist = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取家庭成员列表
    getStaffFamilyList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffFamilyList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.familyformlist = response.Data
          } else {
            this.familyformlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    find (arry, value) {
      for (let i = 0; i < arry.length; i++) {
        // if (arry[i].children && arry[i].children.length) {
        //   this.find(arry[i].children, value)
        // } else {
        //   console.log(arry[i].Id);
        if (arry[i].Id == value) {
          this.NationName = arry[i].ClassName
        }
        // }
      }
    },
    watchphoto (e) {
      this.isImg = 1
      this.previewFileUrl = e
      this.iframeShow = true
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
    watch (e) {
      if (e.name == 'pdf') {
        this.isImg = 2
        this.previewFileUrl = e.Url
      } else if (e.name == 'doc' || e.name == 'docx') {
        this.isImg = 3
        this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e.Url
      } else {
        this.isImg = 1
        this.previewFileUrl = e.Url
      }
      this.iframeShow = true
    },
    // 下载身份证
    downcard (e) {
      window.open(e)
    },
  },
}
</script>

<style lang="scss" scoped>
.information-detail-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .detail-content {
    background-color: #fff;
    margin-left: 24px;
    border-radius: 8px 0px 0px 8px;
    padding: 40px;
    .title-name {
      font-size: $f16;
      line-height: 16px;
      color: $erp333;
      font-weight: 700;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    .babel-container {
      border-bottom: 1px solid $erpBK;
      margin-bottom: 24px;
      &.dashed {
        border-bottom: 1px dashed $erpBK;
      }
      .el-row.bottom-line {
        border-bottom: 1px solid $erpBK;
        margin-top: 24px;
        &:last-child {
          border-bottom: none;
        }
      }
      .content {
        display: flex;
        margin-bottom: 24px;
        .content-label {
          font-size: $f14;
          color: $erp333;
          font-weight: 700;
          width: 140px;
          text-align: right;
          &.w196 {
            width: 196px;
          }
        }
        .content-detail {
          font-size: $f14;
          color: $erp999;
          flex: 1;
          padding-left: 12px;
        }
      }
      .img-box {
        max-width: 177px;
        max-height: 247.8px;
        height: 247.8px;
        background-color: #f0f4fa;
        margin-bottom: 24px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        .image {
          width: 100%;
          height: 100%;
          display: block;
        }
        .photo-con {
          text-align: center;
          width: 100%;
          height: 100%;
          position: relative;
          > svg {
            display: block;
            position: absolute;
            left: 50%;
            top: 40%;
            font-size: 32px;
            transform: translate(-50%, -50%);
          }
          > span {
            display: block;
            width: 90px;
            position: absolute;
            font-size: $f14;
            line-height: 20px;
            color: $erpplaceholder;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .filetype {
            position: absolute;
            width: 56px;
            height: 34px;
            line-height: 34px;
            border-radius: 8px;
            background-color: $erpcolor;
          }
          .img-box-hover {
            position: absolute;
            width: 100%;
            display: flex;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            background: rgba(0, 0, 0, 0.4);
            .btn {
              flex: 1;
              width: 40px;
              position: relative;
              color: #fff;
              cursor: pointer;
              font-size: $f14;
              > input {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                cursor: pointer;
              }
              > svg {
                color: #fff;
              }
              > span {
                padding-left: 4px;
              }
            }
          }
        }
      }
    }
    // 附件样式
    .file-cont {
      display: flex;
      flex-wrap: wrap;
      .img-box-list {
        width: 160px;
        height: 120px;
        position: relative;
        margin-bottom: 40px;
        > input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 10;
          cursor: pointer;
        }
        > .img-box {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: #f0f4fa;
          border-radius: 8px;
          > .filetype {
            display: inline-block;
            background-color: $erpcolor;
            padding: 10px 12px;
            font-size: $f14;
            line-height: 14px;
            color: #fff;
            border-radius: 8px;
          }
          > .filename {
            font-size: $f14;
            color: $erp666;
            height: 40px;
            width: 110px;
            margin: 12px 24px 0 24px;
            letter-spacing: 0;
            word-break: break-all;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2; /*要显示的行数*/
            -webkit-box-orient: vertical;
          }
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 1);
          opacity: 0.4;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            line-height: 30px;
            cursor: pointer;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              font-size: $f14;
              color: #fff;
            }
            > span {
              font-size: $f14;
              color: #fff;
              padding-left: 4px;
            }
          }
          .btn + .btn {
            margin-left: 24px;
          }
        }
      }
      .img-box-list + .img-box-list {
        margin-left: 24px;
      }
    }
  }
}
</style>