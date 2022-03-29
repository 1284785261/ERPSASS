<!-- 导入医保 -->
<template>
  <div class="ImportHealthInsuranceForm">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="ImportHealthInsuranceForm-content">
      <div class="description-box">
        <el-steps :active="currentActive" align-center>
          <el-step title="导入基础信息" description="请选择项目以及录入导入的表格的基础信息"></el-step>
          <el-step title="选择医保表及数据区域" description="请选择你需要导入系统的sheet表格"></el-step>
          <el-step title="配置映射关系" description="设置表中的字段和系统中的字段的对应关系，若计算关系有误请调整"></el-step>
          <el-step title="导入浮动情况反馈" description="导入结果反馈信息"></el-step>
        </el-steps>
      </div>
      <div v-if="currentActive == 0">
        <el-form ref="ruleForm" :model="OnedataObject" :rules="rules" class="OneForms">
          <el-form-item label="选择文件" clearable prop="fileName" class="File-item">
            <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
            <input type="file" accept=".doc,.docx,.pdf,.xls,.xlsx" name="file" class="ButtonFile" @change="uploadFile">
            <el-input v-model="OnedataObject.fileName" size="small" />
          </el-form-item>
          <el-form-item label="企业医保账号" prop="BfInsuranceFundId" class="File-item">
            <el-select v-model="OnedataObject.BfInsuranceFundId" filterable clearable remote placeholder="请查询或下拉选择企业医保账号" class="select-input" @clear="clearProject" :remote-method="remoteInsurance" :loading="loading">
              <el-option v-for="item in BfInsuranceList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="所属地区" prop="AreaId" class="Address">
            <el-select v-model="province" filterable clearable placeholder="请选择省" class="Level">
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
            </el-select>
            <el-select v-model="city" filterable clearable placeholder="请选择市" class="Level">
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
            </el-select>
            <el-select v-model="OnedataObject.AreaId" filterable clearable placeholder="请选择区" class="Level">
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="选择模板" prop="BfInsuranceFundId" class="File-item">
            <el-select v-model="OnedataObject.BfInsuranceFundId" filterable clearable remote placeholder="请选择模板" class="select-input" @clear="clearProject" @change="SelectValue" :remote-method="remoteInsurance" :loading="loading">
              <el-option v-for="item in BfInsuranceList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="入账年月" prop="PeriodYearMonth" class="date">
            <el-date-picker v-model="OnedataObject.PeriodYearMonth" value-format="yyyy-MM" clearable type="month" placeholder="请选择入账年月" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button round size="small" @click="dialogtrue('ruleForm')">开始导入</el-button>
        </div>
      </div>
      <div v-if="currentActive == 1">
        <div class="TwoArea">
          <!-- <div class="table-title">
            选择社保表
          </div> -->
          <div class="TwoArea-footer">
            <div class="TwoArea-footerright">
              <el-select v-model="radio" placeholder="请选择" class="selectSheet" @change="SelecttableName">
                <el-option v-for="item in tableNameList" :key="item.title" :label="item.title" :value="item.title">
                </el-option>
              </el-select>
              <div class="stylesss">
                <span>险种排列方式</span>
                <el-radio-group v-model="DangerPlanted" @change="selectDangerPlanted">
                  <el-radio label="0">纵向</el-radio>
                  <el-radio label="1">横向</el-radio>
                </el-radio-group>
              </div>
              <div class="stylesss">
                <span>缴交对象排列方式</span>
                <el-radio-group v-model="PayObject" @change="selectPayObject">
                  <el-radio label="0">纵向</el-radio>
                  <el-radio label="1">横向</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="TwoArea-center">
            <div class="TwoArea-centerbox">
              <div class="TwoArea-centerboxright erpscroll" v-loading="TwoArealoading">
                <table class="TwoArea-table ">
                  <tr>
                    <td></td>
                    <td v-for="(item,index) in setarr" :key="index">
                      <el-dropdown @command="selectColumn($event,index)">
                        <span class="el-dropdown-link" style="color:#1588F8;">
                          {{item.title}}
                          <i class="el-icon-close" v-if="item.sum >0" @click="deleteset(index)"></i>
                          <i class="el-icon-arrow-down el-icon--right" v-else></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(ite,inx) in speciesList" :key="inx" :command="ite.title">{{ite.title}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </td>
                  </tr>
                  <tr v-for="(item,index) in currentTableOBJ.RowData" :key="index">
                    <td>
                      <!-- <el-radio-group v-model="item.radio" size="small" @change="selectTitleStart(item,index)">
                        <el-radio></el-radio>
                      </el-radio-group> -->
                      <el-checkbox v-model="item.radio" @change="selectTitleStart(item,index)"></el-checkbox>
                    </td>
                    <template v-for="(ite,inx) in item">
                      <td :key="inx" v-if="ite && ite.rowspan && ite.colspan" :rowspan=ite.rowspan :colspan=ite.colspan>
                        {{ite.CellValue}}
                      </td>
                      <td :key="inx" v-else-if="ite && !ite.rowspan && !ite.colspan">
                        {{ite.CellValue}}
                      </td>
                    </template>
                  </tr>
                </table>

              </div>
              <div class="TwoArea-centerboxtitles">
                <i class="el-icon-warning-outline"></i>请选择可识别的有效列表起始表头行
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
          <el-button round size="small" @click="Goreturn(0)">上一步</el-button>
          <el-button round size="small" @click="dialogtrue2()">下一步</el-button>
        </div>
      </div>
      <div v-if="currentActive == 2">
        <el-form label-position="top" :rules="rules" ref="dataObject" label-width="100px" class="ErpStructuraDataObject">
          <div v-for="(item,index) in ErpStructuraArr" :key="index" class="ErpStructuraArr">
            <div class="calculation-title">{{item.title}}</div>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(ite,inx) in item.ListArr" :key="inx">
                <el-form-item :label="ite.stytitle" :prop="ite.header">
                  <el-select v-model="ite.header" clearable placeholder="请选择">
                    <el-option v-for="item in headerData.ImportToExcelStructuralData" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
          <el-button round size="small" @click="Goreturn(1)">上一步</el-button>
          <el-button round size="small" @click="dialogtrue3()">下一步</el-button>
        </div>
      </div>
      <div v-if="currentActive == 3">
        <div class="FourArea">
          <div style="margin: 20px 0 20px 30px;color:#FF4A4A;">导入医保成功 {{SuccessesNum}} 条，失败 {{ErrorDNum}} 条！</div>
          <div v-if="showData">
            <div class="FourArea-success">导入成功!</div>
            <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
              <el-button round size="small" @click="retrunList()">返回列表</el-button>
            </div>
          </div>
          <div v-if="!showData" class="FourArea-error">
            <div class="ErrNum">错误数据( {{errorData.length}} )</div>
            <div class="content">
              <div class="operate-table">
                <el-table :data="errorData" border class="erp-table" id="rebateSetTable">
                  <el-table-column prop="Rows" align="center" label="序号" width="150">
                  </el-table-column>
                  <el-table-column prop="IdCode" align="center" label="个人编号" width="280">
                  </el-table-column>
                  <el-table-column prop="Message" label="错误原因">
                  </el-table-column>
                </el-table>
              </div>
              <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
                <el-button round size="small" @click="CompleteImport()">修改后重新导入</el-button>
                <el-button round size="small" @click="ExportPersonnel()">导出错误人员清单</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
      <div v-show="false" ref="errormessage">
        <div class="erperrortitle">{{ title }}</div>
        <div class="erpscroll erperrormessage">
          <div class="err-box" v-for="(item, index) in errormessage" :key="index">{{ item }}</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetAreaList } from '@/api/Public.js'
