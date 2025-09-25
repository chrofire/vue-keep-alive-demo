<template>
    <div class="cache-info fixed bottom-0 right-0 min-w-300px h-[max-content] p-20px flex flex-col gap-10px">
        <div>
            <div>include: </div>
            <RenderArray :array="tagBarStore.include" />
        </div>
        <div>
            <div>exclude: </div>
            <RenderArray :array="tagBarStore.exclude" />
        </div>
        <div>包装组件数量: {{ pageWrapperInfo.size }}</div>
        <div>
            <div>包装组件keys: </div>
            <RenderArray :array="pageWrapperInfo.keys" />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { useTagBarStore } from '@/stores/tagBar'
import { pageWrapperManager } from '@/utils/pageWrapper'
import { promiseTimeout } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const tagBarStore = useTagBarStore()

const pageWrapperInfo = ref<ReturnType<typeof pageWrapperManager.getPageWrapperInfo>>({} as any)

const route = useRoute()

watch(
    () => route.fullPath,
    async () => {
        await promiseTimeout(0)
        pageWrapperInfo.value = pageWrapperManager.getPageWrapperInfo()
    },
    {
        immediate: true,
        deep: true
    }
)

const RenderArray = ({ array }: { array: string[] }) => {
    return <pre class="m-0px font-unset">{JSON.stringify(array || [], null, 4)}</pre>
}
</script>

<style lang="scss" scoped>

</style>
