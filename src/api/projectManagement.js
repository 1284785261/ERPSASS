import request from '@/utils/request'

// 获取项目指派的成员
export const GetProjectAssignMemberList = (Datas) => {
  return request({
    url: '/Project/GetProjectAssignMemberList ',
    method: 'post',
    data: Datas
  })
}

// 项目周期内每月统计数据
export const GetProjectStaffStatisticsInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectStaffStatisticsInfo ',
    method: 'post',
    data: Datas
  })
}

// 根据简历id查询就职项目
export const GetProjectListByStaffId = (Datas) => {
  return request({
    url: '/Project/GetProjectListByStaffId ',
    method: 'post',
    data: Datas
  })
}

// 获取项目列表
export const GetProjectListByCompanyIds = (Datas) => {
  return request({
    url: '/Project/GetProjectListByCompanyIds ',
    method: 'post',
    data: Datas
  })
}

// 上传项目数据
export const ImportToProjectExcel = (Datas) => {
  return request({
    url: '/Project/ImportToProjectExcel ',
    method: 'post',
    data: Datas
  })
}

// 下载项目模板
export const GetImportToProjectExcelModel = (Datas) => {
  return request({
    url: '/Project/GetImportToProjectExcelModel  ',
    method: 'post',
    data: Datas
  })
}

// 获取钉钉票证
export const GetJsticket = (Datas) => {
  return request({
    url: '/Project/GetJsticket',
    method: 'post',
    data: Datas
  })
}

// 项目月收支数据信息
export const GetProjectBoardList = (Datas) => {
  return request({
    url: '/Project/GetProjectBoardList',
    method: 'post',
    data: Datas
  })
}

// 获取项目收支信息
export const GetProjectBoard = (Datas) => {
  return request({
    url: '/Project/GetProjectBoard',
    method: 'post',
    data: Datas
  })
}

// 毛利列表
export const GrossProfitList = (Datas) => {
  return request({
    url: '/Project/GrossProfitList',
    method: 'post',
    data: Datas
  })
}

// 导出项目月份费用
export const ExportProjectBoard = (Datas) => {
  return request({
    url: '/Project/ExportProjectBoard',
    method: 'post',
    data: Datas
  })
}

// 获取人均管理费
export const GetProjectMgrFeeEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectMgrFeeEnum',
    method: 'post',
    data: Datas
  })
}

// 获取项目风险承担方
export const GetProjectUndertakerEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectUndertakerEnum',
    method: 'post',
    data: Datas
  })
}

// 获取项目参保情况
export const GetProjectSiTypeEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectSiTypeEnum',
    method: 'post',
    data: Datas
  })
}

// 获取项目员工分页列表
export const GetProjectStaffInfoPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectStaffInfoPageList',
    method: 'post',
    data: Datas
  })
}

// 添加项目员工
export const AddProjectStaff = (Datas) => {
  return request({
    url: '/Project/AddProjectStaff',
    method: 'post',
    data: Datas
  })
}

// 删除项目员工
export const DeleteProjectStaff = (Datas) => {
  return request({
    url: '/Project/DeleteProjectStaff',
    method: 'post',
    data: Datas
  })
}

// 获取项目合同信息分页列表
export const GetProjectContractPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectContractPageList',
    method: 'post',
    data: Datas
  })
}

// 获取项目合同信息
export const GetProjectContract = (Datas) => {
  return request({
    url: '/Project/GetProjectContract',
    method: 'post',
    data: Datas
  })
}

// 修改项目合同信息
export const EditProjectContract = (Datas) => {
  return request({
    url: '/Project/EditProjectContract',
    method: 'post',
    data: Datas
  })
}

// 添加项目合同信息
export const AddProjectContract = (Datas) => {
  return request({
    url: '/Project/AddProjectContract',
    method: 'post',
    data: Datas
  })
}

// 获取项目费用分页列表
export const GetProjectFeePageList = (Datas) => {
  return request({
    url: '/Project/GetProjectFeePageList',
    method: 'post',
    data: Datas
  })
}

// 添加项目费用
export const AddProjectFee = (Datas) => {
  return request({
    url: '/Project/AddProjectFee',
    method: 'post',
    data: Datas
  })
}

// 获取项目费用
export const GetProjectFeeInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectFeeInfo',
    method: 'post',
    data: Datas
  })
}

// 修改项目费用
export const EditProjectFee = (Datas) => {
  return request({
    url: '/Project/EditProjectFee',
    method: 'post',
    data: Datas
  })
}

