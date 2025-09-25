<template>
    <div class="w-100% h-100%">
        <div>two</div>
        <el-input v-model="value" class="w-200px!" />
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'

defineOptions({
    name: 'Two'
})

const value = ref('')
</script>

<style lang="scss" scoped></style>
