import request from '@/utils/request'

// 删除付款申请
export const DeleteApplyPay = (Datas) => {
  return request({
    url: '/Finance/DeleteApplyPay',
    method: 'post',
    data: Datas
  })
}

// 获取付款审单详情,业务单号删选,返回最新一条
export const GetApplyPayInfoByBusinessNoToLately = (Datas) => {
  return request({
    url: '/Finance/GetApplyPayInfoByBusinessNoToLately',
    method: 'post',
    data: Datas
  })
}

// 根据结算单获取对应的客户流水列表
export const GetCompanyMoneyRecordBySettle = (Datas) => {
  return request({
    url: '/Finance/GetCompanyMoneyRecordBySettle',
    method: 'post',
    data: Datas
  })
}

// 根据结算单查询对应客户的发票列表
export const GetCompanyInvoiceApplyBySettle = (Datas) => {
  return request({
    url: '/Finance/GetCompanyInvoiceApplyBySettle',
    method: 'post',
    data: Datas
  })
}

// 根据结算单查询对应的发票
export const GetInvoiceApplyBySettle = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyBySettle',
    method: 'post',
    data: Datas
  })
}

// 撤销付款申请单
export const RevokeApplyPay = (Datas) => {
  return request({
    url: '/Finance/RevokeApplyPay',
    method: 'post',
    data: Datas
  })
}

// 获取回执模板信息枚举
export const GetImportAndIssueReceiptEnum = (Datas) => {
  return request({
    url: '/Finance/GetImportAndIssueReceiptEnum',
    method: 'post',
    data: Datas
  })
}

// 获取回执模板信息
export const GetImportAndIssueReceiptTemplate = (Datas) => {
  return request({
    url: '/Finance/GetImportAndIssueReceiptTemplate',
    method: 'post',
    data: Datas
  })
}

// 导入发放回执
export const ImportAndIssueReceipt = (Datas) => {
  return request({
    url: '/Finance/ImportAndIssueReceipt',
    method: 'post',
    data: Datas
  })
}

// 获取已领款回款登记列表
export const GetMoneyRecordRecordList = (Datas) => {
  return request({
    url: '/Finance/GetMoneyRecordRecordList',
    method: 'post',
    data: Datas
  })
}

// 编辑发放成员状态
export const EditSalaryPayMemberStatus = (Datas) => {
  return request({
    url: '/Finance/EditSalaryPayMemberStatus',
    method: 'post',
    data: Datas
  })
}

// 发放成员列表
export const GetSalaryPayMemberList = (Datas) => {
  return request({
    url: '/Finance/GetSalaryPayMemberList',
    method: 'post',
    data: Datas
  })
}

// 获取收款管理导入模板
export const GetMoneyRecordExcelModel = (Datas) => {
  return request({
    url: '/Finance/GetMoneyRecordExcelModel',
    method: 'post',
    data: Datas
  })
}

// 导入回款登记
export const ImportMoneyRecordExcel = (Datas) => {
  return request({
    url: '/Finance/ImportMoneyRecordExcel',
    method: 'post',
    data: Datas
  })
}

// 获取所有开票申请信息
export const GetInvoiceApplyPageAllList = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyPageAllList',
    method: 'post',
    data: Datas
  })
}

// 获取开票申请信息分页列表
export const GetInvoiceApplyPageList = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyPageList',
    method: 'post',
    data: Datas
  })
}

// 修改开票申请信息状态(标记为已开具)
export const EditInvoiceApplyStatus = (Datas) => {
  return request({
    url: '/Finance/EditInvoiceApplyStatus',
    method: 'post',
    data: Datas
  })
}

// 获取开票申请信息详情
export const GetInvoiceApplyInfo = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyInfo',
    method: 'post',
    data: Datas
  })
}

// 获取付款申请列表分页列表
export const GetFinanceApplyPayPageList = (Datas) => {
  return request({
    url: '/Finance/GetFinanceApplyPayPageList',
    method: 'post',
    data: Datas
  })
}