// 删除项目费用
export const DeleteProjectFee = (Datas) => {
  return request({
    url: '/Project/DeleteProjectFee',
    method: 'post',
    data: Datas
  })
}

// 添加项目费用审核
export const AddProjectFeeExamine = (Datas) => {
  return request({
    url: '/Project/AddProjectFeeExamine',
    method: 'post',
    data: Datas
  })
}

// 添加项目
export const AddProject = (Datas) => {
  return request({
    url: '/Project/AddProject',
    method: 'post',
    data: Datas
  })
}

// 编辑项目
export const EditdProject = (Datas) => {
  return request({
    url: '/Project/EditdProject',
    method: 'post',
    data: Datas
  })
}

// 获取项目详情
export const GetProject = (Datas) => {
  return request({
    url: '/Project/GetProject',
    method: 'post',
    data: Datas
  })
}

// 获取项目员工日志列表
export const GetProjectStaffLogList = (Datas) => {
  return request({
    url: '/Project/GetProjectStaffLogList',
    method: 'post',
    data: Datas
  })
}

// 获取项目日志分页列表
export const GetProjectLogsPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectLogsPageList',
    method: 'post',
    data: Datas
  })
}

// 添加项目招聘需求
export const AddProjectRecruit = (Datas) => {
  return request({
    url: '/Project/AddProjectRecruit',
    method: 'post',
    data: Datas
  })
}

// 编辑项目招聘需求
export const EditdProjectRecruit = (Datas) => {
  return request({
    url: '/Project/EditdProjectRecruit',
    method: 'post',
    data: Datas
  })
}

// 删除项目招聘需求
export const DeleteProjectRecruitStatus = (Datas) => {
  return request({
    url: '/Project/DeleteProjectRecruitStatus',
    method: 'post',
    data: Datas
  })
}

// 编辑项目招聘需求状态
export const EditdProjectRecruitStatus = (Datas) => {
  return request({
    url: '/Project/EditdProjectRecruitStatus',
    method: 'post',
    data: Datas
  })
}

// 获取项目外包派遣业务信息详情
export const GetProjectRecruit = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruit',
    method: 'post',
    data: Datas
  })
}

// 获取项目沟通记录列表
export const GetProjectFollowList = (Datas) => {
  return request({
    url: '/Project/GetProjectFollowList',
    method: 'post',
    data: Datas
  })
}

// 添加项目沟通记录
export const AddProjectFollow = (Datas) => {
  return request({
    url: '/Project/AddProjectFollow',
    method: 'post',
    data: Datas
  })
}

// 编辑项目沟通记录
export const EditdProjectFollow = (Datas) => {
  return request({
    url: '/Project/EditdProjectFollow',
    method: 'post',
    data: Datas
  })
}

// 获取项目指派列表
export const GetProjectAssignList = (Datas) => {
  return request({
    url: '/Project/GetProjectAssignList',
    method: 'post',
    data: Datas
  })
}

// 获取项目指派成员类型
export const GetProjectAssignType = (Datas) => {
  return request({
    url: '/Project/GetProjectAssignType',
    method: 'post',
    data: Datas
  })
}

// 添加项目指派
export const AddProjectAssign = (Datas) => {
  return request({
    url: '/Project/AddProjectAssign',
    method: 'post',
    data: Datas
  })
}

// 修改业务负责人
export const EditProjectSysUser = (Datas) => {
  return request({
    url: '/Project/EditProjectSysUser',
    method: 'post',
    data: Datas
  })
}

// 修改项目管理员
export const EditProjectAssign = (Datas) => {
  return request({
    url: '/Project/EditProjectAssign',
    method: 'post',
    data: Datas
  })
}

// 编辑财务回款认领状态
export const EditProjectMoneyDrawStatus = (Datas) => {
  return request({
    url: '/Project/EditProjectMoneyDrawStatus',
    method: 'post',
    data: Datas
  })
}

// 获取财务回款认领分页列表
export const GetProjectMoneyDrawPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectMoneyDrawPageList',
    method: 'post',
    data: Datas
  })
}

// 获取项目回款认领详情
export const GetProjectMoneyDrawInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectMoneyDrawInfo',
    method: 'post',
    data: Datas
  })
}

// 修改项目回款认领
export const EditProjectMoneyDraw = (Datas) => {
  return request({
    url: '/Project/EditProjectMoneyDraw',
    method: 'post',
    data: Datas
  })
}

// 添加项目回款认领
export const AddProjectMoneyDraw = (Datas) => {
  return request({
    url: '/Project/AddProjectMoneyDraw',
    method: 'post',
    data: Datas
  })
}

