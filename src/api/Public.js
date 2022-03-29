import request from '@/utils/request'

// 获取公司规模枚举
export const CompanyEnumSize = (Datas) => {
  return request({
    url: '/Company/CompanyEnumSize',
    method: 'post',
    data: Datas
  })
}

// 获取公司级别枚举
export const BfCompanyLevelEnum = (Datas) => {
  return request({
    url: '/BusinessSetting/BfCompanyLevelEnum',
    method: 'post',
    data: Datas
  })
}

// 获取公司等级枚举
export const CompanyEnumLevel = (Datas) => {
  return request({
    url: '/Company/CompanyEnumLevel',
    method: 'post',
    data: Datas
  })
}

// 获取公司性质枚举
export const CompanyEnumNature = (Datas) => {
  return request({
    url: '/Company/CompanyEnumNature',
    method: 'post',
    data: Datas
  })
}

// 获取管理执行权枚举
export const CompanyEnumMgrRight = (Datas) => {
  return request({
    url: '/Company/CompanyEnumMgrRight',
    method: 'post',
    data: Datas
  })
}

// 获取地区数据
export const GetAreaList = (Datas) => {
  return request({
    url: '/Common/GetAreaList',
    method: 'post',
    data: Datas
  })
}

// 获取综合分类类别(枚举值)
export const GetCatagoryClassType = (Datas) => {
  return request({
    url: '/Common/GetCatagoryClassType',
    method: 'post',
    data: Datas
  })
}

// 获取综合分类列表
export const GetCatagoryList = (Datas) => {
  return request({
    url: '/Common/GetCatagoryList',
    method: 'post',
    data: Datas
  })
}

// 获取客户跟进阶段枚举
export const GetCompanyFollowEnumStep = (Datas) => {
  return request({
    url: '/Company/GetCompanyFollowEnumStep',
    method: 'post',
    data: Datas
  })
}

// 获取公司报备类型
export const CompanyBusinessRegEnumBusinessType = (Datas) => {
  return request({
    url: '/Company/CompanyBusinessRegEnumBusinessType',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工信息枚举
export const GetStaffEnum = (Datas) => {
  return request({
    url: '/Staff/GetStaffEnum',
    method: 'post',
    data: Datas
  })
}
//选择职位
export const GetProjectRecruitList = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruitList',
    method: 'post',
    data: Datas
  })
}
//GetRecruitPipelineEnumRecruitType 招聘类型
export const GetRecruitPipelineEnumRecruitType = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineEnumRecruitType',
    method: 'post',
    data: Datas
  })
}
//GetRecruitPipelineEnumRecruitProvisionType 招聘计提类型
export const GetRecruitPipelineEnumRecruitProvisionType = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineEnumRecruitProvisionType',
    method: 'post',
    data: Datas
  })
}
//AddRecruitPipeline  添加候选人Pipeline
export const AddRecruitPipeline = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitPipeline',
    method: 'post',
    data: Datas
  })
}
//GetRecruitChannelPageList 获取渠道信息分页列表
export const GetRecruitChannelPageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitChannelPageList',
    method: 'post',
    data: Datas
  })
}
//Staff/ImportToStaffExcel 导入外包员工信息
export const ImportToStaffExcel = (Datas) => {
  return request({
    url: '/Staff/ImportToStaffExcel',
    method: 'post',
    data: Datas
  })
}

//获取员工合同类型
export const GetStaffContractType = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractType',
    method: 'post',
    data: Datas
  })
}

//获取员工合同状态
export const GetStaffContractApprovalStatus = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractApprovalStatus',
    method: 'post',
    data: Datas
  })
}

//批量下载员工合同
export const BatchDownLoadStaffContractTemplate = (Datas) => {
  return request({
    url: '/Staff/BatchDownLoadStaffContractTemplate',
    method: 'post',
    data: Datas
  })
}

//变更员工合同状态
export const EditStaffContractApproveStatus = (Datas) => {
  return request({
    url: '/Staff/EditStaffContractApproveStatus',
    method: 'post',
    data: Datas
  })
}

//获取员工合同操作日志
export const GetStaffContractOperationLogPageList = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractOperationLogPageList',
    method: 'post',
    data: Datas
  })
}

//导出员工合同
export const ExportStaffContract = (Datas) => {
  return request({
    url: '/Staff/ExportStaffContract',
    method: 'post',
    data: Datas
  })
}

//获取员工合同详情
export const GetStaffContract = (Datas) => {
  return request({
    url: '/Staff/GetStaffContract',
    method: 'post',
    data: Datas
  })
}

//员工合同转交存档
export const EditStaffContractStatus = (Datas) => {
  return request({
    url: '/Staff/EditStaffContractStatus',
    method: 'post',
    data: Datas
  })
}

//员工合同线下签约
export const OfflineSigningStaffContract = (Datas) => {
  return request({
    url: '/Staff/OfflineSigningStaffContract',
    method: 'post',
    data: Datas
  })
}

//员工合同终止合同
export const TerminationStaffContract = (Datas) => {
  return request({
    url: '/Staff/TerminationStaffContract',
    method: 'post',
    data: Datas
  })
}

//删除员工合同
export const DeleteStaffContract = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffContract',
    method: 'post',
    data: Datas
  })
}

//通过短信发送消息
export const SendPhoneVerification = (Datas) => {
  return request({
    url: '/System/SendPhoneVerification',
    method: 'post',
    data: Datas
  })
}