<template>
    <div class="tag-bar">
        <el-scrollbar ref="scrollbarRef">
            <div class="tag-bar-list">
                <div
                    class="tag-item"
                    v-for="item in tagBarStore.tagList"
                    :key="item.fullPath"
                    :class="{ 'is-active': activePath === item.fullPath }"
                    @click="handleRouter(item)"
                >
                    <el-dropdown trigger="contextmenu">
                        <div class="label">
                            {{ item.meta.menuName }} ({{ item.meta.isCache === BoolType.True ? '缓存' : '不缓存' }})
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="it in menuList"
                                    :key="it.label"
                                    @click="it.onClick(item)"
                                >
                                    {{ it.label }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div class="close" v-if="!(tagBarStore.tagList.length === 1)">
                        <span @click.stop="handleClose(item)">❌</span>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="tsx" setup>
import { BoolType } from '@/constants'
import { Redirect } from '@/router/Redirect'
import { useSystemStore } from '@/stores/system'
import { useTagBarStore } from '@/stores/tagBar'
import { useEventListener } from '@vueuse/core'
import type { ScrollbarInstance } from 'element-plus'
import { nextTick, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'

const scrollbarRef = ref<ScrollbarInstance | null>(null)
const systemStore = useSystemStore()
const tagBarStore = useTagBarStore()
const route = useRoute()
const router = useRouter()

const handleClose = (item: RouteLocationNormalizedLoaded) => {
    tagBarStore.removeTag(item)
    updateScrollbar()
}

const handleRouter = (item: RouteLocationNormalizedLoaded) => {
    router.push(item.fullPath)
}

const updateScrollbar = async () => {
    await nextTick()
    scrollbarRef.value?.update()
}

watch(
    () => route.fullPath,
    () => {
        const tag = Object.assign({}, route)

        // 不收集重定向路由
        if (tag.name?.toString().startsWith(Redirect.name!)) return

        tagBarStore.addTag(tag)
        updateScrollbar()
    },
    {
        immediate: true
    }
)

// 渲染后更新激活路径, 确保过渡效果生效
const activePath = ref<string>('')
watch(
    () => route.fullPath,
    async () => {
        await nextTick()
        activePath.value = route.fullPath
    },
    { immediate: true }
)

// 横向滚动
useEventListener(() => scrollbarRef.value?.wrapRef, 'wheel', event => {
    // 向上滚动为负值, 向下滚动为正值
    const { deltaY } = event
    // 方向
    const direction = deltaY >= 0 ? 1 : -1
    // 步进
    const step = direction * 50
    // 滚动
    ;(event.currentTarget as HTMLElement).scrollLeft += step
}, {
    passive: true
})

const menuList = [
    {
        label: '刷新页面',
        onClick: item => {
            systemStore.redirectTo(item.fullPath)
        }
    },
    {
        label: '关闭页面',
        onClick: item => {
            handleClose(item)
        }
    },
    {
        label: '关闭其他',
        onClick: item => {
            tagBarStore.closeOtherTags(item)
        }
    },
    {
        label: '关闭全部',
        onClick: item => {
            tagBarStore.closeAllTags()
        }
    }
]
</script>

<style lang="scss" scoped>
@use '@/styles/layout.scss' as *;

.tag-bar {
    height: var(--tag-bar-height);
    border-bottom: 1px solid #eee;

    :deep() {
        .el-scrollbar__view {
            height: 100%;
        }
    }

    .tag-bar-list {
        height: 100%;
        display: flex;

        .tag-item {
            display: flex;
            align-items: center;
            padding: 0 7px 0 10px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s;

            @include tag-item-line;

            &:hover {
                .label {
                    color: var(--el-color-primary);
                }
            }

            &.is-active {
                @include tag-item-line-active;
                .label {
                    color: var(--el-color-primary);
                }
            }

            .label {
                height: 100%;
                padding-right: 5px;
                display: flex;
                align-items: center;
                white-space: nowrap;
                transition: all 0.3s;
            }

            .close {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>
