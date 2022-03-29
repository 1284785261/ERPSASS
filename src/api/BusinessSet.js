import request from '@/utils/request'

// 获取公司列表分页列表
export const GetBfCompanyPageList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetBfCompanyPageList',
    method: 'post',
    data: Datas
  })
}

// 获取公司信息
export const GetBfCompanyInfo = (Datas) => {
  return request({
    url: '/BusinessSetting/GetBfCompanyInfo',
    method: 'post',
    data: Datas
  })
}

// 添加公司信息
export const AddBfCompany = (Datas) => {
  return request({
    url: '/BusinessSetting/AddBfCompany',
    method: 'post',
    data: Datas
  })
}

// 修改公司信息
export const EditBfCompanyInfo = (Datas) => {
  return request({
    url: '/BusinessSetting/EditBfCompanyInfo',
    method: 'post',
    data: Datas
  })
}

// 删除公司信息
export const DeleteBfCompany = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteBfCompany',
    method: 'post',
    data: Datas
  })
}

// 修改公司信息状态
export const EditBfCompanyStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditBfCompanyStatus',
    method: 'post',
    data: Datas
  })
}

// 通过项目id获取工资表头映射详情
export const GetSalaryMapByProjectId = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalaryMapByProjectId',
    method: 'post',
    data: Datas
  })
}

// 获取合同模板业务类型
export const GetContractTemplateBusinessType = (Datas) => {
  return request({
    url: '/BusinessSetting/GetContractTemplateBusinessType',
    method: 'post',
    data: Datas
  })
}

// 查询合同模板列表
export const GetContractTemplateList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetContractTemplateList',
    method: 'post',
    data: Datas
  })
}

// 添加合同模板
export const AddContractTemplate = (Datas) => {
  return request({
    url: '/BusinessSetting/AddContractTemplate',
    method: 'post',
    data: Datas
  })
}

// 编辑合同模板
export const EditContractTemplate = (Datas) => {
  return request({
    url: '/BusinessSetting/EditContractTemplate',
    method: 'post',
    data: Datas
  })
}

//修改合同模板状态
export const EditContractTemplateStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditContractTemplateStatus',
    method: 'post',
    data: Datas
  })
}

//查看合同模板详情
export const GetContractTemplate = (Datas) => {
  return request({
    url: '/BusinessSetting/GetContractTemplate',
    method: 'post',
    data: Datas
  })
}

//删除合同模板
export const DeleteContractTemplate = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteContractTemplate',
    method: 'post',
    data: Datas
  })
}

//获取工资计算规则列表
export const GetSalayRuleList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalayRuleList',
    method: 'post',
    data: Datas
  })
}

//获取工资计算规则详情
export const GetSalayRule = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalayRule',
    method: 'post',
    data: Datas
  })
}

//删除工资计算规则
export const DeleteSalayRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteSalayRule',
    method: 'post',
    data: Datas
  })
}

//修改工资计算规则状态
export const EditSalayRuleStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSalayRuleStatus',
    method: 'post',
    data: Datas
  })
}

//修改工资计算规则
export const EditSalayRule = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSalayRule',
    method: 'post',
    data: Datas
  })
}

//添加工资计算规则
export const AddSalayRule = (Datas) => {
  return request({
    url: '/BusinessSetting/AddSalayRule',
    method: 'post',
    data: Datas
  })
}

//获取个税规则分页列表
export const GetPersonalTaxRulePageList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetPersonalTaxRulePageList',
    method: 'post',
    data: Datas
  })
}

//获取个税计算规则列表
export const GetPersonalTaxRuleList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetPersonalTaxRuleList',
    method: 'post',
    data: Datas
  })
}

//获取个税计算规则详情
export const GetPersonalTaxRuleInfo = (Datas) => {
  return request({
    url: '/BusinessSetting/GetPersonalTaxRuleInfo',
    method: 'post',
    data: Datas
  })
}

//修改个税计算规则
export const EditPersonalTaxRule = (Datas) => {
  return request({
    url: '/BusinessSetting/EditPersonalTaxRule',
    method: 'post',
    data: Datas
  })
}

//删除个税计算规则
export const DelPersonalTaxRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DelPersonalTaxRule',
    method: 'post',
    data: Datas
  })
}

//删除详情个税计算规则
export const DelPersonalTaxLevelRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DelPersonalTaxLevelRule',
    method: 'post',
    data: Datas
  })
}

//添加个税计算规则
export const AddPersonalTaxRule = (Datas) => {
  return request({
    url: '/BusinessSetting/AddPersonalTaxRule',
    method: 'post',
    data: Datas
  })
}

//修改个税计算规则状态
export const EditPersonalTaxRuleStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditPersonalTaxRuleStatus',
    method: 'post',
    data: Datas
  })
}

