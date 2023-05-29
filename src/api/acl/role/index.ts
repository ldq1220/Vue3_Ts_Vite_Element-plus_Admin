import request from '@/utils/request'

const roleDict = {
    getAllRole_url: '/admin/acl/role',
    addRole_url: '/admin/acl/role/save',
    updataRole_url: '/admin/acl/role/update',
    removeRole_url: '/admin/acl/role/remove',
    getAllPerm_url: '/admin/acl/permission/toAssign',
    setPermisstion_url: '/admin/acl/permission/doAssign',
}

// 获取所有的角色列表
export const reqGetAllRole = (
    page: number,
    limit: number,
    roleName: string,
) => {
    return request.get(
        `${roleDict.getAllRole_url}/${page}/${limit}/?roleName=${roleName}`,
    )
}

// 新增角色 or 更新角色
export const reqAddOrUpdataRole = (data: any) => {
    if (data.id) {
        // 更新
        return request.put(roleDict.updataRole_url, data)
    } else {
        return request.post<any, any>(roleDict.addRole_url, data)
    }
}

// 删除角色
export const reqRemoveRole = (id: number) => {
    return request.delete(`${roleDict.removeRole_url}/${id}`)
}

// 获取分配全选抽屉列表内容
export const reqGetAllPerm = (id: number) => {
    return request.get(`${roleDict.getAllPerm_url}/${id}`)
}

// 确定分配权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) => {
    return request.post(
        `${roleDict.setPermisstion_url}/?roleId=${roleId}&permissionId=${permissionId}`,
    )
}
