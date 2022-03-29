import request from "@/utils/request";

// 添加公司社保公积金开户信息客户关联
export const AddBfInsuranceFundCompany = Datas => {
  return request({
    url: "/Salary/AddBfInsuranceFundCompany",
    method: "post",
    data: Datas
  });
};

// 删除公司社保公积金开户信息客户关联
export const DeleteBfInsuranceFundCompany = Datas => {
  return request({
    url: "/Salary/DeleteBfInsuranceFundCompany",
    method: "post",
    data: Datas
  });
};

// 获取公司社保公积金开户信息客户列表
export const GetBfInsuranceFundCompanyList = Datas => {
  return request({
    url: "/Salary/GetBfInsuranceFundCompanyList",
    method: "post",
    data: Datas
  });
};

// 获取公积金导入批次信息详情
export const GetHouseFundBatchInfoByBfId = Datas => {
  return request({
    url: "/Salary/GetHouseFundBatchInfoByBfId",
    method: "post",
    data: Datas
  });
};

// 获取我管辖的工资批次导入信息
export const GetMyJurisdictionSalaryBatchList = Datas => {
  return request({
    url: "/Salary/GetMyJurisdictionSalaryBatchList",
    method: "post",
    data: Datas
  });
};

// 查询账期内的结算单
export const GetSalarySettlePeriodInfo = Datas => {
  return request({
    url: "/Salary/GetSalarySettlePeriodInfo",
    method: "post",
    data: Datas
  });
};

// 医保付款申请
export const MedicalPayApply = Datas => {
  return request({
    url: "/Salary/MedicalPayApply",
    method: "post",
    data: Datas
  });
};

// 获取医保实缴明细详情
export const GetMedicalInfo = Datas => {
  return request({
    url: "/Salary/GetMedicalInfo",
    method: "post",
    data: Datas
  });
};

// 添加医保结算
export const AddMedicalSettle = Datas => {
  return request({
    url: "/Salary/AddMedicalSettle",
    method: "post",
    data: Datas
  });
};

// 获取医保结算对象
export const GetMedicalSettleMember = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleMember",
    method: "post",
    data: Datas
  });
};

// 获取医保导入批次信息详情所属企业社保查询
export const GetMedicalBatchInfoByBfInsuranceFundId = Datas => {
  return request({
    url: "/Salary/GetMedicalBatchInfoByBfInsuranceFundId",
    method: "post",
    data: Datas
  });
};

// 医保导入Execl映射Erp数据
export const ImportMedicalToExcelOrErpMapping = Datas => {
  return request({
    url: "/Salary/ImportMedicalToExcelOrErpMapping",
    method: "post",
    data: Datas
  });
};

// 医保获取导入文件与ERP结构数据
export const GetImportMedicalToExcelOrErpStructuralData = Datas => {
  return request({
    url: "/Salary/GetImportMedicalToExcelOrErpStructuralData",
    method: "post",
    data: Datas
  });
};

// 获取医保实缴明细分页列表
export const GetMedicalPageList = Datas => {
  return request({
    url: "/Salary/GetMedicalPageList",
    method: "post",
    data: Datas
  });
};

// 获取医保结算员工
export const GetMedicalSettleMemberList = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleMemberList",
    method: "post",
    data: Datas
  });
};

// 查询对应社保结算单明细信息
export const GetMedicalSettleDetailList = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleDetailList",
    method: "post",
    data: Datas
  });
};

// 删除医保结算单（仅待提交审批才能删除）
export const DeleteMedicalSettle = Datas => {
  return request({
    url: "/Salary/DeleteMedicalSettle",
    method: "post",
    data: Datas
  });
};

// 查询医保结算列表
export const GetMedicalSettleList = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleList",
    method: "post",
    data: Datas
  });
};

// 导出社保增减员名单
export const DownloadMedicalChangeExcel = Datas => {
  return request({
    url: "/Salary/DownloadMedicalChangeExcel",
    method: "post",
    data: Datas
  });
};

// 删除医保增减员名单
export const DeleteMedicalChange = Datas => {
  return request({
    url: "/Salary/DeleteMedicalChange",
    method: "post",
    data: Datas
  });
};

// 修改医保增减员名单
export const EditMedicalChange = Datas => {
  return request({
    url: "/Salary/EditMedicalChange",
    method: "post",
    data: Datas
  });
};

// 获取医保增减员名单分页列表
export const GetMedicalChangePageList = Datas => {
  return request({
    url: "/Salary/GetMedicalChangePageList",
    method: "post",
    data: Datas
  });
};

