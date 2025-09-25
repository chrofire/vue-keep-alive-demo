import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'

/**
 * vite插件: 打包SPA单页面应用时生成 404.html
 * @description 解决 GitHub Pages SPA单页面应用刷新时 404 问题
 */
export function spa404Plugin(): Plugin {
    let config: ResolvedConfig

    return {
        name: 'vite-plugin-spa-404',
        apply: 'build',
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },
        // https://cn.rollupjs.org/plugin-development/#closebundle
        closeBundle: async error => {
            if (error) return

            try {
                const distPath = path.resolve(config.root, config.build.outDir)
                const sourcePath = path.resolve(distPath, 'index.html')
                const targetPath = path.resolve(distPath, '404.html')

                // 复制 index.html 到 404.html
                await fs.copyFile(sourcePath, targetPath)
            } catch (error: any) {
                throw new Error(`生成404页面失败: ${error?.message}`)
            }
        }
    }
}
