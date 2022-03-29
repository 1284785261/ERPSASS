import request from '@/utils/request'

// 批量添加客户联系人
export const BatchAddCompanyContact = (Datas) => {
  return request({
    url: '/Company/BatchAddCompanyContact',
    method: 'post',
    data: Datas
  })
}

// 批量添加客户沟通记录
export const BatchAddCompanyFollow = (Datas) => {
  return request({
    url: '/Company/BatchAddCompanyFollow',
    method: 'post',
    data: Datas
  })
}

// 自动更新公共客户
export const AutoUpdatePublicCompany = () => {
  return request({
    url: '/Company/AutoUpdatePublicCompany',
    method: 'get'
  })
}

// 获取客户导入模板
export const GetImportToCompanyExcelModel = (Datas) => {
  return request({
    url: '/Company/GetImportToCompanyExcelModel',
    method: 'post',
    data: Datas
  })
}

// 导入客户数据
export const ImportToCompanyExcel = (Datas) => {
  return request({
    url: '/Company/ImportToCompanyExcel',
    method: 'post',
    data: Datas
  })
}

// 获取公司合作类型枚举
export const CompanyEnumCorpType = (Datas) => {
  return request({
    url: '/Company/CompanyEnumCorpType',
    method: 'post',
    data: Datas
  })
}

// 获取客户列表分页列表
export const GetCompanyPageList = (Datas) => {
  return request({
    url: '/Company/GetCompanyPageList',
    method: 'post',
    data: Datas
  })
}

// 获取客户信息
export const GetCompanyInfo = (Datas) => {
  return request({
    url: '/Company/GetCompanyInfo',
    method: 'post',
    data: Datas
  })
}

// 获取客户联系人详细信息
export const GetCompanyContactInfo = (Datas) => {
  return request({
    url: '/Company/GetCompanyContactInfo',
    method: 'post',
    data: Datas
  })
}

// 获取客户联系人列表数据
export const GetCompanyContactList = (Datas) => {
  return request({
    url: '/Company/GetCompanyContactList',
    method: 'post',
    data: Datas
  })
}

// 添加客户联系人
export const AddCompanyContact = (Datas) => {
  return request({
    url: '/Company/AddCompanyContact',
    method: 'post',
    data: Datas
  })
}

// 修改客户联系人
export const EditCompanyContact = (Datas) => {
  return request({
    url: '/Company/EditCompanyContact',
    method: 'post',
    data: Datas
  })
}

// 删除客户联系人
export const DeleteCompanyContact = (Datas) => {
  return request({
    url: '/Company/DeleteCompanyContact',
    method: 'post',
    data: Datas
  })
}

// 获取客户沟通记录列表数据
export const GetCompanyFollowList = (Datas) => {
  return request({
    url: '/Company/GetCompanyFollowList',
    method: 'post',
    data: Datas
  })
}

// 添加客户信息
export const AddCompany = (Datas) => {
  return request({
    url: '/Company/AddCompany',
    method: 'post',
    data: Datas
  })
}

// 修改客户信息
export const EditCompanyInfo = (Datas) => {
  return request({
    url: '/Company/EditCompanyInfo',
    method: 'post',
    data: Datas
  })
}

// 修改客户状态
export const EditCompanyStatus = (Datas) => {
  return request({
    url: '/Company/EditCompanyStatus',
    method: 'post',
    data: Datas
  })
}

// 添加客户沟通记录
export const AddCompanyFollow = (Datas) => {
  return request({
    url: '/Company/AddCompanyFollow',
    method: 'post',
    data: Datas
  })
}

// 修改客户沟通记录
export const EditCompanyFollow = (Datas) => {
  return request({
    url: '/Company/EditCompanyFollow',
    method: 'post',
    data: Datas
  })
}

// 删除客户沟通记录
export const DeleteCompanyFollow = (Datas) => {
  return request({
    url: '/Company/DeleteCompanyFollow',
    method: 'post',
    data: Datas
  })
}

// 添加客户共享人
export const AddCustomersShared = (Datas) => {
  return request({
    url: '/Company/AddCustomersShared',
    method: 'post',
    data: Datas
  })
}

// 修改客户类型
export const EditCompanyType = (Datas) => {
  return request({
    url: '/Company/EditCompanyType',
    method: 'post',
    data: Datas
  })
}

// 获取关联关系
export const GetCompanyRelationEnumRelationType = (Datas) => {
  return request({
    url: '/Company/GetCompanyRelationEnumRelationType',
    method: 'post',
    data: Datas
  })
}

// 获取客户关系列表
export const GetCompanyRelationList = (Datas) => {
  return request({
    url: '/Company/GetCompanyRelationList',
    method: 'post',
    data: Datas
  })
}

// 删除客户关系
export const DelCompanyRelation = (Datas) => {
  return request({
    url: '/Company/DelCompanyRelation',
    method: 'post',
    data: Datas
  })
}

// 添加和修改客户关系
export const AddCompanyRelation = (Datas) => {
  return request({
    url: '/Company/AddCompanyRelation',
    method: 'post',
    data: Datas
  })
}

// 获取客户变更记录分页列表
export const GetCompanyChangePageList = (Datas) => {
  return request({
    url: '/Company/GetCompanyChangePageList',
    method: 'post',
    data: Datas
  })
}

// 修改客户负责人
export const EditCompanySysUserId = (Datas) => {
  return request({
    url: '/Company/EditCompanySysUserId',
    method: 'post',
    data: Datas
  })
}

// 获取客户共享人列表数据
export const GetCompanyShareList = (Datas) => {
  return request({
    url: '/Company/GetCompanyShareList',
    method: 'post',
    data: Datas
  })
}

// 删除指定共享人
export const DelCompanyShareById = (Datas) => {
  return request({
    url: '/Company/DelCompanyShareById',
    method: 'post',
    data: Datas
  })
}

// 共享给我的退出
export const DelCompanyShareInitiative = (Datas) => {
  return request({
    url: '/Company/DelCompanyShareInitiative',
    method: 'post',
    data: Datas
  })
}

//获取待录入nccode客户分页列表列表
export const GetNoNCCodeCompanyPageList = (Datas) => {
  return request({
    url: '/Company/GetNoNCCodeCompanyPageList',
    method: 'post',
    data: Datas
  })
}

//编辑NCcode码
export const EditCompanyNCCode = (Datas) => {
  return request({
    url: '/Company/EditCompanyNCCode',
    method: 'post',
    data: Datas
  })
}
// 获取代垫剩余金额项目查询
export const GetSubstituteCushionResidualByProjectId = (Datas) => {
  return request({
    url: '/Salary/GetSubstituteCushionResidualByProjectId',
    method: 'post',
    data: Datas
  })
}