// 工资付款申请
export const SalaryPayApply = Datas => {
  return request({
    url: "/Salary/SalaryPayApply",
    method: "post",
    data: Datas
  });
};

// 社保付款申请
export const SiPayApply = Datas => {
  return request({
    url: "/Salary/SiPayApply",
    method: "post",
    data: Datas
  });
};

// 公积金付款申请
export const FundPayApply = Datas => {
  return request({
    url: "/Salary/FundPayApply",
    method: "post",
    data: Datas
  });
};

// 添加工资结算
export const AddSalarySettle = Datas => {
  return request({
    url: "/Salary/AddSalarySettle",
    method: "post",
    data: Datas
  });
};

// 编辑结算单状态
export const EditSalarySettleStatus = Datas => {
  return request({
    url: "/Salary/EditSalarySettleStatus",
    method: "post",
    data: Datas
  });
};

// 获取原始工资信息详情
export const GetSalaryOrigin = Datas => {
  return request({
    url: "/Salary/GetSalaryOrigin",
    method: "post",
    data: Datas
  });
};

// 查询工资结算列表
export const GetSalarySettleList = Datas => {
  return request({
    url: "/Salary/GetSalarySettleList",
    method: "post",
    data: Datas
  });
};

// 获取结算状态类型
export const GetSalarySettleStatusEnum = Datas => {
  return request({
    url: "/Salary/GetSalarySettleStatusEnum",
    method: "post",
    data: Datas
  });
};

// 删除结算单
export const DeleteSalarySettle = Datas => {
  return request({
    url: "/Salary/DeleteSalarySettle",
    method: "post",
    data: Datas
  });
};

// 工资结算明细类型
export const GetSalarySettleDetailType = Datas => {
  return request({
    url: "/Salary/GetSalarySettleDetailType",
    method: "post",
    data: Datas
  });
};

// 工资结算明细列表
export const GetSalarySettleDetailList = Datas => {
  return request({
    url: "/Salary/GetSalarySettleDetailList",
    method: "post",
    data: Datas
  });
};

// 编辑工资结算明细
export const EditSalarySettleDetail = Datas => {
  return request({
    url: "/Salary/EditSalarySettleDetail",
    method: "post",
    data: Datas
  });
};

// 添加工资结算明细
export const AddSalarySettleDetail = Datas => {
  return request({
    url: "/Salary/AddSalarySettleDetail",
    method: "post",
    data: Datas
  });
};

// 删除结算明细项
export const DeleteSalarySettleDetail = Datas => {
  return request({
    url: "/Salary/DeleteSalarySettleDetail",
    method: "post",
    data: Datas
  });
};

// 获取结算对象
export const GetSalarySettleMemberList = Datas => {
  return request({
    url: "/Salary/GetSalarySettleMemberList",
    method: "post",
    data: Datas
  });
};

// 查询社保结算列表
export const GetSiSettleList = Datas => {
  return request({
    url: "/Salary/GetSiSettleList",
    method: "post",
    data: Datas
  });
};

// 删除社保结算单
export const DeleteSiSettle = Datas => {
  return request({
    url: "/Salary/DeleteSiSettle",
    method: "post",
    data: Datas
  });
};

// // 添加社保结算
// export const AddSiSettle = (Datas) => {
//   return request({
//     url: '/Salary/AddSiSettle',
//     method: 'post',
//     data: Datas
//   })
// }

// 编辑社保结算单状态
export const EditSiSettleStatus = Datas => {
  return request({
    url: "/Salary/EditSiSettleStatus",
    method: "post",
    data: Datas
  });
};

// 查询对应社保结算单明细信息
export const GetSiSettleDetailList = Datas => {
  return request({
    url: "/Salary/GetSiSettleDetailList",
    method: "post",
    data: Datas
  });
};

// 删除社保结算明细
export const DeleteSiSettleDetail = Datas => {
  return request({
    url: "/Salary/DeleteSiSettleDetail",
    method: "post",
    data: Datas
  });
};

// // 添加社保结算明细
// export const AddSiSettleDetail = (Datas) => {
//   return request({
//     url: '/Salary/AddSiSettleDetail',
//     method: 'post',
//     data: Datas
//   })
// }

// 获取社保结算对象
export const GetSiSettleMemberList = Datas => {
  return request({
    url: "/Salary/GetSiSettleMemberList",
    method: "post",
    data: Datas
  });
};

