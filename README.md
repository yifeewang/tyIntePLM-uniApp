# uni-app + vue3.x + vite + unocss + uni-ui  项目工程化搭建

## 简介

`uni-app + vue3.x + vite + unocss + uni-ui` 项目工程化搭建，使用官方扩展ui库 `uni-ui`, 集成 `ESLint`、`Prettier`、`Stylelint`、`husky`、`lint-staged` 、`commitlint`等代码规范工具，集成了原子化css引擎 `unocss`, 并且使用 `pinia` 替代 `vuex`, 同时集成了 pinia 在 uniapp 中的持久化插件[pinia-plugin-persist-uni]以及 storeToRefs 增强插件[pinia-auto-refs]。

[相关文章 - why unocss？](https://www.zhihu.com/question/588057410/answer/3075479109?utm_id=0)

[相关文章 - pinia-plugin-persist-uni 在 uni-app 中持久化存储 pinia](https://juejin.cn/post/7081275565008748552)

[相关文章 - 受够了手动 storeToRefs？来试试这个 vite 插件吧](https://juejin.cn/post/7097893752030625828)


## 所用技术栈

- 依赖管理：node v16.x+(建议：`v18.19.0`), npm v8.x+(建议：`v10.2.3`), 如果使用 `nvm`，可以参考 [Github: nvm](https://github.com/nvm-sh/nvm#deeper-shell-integration) 来实现 node 版本的自动切换
- 小程序框架： [uni-app](https://uniapp.dcloud.io/)
- 构建工具： [Vite](https://vitejs.dev/)
- 前端框架： [Vue3.x](https://v3.cn.vuejs.org/)
- 编程语言： [TypeScript](https://www.typescriptlang.org/)
- 代码规范：
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Stylelint](https://stylelint.io/)
- 提交规范：
  - [husky](https://typicode.github.io/husky/#/)
  - [lint-staged](https://www.npmjs.com/package/lint-staged)
  - [commitlint](https://commitlint.js.org/#/)
- css 预处理器： [scss](https://sass-lang.com/)
- css 原子化引擎： [unocss](https://unocss.dev/)
- 状态管理工具：[pinia](https://pinia.vuejs.org/)
- pinia 数据持久化插件：[pinia-plugin-persist-uni](https://allen-1998.github.io/pinia-plugin-persist-uni/)
- vite 插件：
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
    - [参考]((https://zhuanlan.zhihu.com/p/612397686))
  - [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
    - [参考](https://zhuanlan.zhihu.com/p/613985053)
  - [unocss](https://github.com/unocss/unocss)
  - [auto-import-types](https://github.com/Allen-1998/auto-import-types)

## 工程目录

```shell
.
├── .husky
│   ├── _
│   ├── commit-msg commit信息校验钩子
│   ├── pre-commit commit前置钩子
├── .vscode
│   ├── extensions.json vscode工作区插件推荐
│   ├── settings.json vscode工作区设置
├── auto
│   ├── addPage.ts 根据pages.json自动生成页面
├── src
│   ├── @types ts类型定义
│   ├── components 项目组件
│   ├── config 全局配置
│   ├── @helper storeToRefs 增强(pinia-auto-refs自动生成)
│   ├── hooks 自定义hooks函数
│   ├── http 请求中心
│   ├── locale 多语言
│   ├── pages 页面目录
│   ├── subPages 分包
│   ├── static 静态资源、css
│   ├── store 状态管理
│   ├── uni_modules uni-ui
│   └── utils 工具包
│      ├── common-tool.ts 通用工具方法
│      ├── date-tool.ts 时间处理方法
│      ├── index.ts 引入并导出utils下所有文件方法
│      ├── platform-tool.ts 获取运行环境
│      ├── router-tool.ts 路由跳转封装
│      └── urlMap-tools.ts 获取页面信息/类型
│   ├── App.vue 入口文件
│   ├── auto-imports.d.ts 自动导入vue-composition-api(unplugin-auto-import自动生成)
│   ├── components.d.ts 自动导入组件(unplugin-vue-components自动生成)
│   ├── env.d.ts 全局声明
│   ├── main.ts 主入口
│   ├── manifest.json 应用配置文件
│   ├── pages.json 全局配置文件
│   └── uni.scss uni-app内置的常用样式变量
├── .cz-config.js cz提交信息提示配置
├── .czrc cz规则配置
├── .editorconfig 编辑器配置
├── .eslintignore eslint忽略配置
├── .eslintrc-auto-import-types.json 自动挂载@types下.d.ts文件定义的类型到global(auto-import-types自动生成)
├── .eslintrc-auto-import.json 自动挂载 unplugin-auto-import 的类型到global(unplugin-auto-import自动生成)
├── .eslintrc.js eslint配置
├── .gitignore git忽略配置
├── .lintstagedrc.json lint-staged配置
├── .npmrc npm配置
├── .prettierignore prettier忽略配置
├── .stylelintrc.js stylelint配置
├── commitlint.config.js commitlint配置
├── index.html 项目入口
├── LICENSE MIT说明
├── package-lock.json
├── package.json
├── prettier.config.js prettier配置
├── preset-rem-to-rpx 自定义unocss presets配置
├── README-FAQ.md
├── README.md
├── tsconfig.json ts配置
├── unocss.config.ts unocss配置
└── vite.config.ts vite配置
```
