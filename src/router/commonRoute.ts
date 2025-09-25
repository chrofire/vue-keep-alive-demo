import Layout from '@/layouts/index.vue'
import { Redirect } from '@/router/Redirect'
import NotFound from '@/views/notFound/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const layoutRoute: RouteRecordRaw = {
    path: '/layout',
    name: '__Layout',
    component: Layout,
    children: []
}

export const IS_LAYOUT_ROUTE_KEY = '__isLayoutRoute'

export const redirectRoute: RouteRecordRaw = {
    // (.*) 能匹配任意字符, 包括斜杠
    // 匹配 /redirect/...
    // ...是一个路径, 作为 router.replace 的 path 参数
    path: '/redirect/:path(.*)',
    name: '__Redirect',
    component: Redirect
}

export const notFoundRoute: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    name: '__NotFound',
    component: NotFound
}
