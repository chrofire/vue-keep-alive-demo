import router from '@/router'
import { getPageKey, isNeedCachePage, pageWrapperManager } from '@/utils/pageWrapper'
import { redirectTo } from '@/utils/router'
import { defineStore } from 'pinia'
import { computed, ref, type Ref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useTagBarStore = defineStore('tagBar', () => {
    /** 标签列表 */
    const tagList: Ref<RouteLocationNormalizedLoaded[]> = ref([])

    const _exclude: Ref<Set<string>> = ref(new Set())

    /** 包含的 key */
    const include = computed(() => {
        const list = tagList.value
            // 过滤出需要缓存的页面
            .filter(tag => isNeedCachePage(tag))
            // 转换为 key
            .map(tag => getPageKey(tag))

        const _include = [...new Set(list)]

        return _include
    })

    /** 排除的 key */
    const exclude = computed(() => {
        return [..._exclude.value]
    })

    /** 重置 */
    const $reset = () => {
        tagList.value = []
        _exclude.value.clear()
    }

    /** 添加标签 */
    const addTag = (route: RouteLocationNormalizedLoaded) => {
        // 已存在
        if (tagList.value.find(item => getPageKey(item) === getPageKey(route))) return
        tagList.value.push(route)
    }

    /** 移除标签 */
    const removeTag = async (route: RouteLocationNormalizedLoaded) => {
        // 标签索引
        const index = tagList.value.findIndex(item => getPageKey(item) === getPageKey(route))

        if (index === -1) return

        const currentRoute = router.currentRoute.value
        const pageKey = getPageKey(route)

        // 判断要删除的是否为当前页面
        const isCurrentPage = pageKey === getPageKey(currentRoute)

        // 从标签列表中移除
        tagList.value.splice(index, 1)

        // 如果删除的是当前页面, 且删除后还有其他标签
        if (isCurrentPage && tagList.value.length) {
            // 优先跳转到后一个页面, 如果没有则跳转到前一个页面
            const afterRoute = tagList.value[index]
            const beforeRoute = tagList.value[index - 1]
            const targetRoute = afterRoute || beforeRoute
            await router.push(targetRoute.fullPath)
        }

        // 如果删除的是当前页面, 且删除后没有任何标签, 跳转到根路径
        if (isCurrentPage && !tagList.value.length) {
            await redirectTo('/')
        }
    }

    /** 关闭所有标签 */
    const closeAllTags = async () => {
        // 重置状态
        $reset()
        // 跳转到根路径
        await redirectTo('/')
    }

    /** 关闭其他标签 */
    const closeOtherTags = async (route: RouteLocationNormalizedLoaded) => {
        const currentRoute = router.currentRoute.value
        const targetPageKey = getPageKey(route)
        const currentPageKey = getPageKey(currentRoute)

        // 要保留的 tag
        const keepTag = tagList.value.find(item => getPageKey(item) === targetPageKey)
        if (!keepTag) return

        // 如果当前页面不是要保留的页面, 需要跳转
        const needRedirect = currentPageKey !== targetPageKey

        if (needRedirect) {
            // 跳转到要保留的页面
            await router.push(keepTag.fullPath)
        }

        // 更新 tagList
        tagList.value = [keepTag]
    }

    /** 添加排除的 key */
    const addExclude = (pageKey: string) => {
        _exclude.value.add(pageKey)
    }
    /** 移除排除的 key */
    const removeExclude = (pageKey: string) => {
        _exclude.value.delete(pageKey)
    }

    // 自动清理包装组件, 避免内存泄漏
    watch(tagList, () => {
        pageWrapperManager.clearByIncludeAndExclude(include.value, exclude.value)
    }, {
        deep: true,
        immediate: true,
        flush: 'post'
    })

    return {
        tagList,
        include,
        exclude,
        addTag,
        removeTag,
        closeAllTags,
        closeOtherTags,
        addExclude,
        removeExclude
    }
})
