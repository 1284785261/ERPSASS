import request from '@/utils/request'

// 添加提醒
export const AddReminds = (Datas) => {
  return request({
    url: '/Common/AddRemind',
    method: 'post',
    data: Datas
  })
}

//查询我的提醒列表
export const GetMyRemindList = (Datas) => {
  return request({
    url: '/Common/GetMyRemindList',
    method: 'post',
    data: Datas
  })
}

//修改提醒状态
export const EditRemindStatus = (Datas) => {
  return request({
    url: '/Common/EditRemindStatus',
    method: 'post',
    data: Datas
  })
}

// 删除提醒
export const DeleteRemind = (Datas) => {
  return request({
    url: '/Common/DeleteRemind',
    method: 'post',
    data: Datas
  })
}

// 获取提醒详情
export const GetRemind = (Datas) => {
  return request({
    url: '/Common/GetRemind',
    method: 'post',
    data: Datas
  })
}

// 获取提醒类型
export const GetRemindTypeEnum = (Datas) => {
  return request({
    url: '/Common/GetRemindTypeEnum',
    method: 'post',
    data: Datas
  })
}

// 获取项目提醒列表
export const GetRelatedAgencyTask = (Datas) => {
  return request({
    url: '/Common/GetRelatedAgencyTask',
    method: 'post',
    data: Datas
  })
}