// 查询公积金结算列表
export const GetHouseFundSettleList = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleList",
    method: "post",
    data: Datas
  });
};

// 删除公积金结算单
export const DeleteHouseFundSettle = Datas => {
  return request({
    url: "/Salary/DeleteHouseFundSettle",
    method: "post",
    data: Datas
  });
};

// 查询公积金明细列表
export const GetHouseFundSettleDetailList = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleDetailList",
    method: "post",
    data: Datas
  });
};

// 获取公积金结算员工
export const GetHouseFundSettleMemberList = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleMemberList",
    method: "post",
    data: Datas
  });
};

// 查询差额列表
export const GetDifferenceList = Datas => {
  return request({
    url: "/Salary/GetDifferenceList",
    method: "post",
    data: Datas
  });
};

// 导出差额列表
export const ExportDifferenceList = Datas => {
  return request({
    url: "/Salary/ExportDifferenceList",
    method: "post",
    data: Datas
  });
};

// 添加工资导入批次信息
export const AddSalaryBatch = Datas => {
  return request({
    url: "/Salary/AddSalaryBatch",
    method: "post",
    data: Datas
  });
};

// 查询要发工资的员工
export const SalarySettleMember = Datas => {
  return request({
    url: "/Salary/SalarySettleMember",
    method: "post",
    data: Datas
  });
};

// 导出薪酬个税
export const ExportSalaryPersonalTax = Datas => {
  return request({
    url: "/Salary/ExportSalaryPersonalTax",
    method: "post",
    data: Datas
  });
};

// 获取工资导入批次信息列表
export const GetSalaryBatchList = Datas => {
  return request({
    url: "/Salary/GetSalaryBatchList",
    method: "post",
    data: Datas
  });
};

// 获取工资导入批次信息详情
export const GetSalaryBatch = Datas => {
  return request({
    url: "/Salary/GetSalaryBatch",
    method: "post",
    data: Datas
  });
};

// 删除工资导入批次信息
export const DeleteSalaryBatch = Datas => {
  return request({
    url: "/Salary/DeleteSalaryBatch",
    method: "post",
    data: Datas
  });
};

// 获取标准工资信息(锦绣版)列表分页列表
export const GetSalaryPageList = Datas => {
  return request({
    url: "/Salary/GetSalaryPageList",
    method: "post",
    data: Datas
  });
};

// 获取标准工资信息(锦绣版)详情
export const GetSalaryInfo = Datas => {
  return request({
    url: "/Salary/GetSalaryInfo",
    method: "post",
    data: Datas
  });
};

// 修改标准工资信息(锦绣版)
export const EditSalary = Datas => {
  return request({
    url: "/Salary/EditSalary",
    method: "post",
    data: Datas
  });
};

// 获取标准工资信息(锦绣版)状态枚举
export const GetSalaryEnumStatus = Datas => {
  return request({
    url: "/Salary/GetSalaryEnumStatus",
    method: "post",
    data: Datas
  });
};

// 获取挂账信息分页列表
export const GetOnCreditPageList = Datas => {
  return request({
    url: "/Salary/GetOnCreditPageList",
    method: "post",
    data: Datas
  });
};

// 获取可用挂账列表项目筛选
export const GetOnCreditListByProject = Datas => {
  return request({
    url: "/Salary/GetOnCreditListByProject",
    method: "post",
    data: Datas
  });
};

// 获取挂账信息详情
export const GetOnCreditInfo = Datas => {
  return request({
    url: "/Salary/GetOnCreditInfo",
    method: "post",
    data: Datas
  });
};

// 修改挂账信息
export const EditOnCredit = Datas => {
  return request({
    url: "/Salary/EditOnCredit",
    method: "post",
    data: Datas
  });
};

// 添加挂账信息
export const AddOnCredit = Datas => {
  return request({
    url: "/Salary/AddOnCredit",
    method: "post",
    data: Datas
  });
};

// 删除挂账信息
export const DeleteOnCredit = Datas => {
  return request({
    url: "/Salary/DeleteOnCredit",
    method: "post",
    data: Datas
  });
};

// 获取公积金实缴明细列表
export const GetHouseFundPageList = Datas => {
  return request({
    url: "/Salary/GetHouseFundPageList",
    method: "post",
    data: Datas
  });
};

// 获取公积金实缴明细详情
export const GetHouseFundInfo = Datas => {
  return request({
    url: "/Salary/GetHouseFundInfo",
    method: "post",
    data: Datas
  });
};

