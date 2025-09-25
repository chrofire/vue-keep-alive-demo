<template>
    <div class="side-bar" :class="{ collapse }">
        <div class="flex-[1_0] min-w-0px min-h-0px">
            <el-scrollbar>
                <Menu
                    :list="systemStore.menuTreeList"
                    :map="systemStore.menuTreeMap"
                    :collapse="collapse"
                />
            </el-scrollbar>
        </div>
        <div class="collapse-btn" @click="toggleCollapse(!collapse)">
            <i
                class="i-ep:arrow-right-bold"
                :class="{
                    'rotate--180': !collapse
                }"
            />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { useSystemStore } from '@/stores/system'
import { useToggle } from '@vueuse/core'
import Menu from './Menu.vue'

const systemStore = useSystemStore()

const [collapse, toggleCollapse] = useToggle(false)
</script>

<style lang="scss" scoped>
.side-bar {
    --side-bar-border-width: 1px;
    width: var(--side-bar-width);
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    background-color: var(--el-menu-bg-color);
    border-right: var(--side-bar-border-width) solid rgb(243, 244, 246);
    transition: width 0.3s;

    &.collapse {
        // .el-menu--collapse
        width:
            calc(
                var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2 +
                var(--side-bar-border-width)
            );
    }

    :deep() {
        .el-scrollbar__view {
            min-height: 100%;
        }
    }

    .collapse-btn {
        display: flex;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
        color: var(--el-menu-text-color);
        transition: all 0.3s;

        i {
            font-size: 20px;
            transition: all 0.3s;
        }

        &:hover {
            color: var(--el-color-primary);
            background-color: var(--el-color-primary-light-9);
        }
    }
}
</style>
