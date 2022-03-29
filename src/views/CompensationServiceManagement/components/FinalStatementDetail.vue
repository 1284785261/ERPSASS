<!-- 工资详情 -->
<template>
  <div class="final-statement-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      <el-button class="erpbtn" v-if="tabidx==0" @click="additem">添加结算项</el-button>
      <el-button class="erpbtn" v-if="tabidx==1 && operating.OperationCode == 'InitiatePaymentRequest'" @click="payment('InitiatePaymentRequest')">发起付款申请</el-button>
      <!-- <el-button class="erpbtn" @click="updateitem">修改结算单</el-button> -->
    </div>
    <div class="final-statement-content">
      <el-table ref="finalTable" v-if="tabidx==0" key="0" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark">
        <el-table-column align="center" prop="SerialNumber" label="序号">
          <template slot-scope="scope">
            <div v-if="scope.row.IsTotal==0">
              <span>{{scope.row.SerialNumber}}</span>
            </div>
            <div v-if="scope.row.IsTotal==1">
              <span class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.SerialNumber}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="SalaryItem" label="结算项">
          <template slot-scope="scope">
            <div v-if="scope.row.IsTotal==0">
              <span v-if="!scope.row.isShow">{{scope.row.SalaryItem}}</span>
              <el-input :ref="'ref' + scope.row.Id" v-if="scope.row.isShow" v-model="scope.row.SalaryItem"></el-input>
            </div>
            <div v-if="scope.row.IsTotal==1">
              <span class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.SalaryItem}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="TotalStaff" label="人数">
          <template slot-scope="scope">
            <div v-if="scope.row.IsTotal==0">
              <span v-if="!scope.row.isShow">{{scope.row.TotalStaff}}</span>
              <el-input size="small" v-if="scope.row.isShow" v-model="scope.row.TotalStaff"></el-input>
            </div>
            <div v-if="scope.row.IsTotal==1">
              <span class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.TotalStaff}}</span>
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
              <span class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.Amount}}</span>
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
              <span class="summation" style="font-size:18px; font-weight: bold;">{{scope.row.Remark}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="BeforehanAmount" label="初始金额(元)" />
        <el-table-column align="center" prop="ChangeRecord" width="120" label="修改记录">
          <template slot-scope="scope">
            <!-- <pre>{{ scope.row.ChangeRecord }}</pre> -->
            <el-popover popper-class="erp-table-popper" placement="bottom" width="480" trigger="hover">
              <!-- <div style="white-space: pre-line;">{{scope.row.table}}</div> -->
              <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
              <div v-if="scope.row.table" v-for="(item, index) in scope.row.table" :key="index" class="step">
                <div class="item-check">
                  <div v-if="index!==0" class="item-title">
                    <svg-icon icon-class="check" class-name="check" />
                    <span class="time">{{ item.olddate | YYMMddhhmmssTime }}</span>
                  </div>
                  <div class="item-check-box">
                    <span class="content">{{ item.content }}</span>
                  </div>
                </div>
              </div>
              <div style="cursor: pointer;color:#1588F8;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" slot="reference">{{ scope.row.table | numbers }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="130">
          <template slot-scope="scope" v-if="scope.row.Id">
            <span class="el-dropdown-link cursor-pointer" v-if="!scope.row.isShow&&scope.row.IsTotal==0" @click="updateitem(scope.row)" title="编辑">
              <i class="el-icon-edit-outline"></i>
            </span>
            <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow&&scope.row.IsTotal==0" @click="cancelitem(scope.row)" title="取消">
              <i class="el-icon-circle-close"></i>
            </span>
            <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow&&scope.row.IsTotal==0" @click="saverow(scope.row)" title="保存">
              <i class="el-icon-circle-check"></i>
            </span>
            <span class="el-dropdown-link cursor-pointer" v-if="!scope.row.isShow&&scope.row.IsTotal==0" @click="deleteitem(scope.row)" title="删除">
              <i class="el-icon-delete delete"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="search-bar clearfix" v-show="tabidx==1">
        <div class="condition">
          <div class="search-name">员工姓名</div>
          <el-input class="erpsearchinput" placeholder="请输入员工姓名进行查询" clearable size="small" v-model="searchform.StaffName" @keyup.enter.native="searchtable">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">身份证号码</div>
          <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" clearable size="small" v-model="searchform.IdCode" @keyup.enter.native="searchtable">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">所属银行</div>
          <el-select v-model="searchform.BankId" size="small" clearable placeholder="请选择工资卡所属银行">
            <el-option v-for="item in BankNamelist" :key="item.Id" :label="item.ClassName" :value="item.Id"></el-option>
          </el-select>
        </div>
        <div class="condition">
          <div class="search-name">发放状态</div>
          <el-select v-model="searchform.Status" size="small" clearable placeholder="请选择发放状态">
            <el-option label="待发放" :value="0"></el-option>
            <el-option label="部分发放" :value="1"></el-option>
            <el-option label="已发放" :value="2"></el-option>
          </el-select>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
        </div>
      </div>
      <p v-if="tabidx==1">结算人员工资总计：{{SettlementTotal | KeepTwo}}元</p>
      <el-table ref="finalTable2" v-if="tabidx==1" key="1" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark">
        <!-- <el-table-column align="center" type="selection" label="" /> -->
        <!-- <el-table-column align="center" prop="Id" label="员工工号" /> -->
        <el-table-column align="center" prop="StaffName" label="员工姓名" />
        <el-table-column align="center" prop="IdCode" label="身份证号" />
        <el-table-column align="center" prop="SiEnt" label="单位社保" />
        <el-table-column align="center" prop="SiPers" label="个人社保" />
        <el-table-column align="center" prop="BankName" label="工资卡所属银行" />
        <el-table-column align="center" prop="BankAccount" label="工资卡/存折号" />
        <el-table-column align="center" prop="Amount" label="发放金额（元）">
          <!-- <template slot-scope="scope">
            <span v-if="!scope.row.isShow">{}</span>
            <el-input size="small" @change="changeAmount(scope.row)" v-if="scope.row.isShow" v-model="scope.row.Amount"></el-input>
          </template> -->
          <template slot-scope="scope">
            <span>{{ scope.row.Amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="StatusText" label="工资发放状态" />
        <!-- <el-table-column align="center" label="操作" width="130">
          <template slot-scope="scope">
            <span class="el-dropdown-link cursor-pointer" v-if="!scope.row.isShow" @click="updatecustom(scope.row)" title="编辑">
              <i class="el-icon-edit-outline"></i>
            </span>
            <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow" @click="cancelcustom(scope.row)" title="取消">
              <i class="el-icon-circle-close"></i>
            </span>
            <span class="el-dropdown-link cursor-pointer" v-if="scope.row.isShow" @click="savecustom(scope.row)" title="保存">
              <i class="el-icon-circle-check"></i>
            </span>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <div class="pagina-fonter" v-if="tabidx==1">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div> -->

      <div class="operate-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb">关闭</el-button>
      </div>
    </div>
    <div class="dialog">
      <clearitem :title="clearitemtitle" :visible="clearitemvisible" :contentdata="itemcontentdata" @saveitem="saveitem" @closedialog="closedialog"></clearitem>
    </div>
  </div>
</template>

<script>
import { GetCatagoryList } from '@/api/Public.js'
import { GetApplyPayInfoByBusinessNoToLately } from '@/api/FinancialManagement.js'
import { GetSalarySettleDetailList, AddSalarySettleDetail, GetSalarySettleDetailType, EditSalarySettleDetail, DeleteSalarySettleDetail, GetSalarySettleMemberList } from '@/api/CompensationServiceManagement.js'
import clearitem from './dialog-clearingItem.vue'
import { mapGetters } from 'vuex'
import filtters from '@/utils/filters.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    clearitem
  },
  filters: {
    SalaryItem (value) {
      const val = parseInt(value)
      let msg = ''
      switch (val) {
        case 0: msg = '应发工资小计'; break
        case 1: msg = '企业部分社保费用小计'; break
        case 2: msg = '企业承担其它部分合计'; break
        case 3: msg = '个人部分社保小计'; break
        case 4: msg = '个人其它扣款总计'; break
        case 5: msg = '其它'; break
        case 6: msg = '劳务费用合计'; break
        default:
          msg = ''
      }
      return msg
    },
    numbers (value) {
      let msg = ''
      if (value && value.__proto__.constructor == Array) {
        msg = value.length - 1 + '条'
      }
      return msg
    }
  },
  computed: {
    ...mapGetters([
      'detailType'
    ])
  },
  data () {
    return {
      urlList: [{
        name: '结算单管理',
        router: '/CompensationServiceManagement/FinalStatement'
      }, {
        name: '结算单详情',
        router: ''
      }],
      tablist: [{
        value: 0,
        describe: '工资结算明细单'
      }, {
        value: 1,
        describe: '工资结算人员列表'
      }],
      tabidx: 0,
      tableData: [],
      BankNamelist: [],//所属银行列表
      total: 0,
      currentPage: 1,
      PageSize: 9999,
      tableloading: false,
      Id: '',
      ProjectId: '',
      clearitemtitle: '添加结算工资项',
      clearitemvisible: false,
      itemcontentdata: {},
      isShow: false, // 是否修改
      multipleSelection: [], // 选择的人员
      SettlementTotal: 0,
      searchform: {
        StaffName: '',
        IdCode: '',
        Status: '',
        BankId: ''
      },
      SerialNumber: 0,
      options: [],

      operating: {}
    }
  },
  created () {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.Id = this.$route.query.id
    this.ProjectId = this.$route.query.projectId
    this.getSalarySettleDetailList()
    this.getCatagoryList()
    // this.getSalarySettleDetailType()
  },
  methods: {
    // 获取开户行
    getCatagoryList () {
      let obj = {
        ClassName: '',
        Status: 1,
        ClassType: 5,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.BankNamelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getSalarySettleDetailType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalarySettleDetailType(qs.stringify(obj)).then(response => {
        if (response) {
          this.options = response
          this.$store.dispatch('CompensationServiceManagement/getdetaillist', response)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取结算对象
    getSalarySettleMemberList () {
      let Status
      if (this.searchform.Status === '') {
        Status = -1
      } else {
        Status = this.searchform.Status
      }
      this.SettlementTotal = 0
      let obj = {
        SalarySettleId: this.Id,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        StaffName: this.searchform.StaffName,
        IdCode: this.searchform.IdCode,
        BankId: this.searchform.BankId,
        Status: Status,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      this.multipleSelection = []
      GetSalarySettleMemberList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              // 废弃
              // response.Data[i].OldAmount = JSON.parse(JSON.stringify(response.Data[i].Amount))
              // response.Data[i].isShow = false
              // this.SettlementTotal += parseFloat(response.Data[i].Amount)
              // 直接进行累加计算
              this.SettlementTotal += parseFloat(response.Data[i].Amount)
            }
            window.localStorage.setItem('stafflist', JSON.stringify(response.Data))
          }
          this.tableData = response.Data
          // this.toggle(this.tableData)
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }

      })
    },
    // 废弃,不在需要表格默认选中
    // toggle(data) {
    //   if (data.length) {
    //     this.$nextTick(function () {
    //       data.forEach(item => {
    //         //multipleTable 是这个表格的ref属性 true为选中状态
    //         this.$refs.finalTable2.toggleRowSelection(item, true);
    //       })
    //     })
    //   }
    // },
    // 获取工资结算明细列表
    getSalarySettleDetailList () {
      let obj = {
        SalarySettleId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      // let repeat = /[\.]/
      showLoading()
      GetSalarySettleDetailList(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          if (response.Data) {
            response.Data.forEach(data => {
              data.isShow = false
            })
            this.tableData = response.Data
            let obj1=this.tableData[this.tableData.length-1];
            let obj2=this.tableData[this.tableData.length-2];
            this.tableData[this.tableData.length-2]=obj1
            this.tableData[this.tableData.length-1]=obj2
            if (response.Data.length > 0) {
              for (var i = 0; i < response.Data.length; i++) {
                if (this.SerialNumber == 0) {
                  // this.SerialNumber++
                  this.tableData[i].SerialNumber = i + 1
                  //  this.tableData[0].IsTotal=1
                }
              }
            }
            console.log(this.tableData);
            // console.log(response.Data);
            // this.tableloading = true
            // if (this.detailType && this.detailType.length) {
            //   this.options = this.detailType
            //   console.log(this.options);
            //   // 根据分类创建一个数组
            //   let newarry = []
            //   for (let i = 0; i < this.options.length; i++) {
            //     newarry.push([])
            //   }
            //   // 列表数据按分类生成小数组的数据
            //   for (let i = 0; i < newarry.length; i++) {
            //     for (let j = 0; j < response.Data.length; j++) {
            //       if (response.Data[j].Type === i) {
            //         response.Data[j].isShow = false
            //         newarry[i].push(response.Data[j])
            //       }
            //     }
            //   }
            //   // 计算各个分组的总计
            //   let arrydata = []
            //   console.log(newarry);
            //   for (let i = 0; i < newarry.length; i++) {
            //     let num = 0
            //     if (newarry[i].length) {
            //       for (let j = 0; j < newarry[i].length; j++) {
            //         if (newarry[i][j].SalaryItem == '实发工资小计') {
            //           num = num
            //         } else {
            //           num += newarry[i][j].Amount
            //         }
            //       }

            //       // i===6时不需要在计算/ 劳务费用合计不在计算,由后台直接返回
            //       if (i === 6) {
            //         newarry[i] = {
            //           SalaryItem: i,
            //           Amount: num
            //         }
            //       } else {
            //         newarry[i].push({
            //           SalaryItem: i,
            //           Amount: repeat.test(num) ? parseFloat(num).toFixed(2) : Number(num)
            //         })
            //       }
            //     }
            //     this.tableloading = false
            //     arrydata = arrydata.concat(newarry[i])
            //   }
            //   // 算总计
            //   let num = 0
            //   for (let i = 0; i < arrydata.length; i++) {
            //     if (!arrydata[i].Id) {
            //       if (arrydata[i].SalaryItem == 0) {
            //         num += parseFloat(arrydata[i].Amount)
            //       }
            //       if (arrydata[i].SalaryItem == 1) {
            //         num += parseFloat(arrydata[i].Amount)
            //       }
            //       if (arrydata[i].SalaryItem == 2) {
            //         num += parseFloat(arrydata[i].Amount)
            //       }
            //       if (arrydata[i].SalaryItem == 5) {
            //         num += parseFloat(arrydata[i].Amount)
            //       }
            //     }
            //     // 处理修改记录数据, 把字符串数据改成数组数据
            //     if (arrydata[i].ChangeRecord) {
            //       let tablist = []
            //       let ary = arrydata[i].ChangeRecord.split(';')
            //       for (let j = 0; j < ary.length; j++) {
            //         tablist[j] = {}
            //         let olddate = ''
            //         let oldmoney = ''
            //         let content = ''
            //         // 找出 初始金额 字段, 在列表中增加字段
            //         if (ary[j].indexOf('初始金额') > -1) {
            //           let str = ary[j].split('初始金额')[1]
            //           // 正则提取初始金额后面的数字
            //           oldmoney = str.match(/\d+\.\d+/g).join(',')
            //           arrydata[i].oldmoney = repeat.test(oldmoney) ? parseFloat(oldmoney).toFixed(2) : Number(oldmoney)
            //         }
            //         // 找出 日期 字段, 处理剩余数据
            //         if (ary[j].indexOf('_') > -1) {
            //           let str = ary[j].split('_')
            //           olddate = str[0]
            //           content = str[1]
            //         } else {
            //           content = ary[j]
            //         }
            //         tablist[j].content = content
            //         tablist[j].olddate = olddate
            //       }
            //       arrydata[i].table = tablist
            //     }
            //   }

            //   let newindex = 0
            //   for (let i = 0; i < arrydata.length; i++) {
            //     if (arrydata[i].Id) {
            //       arrydata[i].newIndex = ++newindex
            //     }
            //   }

            // this.tableData = arrydata
            // } else {
            //   let obj = {
            //     menuid: MenuIdDate(),
            //     operationcode: '1'
            //   }
            //   GetSalarySettleDetailType(qs.stringify(obj)).then(res => {
            //     if (res) {
            //       this.options = res
            //       this.$store.dispatch('CompensationServiceManagement/getdetaillist', res)
            //       // 根据分类创建一个数组
            //       let newarry = []
            //       for (let i = 0; i < res.length; i++) {
            //         newarry.push([])
            //       }
            //       // 列表数据按分类生成小数组的数据
            //       for (let i = 0; i < newarry.length; i++) {
            //         for (let j = 0; j < response.Data.length; j++) {
            //           if (response.Data[j].Type === i) {
            //             response.Data[j].isShow = false
            //             newarry[i].push(response.Data[j])
            //           }
            //         }
            //       }

            //       // 计算各个分组的总计
            //       let arrydata = []
            //       for (let i = 0; i < newarry.length; i++) {
            //         let num = 0
            //         if (newarry[i].length) {
            //           for (let j = 0; j < newarry[i].length; j++) {
            //             if (newarry[i][j].SalaryItem == '实发工资小计') {
            //               num = num
            //             } else {
            //               num += newarry[i][j].Amount
            //             }
            //           }
            // newarry[i].push({
            //   SalaryItem: i,
            //   Amount: repeat.test(num) ? parseFloat(num).toFixed(2) : Number(num)
            // })
            // i===6时不需要在计算/ 劳务费用合计不在计算,由后台直接返回
            //     if (i === 6) {
            //       newarry[i] = {
            //         SalaryItem: i,
            //         Amount: num
            //       }
            //     } else {
            //       newarry[i].push({
            //         SalaryItem: i,
            //         Amount: repeat.test(num) ? parseFloat(num).toFixed(2) : Number(num)
            //       })
            //     }
            //   }
            //   arrydata = arrydata.concat(newarry[i])
            // }
            // console.log(arrydata);
            // 算总计
            // let num = 0
            // for (let i = 0; i < arrydata.length; i++) {
            //   if (!arrydata[i].Id) {
            //     if (arrydata[i].SalaryItem == 0) {
            //       num += parseFloat(arrydata[i].Amount)
            //     }
            //     if (arrydata[i].SalaryItem == 1) {
            //       num += parseFloat(arrydata[i].Amount)
            //     }
            //     if (arrydata[i].SalaryItem == 2) {
            //       num += parseFloat(arrydata[i].Amount)
            //     }
            //     if (arrydata[i].SalaryItem == 5) {
            //       num += parseFloat(arrydata[i].Amount)
            //     }
            //   }
            //   // 处理修改记录数据, 把字符串数据改成数组数据
            //   if (arrydata[i].ChangeRecord) {
            //     let tablist = []
            //     let ary = arrydata[i].ChangeRecord.split(';')
            //     for (let j = 0; j < ary.length; j++) {
            //       tablist[j] = {}
            //       let olddate = ''
            //       let oldmoney = ''
            //       let content = ''
            //       // 找出 初始金额 字段, 在列表中增加字段
            //       if (ary[j].indexOf('初始金额') > -1) {
            //         let str = ary[j].split('初始金额')[1]
            //         // 正则提取初始金额后面的数字
            //         oldmoney = str.match(/\d+\.\d+/g).join(',')
            //         arrydata[i].oldmoney = repeat.test(oldmoney) ? parseFloat(oldmoney).toFixed(2) : Number(oldmoney)
            //       }
            //       // 找出 日期 字段, 处理剩余数据
            //       if (ary[j].indexOf('_') > -1) {
            //         let str = ary[j].split('_')
            //         olddate = str[0]
            //         content = str[1]
            //       } else {
            //         content = ary[j]
            //       }
            //       tablist[j].content = content
            //       tablist[j].olddate = olddate
            //     }
            //     arrydata[i].table = tablist
            //   }
            // }
            // arrydata.push({
            //   SalaryItem: 6,
            //   Amount: repeat.test(num) ? parseFloat(num).toFixed(2) : Number(num)
            // })
            // let newindex = 0
            // for (let i = 0; i < arrydata.length; i++) {
            //   if (arrydata[i].Id) {
            //     arrydata[i].newIndex = ++newindex
            //   }
            // }
            // console.log(arrydata);
            // console.log(newarry);
            // this.tableData = arrydata
            // this.tableloading = false
            // } else {
            //   this.$message({
            //     message: response.MessageContent,
            //     type: 'error'
            //   })
            // }
            // })
            // }
          } else {
            this.tableData = []
            this.getSalarySettleDetailType()
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      })
    },
    // 搜索结算对象
    searchtable () {
      this.currentPage = 1
      this.getSalarySettleMemberList()
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.tabidx = e.value
        if (e.value == 0) {
          // 工资结算明细单
          this.tableData = []
          this.getSalarySettleDetailList()
        } else {
          this.tableData = []
          this.getSalarySettleMemberList()
        }
      }
    },
    // 添加结算项
    additem () {
      this.clearitemtitle = '添加结算工资项'
      this.itemcontentdata = {}
      this.clearitemvisible = true
    },
    // 修改结算单
    updateitem (e) {
      console.log(e);
      e.isShow = true
      // this.$nextTick(() => {
      //   this.$refs[`ref${e.Id}`].focus()
      // })
      console.log(e);
    },
    // 列表修改保存
    saverow (e) {
      // let obj = e
      // obj.menuid = MenuIdDate()
      // obj.operationcode = '1'
      // console.log(obj);
      let obj = {
        Id: e.Id,
        Type: e.Type,
        SalaryItem: e.SalaryItem,
        TotalStaff: e.TotalStaff,
        Amount: e.Amount,
        Remark: e.Remark,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      EditSalarySettleDetail(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '编辑成功',
            type: "success"
          })
          this.clearitemvisible = false
          this.getSalarySettleDetailList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      })
    },
    saveitem (e) {
      if (e.Id) {
        let obj = e
        if (e.Type !== 5) {
          obj.IsOnCredit = ''
          obj.OnCreditType = ''
        }
        obj.menuid = MenuIdDate()
        obj.operationcode = '1'
        EditSalarySettleDetail(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功',
              type: "success"
            })
            this.SerialNumber = 0
            this.clearitemvisible = false
            this.getSalarySettleDetailList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        })
      } else {
        let obj = e
        console.log(obj);
        if (e.Type !== 5) {
          obj.IsOnCredit = ''
          obj.OnCreditType = ''
        }
        obj.SalarySettleId = this.Id
        obj.menuid = MenuIdDate()
        obj.operationcode = '1'
        AddSalarySettleDetail(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功',
              type: "success"
            })
            this.clearitemvisible = false
            this.getSalarySettleDetailList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        })
      }
    },
    // 删除结算明细
    deleteitem (e) {
      this.$confirm('此操作将永久删除该明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        DeleteSalarySettleDetail(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getSalarySettleDetailList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    closedialog () {
      this.clearitemvisible = false
    },
    // 取消
    cancelitem (e) {
      e.isShow = false
      // this.getSalarySettleDetailList()
    },
    closeweb () {
      window.open('about:blank', '_self').close()
    },
    // 选择分页
    handleSizeChange (val) {
      this.PageSize = val;
      this.getSalarySettleMemberList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getSalarySettleMemberList();
    },

    // // 修改金额 废弃
    // updatecustom(e) {
    //   e.isShow = !e.isShow
    // },
    // // 取消保存 废弃
    // cancelcustom(e) {
    //   e.Amount = e.OldAmount
    //   e.isShow = !e.isShow
    // },
    // // 保存金额 废弃
    // savecustom(e) {
    //   this.$message.closeAll()
    //   if (e.Amount > e.OldAmount) {
    //     this.$message({
    //       message: '输入金额超出发放金额',
    //       type: 'warning'
    //     })
    //   } else {
    //     e.isShow = !e.isShow
    //     this.SettlementTotal = 0
    //     for (let i = 0; i < this.tableData.length; i++) {
    //       this.SettlementTotal += parseFloat(this.tableData[i].Amount)
    //     }
    //   }
    // },
    // // 输入金额 废弃
    // changeAmount(e) {
    //   if (e.Amount > e.OldAmount) {
    //     this.$message({
    //       message: '输入金额超出发放金额',
    //       type: 'warning'
    //     })
    //   }
    // },

    // 发起付款申请
    payment (op) {
      // // 判断是否选中人员 修改现在不需要选中付款人员,直接可以进行付款
      // if (this.multipleSelection && this.multipleSelection.length) {
      // 新增判断, 当前结算单是否已经发起结算
      let obj = {
        BusinessNo: this.$route.query.code,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetApplyPayInfoByBusinessNoToLately(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.Id !== 0 && response.Data.Status !== 6) {
            this.$message({
              message: '已发起过付款申请,请到付款申请管理页面操作',
              type: 'warning'
            })
            return
          } else {
            let breadpath = {
              name: this.$route.name,
              router: this.$route.path
            }
            window.localStorage.setItem("breadpath", JSON.stringify(breadpath))
            this.$router.push({
              path: '/CompensationServiceManagement/AddPaymentRequest',
              query: {
                type: 1,
                id: this.Id,
                projectId: this.ProjectId,
                name: this.$route.query.name,
                code: this.$route.query.code,
                searchform: this.searchform
              }
            })
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
      // } else {
      //   this.$message({
      //     message: '请选择要发起付款的人员',
      //     type: 'warning'
      //   })
      //   return
      // }
    },

    // // 多选 废弃
    // handleSelectionChange(value) {
    //   this.multipleSelection = value
    //   this.SettlementTotal = 0
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     this.SettlementTotal += parseFloat(this.multipleSelection[i].Amount)
    //   }
    //   window.localStorage.setItem('stafflist', JSON.stringify(value))
    // }
  },
}
</script>

<style lang="scss" scoped>
.final-statement-detail-container /deep/ {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .final-statement-content {
    margin-left: 20px;
    border-radius: 0 0 0 8px;
    padding: 20px;
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
  .search-bar {
    // height: 80px;
    margin-bottom: 24px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
      .el-input__inner {
        background-color: $erinputbgc;
        border-color: transparent;
      }
    }
  }
}
</style>