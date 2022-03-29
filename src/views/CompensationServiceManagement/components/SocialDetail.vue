<!-- 社保详情 -->
<template>
  <div class="addumulation-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
    <div class="final-statement-content">
      <div class="search-bar clearfix" v-show="tabidx==1">
        <div class="condition">
          <div class="search-name">所属项目</div>
          <el-input class="erpsearchinput" placeholder="请输入所属项目进行查询" size="small" v-model="searchform.ProjectName" clearable @keyup.enter.native="searchtable">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">社保打款账号</div>
          <el-input class="erpsearchinput" placeholder="请输入社保打款账号进行查询" size="small" v-model="searchform.bifAccount" clearable @keyup.enter.native="searchtable">
          </el-input>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
        </div>
      </div>
      <el-table ref="finalTable" v-if="tabidx==0" key="0" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark">
        <el-table-column align="center" type="index" width="80" fixed label="序号" />
        <el-table-column align="center" prop="Account" label="社保账号" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" prop="ProjectName" label="项目" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" prop="StaffNum" label="人数" min-width="120" />
        <el-table-column align="center" prop="PensionEnt" label="企业部分养老金" min-width="150" />
        <el-table-column align="center" prop="MedicalEnt" label="企业部分医疗险" min-width="150" />
        <el-table-column align="center" prop="UnemployEnt" label="企业部分失业险" min-width="150" />
        <el-table-column align="center" prop="InjuryEnt" label="企业部分工伤险" min-width="150" />
        <el-table-column align="center" prop="BirthEnt" label="企业部分生育险" min-width="150" />
        <el-table-column align="center" prop="BigMedicalEnt" label="企业部分大病互助险" min-width="180" />
        <el-table-column align="center" label="企业部分社保费用小计" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.PensionEnt + scope.row.MedicalEnt + scope.row.UnemployEnt + scope.row.InjuryEnt + scope.row.BirthEnt + scope.row.BigMedicalEnt | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="PensionPers" label="个人部分养老金" min-width="150" />
        <el-table-column align="center" prop="MedicalPers" label="个人部分医疗险" min-width="150" />
        <el-table-column align="center" prop="UnemployPers" label="个人部分失业险" min-width="150" />
        <el-table-column align="center" prop="InjuryPers" label="个人部分工伤险" min-width="150" />
        <el-table-column align="center" prop="BirthPers" label="个人部分生育险" min-width="150" />
        <el-table-column align="center" prop="BigMedicalPers" label="个人部分大病互助险" min-width="180" />
        <el-table-column align="center" label="个人部分社保费用小计" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.PensionPers + scope.row.MedicalPers + scope.row.UnemployPers + scope.row.InjuryPers + scope.row.BirthPers + scope.row.BigMedicalPers | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="社保缴纳总计" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.TotalInsurance | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总计" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.Total | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Remark" label="备注" min-width="200" show-overflow-tooltip />
      </el-table>
      <!-- <el-table ref="finalTable" v-if="tabidx==0" key="1" v-loading="tableloading" :data="tableData" :span-method="objectSpanMethod1" class="erp-table" tooltip-effect="dark">
        <el-table-column align="center" type="index" width="80" fixed label="序号" />
        <el-table-column align="center" prop="ProjectName" label="项目" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" prop="Account" label="社保账号" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="StaffNum" label="人数" min-width="150" />
        <el-table-column align="center" prop="PensionEnt" label="企业部分养老金" min-width="150" />
        <el-table-column align="center" prop="MedicalEnt" label="企业部分医疗险" min-width="150" />
        <el-table-column align="center" prop="UnemployEnt" label="企业部分失业险" min-width="150" />
        <el-table-column align="center" prop="InjuryEnt" label="企业部分工伤险" min-width="150" />
        <el-table-column align="center" prop="BirthEnt" label="企业部分生育险" min-width="150" />
        <el-table-column align="center" prop="BigMedicalEnt" label="企业部分大病互助险" min-width="180" />
        <el-table-column align="center" label="企业部分社保费用小计" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.PensionEnt + scope.row.MedicalEnt + scope.row.UnemployEnt + scope.row.InjuryEnt + scope.row.BirthEnt + scope.row.BigMedicalEnt | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="PensionPers" label="个人部分养老金" min-width="150" />
        <el-table-column align="center" prop="MedicalPers" label="个人部分医疗险" min-width="150" />
        <el-table-column align="center" prop="UnemployPers" label="个人部分失业险" min-width="150" />
        <el-table-column align="center" prop="InjuryPers" label="个人部分工伤险" min-width="150" />
        <el-table-column align="center" prop="BirthPers" label="个人部分生育险" min-width="150" />
        <el-table-column align="center" prop="BigMedicalPers" label="个人部分大病互助险" min-width="180" />
        <el-table-column align="center" label="个人部分社保费用小计" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.PensionPers + scope.row.MedicalPers + scope.row.UnemployPers + scope.row.InjuryPers + scope.row.BirthPers + scope.row.BigMedicalPers | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="社保缴纳总计" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.TotalInsurance | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总计" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.Total | KeepTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Remark" label="备注" min-width="200" show-overflow-tooltip />
      </el-table> -->
      <p v-if="tabidx==1">结算人员社保总计：{{SettlementTotal | KeepTwo}}元</p>
      <el-table ref="finalTable2" v-if="tabidx==1" key="2" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark" show-summary :summary-method="getSummaries" @selection-change="handleSelectionChange">
        <!-- <el-table-column align="center" prop="Id" label="序号" /> -->
        <el-table-column align="center" type="selection" label="" width="80" fixed />
        <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="120" />
        <el-table-column align="center" prop="Sex" label="性别" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.Sex | SexTWO}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="IdCode" label="身份证号" min-width="150" />
        <el-table-column align="center" prop="Year" label="社保所属年月" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="TotalPers" min-width="120" label="个人社保合计">
          <template slot-scope="scope">
            <span>￥{{scope.row.TotalPers}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="TotalEnt" min-width="120" label="单位社保合计">
          <template slot-scope="scope">
            <span>￥{{scope.row.TotalEnt}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="TotalAmount" label="缴交总额" min-width="120">
          <template slot-scope="scope">
            <span>￥{{scope.row.TotalAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="StatusTest" label="社保缴纳状态" min-width="120" />
        <!-- <el-table-column align="center" prop="Id" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" title="编辑">
                <i class="el-icon-edit-outline setting"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item @click.native="watch(scope.row,'SetRights')">查看</el-dropdown-item>
                  <el-dropdown-item @click.native="adddepletion(scope.row,'SetRights')">添加至减员名单</el-dropdown-item>
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
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
  </div>
</template>

<script>
import { GetSiSettleDetailList, GetSiSettleMemberList } from '@/api/CompensationServiceManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      Id: '',
      Type: 0,
      urlList: [{
        name: '结算单管理',
        router: '/CompensationServiceManagement/FinalStatement'
      }, {
        name: '结算单详情',
        router: ''
      }],
      tablist: [{
        value: 0,
        describe: '社保结算明细单'
      }, {
        value: 1,
        describe: '社保结算人员列表'
      }],
      tabidx: 0,
      PageSize: 9999,
      currentPage: 1,
      total: 0,
      tableData: [],
      SettlementTotal: 0,
      allchecked: false,
      Ids: [], // 选中Id
      tableloading: false,
      searchform: {
        ProjectName: '',
        bifAccount: ''
      },
      multipleSelection: [],
      arr: [],
      operating: {}
    }
  },
  created () {
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.Id = this.$route.query.id
    this.getSiSettleDetailList()
  },
  methods: {
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 5 || index === 6 || index === 7) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            if (sums[index] > 0) {
              sums[index] = sums[index].toFixed(2)
            }
          } else {
            sums[index] = 'N/A'
          }
        } else if (index === 1) {
          sums[index] = data.length
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    // 获取社保结算对象
    getSiSettleMemberList () {
      let obj = {
        SiSettleId: this.Id,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        ProjectName: this.searchform.ProjectName,
        bifAccount: this.searchform.bifAccount,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      this.tableloading = true
      this.multipleSelection = []
      GetSiSettleMemberList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data
            this.total = response.Total
            for (let i = 0; i < this.tableData.length; i++) {
              this.SettlementTotal += parseFloat(this.tableData[i].TotalAmount)
            }
            this.toggle(this.tableData)
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          })
        }
        this.tableloading = false
      })
    },
    toggle (data) {
      if (data.length) {
        this.$nextTick(function () {
          data.forEach(item => {
            //multipleTable 是这个表格的ref属性 true为选中状态
            this.$refs.finalTable2.toggleRowSelection(item, true);
          })
        })
      }
    },
    // 获取社保结算单明细
    getSiSettleDetailList () {
      let obj = {
        SiSettleId: this.Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      this.tableloading = true
      GetSiSettleDetailList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.tableData = response.Data 
          // if (response.Data && response.Data.length) {
          //   if (this.Type == 1) {
          //     this.setTable(response.Data, 'SiSettleId')
          //   } else {
          //     this.setTable(response.Data, 'ProjectName')
          //   }
          // } else {
          //   this.tableData = []
          // }
          // this.setTable(response.Data, 'ProjectName')
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          })
        }
        this.tableloading = false
      })
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.tabidx = e.value
        this.currentPage = 1
        if (e.value === 0) {
          this.getSiSettleDetailList()
        } else {
          this.getSiSettleMemberList()
        }
      }
    },
    // setTable (data, c) {
    //   let spanOneArr = []
    //   let concatOne = 0
    //   data.forEach((item, index) => {
    //     if (index === 0) {
    //       spanOneArr.push(1)
    //     } else {
    //       if (item[c] && item[c] === data[index - 1][c]) { //当前项和前一项比较 
    //         spanOneArr[concatOne] += 1 //相同值第一个出现的位置，统计需要合并多少行
    //         spanOneArr.push(0)//新增一个被合并行
    //       } else {
    //         spanOneArr.push(1) //否则不合并
    //         concatOne = index//指向位移
    //       }
    //     }
    //   })
    //   var obj = {}
    //   obj[c] = spanOneArr
    //   this.arr = []
    //   this.arr.push(obj)
    // },
    // 合并行
    // objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 1) {
    //     const _row = this.arr[0].SiSettleId[rowIndex] //因为rowIndex出现会从1到结尾
    //     const _col = _row > 0 ? 1 : 0
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     }
    //   }
    // },
    // objectSpanMethod1 ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 1) {
    //     const _row = this.arr[0].ProjectName[rowIndex] //因为rowIndex出现会从1到结尾
    //     const _col = _row > 0 ? 1 : 0
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     }
    //   }
    // },
    searchtable () {
      this.getSiSettleMemberList()
    },
    // 添加到减员名单
    adddepletion () {

    },
    // 查看
    watch () {

    },
    // 选择分页
    handleSizeChange (val) {
      this.PageSize = val;
      if (this.tabidx == 0) {
        this.getSalarySettleList()
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      if (this.tabidx == 0) {
        this.getSalarySettleList()
      }
    },
    closeweb () {
      window.open('about:blank', '_self').close()
    },
    // 多选
    handleSelectionChange (value) {
      this.multipleSelection = value
      this.SettlementTotal = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.SettlementTotal += parseFloat(this.multipleSelection[i].TotalAmount)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.addumulation-detail-container /deep/ {
  .search-bar {
    // padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
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
        .el-input__inner {
          background-color: $erinputbgc;
        }
      }
    }
  }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .final-statement-content {
    margin-left: 20;
    border-radius: 0 0 0 8px;
    padding: 20px;
    background-color: #fff;
    .operate-bottom {
      text-align: center;
      margin-top: 24px;
    }
  }
}
</style>