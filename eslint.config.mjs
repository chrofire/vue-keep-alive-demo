// eslint.config.mjs

// pnpm add eslint@9.20.0 @antfu/eslint-config@3.16.0 -D
// "lint": "eslint --fix **/*.{js,jsx,ts,tsx,vue}"

import antfu from '@antfu/eslint-config'

export default antfu(
    {
        stylistic: {
            // 缩进
            indent: 4,
            // 引号
            quotes: 'single'
        },
        typescript: true,
        vue: true,
        jsx: true,
        ignores: [
            'node_modules/**/*',
            'public/**/*',
            'dist/**/*',
            '.github/**/*'
            // ...globs
        ]
    },
    {
        // 基础规则
        rules: {
            // 使用 console 语句
            'no-console': 'off',
            // Promise 构造函数中使用 async 函数
            'no-async-promise-executor': 'off',
            // 使用 new 操作符而不赋值
            'no-new': 'off',
            // 在变量定义前使用变量
            'no-use-before-define': 'off',
            // typeof 操作符的有效性
            'valid-typeof': 'off',
            // 控制语句使用大括号
            curly: 'off',
            // 未使用的变量
            'no-unused-vars': 'warn',
            // if 语句后换行
            'antfu/if-newline': 'off',
            // 顶层函数使用 function 声明
            'antfu/top-level-function': 'off'
        }
    },
    {
        // 代码风格规则
        rules: {
            // 尾随逗号
            'style/comma-dangle': ['error', 'never'],
            // 对象属性名的引号
            'style/quote-props': ['error', 'as-needed'],
            // 箭头函数参数的括号
            'style/arrow-parens': ['error', 'as-needed'],
            // 大括号的风格
            'style/brace-style': 'off',
            // JSX 表达式换行
            'style/jsx-one-expression-per-line': 'off',
            // TypeScript 接口/类型成员分隔符
            'style/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'comma',
                        requireLast: false
                    },
                    singleline: {
                        delimiter: 'comma',
                        requireLast: false
                    }
                }
            ]
        }
    },
    {
        // TypeScript 规则
        rules: {
            // 类型定义的一致性 (interface or type)
            'ts/consistent-type-definitions': 'off',
            // TypeScript 中在变量定义前使用变量
            'ts/no-use-before-define': 'off',
            // 空对象类型
            'ts/no-empty-object-type': 'off',
            // 不安全的 Function 类型
            'ts/no-unsafe-function-type': 'off',
            // 包装对象类型
            'ts/no-wrapper-object-types': 'off',
            // @ts-ignore 等注释的使用
            'ts/ban-ts-comment': 'off',
            // 未使用的表达式
            'ts/no-unused-expressions': 'off'
        }
    },
    {
        // Vue 规则
        rules: {
            // 组件属性的顺序
            'vue/attributes-order': 'off',
            // 使用保留的组件名
            'vue/no-reserved-component-names': 'off',
            // HTML 标签的自闭合
            'vue/html-self-closing': 'off',
            // Props 的命名风格
            'vue/prop-name-casing': 'off',
            // 组件属性的连字符使用
            'vue/attribute-hyphenation': 'off',
            // Vue 模板中尾随逗号的使用
            'vue/comma-dangle': ['error', 'never'],
            // 单行 HTML 元素内容的换行
            'vue/singleline-html-element-content-newline': 'off',
            // 修改 props
            'vue/no-mutating-props': 'off',
            // 事件名的连字符
            'vue/v-on-event-hyphenation': 'off',
            // 每个文件的组件数量
            'vue/one-component-per-file': 'off',
            // 动态组件的 is 属性
            'vue/require-component-is': 'off',
            // Vue 模板中未使用的变量
            'vue/no-unused-vars': 'warn',
            // Vue 单文件组件的块顺序
            'vue/block-order': [
                'error',
                {
                    order: [['script', 'template'], 'style']
                }
            ]
        }
    },
    {
        // 导入相关规则
        rules: {
            // 未使用的导入变量
            'unused-imports/no-unused-vars': 'warn',
            // 导入语句的排序
            'perfectionist/sort-imports': 'off'
        }
    },
    {
        // Node.js 规则
        rules: {
            // Node.js 回调函数的错误处理
            'node/handle-callback-err': 'off',
            // Node.js 全局 process 变量
            'node/prefer-global/process': 'off'
        }
    },
    {
        // 其他规则
        rules: {
            // JSDoc 参数名的正确性
            'jsdoc/check-param-names': 'off',
            // 优先使用 TypeError
            'unicorn/prefer-type-error': 'off',
            // eslint-disable 注释
            'eslint-comments/no-unlimited-disable': 'off',
            // Promise reject 使用 Error 对象
            'prefer-promise-reject-errors': 'off'
        }
    }
)
