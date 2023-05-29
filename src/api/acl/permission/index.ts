import request from '@/utils/request'

let perData = {
    allPermisstion_url: '/admin/acl/permission',
    addMenu_url: '/admin/acl/permission/save', //给某一级菜单新增一个子菜单
    updateMenu_url: '/admin/acl/permission/update', //更新某一个已有的菜单
    deleteMenu_url: '/admin/acl/permission/remove', //删除已有的菜单
}

// 获菜单数据
export const reqAllPermisstion = () => request.get(perData.allPermisstion_url)

// 添加菜单 or 更新菜单
export const reqAddOrUpdateMenu = (data: any) => {
    if (data.id) {
        return request.put(perData.updateMenu_url, data)
    } else {
        return request.post(perData.addMenu_url, data)
    }
}

// 删除菜单
export const reqRemoveMenu = (id: number) =>
    request.delete(perData.deleteMenu_url + '/' + id)