// 获取我管辖的项目列表
export const GetMyRightProjectList = (Datas) => {
  return request({
    url: '/Project/GetMyRightProjectList',
    method: 'post',
    data: Datas
  })
}

// 获取我参与的项目列表
export const GetMyJoinProjectList = (Datas) => {
  return request({
    url: '/Project/GetMyJoinProjectList',
    method: 'post',
    data: Datas
  })
}

// 获取我管理的项目列表
export const GetMyMasterProjectList = (Datas) => {
  return request({
    url: '/Project/GetMyMasterProjectList',
    method: 'post',
    data: Datas
  })
}

// 获取项目列表
export const GetProjectList = (Datas) => {
  return request({
    url: '/Project/GetProjectList',
    method: 'post',
    data: Datas
  })
}

// 获取项目列表所有状态
export const GetProjectStatusEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectStatusEnum',
    method: 'post',
    data: Datas
  })
}

//获取项目类型
export const GetProjectBusinessType = (Datas) => {
  return request({
    url: '/Project/GetProjectBusinessType',
    method: 'post',
    data: Datas
  })
}

// 协议执行年度
export const GetYearthEnum = (Datas) => {
  return request({
    url: '/Project/GetYearthEnum',
    method: 'post',
    data: Datas
  })
}

// 获取营销模式
export const GetMarketTypeEnum = (Datas) => {
  return request({
    url: '/Project/GetMarketTypeEnum',
    method: 'post',
    data: Datas
  })
}

//编辑项目状态
export const EditProjectStatus = (Datas) => {
  return request({
    url: '/Project/EditProjectStatus',
    method: 'post',
    data: Datas
  })
}

//获取项目沟通阶段列表
export const GetProjectProgressEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectProgressEnum',
    method: 'post',
    data: Datas
  })
}

//修改沟通阶段
export const EditProjectProgress = (Datas) => {
  return request({
    url: '/Project/EditProjectProgress',
    method: 'post',
    data: Datas
  })
}

//获取业务分成类型
export const GetProjectBuzCommisionEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectBuzCommisionEnum',
    method: 'post',
    data: Datas
  })
}

//删除业务分成
export const DeleteProjectBuzCommision = (Datas) => {
  return request({
    url: '/Project/DeleteProjectBuzCommision',
    method: 'post',
    data: Datas
  })
}

//添加业务分成
export const AddProjectBuzCommision = (Datas) => {
  return request({
    url: '/Project/AddProjectBuzCommision',
    method: 'post',
    data: Datas
  })
}

//添加服务分成
export const AddProjectSrvCommision = (Datas) => {
  return request({
    url: '/Project/AddProjectSrvCommision',
    method: 'post',
    data: Datas
  })
}

//获取服务分成类型
export const GetProjectSrvCommisionEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectSrvCommisionEnum',
    method: 'post',
    data: Datas
  })
}

//获取招投标购买列表
export const GetProjectTenderApplyPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectTenderApplyPageList',
    method: 'post',
    data: Datas
  })
}

//添加招标购买
export const AddProjectTenderApply = (Datas) => {
  return request({
    url: '/Project/AddProjectTenderApply',
    method: 'post',
    data: Datas
  })
}

//修改招标购买
export const EditProjectTenderApply = (Datas) => {
  return request({
    url: '/Project/EditProjectTenderApply',
    method: 'post',
    data: Datas
  })
}

//获取招标申请信息
export const GetProjectTenderApplyInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectTenderApplyInfo',
    method: 'post',
    data: Datas
  })
}

//获取招标信息反馈列表
export const GetProjectTenderPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectTenderPageList',
    method: 'post',
    data: Datas
  })
}

//添加招标信息反馈
export const AddProjectTender = (Datas) => {
  return request({
    url: '/Project/AddProjectTender',
    method: 'post',
    data: Datas
  })
}

//修改招标信息反馈
export const EditProjectTender = (Datas) => {
  return request({
    url: '/Project/EditProjectTender',
    method: 'post',
    data: Datas
  })
}

//获取招标信息反馈枚举字段
export const GetProjectTenderEnum = (Datas) => {
  return request({
    url: '/Project/GetProjectTenderEnum',
    method: 'post',
    data: Datas
  })
}

//获取信息反馈详情
export const GetProjectTenderInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectTenderInfo',
    method: 'post',
    data: Datas
  })
}

//删除信息反馈表
export const DeleteProjectTender = (Datas) => {
  return request({
    url: '/Project/DeleteProjectTender',
    method: 'post',
    data: Datas
  })
}

