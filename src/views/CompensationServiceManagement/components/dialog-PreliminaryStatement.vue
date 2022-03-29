<!-- 生成预估结算单弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="1000px" :lock-scroll="false" custom-class="erpdialog" @close="closedialogSta">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" v-loading="loadingdialog" label-width="100px" class="operateform">
        <div class="clearfix">
          <el-form-item label="结算单所属年月" class="datetime" prop="SalaryYearMonth">
            <el-date-picker v-model="operateform.SalaryYearMonth" clearable type="month" placeholder="选择结算单所属年月"></el-date-picker>
          </el-form-item>
          <el-button class="erpbtn butons" @click="additem">添加结算项</el-button>
        </div>
        <div class="final-statement-content">
          <el-table ref="finalTable" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark">
            <el-table-column align="center" prop="newIndex" label="序号" />
            <el-table-column align="center" prop="SalaryItem" min-width="150" label="结算项">
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.IsTotal==0">{{scope.row.SalaryItem}}</span>
                  <span v-if="scope.row.IsTotal==1" style="font-size:18px; font-weight: bold;">{{scope.row.SalaryItem}}</span>
                  <!-- <el-input :ref="'ref' + scope.row.Id" v-if="scope.row.isShow" v-model="scope.row.SalaryItem"></el-input> -->
                </div>
                <!-- <div>
                  <span class="summation">{{scope.row.SalaryItem | SalaryItem}}</span>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalStaff" label="人数">
              <template slot-scope="scope">
                <div v-if="scope.row.IsTotal==0">
                  <span v-if="!scope.row.isShow">{{scope.row.TotalStaff}}</span>
                  <el-input size="small" v-if="scope.row.isShow" v-model="scope.row.TotalStaff"></el-input>
                </div>
                <div v-if="scope.row.IsTotal==1">
                  <el-input size="small" v-if="scope.row.isShow" v-model="scope.row.TotalStaff"></el-input>
                  <span v-if="!scope.row.isShow" class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.TotalStaff}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Amount" label="金额(元)">
              <template slot-scope="scope">
                <div v-if="scope.row.IsTotal==0">
                  <span v-if="!scope.row.isShow">{{scope.row.Amount | KeepTwo}}</span>
                  <el-input size="small" v-if="scope.row.isShow" v-model="scope.row.Amount"></el-input>
                </div>
                <div v-if="scope.row.IsTotal==1">
                  <el-input size="small" v-if="scope.row.isShow" v-model="scope.row.Amount"></el-input>
                  <span v-if="!scope.row.isShow" class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.Amount}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Remark" label="备注">
              <template slot-scope="scope">
                <div v-if="scope.row.IsTotal==0">
                  <span v-if="!scope.row.isShow">{{scope.row.Remark}}</span>
                  <el-input type="textarea" size="small" v-if="scope.row.isShow" v-model="scope.row.Remark"></el-input>
                </div>
                <div v-if="scope.row.IsTotal==1">
                  <span v-if="!scope.row.isShow" class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.Remark}}</span>
                  <el-input type="textarea" size="small" v-if="scope.row.isShow" v-model="scope.row.Remark"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="130">
              <template slot-scope="scope">
                <span class="el-dropdown-link cursor-pointer" v-if="!scope.row.isShow" @click="updateitem(scope.row)" title="编辑">
                  <i class="el-icon-edit-outline"></i>
                </span>
                <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow" @click="cancelitem(scope.row)" title="取消">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow" @click="saverow(scope.row)" title="保存">
                  <i class="el-icon-circle-check"></i>
                </span>
                <span class="el-dropdown-link cursor-pointer" v-if="!scope.row.isShow" @click="deleteitem(scope.row,scope.$index)" title="删除">
                  <i class="el-icon-delete delete"></i>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog-footer three-footer">
          <el-button class="erpbtn" size="small" @click="closedialogSta">取 消</el-button>
          <el-button class="erpbtn" size="small" @click="save">保 存</el-button>
        </div>
      </el-form>

    </el-dialog>
    <div class="dialog" append-to-body>
      <clearitem :title="clearitemtitle" :visible="clearitemvisible" :contentdata="itemcontentdata" @saveitem="saveitem" @closedialog="closedialog"></clearitem>
    </div>
  </div>
</template>

