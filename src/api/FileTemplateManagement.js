import request from '@/utils/request'

// 获取合同模板的枚举
export const GetContractTemplateEnum = (Datas) => {
  return request({
    url: '/Template/GetContractTemplateEnum',
    method: 'post',
    data: Datas
  })
}

//获取合同模板列表
export const GetContractTemplatePageList = (Datas) => {
  return request({
    url: '/Template/GetContractTemplatePageList',
    method: 'post',
    data: Datas
  })
}

//添加合同模板
export const AddContractTemplate1 = (Datas) => {
  return request({
    url: '/Template/AddContractTemplate1',
    method: 'post',
    data: Datas
  })
}

//删除合同模板
export const DelContractTemplate1 = (Datas) => {
  return request({
    url: '/Template/DelContractTemplate1',
    method: 'post',
    data: Datas
  })
}

//修改合同模板
export const EditContractTemplate = (Datas) => {
  return request({
    url: '/Template/EditContractTemplate',
    method: 'post',
    data: Datas
  })
}

//获取模板日志
export const GetFileTemplateLogPageList = (Datas) => {
  return request({
    url: '/Template/GetFileTemplateLogPageList',
    method: 'post',
    data: Datas
  })
}

//批量下载合同模板
export const BatchDownLoadContractTemplate = (Datas) => {
  return request({
    url: '/Template/BatchDownLoadContractTemplate',
    method: 'post',
    data: Datas
  })
}

//新增证明模板
export const AddProveTemplate1 = (Datas) => {
  return request({
    url: '/Template/AddProveTemplate1',
    method: 'post',
    data: Datas
  })
}

//获取证明模板分页列表
export const GetProveTemplatePageList = (Datas) => {
  return request({
    url: '/Template/GetProveTemplatePageList',
    method: 'post',
    data: Datas
  })
}

//删除证明模板
export const DelProvetTemplate1 = (Datas) => {
  return request({
    url: '/Template/DelProvetTemplate1',
    method: 'post',
    data: Datas
  })
}

//修改证明模板
export const EditProveTemplate = (Datas) => {
  return request({
    url: '/Template/EditProveTemplate',
    method: 'post',
    data: Datas
  })
}

//批量下载证明模板
export const BatchDownLoadProveTemplate = (Datas) => {
  return request({
    url: '/Template/BatchDownLoadProveTemplate',
    method: 'post',
    data: Datas
  })
}

//添加凭证模板
export const AddVoucherTemplate = (Datas) => {
  return request({
    url: '/Template/AddVoucherTemplate',
    method: 'post',
    data: Datas
  })
}

//获取凭证模板分页列表
export const GetVoucherTemplatePageList = (Datas) => {
  return request({
    url: '/Template/GetVoucherTemplatePageList',
    method: 'post',
    data: Datas
  })
}

//删除凭证模板
export const DelVoucherTemplate1 = (Datas) => {
  return request({
    url: '/Template/DelVoucherTemplate1',
    method: 'post',
    data: Datas
  })
}

//修改凭证模板
export const EditVoucherTemplate = (Datas) => {
  return request({
    url: '/Template/EditVoucherTemplate',
    method: 'post',
    data: Datas
  })
}

//批量下载凭证模板
export const BatchDownLoadVoucherTemplate = (Datas) => {
  return request({
    url: '/Template/BatchDownLoadVoucherTemplate',
    method: 'post',
    data: Datas
  })
}