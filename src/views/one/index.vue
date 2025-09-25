<template>
    <div class="w-100% h-100%">
        <div>one</div>
        <el-input v-model="value" class="w-200px!" />
        <div class="flex flex-col gap-8px mt-8px">
            <div>
                <el-button @click="refresh(router.currentRoute.value.fullPath)">refresh to current page</el-button>
            </div>
            <div>
                <el-button @click="router.push('/menu-2/menu-1')">to /menu-2/menu-1</el-button>
                <el-button @click="refresh('/menu-2/menu-1')">refresh to /menu-2/menu-1</el-button>
            </div>
            <div>
                <el-button @click="router.push('/menu-1/detail/1')">to /menu-1/detail/1</el-button>
                <el-button @click="refresh('/menu-1/detail/1')">refresh to /menu-1/detail/1</el-button>
            </div>
            <div>
                <el-button @click="router.push('/menu-1/detail/2')">to /menu-1/detail/2</el-button>
                <el-button @click="refresh('/menu-1/detail/2')">refresh to /menu-1/detail/2</el-button>
            </div>
            <div>
                <el-button @click="router.push('/menu-1/detail/2?key=value')">to /menu-1/detail/2?key=value</el-button>
                <el-button @click="refresh('/menu-1/detail/2?key=value')">refresh to /menu-1/detail/2?key=value</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { useSystemStore } from '@/stores/system'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'One'
})

const systemStore = useSystemStore()
const router = useRouter()

const value = ref('')

const refresh = async to => {
    systemStore.redirectTo(to)
}
</script>

<style lang="scss" scoped></style>
