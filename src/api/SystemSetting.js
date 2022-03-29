import request from '@/utils/request'

// 根据组织id查询用户
export const GetSysUserListByOrgId = (Datas) => {
  return request({
    url: '/System/GetSysUserListByOrgId',
    method: 'post',
    data: Datas
  })
}

// 获取系统菜单列表
export const GetSysMenuList = (Datas) => {
  return request({
    url: '/System/GetSysMenuList',
    method: 'post',
    data: Datas
  })
}

// 添加系统菜单
export const AddSysMenu = (Datas) => {
  return request({
    url: '/System/AddSysMenu',
    method: 'post',
    data: Datas
  })
}

// 修改系统菜单
export const EditSysMenu = (Datas) => {
  return request({
    url: '/System/EditSysMenu',
    method: 'post',
    data: Datas
  })
}

// 删除菜单
export const DeleteSysMenu = (Datas) => {
  return request({
    url: '/System/DeleteSysMenu',
    method: 'post',
    data: Datas
  })
}

// 获取菜单操作设置列表
export const GetSysMenuOperationList = (Datas) => {
  return request({
    url: '/System/GetSysMenuOperationList',
    method: 'post',
    data: Datas
  })
}

// 保存菜单操作设置
export const EditSysMenuOperation = (Datas) => {
  return request({
    url: '/System/EditSysMenuOperation',
    method: 'post',
    data: Datas
  })
}

// 系统操作分页列表
export const GetSysOperationPageList = (Datas) => {
  return request({
    url: '/System/GetSysOperationPageList',
    method: 'post',
    data: Datas
  })
}

// 获取系统操作列表
export const GetSysOperationList = (Datas) => {
  return request({
    url: '/System/GetSysOperationList',
    method: 'post',
    data: Datas
  })
}

// 获取系统操作的详细信息
export const GetSysOperationInfo = (Datas) => {
  return request({
    url: '/System/GetSysOperationInfo',
    method: 'post',
    data: Datas
  })
}

// 添加系统操作
export const AddSysOperation = (Datas) => {
  return request({
    url: '/System/AddSysOperation',
    method: 'post',
    data: Datas
  })
}

// 修改系统操作
export const EditSysOperation = (Datas) => {
  return request({
    url: '/System/EditSysOperation',
    method: 'post',
    data: Datas
  })
}

// 删除系统操作
export const DelSysOperation = (Datas) => {
  return request({
    url: '/System/DelSysOperation',
    method: 'post',
    data: Datas
  })
}

// 获取综合分类类别(枚举值)
export const GetCatagoryClassType = (Datas) => {
  return request({
    url: '/Common/GetCatagoryClassType',
    method: 'post',
    data: Datas
  })
}

// 获取综合分类详细信息
export const GetCatagoryInfo = (Datas) => {
  return request({
    url: '/Common/GetCatagoryInfo',
    method: 'post',
    data: Datas
  })
}

// 获取综合分类分页列表
export const GetCatagoryPageList = (Datas) => {
  return request({
    url: '/Common/GetCatagoryPageList',
    method: 'post',
    data: Datas
  })
}

// 添加综合分类
export const AddCatagory = (Datas) => {
  return request({
    url: '/Common/AddCatagory',
    method: 'post',
    data: Datas
  })
}

// 修改综合分类
export const EditCatagory = (Datas) => {
  return request({
    url: '/Common/EditCatagory',
    method: 'post',
    data: Datas
  })
}

// 删除综合分类的状态
export const DeleteCatagory = (Datas) => {
  return request({
    url: '/Common/DeleteCatagory',
    method: 'post',
    data: Datas
  })
}

// 添加系统组织结构
export const AddSysOrg = (Datas) => {
  return request({
    url: '/System/AddSysOrg',
    method: 'post',
    data: Datas
  })
}

// 获取系统组织结构列表
export const GetSysOrgList = (Datas) => {
  return request({
    url: '/System/GetSysOrgList',
    method: 'post',
    data: Datas
  })
}

// 修改系统组织结构
export const EditSysOrg = (Datas) => {
  return request({
    url: '/System/EditSysOrg',
    method: 'post',
    data: Datas
  })
}

// 删除组织结构
export const DeleteSysOrg = (Datas) => {
  return request({
    url: '/System/DeleteSysOrg',
    method: 'post',
    data: Datas
  })
}

//系统设置登陆日志分页
export const SysLoginLogPageList = (Datas) => {
  return request({
    url: '/System/SysLoginLogPageList',
    method: 'post',
    data: Datas
  })
}
//系统设置操作日志分页
export const SysMgrLogPageList = (Datas) => {
  return request({
    url: '/System/SysMgrLogPageList',
    method: 'post',
    data: Datas
  })
}

//获取账号管理列表
export const GetSysUserList = (Datas) => {
  return request({
    url: '/System/GetSysUserList',
    method: 'post',
    data: Datas
  })
}

//通过ID获取账号信息
export const GetSysUserById = (Datas) => {
  return request({
    url: '/System/GetSysUserById',
    method: 'post',
    data: Datas
  })
}

//添加账号
export const AddSysUser = (Datas) => {
  return request({
    url: '/System/AddSysUser',
    method: 'post',
    data: Datas
  })
}

//修改账号
export const EditSysUser = (Datas) => {
  return request({
    url: '/System/EditSysUser',
    method: 'post',
    data: Datas
  })
}

//修改账号状态
export const EditSysUserStatus = (Datas) => {
  return request({
    url: '/System/EditSysUserStatus',
    method: 'post',
    data: Datas
  })
}

//删除账号列表
export const DeleteSysUser = (Datas) => {
  return request({
    url: '/System/DeleteSysUser',
    method: 'post',
    data: Datas
  })
}

