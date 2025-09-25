import type { RouteRecordRaw } from 'vue-router'

export type PageItem = {
    label: string,
    componentKey: string,
    component: NonNullable<RouteRecordRaw['component']>
}

export const pageList: PageItem[] = [
    {
        label: 'one',
        componentKey: 'one',
        component: () => import('@/views/one/index.vue')
    },
    {
        label: 'oneDetail',
        componentKey: 'oneDetail',
        component: () => import('@/views/one/detail/index.vue')
    },
    {
        label: 'two',
        componentKey: 'two',
        component: () => import('@/views/two/index.vue')
    },
    {
        label: 'three',
        componentKey: 'three',
        component: () => import('@/views/three/index.vue')
    },
    {
        label: 'four',
        componentKey: 'four',
        component: () => import('@/views/four/index.vue')
    }
]

export const pageMap = pageList.reduce((prev, current) => {
    prev[current.componentKey] = current
    return prev
}, {} as Record<string, PageItem>)