<script>
import { GetProjectList } from '@/api/projectManagement.js'
import { GetSalarySettleDetailType } from '@/api/CompensationServiceManagement.js'
import clearitem from './dialog-clearingItem.vue'
import { AddSalaryBeforehandSettle } from '@/api/FinancialManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    ProjectId: {
    }
  },
  components: {
    clearitem
  },
  data () {
    return {
      dialogVisible: false,
      operateform: {
        SalaryYearMonth: '',
      },
      tableloading: false,
      loadingdialog: false,
      StateProjectId: '',
      rules: {
        SalaryYearMonth: [
          { required: true, message: '请选择结算单所属年月', trigger: 'change' }
        ]
      },
      clearitemtitle: '添加结算工资项',
      clearitemvisible: false,
      itemcontentdata: {},
      tableData: [{
        // "Id": 1312,
        // "SalarySettleId": 55,
        "Type": 0,
        // "TypeText": "应发工资合计",
        "SalaryItem": "应发工资小计",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 1
      }, {
        "Type": 1,
        "SalaryItem": '企业部分养老金',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 2
      }, {
        // "Id": 1313,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分养老金补缴",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 3
      }, {
        // "Id": 1314,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分医疗险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 4
      }, {
        // "Id": 1315,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分医疗险补缴",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 5
      }, {
        // "Id": 1316,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分失业险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 6
      }, {
        "Type": 1,
        "SalaryItem": '企业部分失业险补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 7
      }, {
        "Type": 1,
        "SalaryItem": '企业部分工伤险',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 8
      }, {
        "Type": 1,
        "SalaryItem": '企业部分工伤险补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 9
      }, {
        "Type": 1,
        "SalaryItem": '企业部分长护险',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 10
      },
      {
        // "Id": 1317,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分长护险补缴",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 11
      }, {
        // "Id": 1318,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分大病互助",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 12
      }, {
        // "Id": 1319,
        // "SalarySettleId": 55,
        "Type": 1,
        // "TypeText": "企业部分社保合计",
        "SalaryItem": "企业部分公积金",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 13
      }, {
        "Type": 1,
        "SalaryItem": '企业部分公积金补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 14
      },
      {
        "Type": 1,
        "SalaryItem": '企业部分社保费用小计',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 15
      },
      {
        "Type": 2,
        "SalaryItem": "商业险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 16
      }, {
        // "Id": 1320,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "员工福利",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 17
      }, {
        // "Id": 1321,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "雇主险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 18
      }, {
        // "Id": 1322,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "残保金",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 19
      }, {
        // "Id": 1323,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "企业部分工会费",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 20
      }, {
        // "Id": 1324,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "中标服务费",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 21
      }, {
        // "Id": 1325,
        // "SalarySettleId": 55,
        "Type": 2,
        // "TypeText": "企业承担其它部分合计",
        "SalaryItem": "业务招待费",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 22
      }, {
        "Type": 2,
        "SalaryItem": '差旅费',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 23
      }, {
        "Type": 2,
        "SalaryItem": '劳保费',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 24
      },
      {
        "Type": 2,
        "SalaryItem": '经济补偿金',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 25
      },
      {
        "Type": 2,
        "SalaryItem": '其他费用',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 26
      }, {
        "Type": 2,
        "SalaryItem": '水电房租',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 27
      }, {
        "Type": 2,
        "SalaryItem": '企业承担其它部分合计',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 28
      },
      {
        // "Id": 1326,
        // "SalarySettleId": 55,
        "Type": 3,
        // "TypeText": "个人部分社保合计",
        "SalaryItem": "个人部分养老金",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 29
      }, {
        // "Id": 1327,
        // "SalarySettleId": 55,
        "Type": 3,
        // "TypeText": "个人部分社保合计",
        "SalaryItem": "个人部分养老金补缴",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 30
      }, {
        // "Id": 1328,
        // "SalarySettleId": 55,
        "Type": 3,
        // "TypeText": "个人部分社保合计",
        "SalaryItem": "个人部分医疗险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 31
      }, {
        // "Id": 1329,
        // "SalarySettleId": 55,
        "Type": 3,
        // "TypeText": "个人部分社保合计",
        "SalaryItem": "个人部分医疗险补缴",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 32
      }, {
        // "Id": 1330,
        // "SalarySettleId": 55,
        "Type": 3,
        // "TypeText": "个人部分社保合计",
        "SalaryItem": "个人部分失业险",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 33
      }, {
        "Type": 3,
        "SalaryItem": '个人部分失业险补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 34
      }, {
        "Type": 3,
        "SalaryItem": '个人部分大病险',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 35
      }, {
        "Type": 3,
        "SalaryItem": '个人部分长护险',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 36
      }, {
        "Type": 3,
        "SalaryItem": '个人部分长护险补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 37
      }, {
        "Type": 3,
        "SalaryItem": '个人部分公积金',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 38
      }, {
        "Type": 3,
        "SalaryItem": '个人部分公积金补缴',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 39
      }, {
        "Type": 3,
        "SalaryItem": '个人部分社保小计',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 40
      }, {
        // "Id": 1331,
        // "SalarySettleId": 55,
        "Type": 4,
        // "TypeText": "个人其它扣款合计",
        "SalaryItem": "代扣个税",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 41
      }, {
        // "Id": 1332,
        // "SalarySettleId": 55,
        "Type": 4,
        // "TypeText": "个人其它扣款合计",
        "SalaryItem": "个人部分工会费",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 42
      }, {
        "Type": 4,
        "SalaryItem": '代扣餐费',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 43
      }, {
        "Type": 4,
        "SalaryItem": '代扣尽孝金',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 44
      }, {
        "Type": 4,
        "SalaryItem": '代扣水电房租费用',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 45
      }, {
        "Type": 4,
        "SalaryItem": '代扣工服费用',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 46
      }, {
        "Type": 4,
        "SalaryItem": '其他费用',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 47
      }, {
        "Type": 4,
        "SalaryItem": '代扣福利费',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 48
      }, {
        "Type": 4,
        "SalaryItem": '个人其它扣款总计',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 49
      }, {
        // "Id": 1333,
        // "SalarySettleId": 55,
        "Type": 6,
        // "TypeText": "其它",
        "SalaryItem": "实发工资小计",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 50
      }, {
        // "Id": 1334,
        // "SalarySettleId": 55,
        "Type": 6,
        // "TypeText": "其它",
        "SalaryItem": "结余款项",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 51
      }, {
        // "Id": 1335,
        // "SalarySettleId": 55,
        "Type": 6,
        // "TypeText": "其它",
        "SalaryItem": "管理费",
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 52
      }, {
        "Type": 6,
        "SalaryItem": '挂账',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 53
      }, {
        "Type": 6,
        "SalaryItem": '劳务费用合计',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 1,
        "newIndex": 54
      }, {
        "Type": 5,
        "SalaryItem": '增值税税额',
        "TotalStaff": 0,
        "Amount": 0,
        "Remark": "",
        "isShow": false,
        "IsTotal": 0,
        "newIndex": 55
      }]
    }
  },
  // filters: {
  //   SalaryItem (value) {
  //     const val = parseInt(value)
  //     let msg = ''
  //     switch (val) {
  //       case 0: msg = '应发工资小计'; break
  //       case 1: msg = '企业部分社保费用小计'; break
  //       case 2: msg = '企业承担其它部分合计'; break
  //       case 3: msg = '个人部分社保小计'; break
  //       case 4: msg = '个人其它扣款总计'; break
  //       case 5: msg = '其它'; break
  //       case 6: msg = '劳务费用合计'; break
  //       default:
  //         msg = ''
  //     }
  //     return msg
  //   }
  // },
  watch: {
    visible (newvalue, oldvalue) {
      this.StateProjectId = this.ProjectId
      this.dialogVisible = newvalue
    }
  },
  created () {
  },
  methods: {
    // 修改结算单
    updateitem (e) {
      this.$set(e, 'isShow', true)
      // e.isShow = true
      console.log(e);
      // this.$nextTick(() => {
      //   this.$refs[`ref${e.Id}`].focus()
      // })
    },
    // 取消
    cancelitem (e) {
      e.isShow = false
    },
    saverow (e) {
      e.isShow = false
      console.log(e);
      console.log(this.tableData);
      // let TypeNumAll = 0
      // if (e.Type == 0) {
      //   let TypeNum1 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 0) {
      //       TypeNum1 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 0) {
      //       item.Amount = TypeNum1
      //     }
      //   })
      // } else if (e.Type == 1) {
      //   let TypeNum2 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 1) {
      //       TypeNum2 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 1) {
      //       item.Amount = TypeNum2
      //     }
      //   })
      // } else if (e.Type == 2) {
      //   let TypeNum3 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 2) {
      //       TypeNum3 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 2) {
      //       item.Amount = TypeNum3
      //     }
      //   })
      // } else if (e.Type == 3) {
      //   let TypeNum4 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 3) {
      //       TypeNum4 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 3) {
      //       item.Amount = TypeNum4
      //     }
      //   })
      // } else if (e.Type == 4) {
      //   let TypeNum5 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 4) {
      //       TypeNum5 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 4) {
      //       item.Amount = TypeNum5
      //     }
      //   })
      // } else if (e.Type == 5) {
      //   let TypeNum6 = 0
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     if (this.tableData[i].Type == 5) {
      //       TypeNum6 += parseFloat(this.tableData[i].Amount)
      //     }
      //   }
      //   this.tableData.forEach((item, index) => {
      //     if (item.SalaryItem == 5) {
      //       item.Amount = TypeNum6
      //     }
      //   })
      // }
      // for (let i = 0; i < this.tableData.length; i++) {
      //   if (this.tableData[i].SalaryItem == 0) {
      //     TypeNumAll += parseFloat(this.tableData[i].Amount)
      //   }
      //   if (this.tableData[i].SalaryItem == 1) {
      //     TypeNumAll += parseFloat(this.tableData[i].Amount)
      //   }
      //   if (this.tableData[i].SalaryItem == 2) {
      //     TypeNumAll += parseFloat(this.tableData[i].Amount)
      //   }
      //   if (this.tableData[i].SalaryItem == 5) {
      //     TypeNumAll += parseFloat(this.tableData[i].Amount)
      //   }
      // }
      // this.tableData.forEach((item, index) => {
      //   if (item.SalaryItem == 6) {
      //     item.Amount = TypeNumAll
      //   }
      // })

    },

    // 添加结算项
    additem () {
      this.clearitemtitle = '添加结算工资项'
      this.itemcontentdata = {}
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalarySettleDetailType(qs.stringify(obj)).then(res => {
        if (res) {
          this.$store.dispatch('CompensationServiceManagement/getdetaillist', res)
          this.clearitemvisible = true
        }
      })

    },
    deleteitem (e, index) {
      this.tableData.splice(index, 1)
      this.tableData.forEach(data => {
        if (data.newIndex > e.newIndex) {
          data.newIndex--
          // console.log(data);
        }
      })
      // this.saverow(e)
    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          // 处理月份
          this.loadingdialog = true
          let obj = {
            ProjectId: this.StateProjectId,
            SalaryYear: '',
            SalaryMonth: '',
            settledetail: [],
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          if (this.operateform.SalaryYearMonth) {
            obj.SalaryYear = this.operateform.SalaryYearMonth.getFullYear()
            obj.SalaryMonth = this.operateform.SalaryYearMonth.getMonth() + 1
          }
          // for (let i = 0; i < this.tableData.length; i++) {
          //   if (this.tableData[i].Type == 8) {
          //     this.tableData[i].Type == 5
          //   }
          // }
          for (let i = 0; i < this.tableData.length; i++) {
            // if (this.tableData[i].Amount > 0) {
            obj.settledetail.push({
              Type: this.tableData[i].Type,
              SalaryItem: this.tableData[i].SalaryItem,
              TotalStaff: this.tableData[i].TotalStaff,
              Amount: this.tableData[i].Amount,
              Remark: this.tableData[i].Remark
            })
            // }
          }
          console.log(obj);
          AddSalaryBeforehandSettle(qs.stringify(obj)).then(response => {
            setTimeout(() => {
              this.loadingdialog = false
            }, 1000)
            if (response.IsSuccess && response.Data) {
              this.$message({
                type: 'success',
                message: '生成预结算单成功!'
              })
              console.log(response);
              setTimeout(() => {
                this.$emit('successdialog', response.Data)
              }, 1000)
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
    saveitem (e) {
      let obj = e
      // obj.Id = Math.floor(Math.random() * (9999 - 1000)) + 1000
      this.$set(obj, 'isshow', false)
      // obj.isShow = false
      let goBoulnIndex = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].Type == obj.Type) {
          goBoulnIndex = i
          if (goBoulnIndex > 0) {
            obj.newIndex = goBoulnIndex + 1
          }
        }
        //  if(this.tableData[i].newIndex >= goBoulnIndex){
        //   this.tableData[i].newIndex+1
        //   console.log(this.tableData[i].newIndex);
        // }
      }
      this.tableData.forEach(data => {
        if (data.newIndex > goBoulnIndex) {
          data.newIndex++
          // console.log(data);
        }
      })
      // console.log(goBoulnIndex);
      obj.IsTotal = 0
      this.tableData.splice(goBoulnIndex, 0, obj)
      // this.saverow(obj)
      this.clearitemvisible = false

    },
    closedialog () {
      this.clearitemvisible = false
    },
    closedialogSta () {
      this.$refs.operateform.resetFields()
      this.$emit('closedialog')
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .dialog-footer.three-footer {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  > button {
    width: auto;
    height: auto;
    background-color: $erpbtncolor;
    color: $erpcolor;
  }
  > button + button {
    margin-left: 24px;
  }
}
.clearfix {
  .datetime {
    width: 300px;
  }
  .butons {
    margin-bottom: 20px;
    float: right;
  }
}
.final-statement-content {
  border-radius: 0 0 0 8px;
  background-color: #fff;
  .operate-bottom {
    text-align: center;
    margin-top: 24px;
  }
  .el-dropdown-link {
    > i {
      color: #a3b1cc;
      font-size: 20px;
      margin-right: 8px;
    }
    &:hover {
      i {
        color: #1588f8;
      }
    }
  }
}
</style>