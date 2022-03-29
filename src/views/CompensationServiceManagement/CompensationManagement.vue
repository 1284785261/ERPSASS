<!-- 薪酬管理 -->
<template>
  <div class="compensation-management-container">
    <div class="search-bar clearfix" v-show="!Id">
      <div class="condition">
        <div class="search-name">客户单位</div>
        <el-input class="erpsearchinput" placeholder="请输入客户单位进行查询" size="small" v-model.trim="batchform.CompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="sratchbatch" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">就职项目</div>
        <el-input class="erpsearchinput" placeholder="请输入就职项目进行查询" size="small" v-model.trim="batchform.ProjectName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="sratchbatch" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">所属年月</div>
        <el-date-picker v-model="batchform.month" class="erpsearchinput" size="small" type="month" placeholder="选择所属年月" @keyup.enter.native="searchtable"></el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="sratchbatch">查询</el-button>
      </div>
    </div>
    <div class="content" v-show="!Id">
      <div class="operate-top">
        <!-- <el-button size="small" class="addmenu erpbtn" @click="comparedetail">生成薪酬计算对比明细</el-button> -->
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="addmenu erpbtn" @click="importsalarydetail('Import')">导入薪酬明细</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="batchtable" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyName" label="公司名称" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="StaffNum" label="参与薪酬计算人员" min-width="150" />
          <el-table-column align="center" prop="SalaryYear" label="所属年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.SalaryYear">{{scope.row.SalaryYear}}年{{scope.row.SalaryMonth}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Receive" label="回款认领情况" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Receive | Receive}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SalarySettle" label="工资结算进度" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SalarySettle | SalarySettle}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="SalaryGrant" label="工资发放进度" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SalaryGrant | SalaryGrant}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="SiSettle" label="社保结算进度" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SiSettle | SiSettle}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="SiPayment" label="社保缴纳进度" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SiPayment | SiPayment}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="FunSettle" label="公积金结算进度" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.FunSettle | FunSettle}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="FunPayment" label="公积金缴纳进度" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.FunPayment | FunPayment}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="SysUserName" label="上传人" min-width="120" />
          <!-- <el-table-column align="center" prop="Id" label="工资发放批次" /> -->
          <!-- <el-table-column align="center" prop="SalaryYear" label="入账年月">
            <template slot-scope="scope">
              <span v-if="scope.row.SalaryYear">{{scope.row.SalaryYear}}年{{scope.row.SalaryMonth}}月</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" prop="ShouldPay" label="合计" /> -->
          <!-- <el-table-column align="center" prop="Remark" label="备注" /> -->
          <!-- <el-table-column align="center" prop="SalaryYear" label="入账年月">
            <template slot-scope="scope">
              <span v-if="scope.row.SalaryYear">{{scope.row.SalaryYear}}年{{scope.row.SalaryMonth}}月</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','Modify','Settlement','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchtitle(scope.row,'View')">查看工资明细</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="replace(scope.row,'Modify')">替换</el-dropdown-item>
                    <el-dropdown-item v-show="(scope.row.BusinessType==1 || scope.row.BusinessType==2 || scope.row.BusinessType==3) && $operatebtn(operates, 'Settlement')" @click.native="settlement(scope.row,'Settlement')">发起结算</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="deletesatch(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="batchcurrentPage" :page-sizes="[10, 50, 100, 1000]" :page-size="batchPageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <div class="search-bar clearfix" v-show="Id">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入员工名称进行查询" size="small" v-model="searchform.StaffName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">所属年月</div>
        <el-date-picker v-model="month" class="erpsearchinput" size="small" clearable type="month" placeholder="选择所属年月"></el-date-picker>
      </div>
      <div class="condition">
        <div class="search-name">用工单位</div>
        <el-input class="erpsearchinput" placeholder="请输入用工单位进行查询" clearable size="small" v-model="searchform.BFCompanyName">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金打款账号查询" clearable size="small" v-model="searchform.Accout">
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content" v-show="Id">
      <el-button size="small" class="callback erpbtn" @click="goback">返回</el-button>
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="BusinessType == 1 || BusinessType == 2 || BusinessType == 3" @click="settlement('')">发起结算</el-button>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="importsalarydetail">导入薪酬明细</el-button> -->
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" show-summary :summary-method="getSummaries" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="80" fixed label="全选" />
          <el-table-column align="center" prop="StaffName" fixed label="员工姓名" min-width="120">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchstaff(scope.row)">{{scope.row.StaffName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Sex" label="性别" min-width="60">
            <template slot-scope="scope">{{scope.row.Sex | Sex}}</template>
          </el-table-column>
          <el-table-column align="center" prop="SalaryBatchId" label="工资发放批次" min-width="120" />
          <el-table-column align="center" prop="Year" label="所属年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Base" label="基本工资" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Base | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ShouldPay" label="应发工资" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.ShouldPay | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="InsuranceTotalEnt" label="单位社保合计" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.InsuranceTotalEnt | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="InsuranceTotalPers" label="个人社保合计" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.InsuranceTotalPers | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PersonalTax" label="个税" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.PersonalTax | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RealPayTaxAfter" label="实发工资" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.RealPayTaxAfter | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="MgrFee" label="管理费" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.MgrFee | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Tax" label="票面税金金额" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Tax | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PayTotal" fixed="right" label="应转合计" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.PayTotal | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row, 'Modify')">修改</el-dropdown-item>
                    <!-- <el-dropdown-item @click.native="leave(scope.row)">标记为异常</el-dropdown-item> -->
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" v-if="$operatebtn(operates, 'Export')" class="addmenu erpbtn" @click="exporttax('Export')">导出个税明细</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 1000]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { MenuIdDate, showLoading, hideLoading, copy } from "@/utils/CustomValidation";
import { GetSalaryPageList, ExportSalaryPersonalTax, GetSalaryBatchList, DeleteSalaryBatch } from "@/api/CompensationServiceManagement.js";
import filters from "@/utils/filters";
import qs from "qs";
export default {
  components: {
  },
  filters: {
    Receive (value) {
      if (value == 0) {
        return '未认领'
      } else {
        return '已认领'
      }
    },
    SalarySettle (value) {
      if (value == 0) {
        return '计算中'
      } else {
        return '已完成'
      }
    },
    SalaryGrant (value) {
      if (value == 0) {
        return '待发放'
      } else {
        return '已发放'
      }
    },
    SiSettle (value) {
      if (value == 0) {
        return '计算中'
      } else {
        return '已完成'
      }
    },
    SiPayment (value) {
      if (value == 0) {
        return '待缴纳'
      } else {
        return '已缴纳'
      }
    },
    FunSettle (value) {
      if (value == 0) {
        return '计算中'
      } else {
        return '已完成'
      }
    },
    FunPayment (value) {
      if (value == 0) {
        return '待缴纳'
      } else {
        return '已缴纳'
      }
    }
  },
  data () {
    return {
      batchform: {
        CompanyName: '', // 客户名称
        ProjectName: '', // 就职项目
        month: '',
        SalaryYear: '', // 年
        SalaryMonth: '', // 月
      },
      batchtable: [],
      batchPageSize: 10,
      batchcurrentPage: 1,
      searchform: {
        StaffName: "", // 外包员工名字
        CompanyName: "", // 所属项目名称
        BFCompanyName: "", // 入职公司
        ProjectName: "", // 客户名称
        Accout: "", // 账号
        Year: "", // 入账年
        Month: "", // 入账月
        BatchId: "" // 批次
      },
      month: "", // 所属年月
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      allchecked: false,
      timetype: 0, // 默认查询年
      Ids: [], // 选中Id
      Id: '',
      BusinessType: '', // 薪酬明细类型
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    };
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      console.log(JSON.parse(JSON.stringify(this.operates)));
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getSalaryBatchList(this.operatiOBj)
    }
  },
  methods: {
    // 获取工资批次列表
    getSalaryBatchList (operat) {
      // 处理年月
      if (this.batchform.month) {
        this.batchform.SalaryYear = this.batchform.month.getFullYear();
        this.batchform.SalaryMonth = this.batchform.month.getMonth() + 1;
      } else {
        this.batchform.SalaryYear = "";
        this.batchform.SalaryMonth = "";
      }
      let obj = {
        ProjectName: this.batchform.ProjectName,
        CompanyName: this.batchform.CompanyName,
        SalaryYear: this.batchform.SalaryYear,
        SalaryMonth: this.batchform.SalaryMonth,
        Status: -1,
        PageIndex: this.batchcurrentPage,
        PageSize: this.batchPageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetSalaryBatchList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.batchtable = response.Data;
            this.total = response.Total;
          } else {
            this.batchtable = [];
            this.total = 0;
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      })
    },
    // 搜索批次列表
    sratchbatch () {
      this.batchcurrentPage = 1
      this.getSalaryBatchList(this.operatiOBj)
    },
    // 获取薪酬管理列表
    getSalaryPageList () {
      // 处理年月
      if (this.month) {
        this.searchform.Year = this.month.getFullYear();
        this.searchform.Month = this.month.getMonth() + 1;
      } else {
        this.searchform.Year = "";
        this.searchform.Month = "";
      }
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let obj = {
        StaffName: this.searchform.StaffName,
        ProjectName: this.searchform.ProjectName,
        BFCompanyName: this.searchform.BFCompanyName,
        CompanyName: this.searchform.CompanyName,
        Accout: this.searchform.Accout,
        Year: this.searchform.Year,
        Month: this.searchform.Month,
        BatchId: this.searchform.BatchId,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
      };
      this.tableloading = true;
      GetSalaryPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data;
            this.total = response.Total;
          } else {
            this.tableData = [];
            this.total = 0;
          }

        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        this.tableloading = false;
      });
    },
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 5 || index === 6 || index === 7 || index === 8 || index === 9 || index === 10 || index === 11 || index === 12 || index === 13) {
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
    // 搜索工资明细列表
    searchtable () {
      this.currentPage = 1
      this.getSalaryPageList();
    },
    // 导入薪酬明细
    importsalarydetail () {
      // 打开弹框 301 重新添加表头
      // this.$router.push({
      //   path: "/CompensationServiceManagement/payrollheader"
      // });
      this.$router.push({
        path: "/CompensationServiceManagement/ImportCompensationForm"
      })
    },

    // 生成薪酬计算对比明细
    comparedetail () {
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/PayContrast",
        query: {}
      });
      window.open(href, "_blank");
    },
    // 查看薪酬明细列表
    watchtitle (e, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.BusinessType = e.BusinessType
      this.searchform.BatchId = e.Id
      this.getSalaryPageList()
    },
    // 替换
    replace (e, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: "/CompensationServiceManagement/ImportCompensationForm",
        query: {
          id: e.Id
        }
      })
    },
    // 删除
    deletesatch (e, str) {
      const operating = this.$operatedata(this.operates, str)
      this.$confirm('此操作将删除该条导入信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: e.Id,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        DeleteSalaryBatch(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getSalaryBatchList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 返回
    goback () {
      this.Id = ''
      this.getSalaryBatchList(this.operatiOBj)
    },

    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 查看员工详情
    watchstaff (e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/CompensationDetail",
        query: {
          id: e.Id,
          batchid: e.SalaryBatchId
        }
      });
      window.open(href, "_blank");
    },
    // 修改
    update (e) {
      this.$router.push({
        path: "/CompensationServiceManagement/UpdateCompensationService",
        query: {
          id: e.Id
        }
      })
    },
    // 标记为异常
    leave (e) { },
    // 发起工资付款申请
    paymentapplication (e) { },

    // 发起结算
    settlement (e) {
      if (e) {
        const operating = this.$operatedata(this.operates, 'Settlement')
        localStorage.setItem('operating', JSON.stringify(operating))
        this.$router.push({
          path: "/CompensationServiceManagement/calculation",
          query: {
            id: e.Id,
            BusinessType: e.BusinessType
          }
        })
      } else {
        this.$router.push({
          path: "/CompensationServiceManagement/calculation",
          query: {
            id: this.Id,
            BusinessType: this.BusinessType
          }
        })
      }
    },
    // 导出个税明细
    exporttax (op) {
      const operating = this.$operatedata(this.operates, op)
      // 判断是否选中人
      if (this.Ids.length) {
        let obj = {
          IdArr: this.Ids.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        ExportSalaryPersonalTax(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            })
          }
        })
      } else {
        this.$message({
          message: '请选择要导出员工',
          type: "warning"
        });
      }
    },

    // 选择分页
    handleSizeChange (val) {
      this.PageSize = val
      this.batchPageSize = val
      if (this.Id) {
        this.getSalaryPageList()
      } else {
        this.getSalaryBatchList(this.operatiOBj)
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.batchcurrentPage = val
      if (this.Id) {
        this.getSalaryPageList();
      } else {
        this.getSalaryBatchList(this.operatiOBj)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.compensation-management-container /deep/ {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px 24px 12px 24px;
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
      }
    }
  }
  .callback {
    float: left;
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>