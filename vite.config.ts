import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'

// https://cn.vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    const config: UserConfig = {
        base: env.VITE_PUBLIC_BASE_URL,
        plugins: [
            vue(),
            vueJsx(),
            UnoCSS(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ],
                dts: 'types/auto-imports.d.ts'
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ],
                dts: 'types/components.d.ts'
            }),
            // 手动导入组件时自动导入样式
            // import { ElButton } from 'element-plus'
            // => import 'element-plus/es/components/button/style/index'
            ElementPlus({
                // sass
                useSource: true
            }),
            Inspect()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // @ts-ignore
                    api: 'modern-compiler',
                    additionalData: [
                        `@use "@/styles/ui-pre-init.scss" as *;`
                    ].join('')
                }
            }
        },
        server: {
            port: Number(env.VITE_PORT),
            // vite 等同于 vite --host localhost 或 127.0.0.1, 本机访问
            // vite --host 等同于 vite --host 0.0.0.0, 局域网访问
            host: env.VITE_HOST
        }
    }

    return config
})
