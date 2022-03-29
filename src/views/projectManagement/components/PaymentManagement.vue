<template>
  <div class="payment-management-container">
    <div class="search-bar clearfix" v-show="!Id">
      <div class="condition">
        <div class="search-name">客户单位</div>
        <el-input class="erpsearchinput" placeholder="请输入客户单位进行查询" size="small" v-model="batchform.CompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="sratchbatch" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">入账年月</div>
        <el-date-picker v-model="batchform.month" class="erpsearchinput" size="small" type="month" placeholder="选择入账年月" @keyup.enter.native="searchtable"></el-date-picker>
      </div>
      <!-- <div class="condition">
        <div class="search-name">入账批次</div>
        <el-input class="erpsearchinput" placeholder="请输入入账批次进行查询" size="small" v-model="batchform.CompanyName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="sratchbatch" />
        </el-input>
      </div> -->
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="sratchbatch">查询</el-button>
      </div>
    </div>
    <div class="content" v-show="!Id">
      <div class="operate-top">
        <!-- <el-button size="small" class="addmenu erpbtn" @click="comparedetail">生成薪酬计算对比明细</el-button> -->
        <el-button size="small" class="addmenu erpbtn" @click="importsalarydetail">导入薪酬明细</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="batchtable" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" width="55" fixed label="序号" />
          <el-table-column align="center" prop="Title" min-width="200" fixed label="批次标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchtitle(scope.row)">{{scope.row.Title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Id" width="120" label="工资发放批次" />
          <el-table-column align="center" prop="SalaryYear" min-width="140" label="工资所属年月">
            <template slot-scope="scope">
              <span v-if="scope.row.SalaryYear">{{scope.row.SalaryYear}}年{{scope.row.SalaryMonth}}月</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="SalaryYear" label="入账年月">
            <template slot-scope="scope">
              <span v-if="scope.row.SalaryYear">{{scope.row.SalaryYear}}年{{scope.row.SalaryMonth}}月</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="ProjectName" min-width="120" label="所属项目" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="ShouldPay" label="合计" /> -->
          <!-- <el-table-column align="center" prop="Remark" label="备注" /> -->
          <el-table-column align="center" prop="SysUserName" width="80" label="操作人" />
          <el-table-column align="center" fixed="right" width="80" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="replace(scope.row)">替换</el-dropdown-item>
                    <el-dropdown-item @click.native="watchtitle(scope.row)">查看工资明细</el-dropdown-item>
                    <el-dropdown-item v-show="scope.row.BusinessType==1 || scope.row.BusinessType==2 || scope.row.BusinessType==3" @click.native="settlement(scope.row)">发起结算</el-dropdown-item>
                    <el-dropdown-item @click.native="deletesatch(scope.row)">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="batchcurrentPage" :page-sizes="[10, 20, 50, 100]" :page-size="batchPageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <div class="search-bar clearfix" v-show="Id">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称进行查询" size="small" v-model="searchform.StaffName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">入账年月</div>
        <el-date-picker v-model="month" class="erpsearchinput" size="small" type="month" placeholder="选择入账年月" @keyup.enter.native="searchtable"></el-date-picker>
      </div>
      <div class="condition">
        <div class="search-name">用工单位</div>
        <el-input class="erpsearchinput" placeholder="请输入用工单位进行查询" size="small" v-model="searchform.BFCompanyName" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金打款账号查询" size="small" v-model="searchform.Accout" @keyup.enter.native="searchtable">
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
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed label="全选" />
          <el-table-column align="center" prop="StaffName" min-width="120" fixed label="员工姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchstaff(scope.row)">{{scope.row.StaffName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Sex" width="55" label="性别">
            <template slot-scope="scope">{{scope.row.Sex | Sex}}</template>
          </el-table-column>
          <el-table-column align="center" prop="SalaryBatchId" width="120" label="工资发放批次" />
          <el-table-column align="center" prop="Year" width="120" label="所属年月">
            <template slot-scope="scope">
              <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Base" width="120" label="基本工资">
            <template slot-scope="scope">
              <span>{{scope.row.Base | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ShouldPay" width="120" label="应发工资">
            <template slot-scope="scope">
              <span>{{scope.row.ShouldPay | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="InsuranceTotalEnt" width="120" label="单位社保合计">
            <template slot-scope="scope">
              <span>{{scope.row.InsuranceTotalEnt | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="InsuranceTotalPers" width="120" label="个人社保合计">
            <template slot-scope="scope">
              <span>{{scope.row.InsuranceTotalPers | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PersonalTax" width="100" label="个税">
            <template slot-scope="scope">
              <span>{{scope.row.PersonalTax | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RealPayTaxAfter" width="120" label="实发工资">
            <template slot-scope="scope">
              <span>{{scope.row.RealPayTaxAfter | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="MgrFee" width="120" label="管理费">
            <template slot-scope="scope">
              <span>{{scope.row.MgrFee | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Tax" width="120" label="税金">
            <template slot-scope="scope">
              <span>{{scope.row.Tax | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="TotalAmount" width="120" label="合计">
            <template slot-scope="scope">
              <span>{{scope.row.TotalAmount | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" width="80" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
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
        <el-button size="small" class="addmenu erpbtn" @click="exporttax">导出个税明细</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { showLoading, hideLoading, copy, MenuIdDate } from "@/utils/CustomValidation";
import { GetSalaryPageList, ExportSalaryPersonalTax, GetSalaryBatchList, DeleteSalaryBatch } from "@/api/CompensationServiceManagement.js";
import filters from "@/utils/filters";
import qs from "qs";
export default {
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
      month: "", // 入账年月
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      allchecked: false,
      timetype: 0, // 默认查询年
      Ids: [], // 选中Id
      Id: '',
      ProjectId: '', // 项目Id
      BusinessType: '', // 薪酬类型
    }
  },
  created () {
    this.ProjectId = this.$route.query.Id
    this.getSalaryBatchList()
  },
  methods: {
    // 获取工资批次列表
    getSalaryBatchList () {
      let obj = {
        ProjectName: this.batchform.ProjectName,
        CompanyName: this.batchform.CompanyName,
        ProjectId: this.ProjectId,
        Status: -1,
        PageIndex: this.batchcurrentPage,
        PageSize: this.batchPageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetSalaryBatchList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.batchtable = response.Data
          this.total = response.Total
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
      this.getSalaryBatchList()
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
        menuid: MenuIdDate(),
        operationcode: '1'
      };
      this.tableloading = true;
      GetSalaryPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data;
          this.total = response.Total;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        this.tableloading = false;
      });
    },
    // 搜索工资明细列表
    searchtable () {
      this.currentPage = 1
      this.getSalaryPageList();
    },
    // 导入薪酬明细
    importsalarydetail () {
      // 打开弹框 301 重新添加表头
      const ProjectDetail = JSON.parse(window.localStorage.getItem('projectdetail')) || {}
      // this.$router.push({
      //   path: "/CompensationServiceManagement/payrollheader",
      //   query: {
      //     CompanyId: ProjectDetail.CompanyId,
      //     ProjectId: ProjectDetail.Id
      //   }
      // });
      this.$router.push({
        path: "/CompensationServiceManagement/ImportCompensationForm",
        query: {
          CompanyId: ProjectDetail.CompanyId,
          CompanyName: ProjectDetail.CompanyName,
          ProjectId: ProjectDetail.Id,
          ProjectName: ProjectDetail.Name
        }
      });
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
    watchtitle (e) {
      this.Id = e.Id
      this.BusinessType = e.BusinessType
      this.searchform.BatchId = e.Id
      this.getSalaryPageList()
    },
    // 替换
    replace (e) {
      this.$router.push({
        path: "/CompensationServiceManagement/payrollheader",
        query: {
          id: e.Id
        }
      })
    },
    // 删除
    deletesatch (e) {
      this.$confirm('此操作将删除该条导入信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteSalaryBatch(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getSalaryBatchList()
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
      this.getSalaryBatchList()
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
    // 发起结算
    settlement (e) {
      if (e) {
        this.$router.push({
          path: "/CompensationServiceManagement/calculation",
          query: {
            id: e.Id,
            BusinessType: e.BusinessType
          }
        });
      } else {
        this.$router.push({
          path: "/CompensationServiceManagement/calculation",
          query: {
            id: this.Id,
            BusinessType: this.BusinessType
          }
        });
      }
    },
    // 导出个税明细
    exporttax () {
      // 判断是否选中人
      if (this.Ids.length) {
        let obj = {
          IdArr: this.Ids.join(','),
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ExportSalaryPersonalTax(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: "warning"
            });
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
        this.getSalaryBatchList()
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.batchcurrentPage = val
      if (this.Id) {
        this.getSalaryPageList();
      } else {
        this.getSalaryBatchList()
      }
    },
  },
}
</script>

<style lang="scss">
.payment-management-container {
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
        .el-input__inner {
          // border-color: $erpplaceholder;
          background-color: $erpbgcolor;
        }
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