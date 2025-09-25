import { Redirect } from '@/router/Redirect'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { Router } from 'vue-router'

NProgress.configure({ showSpinner: false })

export const setupRouterProgress = (router: Router) => {
    router.beforeEach((to, from) => {
        // 跳转重定向页面时不使用进度条
        if (to.name?.toString().startsWith(Redirect.name!)) return

        NProgress.start()
    })

    router.afterEach((to, from) => {
        if (to.name?.toString().startsWith(Redirect.name!)) return

        NProgress.done()
    })
}
