// stylelint.config.mjs

// pnpm add stylelint postcss-html postcss-scss @stylistic/stylelint-plugin @stylistic/stylelint-config -D
// "lint:style": "stylelint --fix **/*.{vue,css,sass,scss}"

// https://github.com/stylelint-stylistic/stylelint-stylistic
import stylisticStylelintPlugin from '@stylistic/stylelint-plugin'
import postcssScss from 'postcss-scss'

/** @type {import('stylelint').Config} */
export default {
    plugins: [
        // stylelint 15 之后弃用了 stylistic 规则, 需要额外导入
        stylisticStylelintPlugin
    ],
    extends: [
        // 拓展默认规则
        '@stylistic/stylelint-config'
    ],
    ignoreFiles: [
        'node_modules/**/*',
        'public/**/*',
        'dist/**/*'
        // ...globs
    ],
    overrides: [
        {
            files: ['.vue'].flatMap(ext => [`*${ext}`, `**/*${ext}`]),
            customSyntax: 'postcss-html'
        },
        {
            files: ['.scss'].flatMap(ext => [`*${ext}`, `**/*${ext}`]),
            // customSyntax: 'postcss-scss'
            customSyntax: postcssScss
        }
    ],
    rules: {
        // 缩进
        '@stylistic/indentation': 4,
        // 引号
        '@stylistic/string-quotes': 'single'
    }
}
