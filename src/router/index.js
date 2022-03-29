import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '工作台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', index: 1, amount: '1' }
    }, {
      path: 'ImportData',
      name: '数据导入',
      component: () => import('@/views/dashboard/ImportData.vue'),
      meta: { title: '数据导入', amount: '1' }
    }, {
      path: '/SystemSetting/CheckStaff',
      name: '查看团队人员',
      component: () => import('@/views/SystemSetting/components/CheckStaff.vue'),
      meta: { title: '查看团队人员', icon: 'example', amount: '7' }
    }, {
      path: '/SystemSetting/permissions',
      name: '配置权限',
      component: () => import('@/views/SystemSetting/components/permissions.vue'),
      meta: { title: '配置权限', icon: 'example', amount: '7' }
    }]
  },
  {
    path: '/CustomerManagement',
    name: '客户管理',
    component: Layout,
    children: [{
      //   path: 'MyCustomer',
      //   name: '我的客户',
      //   component: () => import('@/views/CustomerManagement/MyCustomer.vue')
      // }, {
      //   path: 'SharedCustomer',
      //   name: '共享客户',
      //   component: () => import('@/views/CustomerManagement/SharedCustomer.vue')
      // }, {
      //   path: 'PublicCustomer',
      //   name: '公共客户',
      //   component: () => import('@/views/CustomerManagement/PublicCustomer.vue')
      // }, {
      path: 'SharingRelationship',
      name: '共享关系处理',
      component: () => import('@/views/CustomerManagement/SharingRelationship.vue')
    }, {
      path: 'CustomerDetail',
      name: '客户详情',
      component: () => import('@/views/CustomerManagement/CustomerDetail.vue')
    }, {
      path: 'AddCustomer',
      name: '客户报备',
      component: () => import('@/views/CustomerManagement/AddCustomer.vue')
      // }, {
      //   path: 'MyJurisdiction',
      //   name: '我管辖的客户',
      //   component: () => import('@/views/CustomerManagement/MyJurisdiction.vue')
    }, {
      path: 'followdetail',
      name: '跟进详情',
      component: () => import('@/views/CustomerManagement/components/followdetail.vue')
    }]
  },
  {
    path: '/projectManagement',
    name: '项目管理',
    component: Layout,
    children: [{
      //   path: 'ProjectManagement',
      //   name: '项目管理',
      //   component: () => import('@/views/projectManagement/ProjectManagement.vue')
      // }, {
      //   path: 'MyProject',
      //   name: '我管理的项目',
      //   component: () => import('@/views/projectManagement/MyProject.vue')
      // }, {
      //   path: 'ParticipateProject',
      //   name: '我参与的项目',
      //   component: () => import('@/views/projectManagement/ParticipateProject.vue')
      // }, {
      //   path: 'MyJurisdictionProject',
      //   name: '我管辖的项目',
      //   component: () => import('@/views/projectManagement/MyJurisdictionProject.vue')
      // }, {
      //   path: 'ProjectAudit',
      //   name: '项目人员指派',
      //   component: () => import('@/views/projectManagement/ProjectAudit.vue')
      // }, {
      path: 'ProjectContract',
      name: '项目合同',
      component: () => import('@/views/projectManagement/ProjectContract.vue')
    }, {
      path: 'AddProject',
      name: '添加项目',
      component: () => import('@/views/projectManagement/components/AddProject.vue')
    }, {
      path: 'EduitProject',
      name: '修改项目',
      component: () => import('@/views/projectManagement/components/EduitProject.vue')
    }, {
      path: 'RecruitmentService',
      name: '添加招聘服务',
      component: () => import('@/views/projectManagement/components/RecruitmentService.vue')
    }, {
      path: 'ProjectDetail',
      name: '项目详情',
      component: () => import('@/views/projectManagement/components/ProjectDetail.vue')
    }, {
      path: 'AddInformationFeedback',
      name: '招投标信息反馈',
      component: () => import('@/views/projectManagement/components/AddInformationFeedback.vue')
    }, {
      path: 'lookInformationFeedback',
      name: '查看招投标信息反馈',
      component: () => import('@/views/projectManagement/components/lookInformationFeedback.vue')
    }, {
      path: 'ClaimMoney',
      name: '认领回款',
      component: () => import('@/views/projectManagement/components/ClaimMoney.vue')
    }, {
      path: 'ProjectReviewQuotation',
      name: '提交项目审核报价',
      component: () => import('@/views/projectManagement/components/ProjectReviewQuotation.vue')
    }, {
      path: 'dialogInvoice',
      name: '发票申请表',
      component: () => import('@/views/projectManagement/components/dialog-Invoice.vue')
    }
    ]
  },
  {
    path: '/OutsourcedEmployeeManagement',
    name: '外包员工管理',
    component: Layout,
    children: [{
      //   path: 'ExpatriateManagement',
      //   name: '外派员工管理',
      //   component: () => import('@/views/OutsourcedEmployeeManagement/ExpatriateManagement.vue')
      // }, {
      //   path: 'BlacklistManagement',
      //   name: '外派员工黑名单',
      //   component: () => import('@/views/OutsourcedEmployeeManagement/BlacklistManagement.vue')
      // }, {
      //   path: 'HistoryResearchers',
      //   name: '离职人员管理',
      //   component: () => import('@/views/OutsourcedEmployeeManagement/HistoryResearchers.vue')
      // }, {
      //   path: 'CertificateIssuanceManagement',
      //   name: '证明开具管理',
      //   component: () => import('@/views/OutsourcedEmployeeManagement/CertificateIssuanceManagement.vue')
      // }, {
      //   path: 'EmployeeContractManagement',
      //   name: '员工合同管理',
      //   component: () => import('@/views/OutsourcedEmployeeManagement/EmployeeContractManagement.vue')
      // }, {
      path: 'AddContract',
      name: '添加员工合同',
      component: () => import('@/views/OutsourcedEmployeeManagement/components/AddContract.vue')
    }, {
      path: 'LookContract',
      name: '查看员工合同',
      component: () => import('@/views/OutsourcedEmployeeManagement/components/LookContract.vue')
    }, {
      path: 'AddExpatriateEmployees',
      name: '办理入职',
      component: () => import('@/views/OutsourcedEmployeeManagement/components/AddExpatriateEmployees.vue')
    }, {
      path: 'ExpatriateEmployeesDeatil',
      name: '员工详情',
      component: () => import('@/views/OutsourcedEmployeeManagement/components/ExpatriateEmployeesDeatil.vue')
    }, {
      path: 'SubmitExpenseManagement',
      name: '报销管理',
      component: () => import('@/views/OutsourcedEmployeeManagement/SubmitExpenseManagement.vue')
    }, {
      path: 'ViewClaims',
      name: '查看认领情况',
      component: () => import('@/views/OutsourcedEmployeeManagement/components/ViewClaims.vue')
    }, {
      path: 'RelationshipMaintenance',
      name: '外包员工关系维护',
      component: () => import('@/views/OutsourcedEmployeeManagement/RelationshipMaintenance.vue')
    }]
  },
  {
    path: '/CompensationServiceManagement',
    name: '薪酬服务管理',
    component: Layout,
    children: [{
      path: 'SalaryAccounting',
      name: '工资核算管理',
      component: () => import('@/views/CompensationServiceManagement/SalaryAccounting.vue')
      // }, {
      //   path: 'HealthInsuranceOffice',
      //   name: '医保增减员管理',
      //   component: () => import('@/views/CompensationServiceManagement/HealthInsuranceOffice.vue')
      // }, {
      //   path: 'HealthInsuranceAccount',
      //   name: '医保账户管理',
      //   component: () => import('@/views/CompensationServiceManagement/HealthInsuranceAccount.vue')
      // }, {
      //   path: 'HealthInsuranceManagement',
      //   name: '医保缴交管理',
      //   component: () => import('@/views/CompensationServiceManagement/HealthInsuranceManagement.vue')
      // }, {
      //   path: 'SocialSecurityOfficer',
      //   name: '社保增减员管理',
      //   component: () => import('@/views/CompensationServiceManagement/SocialSecurityOfficer.vue')
      // }, {
      //   path: 'AccumulationOfficer',
      //   name: '公积金增减员',
      //   component: () => import('@/views/CompensationServiceManagement/AccumulationOfficer.vue')
      // }, {
      //   path: 'FinalStatement',
      //   name: '结算单',
      //   component: () => import('@/views/CompensationServiceManagement/FinalStatement.vue')
      // }, {
      //   path: 'SocialSecurityManagement',
      //   name: '实缴社保管理',
      //   component: () => import('@/views/CompensationServiceManagement/SocialSecurityManagement.vue')
      // }, {
      //   path: 'ProvidentFundManagement',
      //   name: '实缴公积金管理',
      //   component: () => import('@/views/CompensationServiceManagement/ProvidentFundManagement.vue')
    }, {
      path: 'SalaryIssue',
      name: '工资发放管理',
      component: () => import('@/views/CompensationServiceManagement/SalaryIssue.vue')
      // }, {
      //   path: 'SocialSecurityAccount',
      //   name: '社保账户管理',
      //   component: () => import('@/views/CompensationServiceManagement/SocialSecurityAccount.vue')
      // }, {
      //   path: 'ProvidentfundAccount',
      //   name: '公积金账户管理',
      //   component: () => import('@/views/CompensationServiceManagement/ProvidentfundAccount.vue')
      // }, {
      //   path: 'CompensationManagement',
      //   name: '薪酬管理',
      //   component: () => import('@/views/CompensationServiceManagement/CompensationManagement.vue')
    }, {
      path: 'payrollheader',
      name: '对应表头关系',
      component: () => import('@/views/CompensationServiceManagement/components/payrollheader.vue')
    }, {
      path: 'OtherExpenseStatementDetails',
      name: '其他费用结算单详情',
      component: () => import('@/views/CompensationServiceManagement/components/OtherExpenseStatementDetails.vue')
    }, {
      path: 'CollectionFlowRecord',
      name: '关联回款流水记录',
      component: () => import('@/views/CompensationServiceManagement/components/CollectionFlowRecord.vue')
    },{
      path: 'UploadOtherCharges',
      name: '上传其他费用',
      component: () => import('@/views/CompensationServiceManagement/components/UploadOtherCharges.vue')
    },{
      path: 'InitiatePaymentApplication',
      name: '发起付款申请',
      component: () => import('@/views/CompensationServiceManagement/components/InitiatePaymentApplication.vue')
    },{
      path: 'OtherExpensePaymentApplication',
      name: '其他费用付款申请',
      component: () => import('@/views/CompensationServiceManagement/components/OtherExpensePaymentApplication.vue')
    },{
      path: 'ViewDetailsOtherExpenses',
      name: '查看其他费用明细',
      component: () => import('@/views/CompensationServiceManagement/components/ViewDetailsOtherExpenses.vue')
    },
    // {
    //   path: 'DetailsCapitalCupancyExpenses',
    //   name: '资金占用费明细',
    //   component: () => import('@/views/CompensationServiceManagement/components/DetailsCapitalCupancyExpenses.vue')
    // },
    {
      path: 'InsuranceInfo',
      name: '员工社保详情',
      component: () => import('@/views/CompensationServiceManagement/components/InsuranceInfo.vue')
    }, {
      path: 'AccumulationInfo',
      name: '员工公积金详情',
      component: () => import('@/views/CompensationServiceManagement/components/AccumulationInfo.vue')
    }, {
      path: 'HealthInfo',
      name: '员工医保详情',
      component: () => import('@/views/CompensationServiceManagement/components/HealthInfo.vue')
    }, {
      path: 'CompensationDetail',
      name: '员工薪酬详情详情',
      component: () => import('@/views/CompensationServiceManagement/components/CompensationDetail.vue')
    }, {
      path: 'calculation',
      name: '发起结算',
      component: () => import('@/views/CompensationServiceManagement/components/dialog-calculation.vue')
    }, {
      path: 'AddPaymentRequest',
      name: '发起工资付款申请',
      component: () => import('@/views/CompensationServiceManagement/components/AddPaymentRequest.vue')
      // }, {
      //   path: 'SixToDeductManagement',
      //   name: '六项扣除管理',
      //   component: () => import('@/views/CompensationServiceManagement/SixToDeductManagement.vue')
      // }, {
      //   path: 'ThisCardManagement',
      //   name: '挂账管理',
      //   component: () => import('@/views/CompensationServiceManagement/ThisCardManagement.vue')
      // }, {
      //   path: 'PaymentRequestManagement',
      //   name: '付款申请单管理',
      //   component: () => import('@/views/CompensationServiceManagement/PaymentRequestManagement.vue')
    }, {
      path: 'PaymentRequestInfo',
      name: '付款申请单详情',
      component: () => import('@/views/CompensationServiceManagement/components/PaymentRequestInfo.vue')
    }, {
      path: 'FinalStatementDetail',
      name: '工资结算单详情',
      component: () => import('@/views/CompensationServiceManagement/components/FinalStatementDetail.vue')
    }, {
      path: 'AccumulationDetail',
      name: '公积金结算单详情',
      component: () => import('@/views/CompensationServiceManagement/components/AccumulationDetail.vue')
    }, {
      path: 'SocialDetail',
      name: '社保结算单详情',
      component: () => import('@/views/CompensationServiceManagement/components/SocialDetail.vue')
    }, {
      path: 'HealthDetail',
      name: '医保结算单详情',
      component: () => import('@/views/CompensationServiceManagement/components/HealthDetail.vue')
    }, {
      path: 'UpdateCompensationService',
      name: '修改工资',
      component: () => import('@/views/CompensationServiceManagement/components/UpdateCompensationService.vue')
      // }, {
      //   path: 'PayBalanceManagement',
      //   name: '缴纳差额管理',
      //   component: () => import('@/views/CompensationServiceManagement/PayBalanceManagement.vue')
    }, {
      path: 'PayBalanceDetail',
      name: '缴纳差额详情',
      component: () => import('@/views/CompensationServiceManagement/components/PayBalanceDetail.vue')
    }, {
      path: 'dialogInvoice',
      name: '开具发票',
      component: () => import('@/views/CompensationServiceManagement/components/dialogInvoice.vue')
    }, {
      path: 'AddGenerateStatement',
      name: '生成社保结算单',
      component: () => import('@/views/CompensationServiceManagement/components/AddGenerateStatement.vue')
      // }, {
      //   path: 'PayContrast',
      //   name: '薪酬对比明细',
      //   component: () => import('@/views/CompensationServiceManagement/PayContrast.vue')
    }, {
      path: 'ImportCompensationForm',
      name: '导入薪酬明细',
      component: () => import('@/views/CompensationServiceManagement/ImportCompensationForm.vue')
    }, {
      path: 'ImportSocialSecurityForm',
      name: '导入社保',
      component: () => import('@/views/CompensationServiceManagement/ImportSocialSecurityForm.vue')
    }, {
      path: 'ImportProvidentFundForm',
      name: '导入公积金',
      component: () => import('@/views/CompensationServiceManagement/ImportProvidentFundForm.vue')
    }, {
      path: 'ImportHealthInsuranceForm',
      name: '导入医保',
      component: () => import('@/views/CompensationServiceManagement/ImportHealthInsuranceForm.vue')
    }]
  },
  {
    path: '/FinancialManagement',
    name: '财务管理',
    component: Layout,
    meta: { title: '财务管理' },
    children: [{
      //   path: 'BalancePayments',
      //   name: '收款管理',
      //   component: () => import('@/views/FinancialManagement/BalancePayments.vue')
      // }, {
      //   path: 'InvoiceManagement',
      //   name: '发票申请受理',
      //   component: () => import('@/views/FinancialManagement/InvoiceManagement.vue')
      // }, {
      path: 'InvoiceDetail',
      name: '发票详情',
      component: () => import('@/views/FinancialManagement/components/InvoiceDetail.vue')
      // }, {
      //   path: 'PaymentApplicationManagement',
      //   name: '付款申请管理',
      //   component: () => import('@/views/FinancialManagement/PaymentApplicationManagement.vue')
    }, {
      path: 'PaymentApplicationDetail',
      name: '申请详情',
      component: () => import('@/views/FinancialManagement/components/PaymentApplicationDetail.vue')
      // }, {
      //   path: 'AccountInformation',
      //   name: '企业银行账户管理',
      //   component: () => import('@/views/FinancialManagement/AccountInformation.vue')
    }, {
      path: 'CustomerInvoiceInformationDetails',
      name: '客户发票抬头管理',
      component: () => import('@/views/FinancialManagement/components/CustomerInvoiceInformationDetails.vue')
    }]
  },
  {
    path: '/RecruitmentManagement',
    name: '招聘管理',
    component: Layout,
    meta: { title: '招聘管理' },
    children: [{
      //   path: 'RecruitmentRequirements',
      //   name: '招聘需求管理',
      //   component: () => import('@/views/RecruitmentManagement/RecruitmentRequirements.vue')
      // }, {
      //   path: 'InformationManagement',
      //   name: '人才信息管理',
      //   component: () => import('@/views/RecruitmentManagement/InformationManagement.vue')
      // }, {
      path: 'AddInformation',
      name: '添加人才信息',
      component: () => import('@/views/RecruitmentManagement/components/AddInformation.vue')
    }, {
      path: 'InformationDetail',
      name: '人才信息详情',
      component: () => import('@/views/RecruitmentManagement/components/InformationDetail.vue')
    }, {
      //   path: 'RecruitmentDetailsManagement',
      //   name: '招聘入职明细管理',
      //   component: () => import('@/views/RecruitmentManagement/RecruitmentDetailsManagement.vue')
      // }, {
      path: 'RecruitmentRrequirementDetails',
      name: '招聘需求详情',
      component: () => import('@/views/RecruitmentManagement/components/RecruitmentRrequirementDetails.vue')
    }, {
      path: 'NumberCalled',
      name: '已招人数',
      component: () => import('@/views/RecruitmentManagement/components/NumberCalled.vue')
    }, {
      path: 'ViewDetails',
      name: '提成汇总表详情',
      component: () => import('@/views/RecruitmentManagement/components/ViewDetails.vue')
    }, {
      path: 'RecruitmentService',
      name: '修改招聘需求',
      component: () => import('@/views/RecruitmentManagement/components/RecruitmentService.vue')
    }, {
      path: 'RecommendedDetailedAudit',
      name: '推荐明细审核',
      component: () => import('@/views/RecruitmentManagement/RecommendedDetailedAudit.vue')
    }, {
      path: 'CommissionSummary',
      name: '提成汇总表',
      component: () => import('@/views/RecruitmentManagement/CommissionSummary.vue')
    },{
      path: 'CommissionSummaryDetails',
      name: '提成汇总表详情',
      component: () => import('@/views/RecruitmentManagement/components/CommissionSummaryDetails.vue')
    }, {
      path: 'Pipeline',
      name: 'Pipeline',
      component: () => import('@/views/RecruitmentManagement/Pipeline.vue')
    }, {
      path: 'ChannelManagement',
      name: '渠道管理',
      component: () => import('@/views/RecruitmentManagement/ChannelManagement.vue')
    }, {
      path: 'RecruitmentReport',
      name: '招聘报表',
      component: () => import('@/views/RecruitmentManagement/RecruitmentReport.vue')
    }]
  },
  // {
  //   path: '/MarketingDataManagement',
  //   name: '营销数据管理',
  //   component: Layout,
  //   meta: { title: '营销数据管理' },
  //   children: [{
  //     path: 'MarketingPerformance',
  //     name: '营销业绩统计',
  //     component: () => import('@/views/MarketingDataManagement/MarketingPerformance.vue')
  //   }, {
  //     path: 'MarketingCommission',
  //     name: '营销提成统计',
  //     component: () => import('@/views/MarketingDataManagement/MarketingCommission.vue')
  //   }]
  // },
  {
    path: '/BusinessSet',
    name: '业务设置',
    component: Layout,
    meta: { title: '业务设置' },
    children: [{
      path: 'ProjectReviewSetting',
      name: '项目审核流程设置',
      component: () => import('@/views/BusinessSet/ProjectReviewSetting.vue'),
      meta: { title: '项目审核流程设置' }
    }, {
      path: 'FinanceReviewSetting',
      name: '财务审核流程设置',
      component: () => import('@/views/BusinessSet/FinanceReviewSetting.vue'),
      meta: { title: '财务审核流程设置' }
      // }, {
      //   path: 'SalaryCalculation',
      //   name: '工资计算规则设置',
      //   component: () => import('@/views/BusinessSet/SalaryCalculation.vue'),
      //   meta: { title: '工资计算规则设置' }
      // }, {
      //   path: 'CalculationSecurity',
      //   name: '社保计算规则设置',
      //   component: () => import('@/views/BusinessSet/CalculationSecurity.vue'),
      //   meta: { title: '社保计算规则设置' }
    }, {
      path: 'AddCalculation',
      name: '新建社保计算规则',
      component: () => import('@/views/BusinessSet/components/addCalculation.vue'),
      meta: { title: '新建社保计算规则' }
    }, {
      path: 'lookCalculation',
      name: '查看社保计算规则',
      component: () => import('@/views/BusinessSet/components/lookCalculation.vue'),
      meta: { title: '查看社保计算规则' }
      // }, {
      //   path: 'AccumulationFund',
      //   name: '公积金计算规则设置',
      //   component: () => import('@/views/BusinessSet/AccumulationFund.vue'),
      //   meta: { title: '公积金计算规则设置' }
      // }, {
      //   path: 'CompensationCalculationRules',
      //   name: '个税计算规则设置',
      //   component: () => import('@/views/BusinessSet/CompensationCalculationRules.vue'),
      //   meta: { title: '个税计算规则设置' }
    }, {
      path: 'lookCompensation',
      name: '查看个税计算规则',
      component: () => import('@/views/BusinessSet/components/lookCompensation.vue'),
      meta: { title: '查看个税计算规则' }
    }, {
      path: 'addCompensation',
      name: '新建个税计算规则',
      component: () => import('@/views/BusinessSet/components/addCompensation.vue'),
      meta: { title: '新建个税计算规则' }
      // }, {
      //   path: 'MarketingCommissionRules',
      //   name: '营销提成规则设置',
      //   component: () => import('@/views/BusinessSet/MarketingCommissionRules.vue'),
      //   meta: { title: '营销提成规则设置' }
    }, {
      path: 'addCommission',
      name: '新建营销提成规则',
      component: () => import('@/views/BusinessSet/components/addCommission.vue'),
      meta: { title: '新建营销提成规则' }
    }, {
      path: 'lookCommission',
      name: '查看营销提成规则',
      component: () => import('@/views/BusinessSet/components/lookCommission.vue'),
      meta: { title: '查看营销提成规则' }
      // }, {
      //   path: 'WageMapping',
      //   name: '工资映射管理',
      //   component: () => import('@/views/BusinessSet/WageMapping.vue'),
      //   meta: { title: '工资映射管理' }
    }, {
      path: 'ImportWages',
      name: '导入工资映射',
      component: () => import('@/views/BusinessSet/components/ImportWages.vue'),
      meta: { title: '导入工资映射' }
    }, {
      path: 'ImportWagest',
      name: '导入工资映射',
      component: () => import('@/views/BusinessSet/components/ImportWagest.vue'),
      meta: { title: '导入工资映射' }
    }, {
      path: 'lookWages',
      name: '查看工资映射',
      component: () => import('@/views/BusinessSet/components/lookWages.vue'),
      meta: { title: '查看工资映射' }
      // }, {
      //   path: 'ContractTemplate',
      //   name: '合同模板管理',
      //   component: () => import('@/views/BusinessSet/ContractTemplate.vue'),
      //   meta: { title: '合同模板管理' }
    }, {
      path: 'TankNo',
      name: '柜号设置',
      component: () => import('@/views/BusinessSet/TankNo.vue'),
      meta: { title: '柜号设置' }
      // }, {
      //   path: 'CorporateInformation',
      //   name: '公司信息管理',
      //   component: () => import('@/views/BusinessSet/CorporateInformation.vue'),
      //   meta: { title: '公司信息管理' }
    }, {
      path: 'AddCompany',
      name: '新增公司',
      component: () => import('@/views/BusinessSet/components/AddCompany.vue'),
      meta: { title: '新增公司' }
    }, {
      path: 'AddProjectReviewSet',
      name: '添加项目审核流程设置',
      component: () => import('@/views/BusinessSet/components/AddProjectReviewSet.vue'),
      meta: { title: '添加项目审核流程设置' }
    }]
  },
  {
    path: '/FileManagement',
    name: '档案管理',
    component: Layout,
    children: [{
      path: 'FileDetails',
      name: '档案详情',
      component: () => import('@/views/FileManagement/components/FileDetails.vue')
    }],
  },
  {
    path: '/FileTemplateManagement',
    name: '文件模板管理',
    component: Layout,
    meta: { title: '文件模板管理' },
    children: [{
      path: 'TemplateDetails',
      name: '文件模板详情',
      component: () => import('@/views/FileTemplateManagement/components/TemplateDetails.vue'),
      meta: { title: '文件模板详情' }
    }]
  },
  {
    path: '/ContractManagement',
    name: '合同管理',
    component: Layout,
    meta: { title: '合同管理管理' },
    children: [{
      path: 'ContractDetails',
      name: '项目合同详情',
      component: () => import('@/views/ContractManagement/components/ContractDetails.vue'),
      meta: { title: '项目合同详情' }
    }, {
      path: 'UploadFileContract',
      name: '上传项目合同',
      component: () => import('@/views/ContractManagement/UploadFileContract.vue'),
      meta: { title: '上传项目合同' }
    }, {
      path: 'SubmitPreliminaryExamination',
      name: '提交初审',
      component: () => import('@/views/ContractManagement/components/SubmitPreliminaryExamination.vue'),
      meta: { title: '提交初审' }
    }, {
      path: 'EmployeesContractDetails',
      name: '员工合同详情',
      component: () => import('@/views/ContractManagement/components/EmployeesContractDetails.vue'),
      meta: { title: '员工合同详情' }
    }]
  },
  {
    path: '/BiddingManagement',
    name: '招投标管理',
    component: Layout,
    meta: { title: '招投标管理' },
    children: [{
      path: 'ApplyPurchaseBiddingFile',
      name: '申请购买招标文件',
      component: () => import('@/views/BiddingManagement/components/ApplyPurchaseBiddingFile.vue'),
      meta: { title: '申请购买招标文件' }
    }, {
      path: 'AddBidInformationFeedback',
      name: '添加投标信息反馈',
      component: () => import('@/views/BiddingManagement/components/AddBidInformationFeedback.vue'),
      meta: { title: '添加投标信息反馈' }
    }]
  },
  // {
  //   path: '/SystemSetting',
  //   name: '系统设置',
  //   component: Layout,
  //   meta: { title: '系统设置', amount: '7' },
  //   children: [
  //     // {
  //     //   path: 'MenuManagement',
  //     //   name: '菜单管理',
  //     //   component: () => import('@/views/SystemSetting/MenuManagement.vue'),
  //     //   meta: { title: '菜单管理', amount: '7' }
  //     // }, {
  //     //   path: 'OperateManagement',
  //     //   name: '操作管理',
  //     //   component: () => import('@/views/SystemSetting/OperateManagement.vue'),
  //     //   meta: { title: '操作管理', amount: '7' }
  //     // }, {
  //     //   path: 'EnumerationFieldManagement',
  //     //   name: '枚举字段管理',
  //     //   component: () => import('@/views/SystemSetting/EnumerationFieldManagement.vue'),
  //     //   meta: { title: '枚举字段管理', amount: '7' }
  //     // }, {
  //     //   path: 'TeamManagement',
  //     //   name: '团队管理',
  //     //   component: () => import('@/views/SystemSetting/TeamManagement.vue'),
  //     //   meta: { title: '团队管理', icon: 'example', amount: '7' }
  //     // },

  //     //  {
  //     //   path: 'RoleManagement',
  //     //   name: '角色管理',
  //     //   component: () => import('@/views/SystemSetting/RoleManagement.vue'),
  //     //   meta: { title: '角色管理', icon: 'example', amount: '7' }
  //     // }, {
  //     //   path: 'AccountManagement',
  //     //   name: '账号管理',
  //     //   component: () => import('@/views/SystemSetting/AccountManagement.vue'),
  //     //   meta: { title: '账号管理', icon: 'example', amount: '7' }
  //     // }, {
  //     //   path: 'OperationlogManagement',
  //     //   name: '操作日志管理',
  //     //   component: () => import('@/views/SystemSetting/OperationlogManagement.vue'),
  //     //   meta: { title: '操作日志管理', icon: 'example', amount: '7' }
  //     // }, {
  //     //   path: 'LoginlogManagement',
  //     //   name: '登录日志管理',
  //     //   component: () => import('@/views/SystemSetting/LoginlogManagement.vue'),
  //     //   meta: { title: '登录日志管理', icon: 'example', amount: '7' }
  //     // }, {
  //     //   path: 'NailingMapping',
  //     //   name: '钉钉账号映射',
  //     //   component: () => import('@/views/SystemSetting/NailingMapping.vue'),
  //     //   meta: { title: '钉钉账号映射', icon: 'example', amount: '7' }
  //     // }, {
  //     //   path: 'VersionManagement',
  //     //   name: '版本管理',
  //     //   component: () => import('@/views/SystemSetting/VersionManagement.vue'),
  //     //   meta: { title: '版本管理', icon: 'example', amount: '7' }
  //     // },
  //     ]
  // }
]

export const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
