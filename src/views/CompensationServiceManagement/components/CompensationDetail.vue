<!-- 薪酬详情 -->
<template>
  <div class="compensation-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="compensation-detail-content">
      <div class="compensation-top">
        <div class="compensation-message">{{paymentdata.StaffName}}{{paymentdata.Month}}月的工资</div>
      </div>
      <div class="compensation-detail">
        <div class="compensation-title">工资信息</div>
        <div class="comprow">
          <el-row :gutter="24">
            <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">工资发放状态</div>
                <div class="message-con">{{statustext}}</div>
              </div>
            </el-col> -->
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">基本工资</div>
                <div class="message-con">{{paymentdata.Base}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">应发工资</div>
                <div class="message-con">{{paymentdata.ShouldPay}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">实发税前</div>
                <div class="message-con">{{paymentdata.RealPayTaxBefore}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">实发税后</div>
                <div class="message-con">{{paymentdata.RealPayTaxAfter}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">岗位工资</div>
                <div class="message-con">{{paymentdata.Post}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">绩效工资</div>
                <div class="message-con">{{paymentdata.Perform}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">加班工资</div>
                <div class="message-con">{{paymentdata.OverTime}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">考勤应扣</div>
                <div class="message-con">{{paymentdata.Daily}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">提成总额</div>
                <div class="message-con">{{paymentdata.Commission}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">奖金总额</div>
                <div class="message-con">{{paymentdata.Bonus}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">房补</div>
                <div class="message-con">{{paymentdata.HouseSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">餐补</div>
                <div class="message-con">{{paymentdata.MealSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">交通补贴</div>
                <div class="message-con">{{paymentdata.TrafficSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">通讯补贴</div>
                <div class="message-con">{{paymentdata.CommSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">高温补贴</div>
                <div class="message-con">{{paymentdata.HighTempSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">出差补贴</div>
                <div class="message-con">{{paymentdata.TravelSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">其他补贴</div>
                <div class="message-con">{{paymentdata.OtherSupport}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">工会费</div>
                <div class="message-con">{{paymentdata.UnionFee}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">罚金总额</div>
                <div class="message-con">{{paymentdata.Fine}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="compensation-title">社保信息</div>
        <div class="comprow">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">基本养老保险（企业部分）</div>
                <div class="message-con">{{paymentdata.EndowmentEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">失业保险（企业部分）</div>
                <div class="message-con">{{paymentdata.UnemploymentEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">工伤保险（企业部分）</div>
                <div class="message-con">{{paymentdata.InjuryEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">医疗保险（企业部分）</div>
                <div class="message-con">{{paymentdata.MedicalEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">生育保险（企业部分）</div>
                <div class="message-con">{{paymentdata.BirthEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">大病医疗保险（企业部分）</div>
                <div class="message-con">{{paymentdata.BigMedicalEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">长护保险（企业部分）</div>
                <div class="message-con">{{paymentdata.LongCareEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">养老保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.EndowmentEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">医疗保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.MedicalEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">大额医疗保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.BigMedicalEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">失业保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.UnemploymentEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">生育保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.BirthEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">工伤保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.InjuryEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">长护保险（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.LongCareEntPayback}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">基本养老保险（个人部分）</div>
                <div class="message-con">{{paymentdata.EndowmentPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">失业保险（个人部分）</div>
                <div class="message-con">{{paymentdata.UnemploymentPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">工伤保险（个人部分）</div>
                <div class="message-con">{{paymentdata.InjuryPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">医疗保险（个人部分）</div>
                <div class="message-con">{{paymentdata.MedicalPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">生育保险（个人部分）</div>
                <div class="message-con">{{paymentdata.BirthPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">大病医疗保险（个人部分）</div>
                <div class="message-con">{{paymentdata.BigMedicalPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">长护保险（个人部分）</div>
                <div class="message-con">{{paymentdata.LongCarePers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">养老保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.EndowmentPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">医疗保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.MedicalPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">大额医疗保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.BigMedicalPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">失业保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.UnemploymentPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">生育保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.BirthPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">工伤保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.InjuryPersPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">长护保险（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.LongCarePersPayback}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="compensation-title">公积金信息</div>
        <div class="comprow">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label social">公积金缴费（企业）</div>
                <div class="message-con">{{paymentdata.HouseFundEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label social">公积金缴费（个人）</div>
                <div class="message-con">{{paymentdata.HouseFundPers}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">公积金缴纳（企业部分）补收补退</div>
                <div class="message-con">{{paymentdata.HouseFundEntPayback}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
              <div class="message-box">
                <div class="message-label lage">公积金缴纳（个人部分）补收补退</div>
                <div class="message-con">{{paymentdata.HouseFundPersPayback}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="compensation-title">其他费用</div>
        <div class="comprow">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">意外伤害险(企业部分)</div>
                <div class="message-con">{{paymentdata.UnexpectEnt}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">残保金(企业部分)</div>
                <div class="message-con">{{paymentdata.NoHealth}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">福利费用</div>
                <div class="message-con">{{paymentdata.Benifits}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">管理费</div>
                <div class="message-con">{{paymentdata.MgrFee}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">税费</div>
                <div class="message-con">{{paymentdata.Tax}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">雇主险</div>
                <div class="message-con">{{paymentdata.Employer}}</div>
              </div>
            </el-col>
            <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">劳保用品</div>
                <div class="message-con">测试1</div>
              </div>
            </el-col> -->
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">体检费用</div>
                <div class="message-con">{{paymentdata.HealthExam}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">个税</div>
                <div class="message-con">{{paymentdata.PersonalTax}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它加项1</div>
                <div class="message-con">{{paymentdata.OtherAdd2}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它加项2</div>
                <div class="message-con">{{paymentdata.OtherAdd2}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它加项3</div>
                <div class="message-con">{{paymentdata.OtherAdd3}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它减项1</div>
                <div class="message-con">{{paymentdata.OtherReduce1}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它减项2</div>
                <div class="message-con">{{paymentdata.OtherReduce2}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label social">其它减项3</div>
                <div class="message-con">{{paymentdata.OtherReduce3}}</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="compensation-title">附件</div>
        <div class="comprow">
          <div class="file-cont" v-if="workfile.Url">
            <div class="img-box-list" @mouseenter="workfile.visible=!workfile.visible" @mouseleave="workfile.visible=!workfile.visible">
              <!-- 上传文件成功后展示 -->
              <div class="img-box" :title="workfile.name">
                <span class="filetype">{{workfile.type}}</span>
                <div class="filename">{{workfile.name}}</div>
              </div>
              <div class="img-box-hover" v-show="workfile.visible==true">
                <div class="btn" @click="watch(workfile)">
                  <svg-icon icon-class="replace" class-name="svg-a" />
                  <span>预览</span>
                </div>
                <div class="btn" @click="down(workfile)">
                  <svg-icon icon-class="down" class-name="svg-a" />
                  <span>下载</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="compensation-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb">关 闭</el-button>
      </div>
      <div class="right-operate" @click="dialogVisible=true">
        <div class="operate-button">查看原始工资表信息</div>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" title="查看原始工资表信息" :visible.sync="dialogVisible" width="1200px" :lock-scroll="false" custom-class="erpdialog">
        <div class="detail-box">
          <div class="comprow">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item, index) in originaldata" :key="index">
                <div class="message-box">
                  <div class="message-label">{{item.name}}</div>
                  <div class="message-con">{{item.label}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="erpbtn" size="small" @click="dialogVisible=!dialogVisible">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetSalaryInfo, GetSalaryEnumStatus, GetSalaryOrigin, GetSalaryBatch } from '@/api/CompensationServiceManagement.js'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { showLoading, hideLoading, MenuIdDate, copy, uuid, checkEngNumber } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  filters: {
    tofixed(value) {
      console.log(value);

      return value.toFixed(2)
    }
  },
  data() {
    return {
      dialogVisible: false,
      width: '',
      urlList: [{
        name: '薪酬管理',
        router: '/CompensationServiceManagement/CompensationManagement'
      }, {
        name: '薪酬详情',
        router: ''
      }],
      Id: '',
      batchid: '', // 批次id
      originaldata: [],
      paymentdata: {
        SalaryBatchId: '', // 对应导入批号（表SalaryBatch的Id）
        SalaryOriginId: '', // 原始工资信息编号(表SalaryOrigin的Id)
        StaffId: '', // 外包员工编号
        StaffName: '', // 外包员工名称
        CompanyId: '', // 所属服务公司
        ProjectId: '', // 所属项目Id
        ProjectName: '', // 所属项目名称
        Year: '', // 工资年份
        Month: '', // 工资月份
        Base: '', // 基本工资
        Post: '', // 岗位工资
        Perform: '', // 绩效工资
        OverTime: '', // 加班工资
        Daily: '', // 考勤应扣总额（迟到早退请假应扣工资）
        Commission: '', // 提成总额
        Bonus: '', // 奖金总额（全勤奖、项目奖等）
        Fine: '', // 罚金总额（违背公司制度等的处罚金）
        HouseSupport: '', // 房补
        MealSupport: '', // 餐补
        TrafficSupport: '', // 交通补贴
      },
      statustext: '', // 状态文本
      EnumStatuslist: [], // 状态枚举
      workfile: {}, // 上传文件
      isImg: 1,
      previewFileUrl: '',
      titlename: '附件预览',
      iframeShow: false,
      options: [
        '前端测试'
      ],
      value: ''
    }
  },
  created() {
    this.Id = this.$route.query.id
    this.batchid = this.$route.query.batchid
    this.getSalaryInfo()
    this.getSalaryOrigin()
    this.getSalaryBatch()
    this.$nextTick(() => {
      this.width = document.body.clientWidth - 200 + 'px'
    })
  },
  methods: {
    renderHeader(h, { column, $index }) {
      console.log(h);
      console.log(column);
      console.log($index);
    },
    // 获取工资详情
    getSalaryInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetSalaryInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.paymentdata = response.Data
          this.getSalaryEnumStatus()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    // 获取状态枚举
    getSalaryEnumStatus() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalaryEnumStatus(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumStatuslist = response
          let value = this.EnumStatuslist.find(v => {
            return v.value === this.paymentdata.Status
          })
          if (value.describe)
            this.statustext = value.describe
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取原始工资详情
    getSalaryOrigin() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalaryOrigin(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.Details) {
            this.originaldata = response.Data.Details.split(',')
            for (let i = 0; i < this.originaldata.length; i++) {
              let data = {}
              data.name = this.originaldata[i].split(':')[0]
              data.label = this.originaldata[i].split(':')[1]
              this.originaldata[i] = data
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
    // 获取批次文件
    getSalaryBatch() {
      let obj = {
        Id: this.batchid,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalaryBatch(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.SalaryUrl) {
            this.workfile = {
              visible: false,
              name: response.Data.SalaryUrl.slice(response.Data.SalaryUrl.lastIndexOf('/') + 1, response.Data.SalaryUrl.lastIndexOf('.')),
              type: response.Data.SalaryUrl.slice(response.Data.SalaryUrl.lastIndexOf('.') + 1).toUpperCase(),
              Url: response.Data.SalaryUrl
            }
          }
        } else {

        }
      })
    },
    closeweb() {
      window.opener = null
      window.open('about:blank', '_self').close();
    },
    // 查看
    watch(e) {
      console.log(e);
      if (e.type == 'PDF') {
        this.isImg = 2
        this.previewFileUrl = e.Url
      } else if (e.type == 'DOC' || e.type == 'DOCX' || e.type == 'XLSX' || e.type == 'XLX') {
        this.isImg = 3
        this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e.Url
      } else {
        this.isImg = 1
        this.previewFileUrl = e.Url
      }
      this.iframeShow = true
    },
    // 下载
    down(e) {
      window.open(e.Url)
    },
    closeFileShow(val) {
      this.iframeShow = val
    },
  },
}
</script>

<style lang="scss" scoped>
.compensation-detail-container /deep/ {
  .bread {
    margin-left: 10px;
    margin-bottom: 24px;
  }
  .compensation-detail-content {
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
    .compensation-top {
      .compensation-message {
        display: inline-block;
        padding: 0 20px;
        line-height: 32px;
        font-size: $f16;
        color: #fff;
        background-color: $erpplaceholder;
        border-radius: 8px;
      }
    }
    .compensation-detail {
      .compensation-title {
        margin-top: 40px;
        font-size: $f16;
        color: $erp333;
        line-height: 16px;
        position: relative;
        padding-left: 12px;
        display: flex;
        justify-content: space-between;
        > .operate {
          font-size: $f14;
          color: $erpplaceholder;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 16px;
          background-color: $erpcolor;
        }
      }
      .comprow {
        padding-bottom: 40px;
        border-bottom: 1px solid $erpBK;
        &:last-of-type {
          border-bottom: none;
        }
      }
      .message-box {
        margin-top: 24px;
        display: flex;
        .message-label {
          width: 88px;
          font-size: $f14;
          color: $erp333;
          text-align: right;
          font-weight: 700;
          &.social {
            width: 138px;
          }
          &.lage {
            width: 230px;
          }
        }
        .message-con {
          padding-left: 20px;
          font-size: $f14;
          color: $erp999;
        }
      }
      // 附件上传样式
      .file-cont {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
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
    .compensation-bottom {
      text-align: center;
    }
    .right-operate {
      position: fixed;
      right: 0;
      top: 274px;
      background-color: red;
      width: 28px;
      background: #000;
      opacity: 0.4;
      border-radius: 8px 0 0 8px;
      cursor: pointer;
      .operate-button {
        color: #fff;
        font-size: $f14;
        padding: 18px 7px;
      }
    }
  }
  .worktable {
    height: 50%;
    top: 274px;
  }
}
.detail-box {
  .message-box {
    margin-top: 24px;
    display: flex;
    .message-label {
      width: 200px;
      font-size: $f14;
      color: $erp333;
      text-align: right;
      font-weight: 700;
      &.social {
        width: 138px;
      }
      &.lage {
        width: 198px;
      }
    }
    .message-con {
      padding-left: 20px;
      font-size: $f14;
      color: $erp999;
    }
  }
}
.el-dialog__footer {
  > .dialog-footer {
    text-align: center;
    > button.erpbtn {
      width: auto;
      height: auto;
      color: #fff;
      background-color: $erpbtncolor;
      color: $erpcolor;
    }
  }
}
</style>