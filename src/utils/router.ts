import router from '@/router'
import { IS_LAYOUT_ROUTE_KEY, notFoundRoute } from '@/router/commonRoute'
import { Redirect } from '@/router/Redirect'
import { useSystemStore } from '@/stores/system'
import { useTagBarStore } from '@/stores/tagBar'
import { getPageKey } from '@/utils/pageWrapper'
import { nanoid } from 'nanoid'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw, useRouter } from 'vue-router'

// 重定向刷新页面原理:
// 利用 keep-alive 的 exclude,
// 先让 keep-alive 内部移除目标页缓存,
// 然后跳转到重定向页,
// 再跳转到目标页,
// 由于 keep-alive 内部已经移除了缓存, 所以进入目标页会重新创建组件实例

export const redirectTo = async (to: Parameters<ReturnType<typeof useRouter>['resolve']>[0]) => {
    const systemStore = useSystemStore()
    const tagBarStore = useTagBarStore()

    const _route = router.resolve(to)

    // 根路径特殊处理
    if (_route.path === '/') {
        to = systemStore.resolveRootPathRedirectPath()
    }

    const redirectInfo = getRedirectInfo(to)
    if (!redirectInfo) return

    const { matchedRoute, parentLayoutRoute, redirectRouteId, redirectRoute } = redirectInfo

    const pageKey = getPageKey(matchedRoute as RouteLocationNormalizedLoaded)

    try {
        // 添加 一次性重定向路由 到 父级布局路由下
        router.addRoute(parentLayoutRoute.name!, redirectRoute)
        tagBarStore.addExclude(pageKey)
        await router.replace({
            path: `/redirect_${redirectRouteId}/${matchedRoute.path}`,
            query: matchedRoute.query
        })
    } catch (error) {
        console.warn(error)
    } finally {
        tagBarStore.removeExclude(pageKey)
        // 移除 一次性重定向路由
        router.removeRoute(redirectRoute.name!)
    }
}

function getRedirectInfo(to: Parameters<ReturnType<typeof useRouter>['resolve']>[0]) {
    const matchedRoute = router.resolve(to)
    if (matchedRoute.name === notFoundRoute.name) {
        console.warn(`未找到页面: ${to}`)
        return
    }

    // 最近的父级布局路由
    let parentLayoutRouteName: string | null = null
    for (let i = matchedRoute.matched.length - 1; i >= 0; i--) {
        const _route = matchedRoute.matched[i]
        // 定制条件查找最近的父级布局路由
        if (_route.meta[IS_LAYOUT_ROUTE_KEY]) {
            parentLayoutRouteName = _route.name as string
            break
        }
    }

    if (!parentLayoutRouteName) {
        console.warn(`未找到最近的父级布局路由: ${to}`)
        return
    }

    const parentLayoutRoute = router.resolve({ name: parentLayoutRouteName })

    /** 一次性重定向路由 */
    const onceRedirectRouteId = nanoid()
    const onceRedirectRoute: RouteRecordRaw = {
        name: `${Redirect.name}:${onceRedirectRouteId}`,
        path: `/redirect_${onceRedirectRouteId}/:path(.*)`,
        component: Redirect
    }

    return {
        matchedRoute,
        parentLayoutRoute,
        redirectRouteId: onceRedirectRouteId,
        redirectRoute: onceRedirectRoute
    }
}
