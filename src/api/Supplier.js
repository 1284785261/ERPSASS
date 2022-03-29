import request from '@/utils/request'

//  外部供应商-账户类别
export const GetExternalSupplierEnumAccountClass = (Datas) => {
    return request({
        url: '/Supplier/GetExternalSupplierEnumAccountClass',
        method: 'post',
        data: Datas
    })
}
// 添加外部供应商
export const AddExternalSuppliers = (Datas) => {
  return request({
      url: '/Supplier/AddExternalSupplier',
      method: 'post',
      data: Datas
  })
}
// 获取外部供应商分页列表
export const GetExternalSupplierPageList = (Datas) => {
  return request({
      url: '/Supplier/GetExternalSupplierPageList',
      method: 'post',
      data: Datas
  })
}
// 删除外部供应商
export const DeleteExternalSupplier = (Datas) => {
  return request({
      url: '/Supplier/DeleteExternalSupplier',
      method: 'post',
      data: Datas
  })
}
// 获取外部供应商
export const GetExternalSupplierInfo = (Datas) => {
  return request({
      url: '/Supplier/GetExternalSupplierInfo',
      method: 'post',
      data: Datas
  })
}
// 修改外部供应商状态
export const EditExternalSupplier = (Datas) => {
  return request({
      url: '/Supplier/EditExternalSupplier',
      method: 'post',
      data: Datas
  })
}
//  获取内部供应商分页列表
export const GetInsideSupplierPageList = (Datas) => {
  return request({
      url: '/Supplier/GetInsideSupplierPageList',
      method: 'post',
      data: Datas
  })
}
// 获取[外部]供应商资金往来分页列表
export const GetTransactionsExternalSupplierPageList = (Datas) => {
  return request({
      url: '/Supplier/GetTransactionsExternalSupplierPageList',
      method: 'post',
      data: Datas
  })
}
//  添加[外部]供应商资金往来附件
export const AddTransactionsExternalSupplierAttachment = (Datas) => {
  return request({
      url: '/Supplier/AddTransactionsExternalSupplierAttachment',
      method: 'post',
      data: Datas
  })
}
// 获取[内部]供应商资金往来分页列表
export const GetTransactionsInsideSupplierPageList = (Datas) => {
  return request({
      url: '/Supplier/GetTransactionsInsideSupplierPageList',
      method: 'post',
      data: Datas
  })
}