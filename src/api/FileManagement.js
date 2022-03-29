import request from '@/utils/request'

// 获取档案柜信息操作记录分页列表
export const GetArchivesCabinetPageList = (Datas) => {
  return request({
    url: '/Archives/GetArchivesCabinetPageList',
    method: 'post',
    data: Datas
  })
}
///api/Common/GetCatagoryClassType 获取综合分类类别
export const GetCatagoryClassType = (Datas) => {
  return request({
    url: '/Common/GetCatagoryClassType',
    method: 'post',
    data: Datas
  })
}
//获取综合分类列表
export const GetCatagoryList = (Datas) => {
  return request({
    url: '/Common/GetCatagoryList',
    method: 'post',
    data: Datas
  })
}
//修改档案柜信息
export const EditArchivesCabinet = (Datas) => {
  return request({
    url: '/Archives/EditArchivesCabinet',
    method: 'post',
    data: Datas
  })
}
// 添加档案柜
export const AddArchivesCabinet = (Datas) => {
  return request({
    url: '/Archives/AddArchivesCabinet',
    method: 'post',
    data: Datas
  })
}
// 删除档案柜信息
export const DeleteArchivesCabinet = (Datas) => {
  return request({
    url: '/Archives/DeleteArchivesCabinet',
    method: 'post',
    data: Datas
  })
}
//  获取档案柜信息操作记录分页列表
export const GetArchivesCabinetLogPageList = (Datas) => {
  return request({
    url: '/Archives/GetArchivesCabinetLogPageList',
    method: 'post',
    data: Datas
  })
}
// 获取文书档案分页列表
export const GetDocumentArchivesPageList = (Datas) => {
  return request({
    url: '/Archives/GetDocumentArchivesPageList',
    method: 'post',
    data: Datas
  })
}
// 文书档案信息-文件类型
export const GetArchivesEnumDocumentType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumDocumentType',
    method: 'post',
    data: Datas
  })
}
// 添加文书档案
export const AddDocumentArchives = (Datas) => {
  return request({
    url: '/Archives/AddDocumentArchives',
    method: 'post',
    data: Datas
  })
}
//  下载文书档案
export const DownloadDocumentArchives = (Datas) => {
  return request({
    url: '/Archives/DownloadDocumentArchives',
    method: 'post',
    data: Datas
  })
}
// 删除文书档案
export const DeleteDocumentArchives = (Datas) => {
  return request({
    url: '/Archives/DeleteDocumentArchives',
    method: 'post',
    data: Datas
  })
}
// 导出文书档案
export const ExportDocumentArchives = (Datas) => {
  return request({
    url: '/Archives/ExportDocumentArchives',
    method: 'post',
    data: Datas
  })
}
//  获取档案操作日志分页列表
export const GetArchivesOperationLogPageList = (Datas) => {
  return request({
    url: '/Archives/GetArchivesOperationLogPageList',
    method: 'post',
    data: Datas
  })
}
// 档案操作-操作类型
export const GetArchivesEnumOperationType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumOperationType',
    method: 'post',
    data: Datas
  })
}
//  修改合同档案管理状态(确认签收操作)
export const EditContractArchivesStatus = (Datas) => {
  return request({
    url: '/Archives/EditContractArchivesStatus',
    method: 'post',
    data: Datas
  })
}
// 获取档案柜信息列表
export const GetArchivesCabinetList = (Datas) => {
  return request({
    url: '/Archives/GetArchivesCabinetList',
    method: 'post',
    data: Datas
  })
}
//修改文书档案管理状态(确认签收操作)
export const EditDocumentArchivesStatus = (Datas) => {
  return request({
    url: '/Archives/EditDocumentArchivesStatus',
    method: 'post',
    data: Datas
  })
}
// 获取文书档案详情
export const GetDocumentArchivesInfo = (Datas) => {
  return request({
    url: '/Archives/GetDocumentArchivesInfo',
    method: 'post',
    data: Datas
  })
}
//  修改文书档案管理
export const EditDocumentArchives = (Datas) => {
  return request({
    url: '/Archives/EditDocumentArchives',
    method: 'post',
    data: Datas
  })
}
//   获取财务档案分页列表
export const GetFinanceArchivesPageList = (Datas) => {
  return request({
    url: '/Archives/GetFinanceArchivesPageList',
    method: 'post',
    data: Datas
  })
}
//   财务档案信息-文件类型
export const GetArchivesEnumFinanceType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumFinanceType',
    method: 'post',
    data: Datas
  })
}
// 添加财务档案
export const AddFinanceArchives = (Datas) => {
  return request({
    url: '/Archives/AddFinanceArchives',
    method: 'post',
    data: Datas
  })
}
// 删除财务档案
export const DeleteFinanceArchives = (Datas) => {
  return request({
    url: '/Archives/DeleteFinanceArchives',
    method: 'post',
    data: Datas
  })
}
//下载财务档案
export const DownloadFinanceArchives = (Datas) => {
  return request({
    url: '/Archives/DownloadFinanceArchives',
    method: 'post',
    data: Datas
  })
}
// 修改财务档案管理
export const EditFinanceArchives = (Datas) => {
  return request({
    url: '/Archives/EditFinanceArchives',
    method: 'post',
    data: Datas
  })
}
//   修改财务档案管理状态(确认签收操作)
export const EditFinanceArchivesStatus = (Datas) => {
  return request({
    url: '/Archives/EditFinanceArchivesStatus',
    method: 'post',
    data: Datas
  })
}
//  导出财务档案
export const ExportFinanceArchives = (Datas) => {
  return request({
    url: '/Archives/ExportFinanceArchives',
    method: 'post',
    data: Datas
  })
}
// 获取财务档案详情
export const GetFinanceArchivesInfo = (Datas) => {
  return request({
    url: '/Archives/GetFinanceArchivesInfo',
    method: 'post',
    data: Datas
  })
}
//  合同档案信息-文件类型
export const GetArchivesEnumContractType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumContractType',
    method: 'post',
    data: Datas
  })
}
// 合同档案信息-(文件类型=项目合同)业务类型
export const GetArchivesEnumProjectContractBusinessType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumProjectContractBusinessType',
    method: 'post',
    data: Datas
  })
}
// 合同档案信息-(文件类型=员工合同)业务类型
export const GetArchivesEnumStafffContractBusinessType = (Datas) => {
  return request({
    url: '/Archives/GetArchivesEnumStafffContractBusinessType',
    method: 'post',
    data: Datas
  })
}
// 获取合同档案分页列表
export const GetContractArchivesPageList = (Datas) => {
  return request({
    url: '/Archives/GetContractArchivesPageList',
    method: 'post',
    data: Datas
  })
}
// 导出合同档案
export const ExportContractArchives = (Datas) => {
  return request({
    url: '/Archives/ExportContractArchives',
    method: 'post',
    data: Datas
  })
}
// 删除合同档案
export const DeleteContractArchives = (Datas) => {
  return request({
    url: '/Archives/DeleteContractArchives',
    method: 'post',
    data: Datas
  })
}
// 下载合同档案
export const DownloadContractArchives = (Datas) => {
  return request({
    url: '/Archives/DownloadContractArchives',
    method: 'post',
    data: Datas
  })
}
// 获取合同档案详情
export const GetContractArchivesInfo = (Datas) => {
  return request({
    url: '/Archives/GetContractArchivesInfo',
    method: 'post',
    data: Datas
  })
}

// 添加合同档案
export const AddContractArchives = (Datas) => {
  return request({
    url: '/Archives/AddContractArchives',
    method: 'post',
    data: Datas
  })
}

// 查询合同签收时间
export const GetContractArchivesSignedInfo = (Datas) => {
  return request({
    url: '/Archives/GetContractArchivesSignedInfo',
    method: 'post',
    data: Datas
  })
}

// 导出合同档案管理项目和外包员工台账
export const ExportContractArchivesProjectAdnStafffStandingBook = (Datas) => {
  return request({
    url: '/Archives/ExportContractArchivesProjectAdnStafffStandingBook',
    method: 'post',
    data: Datas
  })
}