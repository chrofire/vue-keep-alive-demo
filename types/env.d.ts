/// <reference types="vite/client" />

// https://cn.vite.dev/guide/env-and-mode#intellisense
// 导入语句会破坏类型增强

// import.meta.env 类型
interface ImportMetaEnv {
    readonly VITE_PORT: string,
    readonly VITE_HOST: string,
    readonly VITE_PUBLIC_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
