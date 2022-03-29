import request from '@/utils/request'

// 获取营销业绩统计详情
export const GetMarketingStatisticsInfo = (Datas) => {
  return request({
    url: '/Marketing/GetMarketingStatisticsInfo',
    method: 'post',
    data: Datas
  })
}

//获取营销提成统计列表
export const GetCommissionPageList = (Datas) => {
  return request({
    url: '/Marketing/GetCommissionPageList',
    method: 'post',
    data: Datas
  })
}

//获取营销提成统计详情
export const GetCommissionInfo = (Datas) => {
  return request({
    url: '/Marketing/GetCommissionInfo',
    method: 'post',
    data: Datas
  })
}

//生成提成统计数据
export const AddCommission = (Datas) => {
  return request({
    url: '/Marketing/AddCommission',
    method: 'post',
    data: Datas
  })
}

//修改提成统计数据
export const EditCommission = (Datas) => {
  return request({
    url: '/Marketing/EditCommission',
    method: 'post',
    data: Datas
  })
}

//删除提成统计数据
export const DeleteCommission = (Datas) => {
  return request({
    url: '/Marketing/DeleteCommission',
    method: 'post',
    data: Datas
  })
}

//获取提成明细列表
export const GetCommissionDetailList = (Datas) => {
  return request({
    url: '/Marketing/GetCommissionDetailList',
    method: 'post',
    data: Datas
  })
}

//修改提成明细
export const EditCommissionDetail = (Datas) => {
  return request({
    url: '/Marketing/EditCommissionDetail',
    method: 'post',
    data: Datas
  })
}

//导出提成明细
export const ExportCommissionDetail = (Datas) => {
  return request({
    url: '/Marketing/ExportCommissionDetail',
    method: 'post',
    data: Datas
  })
}

//添加风险金比例规则
export const AddRiskFundProportionRule = (Datas) => {
  return request({
    url: '/Marketing/AddRiskFundProportionRule',
    method: 'post',
    data: Datas
  })
}

//删除风险金比例规则
export const DeleteRiskFundProportionRule = (Datas) => {
  return request({
    url: '/Marketing/DeleteRiskFundProportionRule',
    method: 'post',
    data: Datas
  })
}

//修改风险金比例规则
export const EditRiskFundProportionRule = (Datas) => {
  return request({
    url: '/Marketing/EditRiskFundProportionRule',
    method: 'post',
    data: Datas
  })
}
//修改风险金比例规则状态
export const EditRiskFundProportionRuleStatus = (Datas) => {
  return request({
    url: '/Marketing/EditRiskFundProportionRuleStatus',
    method: 'post',
    data: Datas
  })
}
//获取风险金比例规则详情
export const GetRiskFundProportionRuleInfo = (Datas) => {
  return request({
    url: '/Marketing/GetRiskFundProportionRuleInfo',
    method: 'post',
    data: Datas
  })
}
//获取风险金比例规则分页列表
export const GetRiskFundProportionRulePageList = (Datas) => {
  return request({
    url: '/Marketing/GetRiskFundProportionRulePageList',
    method: 'post',
    data: Datas
  })
}