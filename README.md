# vue-keep-alive-demo

vue 的 `keep-alive` 组件通过匹配组件的 `name` 选项来实现缓存控制。

当使用带参数的动态路由时（例如 `/detail/:id`），不同参数的路由共用同一个组件，导致 `keep-alive` 缓存混乱。

本 demo 通过在运行时动态创建包装组件，并重写组件的 `name` 选项，为每个页面定义唯一的组件名称，实现精确的缓存控制。
