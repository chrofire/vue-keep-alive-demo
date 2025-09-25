import { setupRouterProgress } from '@/plugins/nprogress'
import { notFoundRoute } from '@/router/commonRoute'
import { useSystemStore } from '@/stores/system'
import { createRouter, createWebHistory } from 'vue-router'

export const loginPath = '/login'

const whiteList = [loginPath]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: loginPath,
            name: 'Login',
            component: () => import('@/views/login/index.vue')
        },
        notFoundRoute
    ]
})

setupRouterProgress(router)

router.beforeEach(async (to, from) => {
    const systemStore = useSystemStore()
    const token = 'token'

    if (whiteList.includes(to.path)) {
        return true
    }

    if (token) {
        if (!systemStore.isLogin) {
            try {
                await systemStore.initMenu()

                if (to.path === '/') {
                    return systemStore.resolveRootPathRedirectPath()
                }

                return to.fullPath
            } catch (error) {
                return { path: loginPath, replace: true }
            }
        } else {
            if (to.path === '/') {
                return systemStore.resolveRootPathRedirectPath()
            }

            return true
        }
    } else {
        return { path: loginPath, replace: true }
    }
})

export default router