// 修改公积金实缴明细
export const EditHouseFund = Datas => {
  return request({
    url: "/Salary/EditHouseFund",
    method: "post",
    data: Datas
  });
};

// 删除公积金实缴明细
export const DeleteHouseFund = Datas => {
  return request({
    url: "/Salary/DeleteHouseFund",
    method: "post",
    data: Datas
  });
};

// 添加公积金实缴明细
export const AddHouseFund = Datas => {
  return request({
    url: "/Salary/AddHouseFund",
    method: "post",
    data: Datas
  });
};

// 获取社保增减员名单分页列表
export const GetSiChangePageList = Datas => {
  return request({
    url: "/Salary/GetSiChangePageList",
    method: "post",
    data: Datas
  });
};

// 修改社保增减员名单
export const EditSiChange = Datas => {
  return request({
    url: "/Salary/EditSiChange",
    method: "post",
    data: Datas
  });
};

// 删除社保增减员名单请求参数
export const DeleteSiChange = Datas => {
  return request({
    url: "/Salary/DeleteSiChange",
    method: "post",
    data: Datas
  });
};

// 导出社保增减员名单
export const DownloadSiChangeExcel = Datas => {
  return request({
    url: "/Salary/DownloadSiChangeExcel",
    method: "post",
    data: Datas
  });
};

// 添加社保[减]员名单
export const AddReduceSiChange = Datas => {
  return request({
    url: "/Salary/AddReduceSiChange",
    method: "post",
    data: Datas
  });
};

// 添加社保[增]员名单
export const AddPlusSiChange = Datas => {
  return request({
    url: "/Salary/AddPlusSiChange",
    method: "post",
    data: Datas
  });
};

// 导出公积金增减员名单
export const DownloadHouseFundChangeExcel = Datas => {
  return request({
    url: "/Salary/DownloadHouseFundChangeExcel",
    method: "post",
    data: Datas
  });
};

// 获取公积金增减员名单分页列表
export const GetHouseFundChangePageList = Datas => {
  return request({
    url: "/Salary/GetHouseFundChangePageList",
    method: "post",
    data: Datas
  });
};

// 修改公积金增减员名单
export const EditHouseFundChange = Datas => {
  return request({
    url: "/Salary/EditHouseFundChange",
    method: "post",
    data: Datas
  });
};

// 删除公积金增减员名单
export const DeleteHouseFundChange = Datas => {
  return request({
    url: "/Salary/DeleteHouseFundChange",
    method: "post",
    data: Datas
  });
};

// 添加公积金[减]员名单
export const AddReduceHouseFundChange = Datas => {
  return request({
    url: "/Salary/AddReduceHouseFundChange",
    method: "post",
    data: Datas
  });
};

// 添加公积金[增]员名单
export const AddPlusHouseFundChange = Datas => {
  return request({
    url: "/Salary/AddPlusHouseFundChange",
    method: "post",
    data: Datas
  });
};

//获取实缴社保导入模板
export const GetInsuranceExcelModel = Datas => {
  return request({
    url: "/Salary/GetInsuranceExcelModel",
    method: "post",
    data: Datas
  });
};

//获取社保实缴分页列表
export const GetInsurancePageList = Datas => {
  return request({
    url: "/Salary/GetInsurancePageList",
    method: "post",
    data: Datas
  });
};

//获取社保公积金开户账号列表
export const GetBfInsuranceFundPageList = Datas => {
  return request({
    url: "/Salary/GetBfInsuranceFundPageList",
    method: "post",
    data: Datas
  });
};

//获取社保导入文件与ERP结构数据
export const GetImportToExcelOrErpStructuralData = Datas => {
  return request({
    url: "/Salary/GetImportToExcelOrErpStructuralData",
    method: "post",
    data: Datas
  });
};

//导入社保Excel数据
export const ImportToExcelOrErpMapping = Datas => {
  return request({
    url: "/Salary/ImportToExcelOrErpMapping",
    method: "post",
    data: Datas
  });
};

//获取社保实缴明细详情
export const GetInsuranceInfo = Datas => {
  return request({
    url: "/Salary/GetInsuranceInfo",
    method: "post",
    data: Datas
  });
};

//获取公积金导入模板
export const GetHouseFundExcelModel = Datas => {
  return request({
    url: "/Salary/GetHouseFundExcelModel",
    method: "post",
    data: Datas
  });
};

