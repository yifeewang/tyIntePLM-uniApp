## api/url 分离

参照plm进行url和调用分离

## 抽离 多语言/通用配置 到static文件夹

1. 多语言抽离

将 `en.js` 和 `ch—Hans.js` 抽离放入 `static/lang` 文件夹下，依然从 `locale/lang` 引入并导出给项目使用

`en.json` `ch—Hans.json` 不需要抽离至 `static`，是因为这是小程序的兼容文件，而打包后小程序代码目录并没有什么变化，所以并不影响打包后方便项目修改

2. 公共配置抽离