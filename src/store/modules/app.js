import { getmenu } from '@/router/addrouter.js'
const state = {
  leftRouter: [],
  baseURL: process.env.VUE_APP_BASE_API_SET,
  EnumerationType: [],
  setrouter: [],
}
const mutations = {
  // 左侧导航栏
  CHOOSE_ROUTER: (state, value) => {
    console.log('菜单触发了');
    let routers = JSON.parse(window.localStorage.getItem('setRouter')) || []
    if (value.amount != '7') {
      state.leftRouter = [
        {
          path: '/',
          redirect: '/dashboard',
          name: '工作台',
          meta: { title: '工作台', icon: 'Workbench', showLeft: true },
          children: [{
            path: 'dashboard',
            name: '工作台',
            meta: { title: '工作台', icon: 'Workbench' }
          }, {
            path: 'ImportData',
            name: '数据导入',
            meta: { title: '数据导入', icon: 'Workbench' }
          }]
        }
      ].concat(getmenu(routers).menulist)
      // console.log(getmenu(routers).menulist)
      // state.leftRouter = [
      //   {
      //     path: '/',
      //     redirect: '/dashboard',
      //     name: '工作台',
      //     meta: { showLeft: true },
      //     children: [{
      //       path: 'dashboard',
      //       name: '工作台',
      //       meta: { title: '工作台', icon: 'dashboard' }
      //     }]
      //   },
      //   {
      //     path: '/CustomerManagement',
      //     name: '客户管理',
      //     meta: { title: '客户管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'MyCustomer',
      //       name: '我的客户',
      //       meta: { title: '我的客户', icon: 'dashboard' }
      //     }, {
      //       path: 'SharedCustomer',
      //       name: '共享客户',
      //       meta: { title: '共享客户', icon: 'dashboard' }
      //     }, {
      //       path: 'PublicCustomer',
      //       name: '公共客户',
      //       meta: { title: '公共客户', icon: 'dashboard' }
      //     }, {
      //       //   path: 'SharingRelationship',
      //       //   name: '共享关系处理',
      //       //   meta: { title: '共享关系处理', icon: 'dashboard' }
      //       // }, {
      //       path: 'MyJurisdiction',
      //       name: '我管辖的客户',
      //       meta: { title: '我管辖的客户', icon: 'dashboard' }
      //     }]
      //   },
      //   {
      //     path: '/projectManagement',
      //     name: '项目管理',
      //     meta: { title: '项目管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'ProjectManagement',
      //       name: '项目管理',
      //       meta: { title: '项目管理', icon: 'dashboard' }
      //     }, {
      //       path: 'MyProject',
      //       name: '我管理的项目',
      //       meta: { title: '我管理的项目', icon: 'dashboard' }
      //     }, {
      //       path: 'ParticipateProject',
      //       name: '我参与的项目',
      //       meta: { title: '我参与的项目', icon: 'dashboard' }
      //     }, {
      //       path: 'MyJurisdictionProject',
      //       name: '我管辖的项目',
      //       meta: { title: '我管辖的项目', icon: 'dashboard' }
      //     }, {
      //       path: 'ProjectAudit',
      //       name: '项目人员指派',
      //       meta: { title: '项目人员指派', icon: 'dashboard' }
      //     }]
      //   },
      //   {
      //     path: '/OutsourcedEmployeeManagement',
      //     name: '外包员工管理',
      //     meta: { title: '外包员工管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'ExpatriateManagement',
      //       name: '外派员工管理',
      //       meta: { title: '外派员工管理', icon: 'dashboard' }
      //     }, {
      //       path: 'BlacklistManagement',
      //       name: '外派员工黑名单',
      //       meta: { title: '外派员工黑名单', icon: 'dashboard' }
      //     }, {
      //       path: 'HistoryResearchers',
      //       name: '离职人员管理',
      //       meta: { title: '离职人员管理', icon: 'dashboard' }
      //     }, {
      //       path: 'CertificateIssuanceManagement',
      //       name: '证明开具管理',
      //       meta: { title: '证明开具管理', icon: 'dashboard' }
      //     }, {
      //       path: 'EmployeeContractManagement',
      //       name: '员工合同管理',
      //       meta: { title: '员工合同管理', icon: 'dashboard' }
      //     }, {
      //       path: 'SubmitExpenseManagement',
      //       name: '报销管理',
      //       meta: { title: '报销管理', icon: 'dashboard' }
      //     }]
      //   },
      //   {
      //     path: '/CompensationServiceManagement',
      //     name: '薪酬服务管理',
      //     meta: { title: '薪酬服务管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'CompensationManagement',
      //       name: '薪酬管理',
      //       meta: { title: '薪酬管理', icon: 'form' }
      //     }, {
      //       path: 'PayContrast',
      //       name: '薪酬对比明细',
      //       meta: { title: '薪酬对比明细', icon: 'form' }
      //     }, {
      //       path: 'PayBalanceManagement',
      //       name: '缴纳差额管理',
      //       meta: { title: '缴纳差额管理', icon: 'form' }
      //     }, {
      //       path: 'AccumulationOfficer',
      //       name: '公积金增减员',
      //       meta: { title: '公积金增减员', icon: 'form' }
      //     }, {
      //       path: 'SocialSecurityOfficer',
      //       name: '社保增减员管理',
      //       meta: { title: '社保增减员管理', icon: 'form' }
      //     }, {
      //       path: 'FinalStatement',
      //       name: '结算单',
      //       meta: { title: '结算单', icon: 'form' }
      //     }, {
      //       path: 'PaymentRequestManagement',
      //       name: '付款申请单管理',
      //       meta: { title: '付款申请单管理', icon: 'form' }
      //     }, {
      //       path: 'SocialSecurityManagement',
      //       name: '实缴社保管理',
      //       meta: { title: '实缴社保管理', icon: 'form' }
      //     }, {
      //       path: 'ProvidentFundManagement',
      //       name: '实缴公积金管理',
      //       meta: { title: '实缴公积金管理', icon: 'form' }
      //     }, {
      //       path: 'SixToDeductManagement',
      //       name: '六项扣除管理',
      //       meta: { title: '六项扣除管理', icon: 'form' }
      //     }, {
      //       path: 'ThisCardManagement',
      //       name: '挂账管理',
      //       meta: { title: '挂账管理', icon: 'form' }
      //     }, {
      //       path: 'SocialSecurityAccount',
      //       name: '社保账户管理',
      //       meta: { title: '社保账户管理', icon: 'form' }
      //     }, {
      //       path: 'ProvidentfundAccount',
      //       name: '公积金账户管理',
      //       meta: { title: '公积金账户管理', icon: 'form' }

      //       //   path: 'HistoryResearchers',
      //       //   name: '历史人员记录',
      //       //   meta: { title: '历史人员记录', icon: 'form' }
      //     }]
      //   },
      //   {
      //     path: '/MarketingDataManagement',
      //     name: '营销数据管理',
      //     meta: { title: '营销数据管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'MarketingPerformance',
      //       name: '营销业绩统计',
      //       meta: { title: '营销业绩统计', icon: 'form' }
      //     }, {
      //       path: 'MarketingCommission',
      //       name: '营销提成统计',
      //       meta: { title: '营销提成统计', icon: 'form' }
      //     }]
      //   },
      //   {
      //     path: '/FinancialManagement',
      //     name: '财务管理',
      //     meta: { title: '财务管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'BalancePayments',
      //       name: '收款管理',
      //       meta: { title: '收款管理', icon: 'form' }
      //     }, {
      //       path: 'PaymentApplicationManagement',
      //       name: '付款申请管理',
      //       meta: { title: '付款申请管理', icon: 'form' }
      //     }, {
      //       path: 'InvoiceManagement',
      //       name: '发票申请受理',
      //       meta: { title: '发票申请受理', icon: 'form' }
      //     }, {
      //       path: 'AccountInformation',
      //       name: '企业银行账户管理',
      //       meta: { title: '企业银行账户管理', icon: 'form' }
      //     }]
      //   },
      //   {
      //     path: '/RecruitmentManagement',
      //     name: '招聘管理',
      //     meta: { title: '招聘管理', icon: 'example', showLeft: false },
      //     children: [{
      //       path: 'RecruitmentRequirements',
      //       name: '招聘需求管理',
      //       meta: { title: '招聘需求管理', icon: 'form' }
      //     }, {
      //       path: 'InformationManagement',
      //       name: '人才信息管理',
      //       meta: { title: '人才信息管理', icon: 'form' }
      //     }, {
      //       path: 'RecruitmentDetailsManagement',
      //       name: '招聘入职明细管理',
      //       meta: { title: '招聘入职明细管理', icon: 'form' }
      //     }]
      //   },
      //   {
      //     path: '/BusinessSet',
      //     name: '业务设置',
      //     meta: { title: '业务设置', icon: 'example', showLeft: false },
      //     children: [
      //       {
      //         path: 'SalaryCalculation',
      //         name: '工资计算规则设置',
      //         meta: { title: '工资计算规则设置', icon: 'form' }
      //       },
      //       {
      //         path: 'CalculationSecurity',
      //         name: '社保计算规则设置',
      //         meta: { title: '社保计算规则设置', icon: 'form' }
      //       },
      //       {
      //         path: 'AccumulationFund',
      //         name: '公积金计算规则设置',
      //         meta: { title: '公积金计算规则设置', icon: 'form' }
      //       },
      //       {
      //         path: 'CompensationCalculationRules',
      //         name: '个税计算规则设置',
      //         meta: { title: '个税计算规则设置', icon: 'form' }
      //       }, {
      //         path: 'MarketingCommissionRules',
      //         name: '营销提成规则设置',
      //         meta: { title: '营销提成规则设置', icon: 'form' }
      //       }, {
      //         path: 'WageMapping',
      //         name: '工资映射表管理',
      //         meta: { title: '工资映射表管理', icon: 'form' }
      //       }, {
      //         path: 'ContractTemplate',
      //         name: '合同模板管理',
      //         meta: { title: '合同模板管理', icon: 'form' }
      //       // }, {
      //       //   path: 'ProjectReviewSetting',
      //       //   name: '项目审核流程设置',
      //       //   meta: { title: '项目审核流程设置', icon: 'form' }
      //       // }, {
      //       //   path: 'FinanceReviewSetting',
      //       //   name: '财务审核流程设置',
      //       //   meta: { title: '财务审核流程设置', icon: 'form' }
      //       }, {
      //         path: 'CorporateInformation',
      //         name: '公司信息管理',
      //         meta: { title: '公司信息管理', icon: 'form' }
      //       }]
      //   }]
    } else {
      state.leftRouter = getmenu(routers).sysmenulist
      // state.leftRouter = [{
      //   path: '/SystemSetting/MenuManagement',
      //   name: '菜单管理',
      //   meta: { title: '菜单管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/OperateManagement',
      //   name: '操作管理',
      //   meta: { title: '操作管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/EnumerationFieldManagement',
      //   name: '枚举字段管理',
      //   meta: { title: '枚举字段管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/TeamManagement',
      //   name: '团队管理',
      //   meta: { title: '团队管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/RoleManagement',
      //   name: '角色管理',
      //   meta: { title: '角色管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/AccountManagement',
      //   name: '账号管理',
      //   meta: { title: '账号管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/OperationlogManagement',
      //   name: '操作日志管理',
      //   meta: { title: '操作日志管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/LoginlogManagement',
      //   name: '登录日志管理',
      //   meta: { title: '登录日志管理', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/NailingMapping',
      //   name: '钉钉账号映射',
      //   meta: { title: '钉钉账号映射', icon: 'form' }
      // }, {
      //   path: '/SystemSetting/VersionManagement',
      //   name: '版本管理',
      //   meta: { title: '版本管理', icon: 'form' }
      // }]
    }
  },
  // 枚举分类
  GET_ENUMERATION_TYPE: (state, value) => {
    state.EnumerationType = value
  },
  // 动态路由
  SET_ROUTER: (state, value) => {
    state.setrouter = value
  }
}

const actions = {
  chooseRouter ({ commit }, data) {
    commit('CHOOSE_ROUTER', data)
  },
  // 获取枚举分类
  getEnumerationType ({ commit }, data) {
    commit('GET_ENUMERATION_TYPE', data)
  },
  // 存储权限范围内的路由
  setRouter ({ commit }, data) {
    commit('SET_ROUTER', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