//获取公积金导入数据与ERP数据
export const GetImportHouseFundToExcelOrErpStructuralData = Datas => {
  return request({
    url: "/Salary/GetImportHouseFundToExcelOrErpStructuralData",
    method: "post",
    data: Datas
  });
};

//导入公积金ERP数据
export const ImportHouseFundToExcelOrErpMapping = Datas => {
  return request({
    url: "/Salary/ImportHouseFundToExcelOrErpMapping",
    method: "post",
    data: Datas
  });
};

//导入公积金是否存在账期
export const IsExistsHouseFund = Datas => {
  return request({
    url: "/Salary/IsExistsHouseFund",
    method: "post",
    data: Datas
  });
};
//获取社保公积金开户类型
export const GetBfInsuranceFundEnumType = Datas => {
  return request({
    url: "/Salary/GetBfInsuranceFundEnumType",
    method: "post",
    data: Datas
  });
};

//删除社保公积金开户信息
export const DeleteBfInsuranceFund = Datas => {
  return request({
    url: "/Salary/DeleteBfInsuranceFund",
    method: "post",
    data: Datas
  });
};

//添加社保公积金账户
export const AddBfInsuranceFund = Datas => {
  return request({
    url: "/Salary/AddBfInsuranceFund",
    method: "post",
    data: Datas
  });
};

//获取社保公积金账户详情
export const GetBfInsuranceFundInfo = Datas => {
  return request({
    url: "/Salary/GetBfInsuranceFundInfo",
    method: "post",
    data: Datas
  });
};

//修改社保公积金账户
export const EditBfInsuranceFund = Datas => {
  return request({
    url: "/Salary/EditBfInsuranceFund",
    method: "post",
    data: Datas
  });
};

//修改社保公积金账户状态
export const EditBfInsuranceFundStatus = Datas => {
  return request({
    url: "/Salary/EditBfInsuranceFundStatus",
    method: "post",
    data: Datas
  });
};

//获取个税六项扣除列表
export const GetPersonalTaxDeductPageList = Datas => {
  return request({
    url: "/Salary/GetPersonalTaxDeductPageList",
    method: "post",
    data: Datas
  });
};

//获取个税六项扣除列表详情
export const GetPersonalTaxDeductInfo = Datas => {
  return request({
    url: "/Salary/GetPersonalTaxDeductInfo",
    method: "post",
    data: Datas
  });
};

//获取个税六项扣除模板
export const GetPersonalTaxDeductExcelModel = Datas => {
  return request({
    url: "/Salary/GetPersonalTaxDeductExcelModel",
    method: "post",
    data: Datas
  });
};

//导入个税六项模板
export const ImportToPersonalTaxDeductExcel = Datas => {
  return request({
    url: "/Salary/ImportToPersonalTaxDeductExcel",
    method: "post",
    data: Datas
  });
};

//实缴社保获取社保人员
export const GetInsuranceSettleMember = Datas => {
  return request({
    url: "/Salary/GetInsuranceSettleMember",
    method: "post",
    data: Datas
  });
};

//实缴社保添加社保结算
export const AddSiSettle = Datas => {
  return request({
    url: "/Salary/AddSiSettle",
    method: "post",
    data: Datas
  });
};

//实缴公积金获取公积金人员
export const GetHouseFundSettleMember = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleMember",
    method: "post",
    data: Datas
  });
};

//实缴公积金添加公积金结算
export const AddHouseFundSettle = Datas => {
  return request({
    url: "/Salary/AddHouseFundSettle",
    method: "post",
    data: Datas
  });
};

//查看薪酬对比明细列表
export const GetSalaryDeffienceList = Datas => {
  return request({
    url: "/Salary/GetSalaryDeffienceList",
    method: "post",
    data: Datas
  });
};

//导出薪酬对比明细
export const ExportSalaryDeffienceList = Datas => {
  return request({
    url: "/Salary/ExportSalaryDeffienceList",
    method: "post",
    data: Datas
  });
};

//添加挂账支出
export const AddOnCreditIdExpense = Datas => {
  return request({
    url: "/Salary/AddOnCreditIdExpense",
    method: "post",
    data: Datas
  });
};

//获取挂账支出明细列表
export const GetOnCreditDetailed = Datas => {
  return request({
    url: "/Salary/GetOnCreditDetailed",
    method: "post",
    data: Datas
  });
};

//获取社保导入时的信息
export const GetInsuranceBatchInfoByBfInsuranceFundId = Datas => {
  return request({
    url: "/Salary/GetInsuranceBatchInfoByBfInsuranceFundId",
    method: "post",
    data: Datas
  });
};

