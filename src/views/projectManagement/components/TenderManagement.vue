<!-- 招投标管理 -->
<template>
  <div>
    <div class="table-content">
      <div>
        <el-tabs type="border-card" v-model="activeName" class="child-tabs-table" @tab-click="handleClick">
          <el-tab-pane label="投标文件购买" name="shop">
            <div class="tableHeader-operation">
              <el-button class="operation-button" size="small" type="primary" @click="AddApplyBuy">申请购买招标文件</el-button>
            </div>
            <el-table ref="industrtTable" v-loading="tableloading" :data="ProjectshopList" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
              <el-table-column align="center" prop="Id" label="序号" fixed min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="DeadlineForPurchasingBids" min-width="180" label="购买标书截止时间" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.DeadlineForPurchasingBids | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="160" show-overflow-tooltip />
              <el-table-column align="center" prop="CompanyName" label="招标单位" min-width="160" show-overflow-tooltip />
              <el-table-column align="center" prop="BiddingAgency" label="投标单位" min-width="100" show-overflow-tooltip />
              <el-table-column align="center" prop="OwnerName" label="跟单员" min-width="120" />
              <el-table-column align="center" prop="AuthorizedSysUser" label="授权代表" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="Account" label="招标文件费用" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="PurchaseBidingMode" label="购买标书方式" min-width="120" />
              <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
              <el-table-column align="center" prop="AddTime" label="申请时间" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" prop="Name" label="操作">
                <template slot-scope="scope">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <svg-icon icon-class="setting" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <ul class="popout-list">
                        <el-dropdown-item @click.native="lookApplyBuy(scope.row)">查看</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status==0||scope.row.Status==3" @click.native="ModifyApplyBuy(scope.row)">修改</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status==0||scope.row.Status==3" @click.native="SubmitApproval(scope.row)">提交送审</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status==1" @click.native="WithdrawApplyBuy(scope.row)">撤回</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status!=2" @click.native="DeleteApplyBuy(scope.row)">删除</el-dropdown-item>
                      </ul>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="标前、标后信息反馈" name="feedback">
            <div class="tableHeader-operation">
              <el-button class="operation-button" size="small" type="primary" @click="AddFeedback">添加标前、标后信息反馈</el-button>
              <el-button class="operation-button" size="small" type="primary" @click="ExportBiddingApply">批量导出</el-button>
            </div>
            <el-table ref="industrtTable" v-loading="tableloading" :data="FeedBacklist" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
              <el-table-column align="center" prop="Id" label="序号" min-width="90" />
              <el-table-column align="center" prop="BiddingOpeningDeadline" label="开标截止时间" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.BiddingOpeningDeadline | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="180" show-overflow-tooltip />
              <el-table-column align="center" prop="CompanyName" label="招标单位" min-width="180" show-overflow-tooltip />
              <el-table-column align="center" prop="BusinessTypeText" label="业务类型" min-width="120" />
              <el-table-column align="center" prop="BiddingBfCompanyName" label="投标单位" min-width="180" show-overflow-tooltip />
              <el-table-column align="center" prop="OwnerName" label="跟单员" min-width="120" />
              <el-table-column align="center" prop="BiddingAgency" label="授权代表" min-width="120" />
              <el-table-column align="center" prop="SecurityAmount" label="投标保证金额（元）" min-width="160" />
              <el-table-column align="center" prop="ProjectStage" label="项目阶段" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="Status" label="审批状态" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.Status==0">待审批</span>
                  <span v-if="scope.row.Status==1">审批中</span>
                  <span v-if="scope.row.Status==2">审批通过</span>
                  <span v-if="scope.row.Status==3">审批拒绝</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SysUserName" label="项目招投标负责人" min-width="160" />
              <el-table-column align="center" prop="AddTime" label="申请时间" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" prop="Name" label="操作">
                <template slot-scope="scope">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <svg-icon icon-class="setting" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <ul class="popout-list">
                        <el-dropdown-item @click.native="LookFeedBack(scope.row)">查看</el-dropdown-item>
                        <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '3')" @click.native="EditFeedBack(scope.row)">修改</el-dropdown-item>
                        <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '3')" @click.native="SubmittedFeedBack(scope.row)">提交送审</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status == '1'" @click.native="WithdrawFeedBack(scope.row)">撤回</el-dropdown-item>
                        <el-dropdown-item @click.native="UploadFeedBack(scope.row)">上传标书附件</el-dropdown-item>
                        <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '3')" @click.native="DeleteFeedBack(scope.row)">删除</el-dropdown-item>
                        <el-dropdown-item @click.native="ExportFeedBack(scope.row)">导出</el-dropdown-item>
                      </ul>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="招投标报价管理" name="offer">
            <div class="tableHeader-operation">
              <el-button class="operation-button" size="small" type="primary" @click="AddBiddingApply">申请招投标报价审批</el-button>
            </div>
            <el-table ref="industrtTable" v-loading="tableloading" :data="BiddingApplylist" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
              <el-table-column align="center" prop="Id" min-width="70" label="序号" />
              <el-table-column align="center" prop="ApprovalTimeLimit" label="审批时限" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.ApprovalTimeLimit | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="CompanyName" label="招标单位" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="BusinessTypeText" label="业务类型" min-width="120" />
              <el-table-column align="center" prop="OwnerName" label="跟单员" min-width="120" />
              <el-table-column align="center" prop="ProjectContent" label="报价内容" min-width="120" show-overflow-tooltip />
              <el-table-column align="center" prop="ProjectCostCalculation" label="项目成本及盈利测算" min-width="150" show-overflow-tooltip />
              <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
              <el-table-column align="center" prop="AddTime" label="申请时间" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
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
                        <el-dropdown-item @click.native="LookBiddingApply(scope.row)">查看</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status == '0' || scope.row.Status == '3'" @click.native="EditBiddingApply(scope.row)">修改</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status == '0' || scope.row.Status == '3'" @click.native="SubmittedReviewApply(scope.row)">提交送审</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status == '1'" @click.native="WithdrawBidding(scope.row)">撤回</el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.Status == '0' || scope.row.Status == '3'" @click.native="DeleteBidding(scope.row)">删除</el-dropdown-item>
                      </ul>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 查看招投标购买信息 -->
    <ViewPurchaseBidding :ShowId="ShowId" :showContract="showContract" @isHide="isHide"></ViewPurchaseBidding>
    <!-- 添加修改报价审批 -->
    <EditBiddingApplyBuy :title="BiddingApplyBuyTitle" :ProId="ProjectId" :disabled="disabled" :showBiddingApplyBuy="showBiddingApplyBuy" :tempData="tempData" :ProjectDetail="ProjectDetail" @EditBiddingApplyBuy="EditBiddingApplyBuy" @EditSubmittedReview="EditSubmittedReview" @closeApplyBuy="closeApplyBuy"></EditBiddingApplyBuy>
    <!-- 查看招投标报价审批 -->
    <LookBiddingApplyBuy :showLookBiddingApplyBuy="showLookBiddingApplyBuy" :tempData="tempData" @closeLookApplyBuy="closeLookApplyBuy"></LookBiddingApplyBuy>
    <!-- 批量导出 -->
    <div class="tag-container">
      <el-dialog :close-on-click-modal="false" title="选择时间段导出" class="dialog-box" append-to-body :visible.sync="showDialog" :show-close="false" :destroy-on-close="true" width="360px" @close="close">
        <i class="el-icon-circle-close closeButton" @click="close"></i>
        <div class="condition">
          <el-date-picker class="picker" style="width: 280px;margin-bottom:30px;" value-format="yyyy-MM-dd HH:mm:ss" v-model="TimeDatas" type="daterange" size="small" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
          <el-button round class="erpbtn" size="small" @click="Save('ruleForm')">批量导出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { AddProjectTenderApply, EditProjectTenderApply, GetProjectTenderApplyInfo } from '@/api/projectManagement.js'
