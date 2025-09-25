export {}

declare global {
    // 省略 window.

    // window.xxx
    interface Window {

    }
}

declare module 'vue' {
    // 自定义全局属性
    // app.config.globalProperties
    interface ComponentCustomProperties {

    }
}