//获取角色管理列表
export const GetSysRoleList = (Datas) => {
  return request({
    url: '/System/GetSysRoleList',
    method: 'post',
    data: Datas
  })
}

//添加角色
export const AddSysRole = (Datas) => {
  return request({
    url: '/System/AddSysRole',
    method: 'post',
    data: Datas
  })
}

//修改角色
export const EditSysRole = (Datas) => {
  return request({
    url: '/System/EditSysRole',
    method: 'post',
    data: Datas
  })
}

//查询角色详情
export const GetSysRole = (Datas) => {
  return request({
    url: '/System/GetSysRole',
    method: 'post',
    data: Datas
  })
}

//删除角色
export const DeleteSysRole = (Datas) => {
  return request({
    url: '/System/DeleteSysRole',
    method: 'post',
    data: Datas
  })
}

//获取所有应用系统类型
export const GetSystemAppType = (Datas) => {
  return request({
    url: '/System/GetSystemAppType',
    method: 'post',
    data: Datas
  })
}

//获取权限页面数据组织树状数据
export const GetSysRolePermissionOrg = (Datas) => {
  return request({
    url: '/System/GetSysRolePermissionOrg',
    method: 'post',
    data: Datas
  })
}

// 获取客户组织结构列表关联用户信息数据
export const GetSysOrgListAndUserInfo = (Datas) => {
  return request({
    url: '/System/GetSysOrgListAndUserInfo',
    method: 'post',
    data: Datas
  })
}

// 获取客户组织结构列表关联用户信息合并
export const GetSysOrgListAndUserInfoMerge = (Datas) => {
  return request({
    url: '/System/GetSysOrgListAndUserInfoMerge',
    method: 'post',
    data: Datas
  })
}

//获取当前角色权限列表
export const GetSysRolePermission = (Datas) => {
  return request({
    url: '/System/GetSysRolePermission',
    method: 'post',
    data: Datas
  })
}

//设置角色权限
export const SetRolePermission = (Datas) => {
  return request({
    url: '/System/SetRolePermission',
    method: 'post',
    data: Datas
  })
}

//获取当前登录人信息
export const GetCurrentSysUser = (Datas) => {
  return request({
    url: '/System/GetCurrentSysUser',
    method: 'post',
    data: Datas
  })
}

//修改密码
export const EditSysUserPassward = (Datas) => {
  return request({
    url: '/System/EditSysUserPassward',
    method: 'post',
    data: Datas
  })
}

//获取系统权限菜单列表
export const GetSysRoleMenu = (Datas) => {
  return request({
    url: '/System/GetSysRoleMenu',
    method: 'post',
  })
}

// 获取指定角色菜单权限配置列表
export const GetSysRoleMenuPermission = (Datas) => {
  return request({
    url: '/System/GetSysRoleMenuPermission',
    method: 'post',
    data: Datas
  })
}

// 获取指定角色数据权限配置列表
export const GetSysRoleDataPermission = (Datas) => {
  return request({
    url: '/System/GetSysRoleDataPermission',
    method: 'post',
    data: Datas
  })
}

// 配置角色菜单权限
export const SetRoleMenu = (Datas) => {
  return request({
    url: '/System/SetRoleMenu',
    method: 'post',
    data: Datas
  })
}

// 配置角色数据权限
export const SetRoleData = (Datas) => {
  return request({
    url: '/System/SetRoleData',
    method: 'post',
    data: Datas
  })
}
//获取分组列表
export const GetSysGroupList = (Datas) => {
  return request({
    url: '/System/GetSysGroupList',
    method: 'post',
    data: Datas
  })
}
//添加分组
export const AddSysGroup = (Datas) => {
  return request({
    url: '/System/AddSysGroup',
    method: 'post',
    data: Datas
  })
}
//编辑分组信息
export const EditSysGroup = (Datas) => {
  return request({
    url: '/System/EditSysGroup',
    method: 'post',
    data: Datas
  })
}
//删除分组
export const DeleteSysGroup = (Datas) => {
  return request({
    url: '/System/DeleteSysGroup',
    method: 'post',
    data: Datas
  })
}
//分组详情
export const GetSysGroup = (Datas) => {
  return request({
    url: '/System/GetSysGroup',
    method: 'post',
    data: Datas
  })
}
//分组成员列表
export const GetSysUserByGroupId = (Datas) => {
  return request({
    url: '/System/GetSysUserByGroupId',
    method: 'post',
    data: Datas
  })
}
//添加分组成员
export const AddSysUserGroup = (Datas) => {
  return request({
    url: '/System/AddSysUserGroup',
    method: 'post',
    data: Datas
  })
}

//获取法大大开通列表
export const GetFDDAccountList = (Datas) => {
  return request({
    url: '/System/GetFDDAccountList',
    method: 'post',
    data: Datas
  })
}
// export const GetFDDAccountList = (Datas) => {
//   return request({
//     url: '/System/GetFDDAccountList',
//     method: 'get',
//     params: Datas
//   })
// }

//添加法大大开通列表
export const AddFDDAccount = (Datas) => {
  return request({
    url: '/System/AddFDDAccount',
    method: 'post',
    data: Datas
  })
}
// 编辑状态
export const EditSysGroupStatus = (Datas) => {
  return request({
    url: '/System/EditSysGroupStatus',
    method: 'post',
    data: Datas
  })
}

//同步钉钉组织架构
export const ExecutOrgSynch = (Datas) => {
    return request({
      url: '/System/ExecutOrgSynch',
      method: 'post',
      data: Datas
    })
  }
  // 获取用户组织列表
  export const GetOrgByUserId = (Datas) => {
    return request({
      url: '/System/GetOrgByUserId',
      method: 'post',
      data: Datas
    })
  }