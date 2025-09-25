<script lang="tsx">
import { BoolType } from '@/constants'
import type { MenuItem } from '@/router/types'
import { ElMenu, ElMenuItem, ElSubMenu, type MenuProvider } from 'element-plus'
import { computed, defineComponent, nextTick, type PropType, ref, useCssModule, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const Menu = defineComponent({
    props: {
        /** 是否折叠 */
        collapse: {
            type: Boolean,
            default: false
        },
        /** 菜单列表 */
        list: {
            type: Array as PropType<MenuItem[]>,
            default: () => []
        },
        /** 菜单映射 */
        map: {
            type: Object as PropType<Record<string, MenuItem>>,
            default: () => {}
        }
    },
    setup(props) {
        const style = useCssModule()
        const router = useRouter()
        const route = useRoute()

        // 根据当前路由的 meta.id 获取菜单项
        const activeItem = computed(() => props.map[route.meta.id as string])
        // 当前激活的菜单项的 id
        const activeKey = ref<string>('')
        watch(
            activeItem,
            async () => {
                // 确保过渡效果
                await nextTick()
                if (!activeItem.value) {
                    activeKey.value = ''
                    return
                }
                activeKey.value = activeItem.value.id
            },
            { immediate: true }
        )

        const renderIcon = (item: MenuItem) => {
            if (item.menuIcon) {
                return <div class={['text-18px']}>{item.menuIcon}</div>
            }
            // 目录
            if (Array.isArray(item.children) && item.children.length) {
                return <div class={['text-18px']}>📁</div>
            }
            // 菜单
            return <div class={['text-18px']}>📄</div>
        }

        const renderTitle = (item: MenuItem) => {
            return <span class="flex-inline pl-10px">{item.menuName}</span>
        }

        const renderMenuChildren = (menuList: MenuItem[] = []) => {
            return menuList.map(item => {
                if (item.isShow === BoolType.False) {
                    return null
                }

                if (Array.isArray(item.children) && item.children.length) {
                    return (
                        <ElSubMenu index={item.id} popperClass={style['sub-menu-popper-class']}>
                            {{
                                title: () => [renderIcon(item), renderTitle(item)],
                                default: () => renderMenuChildren(item.children)
                            }}
                        </ElSubMenu>
                    )
                }

                if (item.isShow === BoolType.False) return null

                return (
                    <ElMenuItem index={item.id} key={item.id}>
                        {{
                            title: () => renderTitle(item),
                            default: () => renderIcon(item)
                        }}
                    </ElMenuItem>
                )
            })
        }

        // 重写菜单点击事件
        // https://github.com/element-plus/element-plus/blob/dev/packages/components/menu/src/menu.ts
        // onMounted | onVnodeMounted | directive
        let rootMenu = {} as MenuProvider
        let oldHandleMenuItemClick: MenuProvider['handleMenuItemClick'] = () => {}
        const newHandleMenuItemClick: MenuProvider['handleMenuItemClick'] = item => {
            // 根据 ElMenuItem 绑定的 index 获取 菜单项数据
            const menuItem = props.map[item.index]
            if (!menuItem) return
            // 外链
            if (menuItem.isOutLink === BoolType.True) {
                window.open(menuItem.routerPath)
                return
            }
            // 菜单
            router.push(menuItem.routerPath)
        }
        const rewriteHandleMenuItemClick = vnode => {
            // 备份
            rootMenu = vnode.component.provides.rootMenu
            oldHandleMenuItemClick = rootMenu.handleMenuItemClick
            // 重写
            rootMenu.handleMenuItemClick = newHandleMenuItemClick
        }

        return () => {
            return (
                <ElMenu
                    class={['menu']}
                    defaultActive={activeKey.value}
                    collapse={props.collapse}
                    collapseTransition={false}
                    uniqueOpened={false}
                    router={false}
                    onVnodeMounted={rewriteHandleMenuItemClick}
                >
                    {{
                        default: () => renderMenuChildren(props.list)
                    }}
                </ElMenu>
            )
        }
    }
})

export default Menu
</script>

<style lang="scss" scoped>
@use '@/styles/layout.scss' as *;

.menu {
    --active-menu-border-width: 3px;
    border: none;
    height: 100%;
    width: 100%;

    :deep() {
        .el-menu-item {
            transition: all 0.3s;

            @include menu-item-line;

            &.is-active {
                background-color: var(--el-menu-active-bg-color);
                @include menu-item-line-active;
            }
        }

        .el-sub-menu {
            &.is-active {
                .el-sub-menu__title.el-tooltip__trigger {
                    @include menu-item-line-active;
                }
            }
        }

        .el-sub-menu__title {
            @include menu-item-line;
        }
    }
}
</style>

<style lang="scss" module>
@use '@/styles/layout.scss' as *;

.sub-menu-popper-class {
    :global {
        --active-menu-border-width: 3px;
        .el-menu-item {
            transition: all 0.3s;

            @include menu-item-line;

            &.is-active {
                background-color: var(--el-menu-active-bg-color);
                @include menu-item-line-active;

                .el-icon {
                    color: var(--el-color-primary);
                }
            }
        }
    }
}
</style>