//导入公积金
export const ImportToBfFundExcel = Datas => {
  return request({
    url: "/Salary/ImportToBfFundExcel",
    method: "post",
    data: Datas
  });
};

//模板公积金
export const GetImportToBfFundExcelModel = Datas => {
  return request({
    url: "/Salary/GetImportToBfFundExcelModel",
    method: "post",
    data: Datas
  });
};

//导入社保
export const ImportToBfInsuranceExcel = Datas => {
  return request({
    url: "/Salary/ImportToBfInsuranceExcel",
    method: "post",
    data: Datas
  });
};

//模板社保
export const GetImportToBfInsuranceExcelModel = Datas => {
  return request({
    url: "/Salary/GetImportToBfInsuranceExcelModel",
    method: "post",
    data: Datas
  });
};

//模板医保
export const GetImportToBfMedicalExcelModel = Datas => {
  return request({
    url: "/Salary/GetImportToBfMedicalExcelModel",
    method: "post",
    data: Datas
  });
};

//导入医保
export const ImportToBfMedicalExcel = Datas => {
  return request({
    url: "/Salary/ImportToBfMedicalExcel",
    method: "post",
    data: Datas
  });
};

//获取结算对象银行列表
export const GetSalarySettleMemberBankList = Datas => {
  return request({
    url: "/Salary/GetSalarySettleMemberBankList",
    method: "post",
    data: Datas
  });
};

//获取项目关联结算单列表
export const GetSalarySettleByProject = Datas => {
  return request({
    url: "/Salary/GetSalarySettleByProject",
    method: "post",
    data: Datas
  });
};

//获取项目预结算单列表
export const GetSalaryBeforehandSettle = Datas => {
  return request({
    url: "/Finance/GetSalaryBeforehandSettle",
    method: "post",
    data: Datas
  });
};

//解析薪酬结构EXcel表
export const GetSalaryExcelDataStruct = Datas => {
  return request({
    url: "/BusinessSetting/GetSalaryExcelDataStruct",
    method: "post",
    data: Datas
  });
};
//撤销挂账
export const RevokeOnCredit = Datas => {
  return request({
    url: "/Salary/RevokeOnCredit",
    method: "post",
    data: Datas
  });
};
//删除挂账支出
export const DeleteOnCreditIdExpense = Datas => {
  return request({
    url: "/Salary/DeleteOnCreditIdExpense",
    method: "post",
    data: Datas
  });
};
// Salary/AddSubstituteCushion 添加代垫(前端无需使用,后端测试用)
export const AddSubstituteCushion = Datas => {
  return request({
    url: "/Salary/AddSubstituteCushion",
    method: "post",
    data: Datas
  });
};
// Salary/GetSubstituteCushionPageList 获取代垫分页列表
export const GetSubstituteCushionPageList = Datas => {
  return request({
    url: "/Salary/GetSubstituteCushionPageList",
    method: "post",
    data: Datas
  });
};
// Salary/AddSubstituteCushionProjectMoneyDraw 添加代垫认领流水
export const AddSubstituteCushionProjectMoneyDraw = Datas => {
  return request({
    url: "/Salary/AddSubstituteCushionProjectMoneyDraw",
    method: "post",
    data: Datas
  });
};
// Salary/GetSubstituteCushionProjectMoneyDrawList 获取代垫认领流水列表
export const GetSubstituteCushionProjectMoneyDrawList = Datas => {
  return request({
    url: "/Salary/GetSubstituteCushionProjectMoneyDrawList",
    method: "post",
    data: Datas
  });
};
// Salary/RevokeSubstituteCushionProjectMoneyDraw 撤销代垫认领流水
export const RevokeSubstituteCushionProjectMoneyDraw = Datas => {
  return request({
    url: "/Salary/RevokeSubstituteCushionProjectMoneyDraw",
    method: "post",
    data: Datas
  });
};
// Salary/GetSubstituteCushionEnumSettleType 获取代垫结算类型
export const GetSubstituteCushionEnumSettleType = Datas => {
  return request({
    url: "/Salary/GetSubstituteCushionEnumSettleType",
    method: "post",
    data: Datas
  });
};

//预导入薪酬
export const BeforehandImportSalary = Datas => {
  return request({
    url: "/Salary/BeforehandImportSalary",
    method: "post",
    data: Datas
  });
};

//查询预导入浮动数据
export const GetSalaryBeforehandList = Datas => {
  return request({
    url: "/Salary/GetSalaryBeforehandList",
    method: "post",
    data: Datas
  });
};