// 获取付款申请列表列表
export const GetApplyPayPageList = (Datas) => {
  return request({
    url: '/Finance/GetApplyPayPageList',
    method: 'post',
    data: Datas
  })
}

// 获取付款申请详情
export const GetApplyPayInfo = (Datas) => {
  return request({
    url: '/Finance/GetApplyPayInfo',
    method: 'post',
    data: Datas
  })
}

// 修改付款申请状态(标记为已经付款)
export const EditApplyPayStatus = (Datas) => {
  return request({
    url: '/Finance/EditApplyPayStatus',
    method: 'post',
    data: Datas
  })
}

// 获取付款申请所有枚举
export const GetApplyPayAllEnum = (Datas) => {
  return request({
    url: '/Finance/GetApplyPayAllEnum',
    method: 'post',
    data: Datas
  })
}

// 获取回款登记分页列表
export const GetMoneyRecordPageList = (Datas) => {
  return request({
    url: '/Finance/GetMoneyRecordPageList',
    method: 'post',
    data: Datas
  })
}

// 添加回款流水信息
export const AddMoneyRecord = (Datas) => {
  return request({
    url: '/Finance/AddMoneyRecord',
    method: 'post',
    data: Datas
  })
}

//修改回款流水信息
export const EditMoneyRecord = (Datas) => {
  return request({
    url: '/Finance/EditMoneyRecord',
    method: 'post',
    data: Datas
  })
}

//获取回款流水详情
export const GetMoneyRecordInfo = (Datas) => {
  return request({
    url: '/Finance/GetMoneyRecordInfo',
    method: 'post',
    data: Datas
  })
}
//获取公司开户信息
export const GetBfBankInfo = (Datas) => {
  return request({
    url: '/Finance/GetBfBankInfo',
    method: 'post',
    data: Datas
  })
}

// 获取公司开户账号列表
export const GetBfBankList = (Datas) => {
  return request({
    url: '/Finance/GetBfBankList',
    method: 'post',
    data: Datas
  })
}

//获取公司开户信息列表
export const GetBfBankPageList = (Datas) => {
  return request({
    url: '/Finance/GetBfBankPageList',
    method: 'post',
    data: Datas
  })
}

//添加公司开户信息
export const AddBfBank = (Datas) => {
  return request({
    url: '/Finance/AddBfBank',
    method: 'post',
    data: Datas
  })
}

//修改公司开户信息
export const EditBfBank = (Datas) => {
  return request({
    url: '/Finance/EditBfBank',
    method: 'post',
    data: Datas
  })
}

//删除公司开户信息
export const DeleteBfBank = (Datas) => {
  return request({
    url: '/Finance/DeleteBfBank',
    method: 'post',
    data: Datas
  })
}

//添加开票申请信息
export const AddInvoiceApply = (Datas) => {
  return request({
    url: '/Finance/AddInvoiceApply',
    method: 'post',
    data: Datas
  })
}

//获取开票申请类型
export const GetInvoiceApplyAllEnum = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyAllEnum',
    method: 'post',
    data: Datas
  })
}

//获取付款申请单附件
export const GetApplyPayEnclosure = (Datas) => {
  return request({
    url: '/Finance/GetApplyPayEnclosure',
    method: 'post',
    data: Datas
  })
}

// 获取自定义档案值
export const GetUserDefinedFile = (Datas) => {
  return request({
    url: '/Finance/GetUserDefinedFile',
    method: 'post',
    data: Datas
  })
}

// 添加项目付款申请
export const AddPaymentApplication = (Datas) => {
  return request({
    url: '/Finance/AddPaymentApplication',
    method: 'post',
    data: Datas
  })
}

// 获取易快报账号信息(根据银行账号或者账户名称获取账号信息)
export const GetPayeeInfos = (Datas) => {
  return request({
    url: '/Finance/GetPayeeInfos',
    method: 'post',
    data: Datas
  })
}

// 获取易快报部门列表
export const GetDepartments = (Datas) => {
  return request({
    url: '/Finance/GetDepartments',
    method: 'post',
    data: Datas
  })
}