import { GetBiddingDocumentPageList, DeleteBiddingDocuments, EditBiddingDocumentsStatus, GetBiddingQuotePageList, AddBiddingQuote, EditBiddingQuote, DeleteBiddingQuote, EditBiddingQuoteStatus, GetBiddingInformationBasePageList, EditBiddingInformationBaseStatus, DeleteBiddingInformationBase, ExportBiddingInformation } from '@/api/Bidding.js'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation.js'
import EditBiddingApplyBuy from '../../BiddingManagement/components/EditBiddingApplyBuy.vue'
import LookBiddingApplyBuy from '../../BiddingManagement/components/LookBiddingApplyBuy.vue'
import ViewPurchaseBidding from '../../BiddingManagement/components/ViewPurchaseBidding.vue'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    EditBiddingApplyBuy,
    LookBiddingApplyBuy,
    ViewPurchaseBidding
  },
  data () {
    return {
      currentPage: 1,
      PageSize: 10,
      total: 0,
      activeName: 'shop',
      tableloading: false,
      ProjectshopList: [],
      FeedBacklist: [],
      BiddingApplylist: [],
      BiddingApplyBuyTitle: '',
      showBiddingApplyBuy: false,
      showLookBiddingApplyBuy: false,
      ApplyBuyTitle: '',
      showApplyBuy: false,
      showContract: false,
      showDialog: false,
      ShowId: 0,
      TimeDatas: '',
      tempData: {},
      disabled: false,
      ProjectId: '',
      ProjectDetail: {}
    }
  },
  created () {
    this.$nextTick(() => {
      this.ProjectId = this.$route.query.Id
      this.ProjectDetail = JSON.parse(window.localStorage.getItem('projectdetail'))
      this.getTenderApply()
    })
  },
  methods: {
    handleClick (tab) {
      this.currentPage = 1
      this.PageSize = 10
      if (this.activeName == 'shop') {
        this.getTenderApply()
      } else if (this.activeName == 'feedback') {
        this.getFeedBack()
      } else if (this.activeName == 'offer') {
        this.getBiddingApply()
      }
    },
    //获取招投标文件购买列表
    getTenderApply () {
      this.tableloading = true
      let obj = {
        CompanyName: '',
        ProjectName: '',
        ApprovalTimeLimitYear: '',
        ApprovalTimeLimitMonth: '',
        ApprovalTimeLimitDay: '',
        OwnerName: '',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        ProjectId: this.ProjectId,
        Status: -1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBiddingDocumentPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectshopList = response.Data
            this.total = response.Total
          } else {
            this.ProjectshopList = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //获取招投标报价列表
    getBiddingApply () {
      this.tableloading = true
      const obj = {
        ProjectId: this.ProjectId,
        CompanyName: '',
        ProjectName: '',
        ApprovalTimeLimitYear: '',
        ApprovalTimeLimitMonth: '',
        ApprovalTimeLimitDay: '',
        BusinessType: '-1',
        OwnerName: '',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBiddingQuotePageList(qs.stringify(obj)).then(res => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.BiddingApplylist = res.Data
          this.total = res.Total
        } else {
          this.BiddingApplylist = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //打开添加招投标报价审批
    AddBiddingApply () {
      this.disabled = true
      this.BiddingApplyBuyTitle = '申请招投标报价审批'
      this.showBiddingApplyBuy = true
    },
    //查看招投标报价审批事件
    LookBiddingApply (data) {
      this.tempData = data
      this.showLookBiddingApplyBuy = true
    },
    //查看招投标购买信息
    lookApplyBuy (e) {
      this.showContract = true
      this.ShowId = e.Id
    },
    //关闭查看周招投标购买信息
    isHide (e) {
      this.showContract = e
    },
    //撤回招投标购买
    WithdrawApplyBuy (e) {
      const obj = {
        Id: e.Id,
        Status: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定要撤回当前招投文件购买吗（提交送审后30秒内不能撤回）？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        EditBiddingDocumentsStatus(obj).then(response => {
          hideLoading()
          if (response.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '撤回成功！'
            })
            this.getTenderApply()
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
          message: '已取消撤回！'
        })
      })
    },
    //提交招投标购买送审
    SubmitApproval (e) {
      let obj = {
        Id: e.Id,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定要提交当前招投文件购买送审到钉钉吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        EditBiddingDocumentsStatus(obj).then(response => {
          hideLoading()
          if (response.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '提交送审成功！'
            })
            this.getTenderApply()
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
          message: '已取消送审！'
        })
      })
    },
    //删除招投标购买列表
    DeleteApplyBuy (e) {
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定要删除当前选中的招标文件购买？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteBiddingDocuments(obj).then(response => {
          hideLoading()
          if (response.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.getTenderApply()
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
          message: '已取消删除！'
        })
      })
    },
    //关闭招投标报价审批
    closeLookApplyBuy (str) {
      this.showLookBiddingApplyBuy = str
    },
    //修改招投标报价事件
    EditBiddingApply (data) {
      this.BiddingApplyBuyTitle = '修改招投标报价审批'
      this.disabled = true
      this.tempData = data
      this.showBiddingApplyBuy = true
    },
    //关闭添加修改审批窗口
    closeApplyBuy (str) {
      this.showBiddingApplyBuy = str
    },
    //提交送审
    SubmittedReviewApply (data) {
      const obj = {
        Id: data.Id,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定要选择当前数据提交送审吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        EditBiddingQuoteStatus(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交送审成功!'
            })
            this.getBiddingApply()
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
          message: '已取消送审！'
        })
      })
    },
    //保存添加修改审批事件
    EditBiddingApplyBuy (data) {
      if (data.Id) {
        showLoading()
        let obj = {
          Id: data.Id,
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改招投标报价审批成功！'
            })
            this.showBiddingApplyBuy = false
            this.getBiddingApply()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        showLoading()
        let obj = {
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        AddBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加招投标报价审批成功！'
            })
            this.showBiddingApplyBuy = false
            this.getBiddingApply()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //弹窗提交送审事件
    EditSubmittedReview (data) {
      if (data.Id) {
        showLoading()
        let obj = {
          Id: data.Id,
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交招投标报价审批成功！'
            })
            this.showBiddingApplyBuy = false
            this.getBiddingApply()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        showLoading()
        let obj = {
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        AddBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交招投标报价审批成功！'
            })
            this.showBiddingApplyBuy = false
            this.getBiddingApply()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //撤回招投标审批
    WithdrawBidding (data) {
      const obj = {
        Id: data.Id,
        Status: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('此操作将撤回该招投标报价审批（提交送审后30秒内不能撤回）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditBiddingQuoteStatus(qs.stringify(obj)).then(response => {
          if (response.MessageCode == '0') {
            this.$message({
              type: 'success',
              message: '撤回成功!'
            })
            this.getBiddingApply()
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
          message: '已取消撤回！'
        })
      })
    },
    //删除招投标审批
    DeleteBidding (data) {
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('此操作将删除该招投标报价审批', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteBiddingQuote(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getBiddingApply()
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
          message: '已取消删除！'
        })
      })
    },
    //打开申请招标
    AddApplyBuy () {
      // this.ApplyBuyTitle = '申请购买招标文件信息'
      // this.showApplyBuy = true
      const ProjectDetail = JSON.parse(window.localStorage.getItem('projectdetail')) || {}
      this.$router.push({
        name: '申请购买招标文件',
        path: '/BiddingManagement/ApplyPurchaseBiddingFile',
        query: {
          Id: ProjectDetail.Id
        }
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '申请购买招标文件'
      }))
    },
    // 修改
    ModifyApplyBuy (e) {
      this.$router.push({
        name: '申请购买招标文件',
        path: '/BiddingManagement/ApplyPurchaseBiddingFile',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '修改购买招标文件',
        Id: e.Id
      }))
    },
    //修改招标信息
    EditApply (data) {
      this.ApplyBuyTitle = '修改购买招标文件信息'
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetProjectTenderApplyInfo(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showApplyBuy = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查看招标信息
    LookApply (data) {
      this.ApplyBuyTitle = '查看购买招标文件信息'
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetProjectTenderApplyInfo(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.disabled = true
          this.showApplyBuy = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //招标信息保存
    ApplySave (data) {
      data.ProjectId = this.ProjectId
      data.menuid = MenuIdDate()
      data.operationcode = '1'
      if (data.Id) {
        showLoading()
        EditProjectTenderApply(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改购买招标文件成功!'
            })
            this.showApplyBuy = false
            this.getTenderApply()
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        showLoading()
        AddProjectTenderApply(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '申请购买招标文件成功!'
            })
            this.showApplyBuy = false
            this.getTenderApply()
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }

    },
    //获取信息反馈表列表
    getFeedBack () {
      this.tableloading = true
      let obj = {
        CompanyName: '',
        ProjectName: '',
        BiddingOpeningDeadlineYear: '',
        BiddingOpeningDeadlineMonth: '',
        BiddingOpeningDeadlineDay: '',
        OwnerName: '',
        SysUserName: '',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        ProjectId: this.ProjectId,
        Status: -1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBiddingInformationBasePageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.FeedBacklist = response.Data
            this.total = response.Total
          } else {
            this.FeedBacklist = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //添加标前、标后信息反馈
    AddFeedback () {
       const ProjectDetail = JSON.parse(window.localStorage.getItem('projectdetail')) || {}
      this.$router.push({
        path: '/projectManagement/AddInformationFeedback',
         query: {
          Id: ProjectDetail.Id
        }
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '添加标前标后信息反馈'
      }))
    },
    //修改标前、标后信息反馈
    EditFeedBack (e) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '修改标前标后信息反馈'
      }))
    },
    //查看标前、标后信息反馈
    LookFeedBack (e) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '查看标前标后信息反馈'
      }))
    },
    //提交标前、标后信息反馈
    SubmittedFeedBack (e) {
      let obj = {
        Id: e.Id,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定提交当前标前、标后信息反馈送审吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditBiddingInformationBaseStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '提交送审成功'
            })
            this.getFeedBack()
          } else {
            this.$message({
              type: 'error',
              message: res.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    //撤回标前、标后信息反馈
    WithdrawFeedBack (e) {
      let obj = {
        Id: e.Id,
        Status: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定撤回当前标前、标后信息反馈吗（提交送审后30秒内不能撤回）?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        EditBiddingInformationBaseStatus(obj).then(res => {
          hideLoading()
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '撤回成功'
            })
            this.getFeedBack()
          } else {
            this.$message({
              type: 'error',
              message: res.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    //上传标前、标后信息反馈附件
    UploadFeedBack (e) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '上传标书附件'
      }))
    },
    //删除标前、标后信息反馈
    DeleteFeedBack (e) {
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.$confirm('你确定删除当前标前、标后信息反馈吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteBiddingInformationBase(obj).then(res => {
          hideLoading()
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getFeedBack()
          } else {
            this.$message({
              type: 'error',
              message: res.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    //导出标前、标后信息反馈附件
    ExportFeedBack (e) {
      let obj = {
        IdArr: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      ExportBiddingInformation(obj).then(res => {
        if (res.MessageCode == 0 && res.Data) {
          window.open(res.Data.Url)
          this.$message({
            type: 'success',
            message: '导出成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    //打开批量导出标前、标后信息反馈附件
    ExportBiddingApply (str) {
      this.showDialog = true
    },
    //确定批量导出标前、标后信息反馈附件
    Save () {
      let obj = {
        IdArr: '',
        BiddingOpeningDeadlineStart: this.TimeDatas[0],
        BiddingOpeningDeadlineEnd: this.TimeDatas[1],
        menuid: MenuIdDate(),
        operationcode: 1
      }
      ExportBiddingInformation(obj).then(res => {
        if (res.MessageCode == 0) {
          window.open(res.Data.Url)
          let messagesNumber = res.Data.Number
          this.$message({
            type: 'success',
            message: `导出成功</br></br>已成功导出${messagesNumber}条`,
            dangerouslyUseHTMLString: true,
            showClose: true,
            duration: 0,
          })
          this.close()
          this.TimeDatas = ''
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    //关闭批量导出标前、标后信息反馈附件
    close () {
      this.showDialog = false
    },
    handleSizeChange (val) {
      this.PageSize = val
      if (this.activeName == 'shop') {
        this.getTenderApply()
      } else {
        this.getFeedBack()
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.activeName == 'shop') {
        this.getTenderApply()
      } else {
        this.getFeedBack()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  margin-top: 40px;
}
/deep/ .table-content {
  margin: 0;
  padding: 0;
  width: 100%;
}
.child-tabs-table {
  background: #fff;
  border: none;
  box-shadow: none;
  margin-top: 20px;
  /deep/ .el-tabs__header {
    border-bottom: 0;
    background: #fff !important;
    .el-tabs__nav-wrap {
      .el-tabs__nav {
        .el-tabs__item {
          border: none;
          background: #fff !important;
          margin-right: 4px;
          font-size: 14px;
          color: #999 !important;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        }
        .is-active {
          color: #333333;
          background: #f2f3f9 !important;
        }
      }
    }
    .is-scrollable {
      padding: 0 40px;
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        background: #1387f4;
        line-height: 40px;
        width: 40px;
        color: #fff;
        margin: auto;
        text-align: center;
        i {
          font-size: 16px;
        }
      }
    }
    .el-tabs__content {
      padding: 24px;
    }
  }
  /deep/.el-tabs__content {
    background: #f2f3f9 !important;
  }
}
.pagina-fonter {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>