import request from '@/utils/request'

export const xxx = (Datas) => {
  return request({
    // url: process.env.VUE_APP_BASE_API_COMPANY + '/Employer/GetEmployerContactList',
    method: 'post',
    data: Datas
  })
}