import SupperUploader from '@/utils/SupperUploader'
import { GetImportMedicalToExcelOrErpStructuralData, GetBfInsuranceFundPageList, GetMedicalBatchInfoByBfInsuranceFundId, GetSalaryExcelDataStruct, ImportMedicalToExcelOrErpMapping } from '@/api/CompensationServiceManagement.js'
import { uuid, copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '实缴医保管理',
        router: '/CompensationServiceManagement/HealthInsuranceManagement'
      }, {
        name: '导入医保',
        router: ''
      }],
      errormessage: [],
      title: '',
      OnedataObject: {
        InsuranceUrl: '',
        BfInsuranceFundId: '',
        PeriodYearMonth: '',
        // AreaId: '',
        file: '',
        fileName: ''
      },
      BfInsuranceList: [],
      uploadLoading: false,//上传动画
      loading: false,
      currentActive: 0,
      provincelist: [],
      citylist: [],
      arealist: [],
      // province: '',
      // city: '',
      // AreaId: '',
      rules: {
        fileName: [
          { required: true, message: '请上传导入表格', trigger: 'blur' }
        ],
        BfInsuranceFundId: [
          { required: true, message: '请选择公司医保账号', trigger: 'change' }
        ],
        PeriodYearMonth: [
          { required: true, message: '请选择入账年月', trigger: 'change' }
        ],
        // AreaId: [
        //   { required: true, message: '请选择所属地区（精确到区）', trigger: 'change' }
        // ]
      },
      //Two
      radio: '',
      tableNameList: [],
      currentTableOBJ: {
        RowData: []
      },
      TwoArealoading: false,
      speciesList: [{
        title: '险种所在列',
        column: '',
      }, {
        title: '缴费类型列',
        column: '',
      }, {
        title: '缴交对象列',
        column: '',
      }, {
        title: '身份证/个人编号列',
        column: '',
      }, {
        title: '费款所属期列',
        column: '',
      }],
      DangerPlanted: '0',
      PayObject: '0',
      setarr: [],
      TwoFrom: {
        SheetName: '',
        StartRow: '',
        SiTypeIndex: '',
        PayType: '',
        PayerIndex: '',
        SiCode: '',
        SiPeriod: ''
      },
      //第三步数据
      headerData: {},
      ErpStructuraArr: [],
      //第四步
      errorData: [],
      showData: true,
      SuccessesNum: 0,
      ErrorDNum: 0
    }
  },
  watch: {
    // province (newvalue, oldvalue) {
    //   if (newvalue) {
    //     let obj = {
    //       AreaId: '',
    //       ParentId: newvalue,
    //       menuid: MenuIdDate(),
    //       operationcode: '1'
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         this.citylist = response.Data
    //         let isclear = this.citylist.find(v => {
    //           return v.Id == this.city
    //         })
    //         if (isclear) {
    //         } else {
    //           this.city = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   } else {
    //     this.city = ''
    //     this.OnedataObject.AreaId = ''
    //     this.citylist = []
    //     this.arealist = []
    //   }
    // },
    // city (newvalue, oldvalue) {
    //   if (newvalue) {
    //     let obj = {
    //       AreaId: '',
    //       ParentId: newvalue,
    //       menuid: MenuIdDate(),
    //       operationcode: '1'
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         this.arealist = response.Data
    //         let isclear = this.arealist.find(v => {
    //           return v.Id == this.OnedataObject.AreaId
    //         })
    //         if (isclear) {
    //         } else {
    //           this.OnedataObject.AreaId = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   } else {
    //     this.arealist = []
    //     this.OnedataObject.AreaId = ''
    //   }
    // },
    // "OnedataObject.AreaId" (newvalue, oldvalue) {
    //   const str = this.arealist.find(v => {
    //     return v.Id == newvalue
    //   })
    //   if (!str && !!newvalue) {
    //     let obj = {
    //       AreaId: newvalue,
    //       menuid: MenuIdDate(),
    //       operationcode: '1'
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         var select = response.Data.filter(v => {
    //           return v.isselect
    //         })
    //         if (select.find(v => v.Level == 1) !== undefined) {
    //           this.province = select.find(v => v.Level == 1).Id
    //         }
    //         if (select.find(v => v.Level == 2) !== undefined) {
    //           this.city = select.find(v => v.Level == 2).Id
    //         }
    //         if (select.find(v => v.Level == 3) !== undefined) {
    //           this.AreaId = select.find(v => v.Level == 3).Id
    //         } else {
    //           this.AreaId = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   }
    // }
  },
  created () {
    // this.getAreaList()
    this.remoteInsurance()
  },
  methods: {
    // 获取一级地区
    getAreaList () {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.provincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    remoteInsurance (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Account: query || '',
          BfCompanyOrCompanyName: '',
          Type: 2,
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        GetBfInsuranceFundPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.BfInsuranceList = response.Data
            } else {
              this.BfInsuranceList = []
            }
          } else {
            this.BfInsuranceList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearProject () {
      this.remoteInsurance()
    },
    //上传文件
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'xls' || ext == 'xlsx') {
      } else {
        this.$message({
          message: '不支持该格式文件上传',
          type: 'warning'
        })
        e.target.value = []
        return false
      }
      if (files.size > (20 * 1024 * 1024)) {
        this.$message({
          message: '文件大小超过最大限制',
          type: 'warning'
        })
        e.target.value = []
        return false
      } else {
        this.uploadLoading = true
        uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
        uploader.UploadFun(() => {
          if (uploader.urlResult) {
            this.uploadLoading = false

            this.OnedataObject.InsuranceUrl = uploader.urlResult.VideoUrl
            this.OnedataObject.file = files
            this.OnedataObject.fileName = files.name
            this.$refs.ruleForm.clearValidate('InsuranceUrl')
            e.target.value = []
          }
        })
      }
    },
    //第一步开始导入
    dialogtrue (form) {
      this.tableNameList = []
      this.$refs[form].validate((valid) => {
        if (valid) {
          let excelObj = new FormData()
          excelObj.append('file', this.OnedataObject.file)
          excelObj.append('menuid', MenuIdDate())
          excelObj.append('operationcode', 1)
          GetSalaryExcelDataStruct(excelObj).then(response => {
            if (response.IsSuccess && response.Data) {
              this.ExcelOBJArr = response.Data
              for (let i = 0; i < this.ExcelOBJArr.length; i++) {
                this.tableNameList.push({ 'title': this.ExcelOBJArr[i].SheetName })
              }
              this.currentActive = 1
              //初始化数据
              this.radio = this.ExcelOBJArr[0].SheetName
              this.currentTableOBJ = this.ExcelOBJArr[0]
              this.TwoFrom.SheetName = this.ExcelOBJArr[0].SheetName
              this.setarr = []
              if (this.currentTableOBJ.Merges && this.currentTableOBJ.Merges.length > 0) {
                for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
                  for (let m = 0; m < this.currentTableOBJ.RowData[i].length; m++) {
                    for (let j = 0; j < this.currentTableOBJ.Merges.length; j++) {
                      if (this.currentTableOBJ.RowData[i][m] && this.currentTableOBJ.RowData[i][m].RowIndex == this.currentTableOBJ.Merges[j].StartRowIndex && m == this.currentTableOBJ.Merges[j].StartColumnIndex) {
                        this.currentTableOBJ.RowData[i][m].rowspan = this.currentTableOBJ.Merges[j].EndRowIndex - this.currentTableOBJ.Merges[j].StartRowIndex + 1
                        this.currentTableOBJ.RowData[i][m].colspan = this.currentTableOBJ.Merges[j].EndColumnIndex - this.currentTableOBJ.Merges[j].StartColumnIndex + 1
                      }
                    }
                  }

                }

              }
              for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
                this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
                for (let j = 0; j < this.currentTableOBJ.RowData[i].length; j++) {
                  if (this.currentTableOBJ.RowData[i][j] && this.currentTableOBJ.RowData[i][j].IsMergeCell && this.currentTableOBJ.RowData[i][j].CellValue == '') {
                    this.currentTableOBJ.RowData[i][j] = null
                  }
                }
              }
              for (let j = 0; j < this.currentTableOBJ.RowData[0].length; j++) {
                this.setarr.push({ 'title': '标记', 'sum': '' })
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //返回上一步
    Goreturn (num) {
      this.currentActive = num
    },
    //第二步JS

    //选择表名
    SelecttableName (e) {
      this.TwoArealoading = true
      this.TwoFrom.SheetName = e
      for (let i = 0; i < this.ExcelOBJArr.length; i++) {
        if (e == this.ExcelOBJArr[i].SheetName) {
          this.currentTableOBJ = this.ExcelOBJArr[i]
        }
      }
      this.setarr = []
      if (this.currentTableOBJ.Merges && this.currentTableOBJ.Merges.length > 0) {
        for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
          for (let m = 0; m < this.currentTableOBJ.RowData[i].length; m++) {
            for (let j = 0; j < this.currentTableOBJ.Merges.length; j++) {
              if (this.currentTableOBJ.RowData[i][m] && this.currentTableOBJ.RowData[i][m].RowIndex == this.currentTableOBJ.Merges[j].StartRowIndex && m == this.currentTableOBJ.Merges[j].StartColumnIndex) {
                this.currentTableOBJ.RowData[i][m].rowspan = this.currentTableOBJ.Merges[j].EndRowIndex - this.currentTableOBJ.Merges[j].StartRowIndex + 1
                this.currentTableOBJ.RowData[i][m].colspan = this.currentTableOBJ.Merges[j].EndColumnIndex - this.currentTableOBJ.Merges[j].StartColumnIndex + 1
              }
            }
          }

        }

      }
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
        for (let j = 0; j < this.currentTableOBJ.RowData[i].length; j++) {
          if (this.currentTableOBJ.RowData[i][j] && this.currentTableOBJ.RowData[i][j].IsMergeCell && this.currentTableOBJ.RowData[i][j].CellValue == '') {
            this.currentTableOBJ.RowData[i][j] = null
          }
        }
      }
      for (let j = 0; j < this.currentTableOBJ.RowData[0].length; j++) {
        this.setarr.push({ 'title': '标记', 'sum': '' })
      }
      this.TwoArealoading = false
    },
    //选择起始行
    selectTitleStart (item, index) {
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        if (i == index) {
          this.$set(this.currentTableOBJ.RowData[i], 'radio', true)
        } else {
          this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
        }
      }
    },
    //选择列
    selectColumn (e, index) {
      let goTrue = true
      for (let i = 0; i < this.setarr.length; i++) {
        if (this.setarr[i].title == e) {
          this.$message({
            message: '请不要重复选择',
            type: 'warning'
          })
          goTrue = false
          return false
        } else {
          goTrue = true
        }
      }
      if (goTrue) {
        this.$set(this.setarr[index], 'title', e)
        this.$set(this.setarr[index], 'sum', index + 1)
      }
    },
    //重置列选择
    deleteset (index) {
      this.$set(this.setarr[index], 'title', '标记')
      this.$set(this.setarr[index], 'sum', '')
    },
    //选择险种纵横
    selectDangerPlanted (e) {
      if (this.DangerPlanted == '0' && this.PayObject == '0') {
        this.speciesList = [{
          title: '险种所在列',
          column: '',
        }, {
          title: '缴费类型列',
          column: '',
        }, {
          title: '缴交对象列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '1' && this.PayObject == '0') {
        this.speciesList = [{
          title: '缴交对象列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '0' && this.PayObject == '1') {
        this.speciesList = [{
          title: '险种所在列',
          column: '',
        }, {
          title: '缴费类型列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '1' && this.PayObject == '1') {
        this.speciesList = [{
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]
      }
    },
    //选择缴交对象纵横
    selectPayObject (e) {
      if (this.DangerPlanted == '0' && this.PayObject == '0') {
        this.speciesList = [{
          title: '险种所在列',
          column: '',
        }, {
          title: '缴费类型列',
          column: '',
        }, {
          title: '缴交对象列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '1' && this.PayObject == '0') {
        this.speciesList = [{
          title: '缴交对象列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '0' && this.PayObject == '1') {
        this.speciesList = [{
          title: '险种所在列',
          column: '',
        }, {
          title: '缴费类型列',
          column: '',
        }, {
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]

      } else if (this.DangerPlanted == '1' && this.PayObject == '1') {
        this.speciesList = [{
          title: '身份证/个人编号列',
          column: '',
        }, {
          title: '费款所属期列',
          column: '',
        }]
      }
    },
    //第二步下一步操作
    dialogtrue2 () {

      for (let i = 0; i < this.setarr.length; i++) {

        if (this.setarr[i].title == '险种所在列') {
          this.TwoFrom.SiTypeIndex = this.setarr[i].sum
        }
        if (this.setarr[i].title == '缴费类型列') {
          this.TwoFrom.PayType = this.setarr[i].sum
        }
        if (this.setarr[i].title == '缴交对象列') {
          this.TwoFrom.PayerIndex = this.setarr[i].sum
        }
        if (this.setarr[i].title == '身份证/个人编号列') {
          this.TwoFrom.SiCode = this.setarr[i].sum
        }
        if (this.setarr[i].title == '费款所属期列') {
          this.TwoFrom.SiPeriod = this.setarr[i].sum
        }
      }
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        if (this.currentTableOBJ.RowData[i].radio) {
          this.TwoFrom.StartRow = i + 1
        }
      }
      if (!this.TwoFrom.StartRow) {
        this.$message({
          message: '请勾选可识别的有效列表表头行',
          type: 'warning'
        })
        return
      }
      if (!this.TwoFrom.SiCode) {
        this.$message({
          message: '请标记可识别的身份证/个人编号列',
          type: 'warning'
        })
        return
      }
      if (!this.TwoFrom.SiPeriod) {
        this.$message({
          message: '请标记可识别的费款所属期列',
          type: 'warning'
        })
        return
      }
      showLoading()
      let excelObj = new FormData()
      excelObj.append('file', this.OnedataObject.file)
      excelObj.append('StartRow', this.TwoFrom.StartRow)
      // excelObj.append('StartCol', data.StartCol)
      // excelObj.append('EndRow', data.EndRow)
      // excelObj.append('EndCol', data.EndCol)
      // excelObj.append('ContentEndRow', data.ContentEndRow)
      excelObj.append('MedicalType', this.DangerPlanted)//险种列
      excelObj.append('MedicalTypeIndex', this.TwoFrom.SiTypeIndex)
      excelObj.append('PayType', this.TwoFrom.PayType)
      excelObj.append('PayerType', this.PayObject)
      excelObj.append('PayerIndex', this.TwoFrom.PayerIndex)
      excelObj.append('MedicalCode', this.TwoFrom.SiCode)
      excelObj.append('MedicalPeriod', this.TwoFrom.SiPeriod)
      excelObj.append('SheetName', this.TwoFrom.SheetName)
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      GetImportMedicalToExcelOrErpStructuralData(excelObj).then(response => {
        hideLoading()
        if (response && response.ErpStructuralData && response.ImportToExcelStructuralData) {
          this.headerData.ErpStructuralData = response.ErpStructuralData
          let str1 = "缴交基数"
          let str2 = "企业"
          let str3 = "个人"
          this.ErpStructuraArr = [
            { 'title': '基础信息', 'ListArr': [] },
            { 'title': '企业部分医保', 'ListArr': [] },
            { 'title': '个人部分医保', 'ListArr': [] },
            { 'title': '备注', 'ListArr': [] }
          ]
          for (let i = 0; i < this.headerData.ErpStructuralData.length; i++) {
            if (this.headerData.ErpStructuralData[i] == '缴费类型') {
              this.ErpStructuraArr[0].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
            if (this.headerData.ErpStructuralData[i] == '医保所属年月') {
              this.ErpStructuraArr[0].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
            if (this.headerData.ErpStructuralData[i].indexOf(str1) != -1) {
              this.ErpStructuraArr[0].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
            if (this.headerData.ErpStructuralData[i].indexOf(str2) != -1) {
              this.ErpStructuraArr[1].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
            if (this.headerData.ErpStructuralData[i].indexOf(str3) != -1) {
              this.ErpStructuraArr[2].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
            if (this.headerData.ErpStructuralData[i] == '备注') {
              this.ErpStructuraArr[3].ListArr.push({ 'stytitle': this.headerData.ErpStructuralData[i], 'header': '' })
            }
          }
          this.headerData.ImportToExcelStructuralData = response.ImportToExcelStructuralData
          let backfillObj = {
            menuid: MenuIdDate(),
            operationcode: 1,
            BfInsuranceFundId: this.OnedataObject.BfInsuranceFundId
            // AreaId: this.OnedataObject.AreaId
          }
          GetMedicalBatchInfoByBfInsuranceFundId(qs.stringify(backfillObj)).then(response => {
            if (response.IsSuccess && response.Data) {
              if (response.Data.Remark) {
                let arr, arrs = []
                arr = JSON.parse(response.Data.Remark)
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].ExcelName) {
                    arrs.push(arr[i])
                  }
                }
                for (let i = 0; i < this.ErpStructuraArr.length; i++) {
                  for (let j = 0; j < this.ErpStructuraArr[i].ListArr.length; j++) {
                    for (let k = 0; k < arrs.length; k++) {
                      if (this.ErpStructuraArr[i].ListArr[j].stytitle == arrs[k].ERPName) {
                        this.ErpStructuraArr[i].ListArr[j].header = arrs[k].ExcelName
                      }
                    }
                  }
                }
              }
            }
          })
          this.currentActive = 2
        } else {
          if (response.MessageContent.includes('个人编号')) {
            this.title = response.MessageContent.split('[')[0]
            const content = response.MessageContent.split('[')[1].split(']')[0]
            this.errormessage = content.split(',')
            this.$nextTick(() => {
              const htmldaima = this.$refs.errormessage.innerHTML
              this.$message({
                type: 'error',
                dangerouslyUseHTMLString: true,
                showClose: true,
                message: htmldaima,
                customClass: 'erpmessage',
                duration: 0
              })
            })
          } else {
            this.$message({
              type: 'error',
              dangerouslyUseHTMLString: true,
              showClose: true,
              message: `<div class="erpscroll erperrormessage">${response.MessageContent}</div>`,
            })
          }
        }
      })
    },
    //第三步下一步
    dialogtrue3 () {
      let excelObj = new FormData()
      excelObj.append('file', this.OnedataObject.file)
      excelObj.append('BfInsuranceFundId', this.OnedataObject.BfInsuranceFundId)
      // excelObj.append('YearMonth', this.OnedataObject.YearMonth)
      excelObj.append('PeriodYearMonth', this.OnedataObject.PeriodYearMonth)
      excelObj.append('SheetName', this.TwoFrom.SheetName)
      excelObj.append('StartRow', this.TwoFrom.StartRow)
      // excelObj.append('StartCol', this.ImportData.StartCol)
      // excelObj.append('EndRow', this.ImportData.EndRow)
      // excelObj.append('EndCol', this.ImportData.EndCol)
      // excelObj.append('ContentEndRow', this.ImportData.ContentEndRow)
      excelObj.append('MedicalType', this.DangerPlanted)
      excelObj.append('MedicalTypeIndex', this.TwoFrom.SiTypeIndex)
      excelObj.append('PayType', this.TwoFrom.PayType)
      excelObj.append('PayerType', this.PayObject)
      excelObj.append('PayerIndex', this.TwoFrom.PayerIndex)
      excelObj.append('MedicalCode', this.TwoFrom.SiCode)
      excelObj.append('MedicalUrl', this.OnedataObject.InsuranceUrl)
      // excelObj.append('AreaId', this.OnedataObject.AreaId)
      // excelObj.append('AccountColumn', this.ImportData.AccountColumn ? this.ImportData.AccountColumn : 0)
      // excelObj.append('menuid', MenuIdDate())
      // excelObj.append('operationcode', '1')
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      console.log(excelObj)
      let arrobj = []
      for (let i = 0; i < this.ErpStructuraArr.length; i++) {
        for (let j = 0; j < this.ErpStructuraArr[i].ListArr.length; j++) {
          arrobj.push({ 'ExcelName': this.ErpStructuraArr[i].ListArr[j].header, 'ERPName': this.ErpStructuraArr[i].ListArr[j].stytitle })
        }
      }
      excelObj.append('ExcelOrErpMappingList', JSON.stringify(arrobj))
      showLoading()
      ImportMedicalToExcelOrErpMapping(excelObj).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          let data = response.Data
          this.SuccessesNum = data.Successes
          this.ErrorDNum = data.Errors
          if (data.Errors > 0) {
            // this.errorData.MessageContent = `导入员工公积金数据成功${data.Successes}条，失败${data.Errors}条`
            // for (let i = 0; i < data.ImportHouseFundToExcelOrErpMappingErrorRowList.length; i++) {
            //   this.errorData.Data.push(`第${data.ImportHouseFundToExcelOrErpMappingErrorRowList[i].Rows}条，${data.ImportHouseFundToExcelOrErpMappingErrorRowList[i].Message}`)
            // }
            this.errorData = data.ImportToExcelOrErpMappingErrorRowList
            this.showData = false
          } else {
            this.showData = true
            // this.errorData.MessageContent = `导入员工公积金数据成功${data.Successes}条`
          }
          this.currentActive = 3
          // this.showHeaderRelationship = false
          // this.TitleShow = true
          // this.getInsuranceList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //返回列表
    retrunList () {
      this.$router.push({
        path: '/CompensationServiceManagement/HealthInsuranceManagement',
        query: {
        }
      })
    },
    //完成导入
    CompleteImport () {
      this.$router.push({
        path: '/CompensationServiceManagement/HealthInsuranceManagement',
        query: {
        }
      })
    },
    //导出人员清单
    ExportPersonnel () {
      /* generate workbook object from table */
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'), xlsxParam);
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '错误人员列表.xlsx');
      } catch (e) {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.ImportHealthInsuranceForm {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .ImportHealthInsuranceForm-content {
    background: #fff;
    min-height: 700px;
    .description-box {
      padding: 20px 0;
    }
  }
  .OneForms {
    width: 420px;
    margin: 20px auto;
    /deep/ .File-item {
      // margin-bottom: 12px;

      .el-form-item__label {
        line-height: 40px;
        color: #666666;
        width: 110px;
      }

      .el-form-item__content {
        margin-left: 0;
        width: 300px;
        float: left;
        .el-select {
          display: block;
        }
      }
    }
    //日期样式
    /deep/ .Address {
      margin-bottom: 22px;
      .el-form-item__label {
        line-height: 40px;
        color: #666666;
        width: 110px;
      }
      .el-form-item__error {
        left: 112px;
      }
      .Level {
        width: 100px;
        display: inline-block;
        .el-input__inner {
          padding-right: 0;
        }
      }
    }
    //年月
    /deep/.date {
      margin-bottom: 22px;
      .el-form-item__label {
        line-height: 40px;
        color: #666666;
        width: 110px;
      }
      .el-form-item__error {
        left: 112px;
      }
      .el-input {
        width: 300px;
      }
    }
    .upload-bts {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
      background: #1588f8;
      button {
        padding: 12px 19px;
      }
    }
    .ButtonFile {
      top: 0;
    }
  }
  .TwoArea {
    width: 90%;
    // border: 1px solid #666666;
    margin-left: 5%;
    .table-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .TwoArea-center {
      // border: 1px solid #666666;
      width: 100%;
      .TwoArea-centerTitle {
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: flex-start;
        border-bottom: 1px solid #666666;
        div {
          padding: 20px;
        }
        .title-left {
          width: 20%;
          border-right: 1px solid #666666;
        }
        .title-right {
          width: 80%;
        }
      }
      .TwoArea-centerbox {
        width: 100%;
        .TwoArea-centerboxright {
          width: 100%;
          overflow-x: scroll;
          .TwoArea-table {
            border-collapse: collapse;
            border: 1px solid #666666;
            tr {
              td {
                border: 1px solid #e1e1e6;
                min-width: 100px;
                padding: 10px;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              }
            }
          }
        }
        .TwoArea-centerboxtitles {
          color: #ff4a4a;
          margin-top: 20px;
          i {
            margin-right: 10px;
          }
        }
      }
    }
    .TwoArea-footer {
      width: 100%;
      .TwoArea-footerright {
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: flex-start;
        margin-bottom: 30px;
        .selectSheet {
          width: 200px;
          margin: 0 30px 0 0;
          /deep/ input {
            border: 1px solid #1588f8;
            background: #1588f8;
            color: #fff;
          }
          .el-select__caret {
            color: #fff;
          }
        }
        .stylesss {
          min-width: 320px;
          span {
            margin-right: 20px;
          }
          .el-radio {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .buttons-top {
    margin-top: 30px;
    text-align: right;
    margin-right: 30px;
    button {
      width: 100px;
      padding: 13px 15px;
      border-radius: 8px;
      background: #cce1ff;
      color: #1588f8;
      font-size: 14px;
      border: none;
    }
  }
  .ErpStructuraDataObject {
    padding: 50px 30px;
    .ErpStructuraArr {
      border-bottom: 1px solid #e3e3e6;
      margin-bottom: 30px;
      padding-bottom: 20px;
      .calculation-title {
        font-size: $f16;
        color: $erp333;
        line-height: 16px;
        position: relative;
        padding-left: 12px;
        margin-bottom: 20px;
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
      .el-form-item__label {
        padding: 0;
        line-height: 30px;
      }
      .el-form-item__content {
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .FourArea {
    .FourArea-success {
      line-height: 400px;
      text-align: center;
    }
    .FourArea-error {
      .ErrNum {
        width: 100px;
        height: 36px;
        background: #1588f8;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        border-radius: 5px;
        margin: 20px 0 20px 30px;
      }
      .content {
        margin: 0 30px;
      }
    }
  }
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
    button {
      min-width: 100px;
      padding: 13px 15px;
      border-radius: 8px;
      background: $erpbtncolor;
      color: $erpcolor;
      font-size: 14px;
      border: none;
      &:hover {
        background-color: $erpcolor !important;
        color: #fff !important;
      }
      &:active {
        background-color: $erpbtnactive !important;
        color: #fff !important;
      }
      &:focus {
        background-color: $erpbtncolor;
        color: $erpcolor;
      }
    }
  }
}
</style>