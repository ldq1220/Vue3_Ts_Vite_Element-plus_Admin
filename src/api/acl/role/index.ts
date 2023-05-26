import request from '@/utils/request'

const roleDict = {
    getAllRole_url: '/admin/acl/role',
    addRole_url: '/admin/acl/role/save',
    updataRole_url: '/admin/acl/role/update',
    removeRole_url: '/admin/acl/role/remove',
}

// 获取所有的角色列表
export const getAllRole = (page: number, limit: number, roleName: string) => {
    return request.get(
        `${roleDict.getAllRole_url}/${page}/${limit}/?roleName=${roleName}`,
    )
}

// 新增角色 or 更新角色
export const addOrUpdataRole = (data: any) => {
    if (data.id) {
        // 更新
        return request.put(roleDict.updataRole_url, data)
    } else {
        return request.post<any, any>(roleDict.addRole_url, data)
    }
}

// 删除角色
export const removeRole = (id: number) => {
    return request.delete(`${roleDict.removeRole_url}/${id}`)
}
