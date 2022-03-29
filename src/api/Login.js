import loquest from '@/utils/lorequest'

// 会员登录授权
export const MemberLogin = (Datas) => {
  return loquest({
    url: '/OAuthen/MemberLogin',
    method: 'post',
    data: Datas
  })
}

// 退出登录
export const MemberLoginOut = (Datas) => {
  return loquest({
    url: '/OAuthen/MemberLoginOut',
    method: 'post',
    data: Datas
  })
}
