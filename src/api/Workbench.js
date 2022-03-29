import request from '@/utils/request'

// 获取工作台代办事项
export const GetWorktableToDo = (Datas) => {
  return request({
    url: '/Workbench/GetWorktableToDo',
    method: 'post',
    data: Datas
  })
}


//获取工作台新增客户
export const GetWorktableNewCompany = (Datas) => {
  return request({
    url: '/Workbench/GetWorktableNewCompany',
    method: 'post',
    data: Datas
  })
}

//获取工作台营销表图数据
export const GetWorkAchientOfOneself = (Datas) => {
  return request({
    url: '/Workbench/GetWorkAchientOfOneself',
    method: 'post',
    data: Datas
  })
}


//获取工作台项目日志
export const GetWorktableProjectAllLog = (Datas) => {
  return request({
    url: '/Workbench/GetWorktableProjectAllLog',
    method: 'post',
    data: Datas
  })
}