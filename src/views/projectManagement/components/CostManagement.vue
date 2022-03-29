<!-- 成本管理 -->
<template>
  <div class="cost-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">查询</div>
        <el-input class="erpsearchinput" placeholder="请输入员项目成本编号/支出说明进行查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="addprojectcost">添加项目成本</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Code" width="120" label="项目成本编号" show-overflow-tooltip />
          <el-table-column align="center" prop="Subject" min-width="120" label="科目名称" show-overflow-tooltip />
          <el-table-column align="center" prop="Ensure" width="120" label="是否保证金">
            <template slot-scope="scope">
              {{scope.row.Ensure | Ensure}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SupplierType" width="120" label="供应商类型" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.SupplierType==0?'内部供应商':'外部供应商'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SupplierName" width="120" label="供应商名称" show-overflow-tooltip/>
          <el-table-column align="center" width="100" label="所属年月">
             <template slot-scope="scope">
              {{scope.row.Year+'年'+scope.row.Month+'月'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Fee" width="100" label="支出金额" />
          <el-table-column align="center" prop="Remark" min-width="120" label="支出说明" show-overflow-tooltip />
          <el-table-column align="center" prop="Attachment" min-width="120" label="费用明细表" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="preview(scope.row.Attachment)">{{scope.row.Attachment}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="StatusText" width="100" label="状态" />
          <el-table-column align="center" fixed="right" width="80" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-show="scope.row.Status !== 1">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-show="scope.row.Status === 0 || scope.row.Status === 2" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-show="scope.row.Status === 0" @click.native="submitaudit(scope.row,'SetRights')">发起结算</el-dropdown-item>
                    <!-- <el-dropdown-item v-show="scope.row.Status === 4" @click.native="issueinvoice(scope.row,'SetRights')">开具发票</el-dropdown-item> -->
                    <el-dropdown-item v-show="scope.row.Status !== 1" @click.native="cancellation(scope.row,'Delete')">作废</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
      <costdialog :title="costtitle" :visible="costvisible" :contentdata="contentdata" @closedialog="closedialog" @savecost="savecost"></costdialog>
      <costauditdialog :title="costaudittitle" :visible="costauditvisible" :contentdata="auditcontentdata" @closeauditdialog="closeauditdialog" @savecostaudit="savecostaudit"></costauditdialog>
    </div>
  </div>
</template>

<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import costdialog from './dialog-cost.vue'
import costauditdialog from './dialog-costaudit.vue'
import { GetProjectFeePageList, AddProjectFee, EditProjectFee, DeleteProjectFee, AddProjectFeeExamine, GetProjectFeeInfo } from '@/api/projectManagement.js'
import { AddOtherExpense } from '@/api/FinancialManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    costdialog,
    costauditdialog,
    PreviewFile
  },
  filters: {
    Ensure (value) {
      if (value == 0) {
        return '否'
      } else if (value == 1) {
        return '是'
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      searchform: {
        SysUserName: ''
      },
      previewFileUrl: '',
      iframeShow: false,
      isImg: 1,
      titlename: '费用明细表预览',
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      tableloading: false,
      Id: '', // 费用Id
      ProjectId: '', // 项目Id
      attachments: '', // 费用附件

      costtitle: '添加项目成本',
      costvisible: false,
      contentdata: {}, // 成本详情

      costaudittitle: '成本审核',
      costauditvisible: false,
      auditcontentdata: {}, // 审核内容
    }
  },
  created () {
    this.ProjectId = this.$route.query.Id
    this.getProjectFeePageList()
  },
  methods: {
    //关闭弹窗
    closeFileShow (val) {
      this.iframeShow = val
    },
    //预览
    preview(e){
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e
        } else if (ext == 'doc' || ext == 'docx' || ext == 'xlsx' || ext == 'xls') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e
        } else {
          this.isImg = 1
          this.previewFileUrl = e
        }
        this.iframeShow = true
      }
    },
    // 获取项目费用列表
    getProjectFeePageList () {
      let obj = {
        SysUserName: this.searchform.SysUserName,
        ProjectName: '',
        ProjectId: this.ProjectId,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetProjectFeePageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          console.log(this.tableData);
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    searchtable () {
      this.currentPage = 1
      this.getProjectFeePageList()
    },

    // 添加项目成本
    addprojectcost () {
      this.costtitle = '添加项目成本'
      this.costvisible = true
      this.contentdata = {}
    },

    // 修改
    handleEdit (e) {
      this.costtitle = '修改项目成本'
      // 获取成本详情
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetProjectFeeInfo(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.contentdata = copy(response.Data)
          console.log(this.contentdata);
          this.costvisible = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 提交审核
    submitaudit (e) {
      this.Id = e.Id
      this.attachments = e.Attachment
      this.auditcontentdata = copy(e)
      this.costauditvisible = true
    },
    // 关闭审核弹框
    closeauditdialog () {
      this.costauditvisible = false
    },
    // 保存提交审核
    savecostaudit (e) {
      showLoading()
      AddOtherExpense(e).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '成功发起审核!',
            type: 'success'
          })
          this.costauditvisible = false
          this.getProjectFeePageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 开具发票
    issueinvoice (e) {
      this.$router.push({
        path: '/projectManagement/dialogInvoice',
        query: {
          Id: this.ProjectId,
          ProjectName: e.ProjectName
        }
      })
    },
    // 作废
    cancellation (e) {
      this.$confirm('此操作将作废该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectFee(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '作废成功!',
              type: 'success'
            })
            this.getProjectFeePageList()
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
          message: '已取消作废'
        });
      });
    },

    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getProjectFeePageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectFeePageList()
    },

    // 关闭弹框
    closedialog () {
      this.costvisible = false
      this.contentdata = {}
    },
    savecost (e, isaudit) {
      console.log(e);
      if (!isaudit) {
        if (!e.Id) {
          let obj = {
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            AddTime: e.AddTime,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType:e.SupplierType,
            SupplierId:e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          showLoading()
          AddProjectFee(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功!',
                type: 'success'
              })
              this.costvisible = false
              this.getProjectFeePageList()
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: e.Id,
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType:e.SupplierType,
            SupplierId:e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          showLoading()
          EditProjectFee(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功!',
                type: 'success'
              })
              this.costvisible = false
              this.getProjectFeePageList()
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else {
        if (!e.Id) {
          let obj = {
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            AddTime: e.AddTime,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType:e.SupplierType,
            SupplierId:e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          showLoading()
          AddProjectFee(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              if (response.Data) {
                this.getProjectFeePageList()
                this.$message({
                  message: '成本创建成功!',
                  type: 'success'
                })
                setTimeout(() => {
                  // 获取费用详情
                  let obj = {
                    Id: response.Data.Id,
                    menuid: MenuIdDate(),
                    operationcode: '1'
                  }
                  this.Id = response.Data.Id
                  this.costvisible = false
                  GetProjectFeeInfo(qs.stringify(obj)).then(response => {
                    if (response.IsSuccess) {
                      this.auditcontentdata = copy(response.Data)
                      this.costauditvisible = true
                    } else {
                      this.$message({
                        message: response.MessageContent,
                        type: 'error'
                      })
                    }
                  })
                }, 1000);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: e.Id,
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType:e.SupplierType,
            SupplierId:e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: '1',
          }
          showLoading()
          EditProjectFee(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.getProjectFeePageList()
              this.$message({
                message: '成本修改成功!',
                type: 'success'
              })
              setTimeout(() => {
                // 获取费用详情
                let obj = {
                  Id: e.Id,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                this.Id = e.Id
                this.costvisible = false
                GetProjectFeeInfo(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    this.auditcontentdata = copy(response.Data)
                    this.costauditvisible = true
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              }, 1000);
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.cost-management-container /deep/ {
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
        width: 290px;
        .el-input__inner {
          border-color: transparent !important;
          background-color: $erpbgcolor;
        }
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
    }
  }
}
</style>