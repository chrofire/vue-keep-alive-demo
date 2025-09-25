import { BoolType, MenuType } from '@/constants'
import { type Component, defineComponent, h, type VNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

// pageWrapperMap 缓存的是 重新定义组件名称的包装组件
// keep-alive 缓存的是 vnode, 可能是原始组件的 vnode, 也可能是包装组件的 vnode

/**
 * 页面 key 生成函数
 * @param route 路由对象
 * @returns 页面 key
 */
export function getPageKey(route: RouteLocationNormalizedLoaded) {
    return `Page:${route.fullPath}`
}

/**
 * 判断页面是否需要缓存
 * @param route 路由对象
 * @returns 是否需要缓存
 */
export function isNeedCachePage(route: RouteLocationNormalizedLoaded) {
    const { menuType, isCache } = route.meta || {}
    // 只有是 菜单类型 且 isCache 为 1 才缓存
    return menuType === MenuType.Menu && isCache === BoolType.True
}

/**
 * 创建页面包装管理器
 * @param _getPageKey 页面 key 生成函数
 */
function createPageWrapperManager(_getPageKey: typeof getPageKey) {
    /**
     * 页面包装组件映射
     */
    const pageWrapperMap = new Map<string, Component>()

    /**
     * 获取页面包装组件 vnode
     * @param component 页面组件 vnode
     * @param route 路由对象
     * @returns 页面包装组件 vnode
     */
    function getPageWrapperVNode(component: VNode, route: RouteLocationNormalizedLoaded) {
        const pageKey = _getPageKey(route)

        // 检查页面是否需要缓存, 不需要缓存则直接返回
        if (!isNeedCachePage(route)) {
            return h(component)
        }

        // 如果是已经创建过的包装组件, 直接返回 vnode
        if (pageWrapperMap.has(pageKey)) {
            return h(pageWrapperMap.get(pageKey)!)
        }

        // 创建包装组件
        const wrapperComponent = defineComponent({
            name: pageKey,
            render() {
                return h(component)
            }
        })
        pageWrapperMap.set(pageKey, wrapperComponent)

        // 返回包装组件 vnode
        return h(wrapperComponent)
    }

    /**
     * 根据 include 和 exclude 清理包装组件
     * @param include 包含的 key
     * @param exclude 排除的 key
     */
    function clearByIncludeAndExclude(include: string[], exclude: string[]) {
        pageWrapperMap.forEach((value, key) => {
            if (!include.includes(key) || exclude.includes(key)) {
                pageWrapperMap.delete(key)
            }
        })
    }

    /**
     * 获取包装组件信息
     */
    function getPageWrapperInfo() {
        return {
            size: pageWrapperMap.size,
            keys: Array.from(pageWrapperMap.keys())
        }
    }

    return {
        pageWrapperMap,
        getPageWrapperVNode,
        clearByIncludeAndExclude,
        getPageWrapperInfo
    }
}

// 全局唯一的页面包装管理器实例
export const pageWrapperManager = createPageWrapperManager(getPageKey)