// 设置系统易快报授权
export const EKuaiBaoAuth = (Datas) => {
  return request({
    url: '/Finance/EKuaiBaoAuth',
    method: 'post',
    data: Datas
  })
}

// 添加财务发票报销
export const AddFinancialInvoice = (Datas) => {
  return request({
    url: '/Finance/AddFinancialInvoice',
    method: 'post',
    data: Datas
  })
}

// 获取费用类型请列表
export const GetFeeTypes = (Datas) => {
  return request({
    url: '/Finance/GetFeeTypes',
    method: 'post',
    data: Datas
  })
}

// 添加薪酬付款申请
export const AddApplyPayExamine = (Datas) => {
  return request({
    url: '/Finance/AddApplyPayExamine',
    method: 'post',
    data: Datas
  })
}

// 获取开票信息回款流水
export const GetInvoiceApplyMoneyRecord = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceApplyMoneyRecord',
    method: 'post',
    data: Datas
  })
}

// 修改开票申请信息流水(标记为收款)
export const EditInvoiceApplyMoneyRecordId = (Datas) => {
  return request({
    url: '/Finance/EditInvoiceApplyMoneyRecordId',
    method: 'post',
    data: Datas
  })
}


//删除流水
export const DeleteMoneyRecord = (Datas) => {
  return request({
    url: '/Finance/DeleteMoneyRecord',
    method: 'post',
    data: Datas
  })
}

//补充流水
export const AddInvoiceApplyAddFlowing = (Datas) => {
  return request({
    url: '/Finance/AddInvoiceApplyAddFlowing',
    method: 'post',
    data: Datas
  })
}

//添加新的预结算单
export const AddSalaryBeforehandSettle = (Datas) => {
  return request({
    url: '/Finance/AddSalaryBeforehandSettle',
    method: 'post',
    data: Datas
  })
}
//GetFinanceInvoiceTitlePageList 获取发票抬头分页列表
export const GetFinanceInvoiceTitlePageList = (Datas) => {
  return request({
    url: '/Salary/GetFinanceInvoiceTitlePageList',
    method: 'post',
    data: Datas
  })
}
//AddFinanceInvoiceTitle 添加发票抬头
export const AddFinanceInvoiceTitle = (Datas) => {
  return request({
    url: '/Salary/AddFinanceInvoiceTitle',
    method: 'post',
    data: Datas
  })
}
//DeleteFinanceInvoiceTitle 删除挂账信息
export const DeleteFinanceInvoiceTitle = (Datas) => {
  return request({
    url: '/Salary/DeleteFinanceInvoiceTitle',
    method: 'post',
    data: Datas
  })
}
//EditFinanceInvoiceTitle 编辑发票抬头
export const EditFinanceInvoiceTitle = (Datas) => {
  return request({
    url: '/Salary/EditFinanceInvoiceTitle',
    method: 'post',
    data: Datas
  })
}
//GetFinanceInvoiceTitleInfo 获取发票抬头详情
export const GetFinanceInvoiceTitleInfo = (Datas) => {
  return request({
    url: '/Salary/GetFinanceInvoiceTitleInfo',
    method: 'post',
    data: Datas
  })
}
//GetInvoiceTitleList  获取客户发票抬头信息列表
export const GetInvoiceTitleList = (Datas) => {
  return request({
    url: '/Finance/GetInvoiceTitleList',
    method: 'post',
    data: Datas
  })
}
// 新增其他费用管理
export const AddOtherExpense = (Datas) => {
  return request({
    url: '/Salary/AddOtherExpense',
    method: 'post',
    data: Datas
  })
}
// 获取其他费用管理分页列表
export const GetOtherExpensePageList = (Datas) => {
  return request({
    url: '/Salary/GetOtherExpensePageList',
    method: 'post',
    data: Datas
  })
}
//获取项目回款认领记录
export const GetMoneyRecordClaimList = (Datas) => {
  return request({
    url: '/Finance/GetMoneyRecordClaimList',
    method: 'post',
    data: Datas
  })
}
