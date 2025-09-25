import { BoolType, MenuType } from '@/constants'
import router, { loginPath } from '@/router'
import { IS_LAYOUT_ROUTE_KEY, layoutRoute } from '@/router/commonRoute'
import { menuTreeList } from '@/router/mockRouteData'
import { pageMap } from '@/router/pageInfo'
import type { MenuItem } from '@/router/types'
import { redirectTo } from '@/utils/router'
import { findTreeNode } from '@/utils/tree'
import NotFound from '@/views/notFound/index.vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw, RouteRecordSingleViewWithChildren } from 'vue-router'

export const useSystemStore = defineStore('system', {
    state: () => ({
        // 是否已登录
        isLogin: false,
        // 菜单列表
        menuTreeList: [] as MenuItem[],
        menuTreeMap: {} as Record<string, MenuItem>,
        // 添加路由列表
        addRouteList: [] as RouteRecordRaw[]
    }),
    getters: {},
    actions: {
        async initMenu() {
            const menuTreeMap: Record<string, MenuItem> = {}

            const traverse = (list: MenuItem[] = []) => {
                const _list: RouteRecordRaw[] = []
                list.forEach(item => {
                    menuTreeMap[item.id] = item

                    const route: RouteRecordSingleViewWithChildren = {
                        path: item.routerPath,
                        name: item.id,
                        meta: {
                            ...item
                        },
                        children: []
                    }

                    // 目录路由
                    if (item.menuType === MenuType.Dir) {
                        // 不渲染内容, 直接渲染子路由
                        route.component = null
                    }

                    // 菜单路由
                    if (item.menuType === MenuType.Menu) {
                        route.component = createPage(item)

                        // 外链
                        if (item.isOutLink === BoolType.True) {
                            route.path = item.id
                        }
                    }

                    if (Array.isArray(item.children)) {
                        route.children = traverse(item.children)
                    }

                    _list.push(route)
                })
                return _list
            }

            const addRouteList = traverse(menuTreeList)

            this.menuTreeList = menuTreeList

            this.menuTreeMap = menuTreeMap

            this.addRouteList = addRouteList

            this.initRoute()

            this.isLogin = true
        },
        initRoute() {
            this.removeRoute(layoutRoute)
            router.addRoute({
                ...layoutRoute,
                meta: {
                    [IS_LAYOUT_ROUTE_KEY]: true
                },
                children: [...this.addRouteList]
            })
        },
        removeRoute(route: RouteRecordRaw) {
            route.name && router.hasRoute(route.name) && router.removeRoute(route.name)
        },
        /**
         * 获取第一个有效的页面路径
         */
        getFirstValidPagePath() {
            const firstValidMenu = findTreeNode<MenuItem>(this.menuTreeList, it => {
                return it.menuType === MenuType.Menu
            })

            return firstValidMenu?.routerPath
        },
        /**
         * 解析根路径重定向路径
         */
        resolveRootPathRedirectPath() {
            return this.getFirstValidPagePath() || loginPath
        },
        redirectTo(to: Parameters<typeof redirectTo>[0]) {
            // 如果直接使用从 @/utils/router 中导入的 redirectTo,
            // vite HMR 后会导致 redirectTo 中的 router 丢失
            redirectTo(to)
        }
    }
})

function createPage(menuItem: MenuItem) {
    let Component: RouteRecordRaw['component'] = pageMap[menuItem.componentKey as string]?.component

    if (!Component) {
        Component = NotFound
    }

    return Component
}
