# 总结常见问题

## 安装依赖或者运行报错

**原因：**
非业务代码问题的话，大概率是node版本 npm/yarn版本问题导致

**解决方法：**
node版本 >= 16
npm版本 >= 8
yarn版本 >= 1.22

## npm i报错：npm ERR! Unexpected token '.'

**原因：**
当通过nvm切换nodejs版本为16以上时，npm install [package]报错：Unexpected token '.'

该问题不是npm的问题，也不是nodejs的问题，是nvm-windows的问题。

**解决方法：**
1. 前往github 下载[nvm更新包](https://github.com/coreybutler/nvm-windows/releases)， 更新nvm-windows到版本1.1.9以上,
   然后重新删除已安装的有问题的node版本，重新安装

2. 使用yarn安装依赖

## node 18+ 版本 mac M1编译报错问题

**原因：**
错误原因： 存在@esbuild/darwin-x64，但需要@esbuild/darwin-arm64

**解决方法：**
`package.json` 中添加 `"@esbuild/darwin-x64":"version"`,
但是m1芯片不支持，所以就找到 `node_modules/@esbuild/darwin-x64`， 复制`darwin-x64`文件夹改名`darwin-arm64`

## tab，页面标题等 多语言无效

配置i18n多语言后，标题和tabbar h5页面显示正常，小程序失效

**原因：**
page.json中多语言模板语法 `%index.title%`只针对h5生效， 小程序无效，需要特殊处理

**解决方法：**
需要在根目录新建locale文件夹，严格按照规范命名文件（eg：语言.json），并且不能在main.js中注册

为方便管理多语言，把所有多语言配置都放入`locale`，其中`locale`中的子文件对应小程序`tabbar`和`title`兼容处理，`locale`子目录`lang`中的文件才是真正的多语言配置

## 不清楚一些样式的unocss原子化写法

**为什么使用unocss：**
1. 公司代码中，css部分非常乱，重复定义的地方很多，又不方便一个个提出来归纳一下，导致压缩后的体积还是很大，要是用上了这样的css方案，会有很大的提升

2. 防止为了赶时间和进度，直接乱命名而导致后期不方便维护阅读

3. 调试和性能自己写会好很多，自己写多了还是很难避免重复样式
**解决方法：**

1. 大部分写法可以在 [unocss官网找到对应的语法](https://unocss.dev/interactive/)

2. 对于官方文档或者网上搜不到，可以自定义rules，自定义自己的语法规范，已经在 `unocss.config.ts` 中编写好自定义rules模板规则，可参照添加即可
## vetur 提示组件引入报错

**原因：**
vue3 配套的 vscode 插件为 volar,vetur 会存在冲突

**解决方法：**
在扩展中搜索 volar 安装,然后搜索 vetur 设置禁用工作区

## git commit 保存代码被拦截

**原因：**
为了规范`git`提交规范，制定了`commitlint`规范。

**解决方法：**
按照 `commitlint.config.js` 文件中定义的规则进行`git commit`操作
示例:`git commit -m 'feat: xxxxxx'`

## husky 未执行

**原因：**
`pre-commit`,`commit-msg`自定义的钩子在执行中权限不足，无法被执行。

**解决方法：**
- 增加文件的执行权限。

  ```shell
  chmod +x ./.husky/pre-commit
  chmod +x ./.husky/commit-msg
  ```

## 如何快速定义 ts 接口类型

ts 类型声明在带来类型提示，减少编程过程中 bug 率的同时，也带来了需要声明很多数据类型的心智负担，手动一个一个去声明的话无疑会增加很多的开发成本。

**解决方法：**
将接口返回的`JSON`数据通过`json2ts`进行解析，然后直接 cv 即可。

1. 先安装json2ts插件
2. mac：复制接口数据后，在vscode 使用 ctrl + option + v 即可
3. mac：复制接口url后，在vscode 使用 ctrl + option + x 即可
2. win 使用 ctrl + alt + V 即可
3. win 使用 ctrl + alt + V 即可

## vue文件模板里面全局变量异味

**解决方法：**
找到   `shime-uni.d.ts` 文件，添加以下代码
```js
interface ComponentCustomProperties {
    $t: any
}
```

## 如何生存 iconfont 文件
https://juejin.cn/post/7079674057041395726?searchId=20231208141322519550C6B0CB5C8FFE8E

## Proxy相关属性再setup中是undefined

**解决方法：**
需要在onload之后再获取

## 支持require语法

**原因：**
只支持import语法，不支持require语法

**解决方法：**
1. 安装依赖 `vite-plugin-require-transform`, 并在 `vite.config.js/plugin` 中进行注册

2. 安装依赖 `@types/node`， 并且在 `tsconfig.json/types` 中进行配置