//获取业务设置人员列表
export const GetProjectBuzCommisionList = (Datas) => {
  return request({
    url: '/Project/GetProjectBuzCommisionList',
    method: 'post',
    data: Datas
  })
}
//修改业务设置人员分成
export const EditProjectBuzCommision = (Datas) => {
  return request({
    url: '/Project/EditProjectBuzCommision',
    method: 'post',
    data: Datas
  })
}

//获取服务人员提成列表
export const GetProjectSrvCommisionList = (Datas) => {
  return request({
    url: '/Project/GetProjectSrvCommisionList',
    method: 'post',
    data: Datas
  })
}

//删除服务人员列表
export const DeleteProjectSrvCommision = (Datas) => {
  return request({
    url: '/Project/DeleteProjectSrvCommision',
    method: 'post',
    data: Datas
  })
}

//修改服务人员列表
export const EditProjectSrvCommision = (Datas) => {
  return request({
    url: '/Project/EditProjectSrvCommision',
    method: 'post',
    data: Datas
  })
}

//添加项目审核报价
export const AddProjectPrice = (Datas) => {
  return request({
    url: '/Project/AddProjectPrice',
    method: 'post',
    data: Datas
  })
}

//获取项目审核报价
export const GetProjectPriceList = (Datas) => {
  return request({
    url: '/Project/GetProjectPriceList',
    method: 'post',
    data: Datas
  })
}

//修改项目审核报价
export const EditProjectPrice = (Datas) => {
  return request({
    url: '/Project/EditProjectPrice',
    method: 'post',
    data: Datas
  })
}

//删除项目审核报价
export const DeleteProjectPrice = (Datas) => {
  return request({
    url: '/Project/DeleteProjectPrice',
    method: 'post',
    data: Datas
  })
}

//提交项目审核报价
export const ProjectPriceApproval = (Datas) => {
  return request({
    url: '/Project/ProjectPriceApproval',
    method: 'post',
    data: Datas
  })
}

//获取项目审核报价详情
export const GetProjectPriceInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectPriceInfo',
    method: 'post',
    data: Datas
  })
}

//Id查询招聘需求详情
export const GetProjectRecruitById = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruitById',
    method: 'post',
    data: Datas
  })
}

//提交到钉钉审批项目
export const ProjectApproval = (Datas) => {
  return request({
    url: '/Project/ProjectApproval',
    method: 'post',
    data: Datas
  })
}

//提交项目招聘审核
export const ProjectRecruitApproval = (Datas) => {
  return request({
    url: '/Project/ProjectRecruitApproval',
    method: 'post',
    data: Datas
  })
}

//提交招标文件购买审批
export const ProjectTenderApplyApproval = (Datas) => {
  return request({
    url: '/Project/ProjectTenderApplyApproval',
    method: 'post',
    data: Datas
  })
}

//删除招标文件购买
export const DeleteProjectTenderApply = (Datas) => {
  return request({
    url: '/Project/DeleteProjectTenderApply',
    method: 'post',
    data: Datas
  })
}

//提交标前信息反馈表审批
export const ProjectTenderApproval = (Datas) => {
  return request({
    url: '/Project/ProjectTenderApproval',
    method: 'post',
    data: Datas
  })
}

//提交业务人员审批
export const ProjectBuzCommisionApproval = (Datas) => {
  return request({
    url: '/Project/ProjectBuzCommisionApproval',
    method: 'post',
    data: Datas
  })
}

//提交服务人员审批
export const ProjectSrvCommisionApproval = (Datas) => {
  return request({
    url: '/Project/ProjectSrvCommisionApproval',
    method: 'post',
    data: Datas
  })
}

//修改外包人员项目列表
export const EditProjectStaff = (Datas) => {
  return request({
    url: '/Project/EditProjectStaff',
    method: 'post',
    data: Datas
  })
}

//根据员工获取已入职项目
export const GetProjectStaffPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectStaffPageList',
    method: 'post',
    data: Datas
  })
}

//获取招聘需求状态
export const GetProjectRecruitEnumRecruitStatus = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruitEnumRecruitStatus',
    method: 'post',
    data: Datas
  })
}

//修改招聘需求状态
export const EditdProjectRecruitRecruitStatus = (Datas) => {
  return request({
    url: '/Project/EditdProjectRecruitRecruitStatus',
    method: 'post',
    data: Datas
  })
}

