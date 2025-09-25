<template>
    <div class="w-100% h-100%">
        <div>four</div>
        <el-input v-model="value" class="w-200px!" />
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'

defineOptions({
    name: 'Four'
})

const value = ref('')
</script>

<style lang="scss" scoped></style>
