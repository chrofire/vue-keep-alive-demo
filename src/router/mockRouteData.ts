import { MenuType } from '@/constants'
import type { MenuItem } from '@/router/types'

export const menuTreeList: MenuItem[] = [
    {
        id: '1',
        menuName: '菜单1',
        menuType: MenuType.Menu,
        componentKey: 'one',
        routerPath: '/menu-1',
        isCache: 1
    },
    {
        id: '1-detail',
        menuName: '菜单1-详情',
        menuType: MenuType.Menu,
        componentKey: 'oneDetail',
        routerPath: '/menu-1/detail/:id',
        isShow: 0,
        isCache: 1
    },
    {
        id: '2',
        menuName: '菜单2',
        menuType: MenuType.Dir,
        routerPath: '/menu-2',
        children: [
            {
                id: '2-1',
                menuName: '菜单2-1',
                menuType: MenuType.Menu,
                componentKey: 'two',
                routerPath: '/menu-2/menu-1'
            },
            {
                id: '2-2',
                menuName: '菜单2-2',
                menuType: MenuType.Menu,
                componentKey: 'three',
                routerPath: '/menu-2/menu-2'
            }
        ]
    },
    {
        id: '3',
        menuName: '菜单3',
        menuType: MenuType.Dir,
        routerPath: '/menu-3',
        children: [
            {
                id: '3-1',
                menuName: '菜单3-1',
                menuType: MenuType.Menu,
                componentKey: 'four',
                routerPath: '/menu-3/menu-1',
                isCache: 1
            },
            {
                id: '3-2',
                menuName: '菜单3-2',
                menuType: MenuType.Menu,
                componentKey: 'one',
                routerPath: '/menu-3/menu-2',
                isCache: 1
            }
        ]
    },
    {
        id: '4',
        menuName: '外链',
        menuType: MenuType.Menu,
        isOutLink: 1,
        routerPath: 'about:blank',
        isCache: 0
    }
]
