import { defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'

export const Redirect = defineComponent({
    name: '__Redirect',
    setup() {
        const router = useRouter()
        const {
            params: { path },
            query
        } = router.currentRoute.value

        router.replace({ path: path as string, query })

        return () => {
            return h('div')
        }
    }
})
