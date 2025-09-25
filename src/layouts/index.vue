<template>
    <div class="layout w-100% h-100% flex flex-col">
        <TopBar class="layout-top"></TopBar>
        <div class="layout-bottom flex-[1_0] min-w-0px min-h-0px flex">
            <div class="layout-bottom-left">
                <SideBar></SideBar>
            </div>
            <div class="layout-bottom-right flex-[1_0] min-w-0px flex flex-col">
                <TagBar></TagBar>
                <div class="layout-main-content flex-[1_0] min-w-0px min-h-0px">
                    <router-view v-slot="{ Component, route }">
                        <transition name="slide" mode="out-in" appear>
                            <keep-alive :include="tagBarStore.include" :exclude="tagBarStore.exclude">
                                <component :is="pageWrapperManager.getPageWrapperVNode(Component, route)" :key="getPageKey(route)" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { useTagBarStore } from '@/stores/tagBar'
import { getPageKey, pageWrapperManager } from '@/utils/pageWrapper'
import SideBar from './SideBar.vue'
import TagBar from './TagBar.vue'
import TopBar from './TopBar.vue'

defineOptions({
    name: 'Layout'
})

const tagBarStore = useTagBarStore()
</script>

<style lang="scss" scoped>
.layout-main-content {
    overflow: auto;
    &:has([class*='slide-']) {
        position: relative;
        overflow: hidden;

        --slide-offset: 5%;
    }

    // slide
    .slide-enter-from {
        transform: translateX(var(--slide-offset));
        opacity: 0;
    }

    .slide-enter-to,
    .slide-leave-from {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-leave-to {
        transform: translateX(calc(-1 * var(--slide-offset)));
        opacity: 0;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.3s;
    }

    // fade
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s;
    }
}
</style>
