import request from '@/utils/request'

// 获取项目招聘指派分页列表
export const GetProjectRecruitList = (Datas) => {
  return request({
    url: '/Project/GetProjectRecruitList',
    method: 'post',
    data: Datas
  })
}

//添加项目招聘需求人员
export const AddRecruitAssign = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitAssign',
    method: 'post',
    data: Datas
  })
}

//修改项目招聘需求人员
export const EditRecruitAssignRecruiter = (Datas) => {
  return request({
    url: '/Recruit/EditRecruitAssignRecruiter',
    method: 'post',
    data: Datas
  })
}

//获取项目招聘需求已存在人员
export const GetRecruitAssignList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitAssignList',
    method: 'post',
    data: Datas
  })
}

//获取招聘推荐入职明细类型
export const GetRecruitRecommendEnum = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendEnum',
    method: 'post',
    data: Datas
  })
}

//添加全员招聘推荐入职明细
export const AddRecruitRecommend = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitRecommend',
    method: 'post',
    data: Datas
  })
}

//修改全员招聘推荐入职明细
export const EditRecruitRecommend = (Datas) => {
  return request({
    url: '/Recruit/EditRecruitRecommend',
    method: 'post',
    data: Datas
  })
}

//获取全员招聘推荐入职明细详情
export const GetRecruitRecommendInfo = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendInfo',
    method: 'post',
    data: Datas
  })
}

//删除全员招聘推荐入职明细
export const DeleteRecruitRecommend = (Datas) => {
  return request({
    url: '/Recruit/DeleteRecruitRecommend',
    method: 'post',
    data: Datas
  })
}

//获取全员招聘明细列表
export const GetRecruitRecommendPageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendPageList',
    method: 'post',
    data: Datas
  })
}

//获取招聘明细模板
export const GetRecruitRecommendExcelModel = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendExcelModel',
    method: 'post',
    data: Datas
  })
}

//导入招聘明细
export const ImportToRecruitRecommendExcel = (Datas) => {
  return request({
    url: '/Recruit/ImportToRecruitRecommendExcel',
    method: 'post',
    data: Datas
  })
}

//导出招聘明细
export const DownloadRecruitRecommend = (Datas) => {
  return request({
    url: '/Recruit/DownloadRecruitRecommend',
    method: 'post',
    data: Datas
  })
}

// 获取全员招聘推荐入职明细外包员工列表
export const GetRecruitRecommendStaffList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendStaffList',
    method: 'post',
    data: Datas
  })
}

//获取渠道质量枚举
export const GetRecruitChannelEnumQuality = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitChannelEnumQuality',
    method: 'post',
    data: Datas
  })
}

//获取渠道分页列表
export const GetRecruitChannelPageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitChannelPageList',
    method: 'post',
    data: Datas
  })
}

//获取渠道列表详情
export const GetRecruitChannel = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitChannel',
    method: 'post',
    data: Datas
  })
}

//添加渠道列表
export const AddRecruitChannel = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitChannel',
    method: 'post',
    data: Datas
  })
}

//修改渠道列表
export const EditRecruitChannel = (Datas) => {
  return request({
    url: '/Recruit/EditRecruitChannel',
    method: 'post',
    data: Datas
  })
}

//删除渠道列表
export const DeleteRecruitChannel = (Datas) => {
  return request({
    url: '/Recruit/DeleteRecruitChannel',
    method: 'post',
    data: Datas
  })
}
//  获取候选人Pipeline分页列表
export const GetRecruitPipelinePageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelinePageList',
    method: 'post',
    data: Datas
  })
}
//  获取候选人Pipeline招聘类型
export const GetRecruitPipelineEnumRecruitType = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineEnumRecruitType',
    method: 'post',
    data: Datas
  })
}
//   获取候选人Pipeline招聘计提类型
export const GetRecruitPipelineEnumRecruitProvisionType = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineEnumRecruitProvisionType',
    method: 'post',
    data: Datas
  })
}
//  获取候选人Pipeline候选人状态
export const GetRecruitPipelineEnumStatus = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineEnumStatus',
    method: 'post',
    data: Datas
  })
}
//获取候选人PipelineHistory历史分页列表
export const GetRecruitPipelineHistoryPageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineHistoryPageList',
    method: 'post',
    data: Datas
  })
}
// 修改候选人Pipeline状态
export const EditRecruitPipelineStatus = (Datas) => {
  return request({
    url: '/Recruit/EditRecruitPipelineStatus',
    method: 'post',
    data: Datas
  })
}
// 获取指定ID候选人Pipeline
export const GetRecruitPipelineById = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitPipelineById',
    method: 'post',
    data: Datas
  })
}
//AddRecruitPipelineRemarks 添加备注
export const AddRecruitPipelineRemarks = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitPipelineRemarks',
    method: 'post',
    data: Datas
  })
}
// 获取渠道类型
export const GetRecruitChannelEnumType = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitChannelEnumType',
    method: 'post',
    data: Datas
  })
}
// 添加招聘推荐入职提成汇总
export const AddRecruitRecommendDrawAPercentageSum = (Datas) => {
  return request({
    url: '/Recruit/AddRecruitRecommendDrawAPercentageSum',
    method: 'post',
    data: Datas
  })
}

// 获取招聘推荐入职提成汇总分页列表
export const GetRecruitRecommendDrawAPercentageSumPageList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendDrawAPercentageSumPageList',
    method: 'post',
    data: Datas
  })
}

// 获取招聘推荐入职提成汇总明细列表
export const GetRecruitRecommendDrawAPercentageSumDetailedList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendDrawAPercentageSumDetailedList',
    method: 'post',
    data: Datas
  })
}
// 获取招聘推荐入职提成汇总[明细信息]列表
export const GetRecruitRecommendDrawAPercentageSumDetailedInfoList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendDrawAPercentageSumDetailedInfoList',
    method: 'post',
    data: Datas
  })
}

// 获取招聘推荐入职提成汇总[统计信息]列表
export const GetRecruitRecommendDrawAPercentageSumStatisticsInfoList = (Datas) => {
  return request({
    url: '/Recruit/GetRecruitRecommendDrawAPercentageSumStatisticsInfoList',
    method: 'post',
    data: Datas
  })
}
// 导出提成汇总明细
export const ExportRecruitRecommendDrawAPercentageSum = (Datas) => {
  return request({
    url: '/Recruit/ExportRecruitRecommendDrawAPercentageSum',
    method: 'post',
    data: Datas
  })
}

// 修改招聘推荐入职提成审批状态
export const EditRecruitRecommendDrawAPercentageSumStatus = (Datas) => {
  return request({
    url: '/Recruit/EditRecruitRecommendDrawAPercentageSumStatus',
    method: 'post',
    data: Datas
  })
}
// 删除招聘推荐入职提成汇总
export const DeleteRecruitRecommendDrawAPercentageSum = (Datas) => {
  return request({
    url: '/Recruit/DeleteRecruitRecommendDrawAPercentageSum',
    method: 'post',
    data: Datas
  })
}