//获取社保计算规则列表
export const GetSIRuleList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSIRuleList',
    method: 'post',
    data: Datas
  })
}

//获取社保计算规则详情
export const GetSIRule = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSIRule',
    method: 'post',
    data: Datas
  })
}

//编辑社保计算规则状态
export const EditSIRuleStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSIRuleStatus',
    method: 'post',
    data: Datas
  })
}

//编辑社保计算规则
export const EditSIRule = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSIRule',
    method: 'post',
    data: Datas
  })
}

//添加社保计算规则
export const AddSIRule = (Datas) => {
  return request({
    url: '/BusinessSetting/AddSIRule',
    method: 'post',
    data: Datas
  })
}

//删除社保计算规则
export const DeleteSIRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteSIRule',
    method: 'post',
    data: Datas
  })
}

//获取公积金计算规则列表
export const GetFundRuleList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetFundRuleList',
    method: 'post',
    data: Datas
  })
}

//获取公积金计算规则详情
export const GetFundRule = (Datas) => {
  return request({
    url: '/BusinessSetting/GetFundRule',
    method: 'post',
    data: Datas
  })
}

//修改公积金计算规则状态
export const EditFundRuleStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditFundRuleStatus',
    method: 'post',
    data: Datas
  })
}

//修改公积金计算规则
export const EditFundRule = (Datas) => {
  return request({
    url: '/BusinessSetting/EditFundRule',
    method: 'post',
    data: Datas
  })
}

//添加公积金计算规则
export const AddFundRule = (Datas) => {
  return request({
    url: '/BusinessSetting/AddFundRule',
    method: 'post',
    data: Datas
  })
}

//删除公积金计算规则
export const DeleteFundRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteFundRule',
    method: 'post',
    data: Datas
  })
}

//获取营销提成规则列表
export const GetCommisionRulePageList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetCommisionRulePageList',
    method: 'post',
    data: Datas
  })
}

//获取营销提成规则详情
export const GetCommisionRuleInfo = (Datas) => {
  return request({
    url: '/BusinessSetting/GetCommisionRuleInfo',
    method: 'post',
    data: Datas
  })
}

//修改营销提成规则状态
export const EditCommisionRuleStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditCommisionRuleStatus',
    method: 'post',
    data: Datas
  })
}

//修改营销提成规则
export const EditCommisionRule = (Datas) => {
  return request({
    url: '/BusinessSetting/EditCommisionRule',
    method: 'post',
    data: Datas
  })
}

//删除营销提成规则
export const DelCommisionRule = (Datas) => {
  return request({
    url: '/BusinessSetting/DelCommisionRule',
    method: 'post',
    data: Datas
  })
}

//添加营销提成规则
export const AddCommisionRule = (Datas) => {
  return request({
    url: '/BusinessSetting/AddCommisionRule',
    method: 'post',
    data: Datas
  })
}

//获取营销规则所有枚举
export const GetCommisionRuleAllEnum = (Datas) => {
  return request({
    url: '/BusinessSetting/GetCommisionRuleAllEnum',
    method: 'post',
    data: Datas
  })
}

//解析工资表头数据
export const GetSalaryTableHead = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalaryTableHead',
    method: 'post',
    data: Datas
  })
}

//获取工资映射表列表
export const GetSalaryMapList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalaryMapList',
    method: 'post',
    data: Datas
  })
}

//获取工资映射表详情
export const GetSalaryMap = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalaryMap',
    method: 'post',
    data: Datas
  })
}

//编辑工资表映射状态
export const EditSalaryMapStatus = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSalaryMapStatus',
    method: 'post',
    data: Datas
  })
}

//删除工资表映射
export const DeleteSalaryMap = (Datas) => {
  return request({
    url: '/BusinessSetting/DeleteSalaryMap',
    method: 'post',
    data: Datas
  })
}

//编辑工资表映射
export const EditSalaryMap = (Datas) => {
  return request({
    url: '/BusinessSetting/EditSalaryMap',
    method: 'post',
    data: Datas
  })
}
//添加工资表映射
export const AddSalaryMap = (Datas) => {
  return request({
    url: '/BusinessSetting/AddSalaryMap',
    method: 'post',
    data: Datas
  })
}

//获取工资付款银行
export const GetSalaryBankList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetSalaryBankList',
    method: 'post',
    data: Datas
  })
}

//检查薪酬映射关系是否变更
export const CheckMapChange = (Datas) => {
  return request({
    url: '/BusinessSetting/CheckMapChange',
    method: 'post',
    data: Datas
  })
}

//获取提成操作日志分页列表
export const GetCommisionRuleLogPageList = (Datas) => {
  return request({
    url: '/BusinessSetting/GetCommisionRuleLogPageList',
    method: 'post',
    data: Datas
  })
}