//预导入数据批量入职
export const SalaryStaffBatchInduction = Datas => {
  return request({
    url: "/Salary/SalaryStaffBatchInduction",
    method: "post",
    data: Datas
  });
};

//删除预导入数据
export const DeleteSalaryBatchBeforehand = Datas => {
  return request({
    url: "/Salary/DeleteSalaryBatchBeforehand",
    method: "post",
    data: Datas
  });
};

//执行导入薪酬数据
export const ImportSalaryExecute = Datas => {
  return request({
    url: "/Salary/ImportSalaryExecute",
    method: "post",
    data: Datas
  });
};
//执行替换导入薪酬数据
export const ReplaceImportSalaryExecute = Datas => {
  return request({
    url: "/Salary/ReplaceImportSalaryExecute",
    method: "post",
    data: Datas
  });
};
// 获取挂账统计分页列表
export const GetChargeStatisticalPageList = Datas => {
  return request({
    url: "/Salary/GetChargeStatisticalPageList",
    method: "post",
    data: Datas
  });
};
// 获取挂账支出分页列表
export const GetChargeExpensePageList = Datas => {
  return request({
    url: "/Salary/GetChargeExpensePageList",
    method: "post",
    data: Datas
  });
};
///api/Salary/GetChargeIncomePageList  获取挂账收入分页列表
export const GetChargeIncomePageList = Datas => {
  return request({
    url: "/Salary/GetChargeIncomePageList",
    method: "post",
    data: Datas
  });
};
// 添加挂账收入
export const AddChargeIncome = Datas => {
  return request({
    url: "/Salary/AddChargeIncome",
    method: "post",
    data: Datas
  });
};
// 撤销挂账收入
export const RevenueChargeIncome = Datas => {
  return request({
    url: "/Salary/RevenueChargeIncome",
    method: "post",
    data: Datas
  });
};
// 获取代垫认领流水列表
export const GetSubstituteCushionDeductionList = Datas => {
  return request({
    url: "/Salary/GetSubstituteCushionDeductionList",
    method: "post",
    data: Datas
  });
};
// 添加代垫抵扣附件
export const AddSubstituteCushionDeductionAnnex = Datas => {
  return request({
    url: "/Salary/AddSubstituteCushionDeductionAnnex",
    method: "post",
    data: Datas
  });
};
// 撤销代垫认领流水
export const RevokeSubstituteCushionDeduction = Datas => {
  return request({
    url: "/Salary/RevokeSubstituteCushionDeduction",
    method: "post",
    data: Datas
  });
};
// 获取管理费及税金分页列表
export const GetManagementAndTaxesPageList = Datas => {
  return request({
    url: "/Salary/GetManagementAndTaxesPageList",
    method: "post",
    data: Datas
  });
};
// 新增管理费和税金
export const AddManagementAndTaxe = Datas => {
  return request({
    url: "/Salary/AddManagementAndTaxes",
    method: "post",
    data: Datas
  });
};
// 删除管理费和税金
export const DeleteManagementAndTaxes = Datas => {
  return request({
    url: "/Salary/DeleteManagementAndTaxes",
    method: "post",
    data: Datas
  });
};
// 获取管理费及税金详情
export const GetManagementAndTaxesDetail = Datas => {
  return request({
    url: "/Salary/GetManagementAndTaxesDetail",
    method: "post",
    data: Datas
  });
};
// 修改管理费和税金
export const EditManagementAndTaxes = Datas => {
  return request({
    url: "/Salary/EditManagementAndTaxes",
    method: "post",
    data: Datas
  });
};
//  获取其他费用管理分页列表
export const GetOtherExpensePageList = Datas => {
  return request({
    url: "/Salary/GetOtherExpensePageList",
    method: "post",
    data: Datas
  });
};
//  根据结算单查询项目及客户数据
export const QueryManagementAndTaxes = Datas => {
  return request({
    url: "/Salary/QueryManagementAndTaxes",
    method: "post",
    data: Datas
  });
};
// 获取其他费用管理明细
export const GetOtherExpenseDetail = Datas => {
  return request({
    url: "/Salary/GetOtherExpenseDetail",
    method: "post",
    data: Datas
  });
};
// 删除其他费用管理
export const DeleteOtherExpense = Datas => {
  return request({
    url: "/Salary/DeleteOtherExpense",
    method: "post",
    data: Datas
  });
};
// 获取【社保结算员工】结算分页列表
export const GetSiSettleMemberSettlePageList = Datas => {
  return request({
    url: "/Salary/GetSiSettleMemberSettlePageList",
    method: "post",
    data: Datas
  });
};
// 获取【公积金结算员工】结算分页列表
export const GetHouseFundSettleMemberSettlePageList = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleMemberSettlePageList",
    method: "post",
    data: Datas
  });
};
// 获取【医保结算员工】结算分页列表
export const GetMedicalSettleMemberSettlePageList = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleMemberSettlePageList",
    method: "post",
    data: Datas
  });
};
//  获取【社保结算员工】结算地区列表（需要先查询分页列表的情况才能查询出数据）
export const GetSiSettleMemberSettleAreaList = Datas => {
  return request({
    url: "/Salary/GetSiSettleMemberSettleAreaList",
    method: "post",
    data: Datas
  });
};
//  获取【公积金结算员工】结算地区列表
export const GetHouseFundSettleMemberSettleAreaList = Datas => {
  return request({
    url: "/Salary/GetHouseFundSettleMemberSettleAreaList",
    method: "post",
    data: Datas
  });
};
// 获取【医保结算员工】结算地区列表
export const GetMedicalSettleMemberSettleAreaList = Datas => {
  return request({
    url: "/Salary/GetMedicalSettleMemberSettleAreaList",
    method: "post",
    data: Datas
  })
}
// 获取【社保结算员工】打款账号列表
export const GetSiSettleMemberSettleBfInsuranceFundList = (Datas) => {
  return request({
    url: '/Salary/GetSiSettleMemberSettleBfInsuranceFundList',
    method: 'post',
    data: Datas
  })
}
// 获取【公积金结算员工】打款账号列表
export const GetHouseFundSettleMemberSettleBfInsuranceFundList = (Datas) => {
  return request({
    url: '/Salary/GetHouseFundSettleMemberSettleBfInsuranceFundList',
    method: 'post',
    data: Datas
  })
}
// 获取【医保结算员工】打款账号列表
export const GetMedicalSettleMemberSettleBfInsuranceFundList = (Datas) => {
  return request({
    url: '/Salary/GetMedicalSettleMemberSettleBfInsuranceFundList',
    method: 'post',
    data: Datas
  })
}
//获取代垫剩余金额项目查询
export const GetSubstituteCushionResidualByProjectId = Datas => {
  return request({
    url: "/Salary/GetSubstituteCushionResidualByProjectId",
    method: "post",
    data: Datas
  });
}

