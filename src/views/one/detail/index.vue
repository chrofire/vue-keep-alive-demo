<template>
    <div class="w-100% h-100%">
        <div class="inline-flex flex-col gap-8px">
            <div>one detail</div>
            <div>route.params: {{ route.params }}</div>
            <div>route.query: {{ route.query }}</div>
            <el-input v-model="value" class="w-200px!" />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
    name: 'OneDetail'
})

const route = useRoute()
const value = ref('')
</script>

<style lang="scss" scoped>

</style>
