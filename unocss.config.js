import { defineConfig, presetIcons, presetMini } from 'unocss'
import { rules as windRules } from 'unocss/preset-wind4'

export default defineConfig({
    // 预设
    presets: [
        presetMini(),
        presetIcons({
            // 默认 只支持 块级元素
            // 添加 行内元素 支持
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
            }
        })
    ],
    // 变量匹配
    variants: [
        {
            match: s => {
                if (s.startsWith('i-')) {
                    return {
                        matcher: s,
                        selector: s => {
                            return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                        }
                    }
                }
            }
        }
    ],
    // 自定义快捷写法, 具备语法提示
    shortcuts: [
        ['wh-full', 'w-full h-full'],
        ['f-c-c', 'flex justify-center items-center']
    ],
    // 自定义规则, 具备语法提示
    rules: [
        // objectPositions
        ...windRules.filter(([key, value]) => {
            if (typeof key === 'string') {
                return key.startsWith('object')
            } else {
                return key.source === /^object-(.+)$/.source
            }
        }),
        // lineClamps
        ...windRules.filter(([key, value]) => {
            if (typeof key === 'string') {
                return key.startsWith('line-clamp')
            } else {
                return key.source === /^line-clamp-(\d+)$/.source
            }
        })
    ],
    // 预生成
    safelist: []
})