//获取项目
export const GetChargeAvailableAmount = Datas => {
  return request({
    url: "/Salary/GetChargeAvailableAmount",
    method: "post",
    data: Datas
  });
};
// 获取社保付款申请枚举-状态
export const GetSocialSecurityPayApplyEnumStatus = Datas => {
  return request({
    url: "/Salary/GetSocialSecurityPayApplyEnumStatus",
    method: "post",
    data: Datas
  });
};
// 添加社保付款申请
export const AddSocialSecurityPayApply = Datas => {
  return request({
    url: "/Salary/AddSocialSecurityPayApply",
    method: "post",
    data: Datas
  });
};
// 发起其他费用付款申请
export const OtherExpensePayApply = Datas => {
  return request({
    url: "/Salary/OtherExpensePayApply",
    method: "post",
    data: Datas
  });
};
// 获取社保付款申请分页列表
export const GetSocialSecurityPayApplyPageList = Datas => {
  return request({
    url: "/Salary/GetSocialSecurityPayApplyPageList",
    method: "post",
    data: Datas
  });
};
// 修改付款申请状态
export const UpdateSocialSecurityPayApplyStatus = Datas => {
  return request({
    url: "/Salary/UpdateSocialSecurityPayApplyStatus",
    method: "post",
    data: Datas
  });
};
// 删除社保付款申请
export const DeleteSocialSecurityPayApply = Datas => {
  return request({
    url: "/Salary/DeleteSocialSecurityPayApply",
    method: "post",
    data: Datas
  });
};
// 获取社保付款申请详情
export const GetSocialSecurityPayApplyInfo = Datas => {
  return request({
    url: "/Salary/GetSocialSecurityPayApplyInfo",
    method: "post",
    data: Datas
  });
};
// 结算单付款状态枚举
export const OtherExpenseSettleStatusEnum = Datas => {
  return request({
    url: "/Salary/OtherExpenseSettleStatusEnum",
    method: "post",
    data: Datas
  });
};