<template>
    <el-config-provider :locale="zhCn">
        <router-view />
        <CacheInfo />
    </el-config-provider>
</template>

<script lang="tsx" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CacheInfo from '@/layouts/CacheInfo.vue'
</script>

<style lang="scss" scoped></style>
