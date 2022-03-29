import request from '@/utils/request'

// 下载导入模板
export const GetImportToProjectSrvCommisionExcelModel = (Datas) => {
  return request({
    url: '/Staff/GetImportToProjectSrvCommisionExcelModel',
    method: 'post',
    data: Datas
  })
}

// 外包员工导入
export const ImportToStaffEffectExcel = (Datas) => {
  return request({
    url: '/Staff/ImportToStaffEffectExcel',
    method: 'post',
    data: Datas
  })
}

// 获取招聘外包员工信息分页列表
export const GetRecruitStaffPageList = (Datas) => {
  return request({
    url: '/Staff/GetRecruitStaffPageList',
    method: 'post',
    data: Datas
  })
}

// 获取入职外包员工分页列表 (用于项目选择要添加的员工)
export const GetEntryStaffPageList = (Datas) => {
  return request({
    url: '/Staff/GetEntryStaffPageList',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工社保公积金状态
export const EditStaffSiFunStatus = (Datas) => {
  return request({
    url: '/Staff/EditStaffSiFunStatus',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工信息分页列表
export const GetStaffPageList = (Datas) => {
  return request({
    url: '/Staff/GetStaffPageList',
    method: 'post',
    data: Datas
  })
}

// 导入外包员工信息
export const ImportToStaffExcel = (Datas) => {
  return request({
    url: '/Staff/ImportToStaffExcel',
    method: 'post',
    data: Datas
  })
}

// 导出外包员工信息
export const DownloadStaffExcel = (Datas) => {
  return request({
    url: '/Staff/DownloadStaffExcel',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工导入模板
export const GetStaffExcelModel = (Datas) => {
  return request({
    url: '/Staff/GetStaffExcelModel',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工项目
export const EditStaffProject = (Datas) => {
  return request({
    url: '/Staff/EditStaffProject',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工家庭成员列表
export const GetStaffFamilyList = (Datas) => {
  return request({
    url: '/Staff/GetStaffFamilyList',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工家庭成员
export const EditStaffFamily = (Datas) => {
  return request({
    url: '/Staff/EditStaffFamily',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工家庭成员
export const DeleteStaffFamily = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffFamily',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工家庭成员
export const AddStaffFamily = (Datas) => {
  return request({
    url: '/Staff/AddStaffFamily',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工工作经历列表
export const GetStaffWorkExpList = (Datas) => {
  return request({
    url: '/Staff/GetStaffWorkExpList',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工工作经历
export const AddStaffWorkExp = (Datas) => {
  return request({
    url: '/Staff/AddStaffWorkExp',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工工作经历
export const EditStaffWorkExp = (Datas) => {
  return request({
    url: '/Staff/EditStaffWorkExp',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工工作经历
export const DeleteStaffWorkExp = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffWorkExp',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工教育信息枚举
export const GetStaffEduEnum = (Datas) => {
  return request({
    url: '/Staff/GetStaffEduEnum',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工教育信息列表
export const GetStaffEduList = (Datas) => {
  return request({
    url: '/Staff/GetStaffEduList',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工教育信息
export const EditStaffEdu = (Datas) => {
  return request({
    url: '/Staff/EditStaffEdu',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工教育信息
export const AddStaffEdu = (Datas) => {
  return request({
    url: '/Staff/AddStaffEdu',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工教育信息
export const DeleteStaffEdu = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffEdu',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工信息
export const GetStaffInfo = (Datas) => {
  return request({
    url: '/Staff/GetStaffInfo',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工信息
export const DeleteStaff = (Datas) => {
  return request({
    url: '/Staff/DeleteStaff',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工状态
export const EditStaffStatus = (Datas) => {
  return request({
    url: '/Staff/EditStaffStatus',
    method: 'post',
    data: Datas
  })
}

// 重新入职
export const EditStaffReEntry = (Datas) => {
  return request({
    url: '/Staff/EditStaffReEntry',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工信息
export const AddStaff = (Datas) => {
  return request({
    url: '/Staff/AddStaff',
    method: 'post',
    data: Datas
  })
}

// 修改外包员工信息
export const EditStaff = (Datas) => {
  return request({
    url: '/Staff/EditStaff',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工公积金缴纳标准
export const AddStaffFund = (Datas) => {
  return request({
    url: '/Staff/AddStaffFund',
    method: 'post',
    data: Datas
  })
}

// 编辑外包员工公积金缴纳标准
export const EditStaffFund = (Datas) => {
  return request({
    url: '/Staff/EditStaffFund',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工公积金缴纳标准详情
export const GetStaffFund = (Datas) => {
  return request({
    url: '/Staff/GetStaffFund',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工公积金缴纳标准
export const DeleteStaffFund = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffFund',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工工资发送标准
export const AddStaffSalary = (Datas) => {
  return request({
    url: '/Staff/AddStaffSalary',
    method: 'post',
    data: Datas
  })
}

// 编辑外包员工工资发送标准
export const EditStaffSalary = (Datas) => {
  return request({
    url: '/Staff/EditStaffSalary',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工工资发送标准详情
export const GetStaffSalary = (Datas) => {
  return request({
    url: '/Staff/GetStaffSalary',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工工资发送标准
export const DeleteStaffSalary = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffSalary',
    method: 'post',
    data: Datas
  })
}

// 获取社保计算规则详情
export const GetStaffSi = (Datas) => {
  return request({
    url: '/Staff/GetStaffSi',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工社保缴纳标准
export const AddStaffSi = (Datas) => {
  return request({
    url: '/Staff/AddStaffSi',
    method: 'post',
    data: Datas
  })
}

// 编辑外包员工社保缴纳标准
export const EditStaffSi = (Datas) => {
  return request({
    url: '/Staff/EditStaffSi',
    method: 'post',
    data: Datas
  })
}

// 删除外包员工社保缴纳标准
export const DeleteStaffSi = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffSi',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工历史分页列表
export const GetStaffHistoryPageList = (Datas) => {
  return request({
    url: '/Staff/GetStaffHistoryPageList',
    method: 'post',
    data: Datas
  })
}

// 获取外包员工历史信息详情
export const GetStaffHistoryInfo = (Datas) => {
  return request({
    url: '/Staff/GetStaffHistoryInfo',
    method: 'post',
    data: Datas
  })
}

// 添加外包员工离职信息
export const AddStaffLeave = (Datas) => {
  return request({
    url: '/Staff/AddStaffLeave',
    method: 'post',
    data: Datas
  })
}


//获取外包员工合同列表
export const GetStaffContractList = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractList',
    method: 'post',
    data: Datas
  })
}

//删除外包员工合同列表
export const DeleteStaffContract = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffContract',
    method: 'post',
    data: Datas
  })
}

//获取外包合同类型
export const GetStaffContractType = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractType',
    method: 'post',
    data: Datas
  })
}

//添加外包员工合同
export const AddStaffContract = (Datas) => {
  return request({
    url: '/Staff/AddStaffContract',
    method: 'post',
    data: Datas
  })
}

//编辑外包员工合同
export const EditStaffContract = (Datas) => {
  return request({
    url: '/Staff/EditStaffContract',
    method: 'post',
    data: Datas
  })
}

//获取外包员工合同详情
export const GetStaffContract = (Datas) => {
  return request({
    url: '/Staff/GetStaffContract',
    method: 'post',
    data: Datas
  })
}

//续签合同
export const RenewalStaffContract = (Datas) => {
  return request({
    url: '/Staff/RenewalStaffContract',
    method: 'post',
    data: Datas
  })
}

//获取证明开具申请状态枚举
export const GetProveApplyEnumStatus = (Datas) => {
  return request({
    url: '/Staff/GetProveApplyEnumStatus',
    method: 'post',
    data: Datas
  })
}

//获取证明开具分页列表
export const GetProveApplyPageList = (Datas) => {
  return request({
    url: '/Staff/GetProveApplyPageList',
    method: 'post',
    data: Datas
  })
}

//修改外包员工证明开具状态
export const EditProveApplyStatus = (Datas) => {
  return request({
    url: '/Staff/EditProveApplyStatus',
    method: 'post',
    data: Datas
  })
}

//添加外包员工证明开具
export const AddProveApply = (Datas) => {
  return request({
    url: '/Staff/AddProveApply',
    method: 'post',
    data: Datas
  })
}

//修改外包员工证明开具
export const EditProveApply = (Datas) => {
  return request({
    url: '/Staff/EditProveApply',
    method: 'post',
    data: Datas
  })
}

//获取外包员工证明开具详情
export const GetProveApplyInfo = (Datas) => {
  return request({
    url: '/Staff/GetProveApplyInfo',
    method: 'post',
    data: Datas
  })
}

//导入员工合同接口
export const ImportStaffContract = (Datas) => {
  return request({
    url: '/Staff/ImportStaffContract',
    method: 'post',
    data: Datas
  })
}

//获取员工合同模板
export const GetStaffContractExcelModel = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractExcelModel',
    method: 'post',
    data: Datas
  })
}

//加入黑名单
export const AddStaffBlack = (Datas) => {
  return request({
    url: '/Staff/AddStaffBlack',
    method: 'post',
    data: Datas
  })
}

//获取黑名单列表
export const GetStaffBlackPageList = (Datas) => {
  return request({
    url: '/Staff/GetStaffBlackPageList',
    method: 'post',
    data: Datas
  })
}

//获取黑名单详细
export const GetStaffBlackInfo = (Datas) => {
  return request({
    url: '/Staff/GetStaffBlackInfo',
    method: 'post',
    data: Datas
  })
}

//修改黑名单备注信息
export const EditStaffBlack = (Datas) => {
  return request({
    url: '/Staff/EditStaffBlack',
    method: 'post',
    data: Datas
  })
}

//移出黑名单
export const DeleteStaffBlack = (Datas) => {
  return request({
    url: '/Staff/DeleteStaffBlack',
    method: 'post',
    data: Datas
  })
}

//获取平均工资
export const GetStaffAverageWage = (Datas) => {
  return request({
    url: '/Staff/GetStaffAverageWage',
    method: 'post',
    data: Datas
  })
}

//从用工单位离职接口
export const AddStaffProjectLeave = (Datas) => {
  return request({
    url: '/Staff/AddStaffProjectLeave',
    method: 'post',
    data: Datas
  })
}

//获取离职项目管理列表
export const GetStaffProjectLeaveList = (Datas) => {
  return request({
    url: '/Staff/GetStaffProjectLeaveList',
    method: 'post',
    data: Datas
  })
}

//外包员工入职办理
export const EntryProcessing = (Datas) => {
  return request({
    url: '/Staff/EntryProcessing',
    method: 'post',
    data: Datas
  })
}
//获取外包员工沟通记录分页列表
export const GetStaffCommunicationPageList = (Datas) => {
  return request({
    url: '/Staff/GetStaffCommunicationPageList',
    method: 'post',
    data: Datas
  })
}
// 添加外包员工沟通记录
export const AddStaffCommunication = (Datas) => {
  return request({
    url: '/Staff/AddStaffCommunication',
    method: 'post',
    data: Datas
  })
}

//员工合同在线签署
export const SubmitStaffContractSign = (Datas) => {
  return request({
    url: '/Staff/SubmitStaffContractSign',
    method: 'post',
    data: Datas
  })
}

//员工合同签署进度
export const GetStaffContractSign = (Datas) => {
  return request({
    url: '/Staff/GetStaffContractSign',
    method: 'post',
    data: Datas
  })
}