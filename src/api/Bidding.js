import request from '@/utils/request'

//  获取招投标文件分页列表
export const GetBiddingDocumentPageList = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingDocumentPageList',
    method: 'post',
    data: Datas
  })
}
//  获取招投标文件详情
export const GetBiddingDocumentInfo = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingDocumentInfo',
    method: 'post',
    data: Datas
  })
}
//  删除招投标文件
export const DeleteBiddingDocuments = (Datas) => {
  return request({
    url: '/Bidding/DeleteBiddingDocuments',
    method: 'post',
    data: Datas
  })
}
// 新增招投标文件
export const AddBiddingDocuments = (Datas) => {
  return request({
    url: '/Bidding/AddBiddingDocuments',
    method: 'post',
    data: Datas
  })
}
// 修改招投标文件
export const EditBiddingDocuments = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingDocuments',
    method: 'post',
    data: Datas
  })
}
// 修改招投标文件状态
export const EditBiddingDocumentsStatus = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingDocumentsStatus',
    method: 'post',
    data: Datas
  })

}

//获取招投标报价列表
export const GetBiddingQuotePageList = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingQuotePageList',
    method: 'post',
    data: Datas
  })
}

//添加招投标报价审批
export const AddBiddingQuote = (Datas) => {
  return request({
    url: '/Bidding/AddBiddingQuote',
    method: 'post',
    data: Datas
  })
}

//修改招投标报价审批
export const EditBiddingQuote = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingQuote',
    method: 'post',
    data: Datas
  })
}

//删除招投标报价审批
export const DeleteBiddingQuote = (Datas) => {
  return request({
    url: '/Bidding/DeleteBiddingQuote',
    method: 'post',
    data: Datas
  })
}

//修改招投标报价审批状态
export const EditBiddingQuoteStatus = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingQuoteStatus',
    method: 'post',
    data: Datas
  })

}
//  获取招投标信息详情
export const GetBiddingInformationInfo = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingInformationInfo',
    method: 'post',
    data: Datas
  })
}

//获取招投标标前标后列表
export const GetBiddingInformationBasePageList = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingInformationBasePageList',
    method: 'post',
    data: Datas
  })
}
// 添加招投标信息
export const AddBiddingInformation = (Datas) => {
  return request({
    url: '/Bidding/AddBiddingInformation',
    method: 'post',
    data: Datas
  })
}
// 修改招投标信息(第一阶段)
export const EditBiddingInformationBase = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingInformationBase',
    method: 'post',
    data: Datas
  })
}
//  修改招投标信息(第一阶段)状态
export const EditBiddingInformationBaseStatus = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingInformationBaseStatus',
    method: 'post',
    data: Datas
  })
}
// 删除招投标信息(第一阶段)
export const DeleteBiddingInformationBase = (Datas) => {
  return request({
    url: '/Bidding/DeleteBiddingInformationBase',
    method: 'post',
    data: Datas
  })
}
// 导出招投标信息
export const ExportBiddingInformation = (Datas) => {
  return request({
    url: '/Bidding/ExportBiddingInformation',
    method: 'post',
    data: Datas
  })
}
// 修改招投标信息(第一阶段)附件(投标书附件,中标书附件,过程材料)
export const EditBiddingInformationBaseAttach = (Datas) => {
  return request({
    url: '/Bidding/EditBiddingInformationBaseAttach',
    method: 'post',
    data: Datas
  })
}
// 获取招投标报价详情
export const GetBiddingQuoteInfo = (Datas) => {
  return request({
    url: '/Bidding/GetBiddingQuoteInfo',
    method: 'post',
    data: Datas
  })
}