//获取招聘需求已招人数
export const GetProjectRecruitStaffList = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruitStaffList',
    method: 'post',
    data: Datas
  })
}
//获取项目回款记录列表
export const GetProjectMoneyDrawRecordList = (Datas) => {
  return request({
    url: '/Project/GetProjectMoneyDrawRecordList',
    method: 'post',
    data: Datas
  })
}
//获取可用项目回款认领分页列表
export const GetAvailableProjectMoneyDrawPageList = (Datas) => {
  return request({
    url: '/Project/GetAvailableProjectMoneyDrawPageList',
    method: 'post',
    data: Datas
  })
}

//获取项目合同审批状态
export const GetProjectContractApproveStatus = (Datas) => {
  return request({
    url: '/Project/GetProjectContractApproveStatus',
    method: 'post',
    data: Datas
  })
}

//导出项目合同
export const ExportProjectContract = (Datas) => {
  return request({
    url: '/Project/ExportProjectContract',
    method: 'post',
    data: Datas
  })
}

//下载项目合同附件
export const DownloadProjectContract = (Datas) => {
  return request({
    url: '/Project/DownloadProjectContract',
    method: 'post',
    data: Datas
  })
}

//删除项目合同
export const DeleteProjectContract = (Datas) => {
  return request({
    url: '/Project/DeleteProjectContract',
    method: 'post',
    data: Datas
  })
}

//修改项目合同状态
export const EditProjectContractApproveStatus = (Datas) => {
  return request({
    url: '/Project/EditProjectContractApproveStatus',
    method: 'post',
    data: Datas
  })
}

//终止合同
export const TerminationProjectContract = (Datas) => {
  return request({
    url: '/Project/TerminationProjectContract',
    method: 'post',
    data: Datas
  })
}

//获取项目合同操作枚举
export const GetProjectContractEnumOperationType = (Datas) => {
  return request({
    url: '/Project/GetProjectContractEnumOperationType',
    method: 'post',
    data: Datas
  })
}

//获取项目合同操作日志
export const GetProjectContractOperationLogPageList = (Datas) => {
  return request({
    url: '/Project/GetProjectContractOperationLogPageList',
    method: 'post',
    data: Datas
  })
}

//获取开发形式类型
export const GetDevelopmentFormEnum = (Datas) => {
  return request({
    url: '/Project/GetDevelopmentFormEnum',
    method: 'post',
    data: Datas
  })
}

//获取项目合同业务类型
export const GetProjectContractEnumType = (Datas) => {
  return request({
    url: '/Project/GetProjectContractEnumType',
    method: 'post',
    data: Datas
  })
}

//获取合同风险评估信息
export const GetProjectRiskAssessment = (Datas) => {
  return request({
    url: '/Project/GetProjectRiskAssessment',
    method: 'post',
    data: Datas
  })
}

//申请合同风险评估
export const ProjectRiskAssessmentApprove = (Datas) => {
  return request({
    url: '/Project/ProjectRiskAssessmentApprove',
    method: 'post',
    data: Datas
  })
}

//获取初审评估信息
export const GetProjectContractApprove = (Datas) => {
  return request({
    url: '/Project/GetProjectContractApprove',
    method: 'post',
    data: Datas
  })
}

//项目合同初审
export const ProjecctContractFirstApprove = (Datas) => {
  return request({
    url: '/Project/ProjecctContractFirstApprove',
    method: 'post',
    data: Datas
  })
}

//查看项目合同审批记录
export const GetProjectContractApproveNodeInfo = (Datas) => {
  return request({
    url: '/Project/GetProjectContractApproveNodeInfo',
    method: 'post',
    data: Datas
  })
}

//项目合同终审
export const ProjecctContractFinalApprove = (Datas) => {
  return request({
    url: '/Project/ProjecctContractFinalApprove',
    method: 'post',
    data: Datas
  })
}

//项目合同风险评估撤销
export const RevokeRiskApprove = (Datas) => {
  return request({
    url: '/Project/RevokeRiskApprove',
    method: 'post',
    data: Datas
  })
}

//项目合同初审撤销
export const RevokeFirstApprove = (Datas) => {
  return request({
    url: '/Project/RevokeFirstApprove',
    method: 'post',
    data: Datas
  })
}

//项目合同终审撤销
export const RevokeFinalApprove = (Datas) => {
  return request({
    url: '/Project/RevokeFinalApprove',
    method: 'post',
    data: Datas
  })
}

//项目合同续签
export const RenewalProjectContract = (Datas) => {
  return request({
    url: '/Project/RenewalProjectContract',
    method: 'post',
    data: Datas
  })
}
// 获取项目费用列表供应商信息查询
export const GetProjectFeeBySupplierIdList = (Datas) => {
  return request({
    url: '/Project/GetProjectFeeBySupplierIdList',
    method: 'post',
    data: Datas
  })
}