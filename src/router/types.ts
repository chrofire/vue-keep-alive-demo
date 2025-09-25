export type MenuItem = {
    /** 菜单id */
    id: string,
    /** 父菜单id */
    parentId?: string,
    /** 菜单排序 */
    orderNum?: number,
    /** 菜单名称 */
    menuName: string,
    /** 菜单图标 */
    menuIcon?: string,
    /**
     * 菜单类型
     * 0: 目录 1: 菜单 2: 按钮
     */
    menuType: number,
    /** 组件唯一值 */
    componentKey?: string,
    /** 是否缓存 */
    isCache?: number,
    /** 是否显示 */
    isShow?: number,
    /** 是否外链 */
    isOutLink?: number,
    /** 路由路径 */
    routerPath: string,
    /** 权限 */
    permission?: string,
    /** 备注 */
    remark?: string,
    /** 子菜单 */
    children?: MenuItem[]
}
