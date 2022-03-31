1. 使用vue脚手架`vue-cli`创建一个项目（目的：了解脚手架做了些什么工作）

1.1. 执行`vue create first-vue-demo`，并选择vue2 

1.2. 查看新创建的项目的目录结构，发现并没有webpack.config.js 配置文件；

1.3. 需要用`yarn serve`命令启动这个项目，index.html才会有内容.直接对.html文件右键单击选择在浏览器打开是没有东西的；

- 这是因为，整个项目没有构建与打包，单纯的一个.html文件是无法找到vue单文件组件？ 

1.4 那么执行`yarn serve`命令，到底做了些什么事情呢？
- 启动一个开发服务器（基于webpack-devserver）,且启动了模块的热重载

1.5. 自己从0搭建一个vue2的项目
- 项目地址：vue-scaffold

1.6. 第一步，通过`npm init`生成一个package.json配置文件；

1.7. 第二步，安装vue2和webpack,webpack-dev-server, 执行命令 `npm install vue@2 webpack webpack-dev-server` , (webpack-dev-server是一个服务器插件，自动化工作)

1.8. 第三步，新建`webpack.config.js`配置文件，来配置webpack的模块化处理
```js
const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [

        ]
    },
    plugins: [],
    mode: 'development' // 'production'
}
```

1.9. 第四步，增加一些简单的内容（结构如下）
```
- vue-scaffold
 - node_modules
 - src 
    - App.vue
 - index.js
```
其中index.js的内容如下：
```js
import Vue from 'vue'
import App from './src/App.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)
```
其中App.vue的内容如下
```vue
<template>
  <h1>demo 测试</h1>
</template>

<script>
export default {
}
</script>

<style></style>
```

1.10. 第五步，打开package.json，加上一句脚本指令
`build: webpack --config webpack.config.js`
- 发现终端会报错`CLI for webpack must be installed.`.... 于是按照提示，安装 webpack-cli 包就行
- 安装 webpack-cli之后，还是有报错信息，`Module parse failed: Unexpected token (1:0)`这里对应的代码是App.vue；也是说webpack 无法识别非js代码，需要通过`an appropriate loader`来处理这类.vue文件 =====> 所以需要安装 vue-loader 和vue-template-compiler； 
- vue-loader用来将.vue文件给分解，后者是将template编译为render函数；
- 特别需要注意的是事： **需要 vue 和 vue-template-compiler 版本必须保持一致，否则会报错。**
- 别人分享的可兼容版本号： vue@2.6.12 & vue—loader@13.7.2 & vue-template-compiler@2.6.12
- 在安装完上述两个package后，需要在webpack.config.js文件中配置一下rules 
- 再一次执行`npm run build`，报错`Module build failed: TypeError: Cannot read property 'vue' of undefined` ===> vue-loader和webpack 的版本不兼容; 
- `Module build failed (from ./node_modules/css-loader/dist/cjs.js):` css-loader版本过高；
- 在多次踩坑后，得到适配的几个版本，最后运行成功了
```json
{
  "dependencies": {
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "css-loader": "^2.1.1",
    "style-loader": "^3.3.1",
    "vue-loader": "^14.2.4",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^4.46.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  } 
}
```

1.11. 第六步，参考项目（）来安装一些必要的插件；
- babel: 模块处理时需要，可将es6的模块化转为node.js使用的模块化规范commonjs 
   - babel-loader: webpack的插件，
   - @babel/core: babel的核心包，用于语法转换
   - @babel/polyfill: 转换es6新特征，如promise,set等(babel7.4之后用core-js 代替)
- less、sass以及相关的loader: css样式的预编译处理语言
- url-loader、file-loader: 处理图片 (小图片文件会通过url-loader来处理，直接编码成base64，减少http请求；file-loader会将原来的url转换为打包后的正确地址)
- html-webpack-plugin: 可自动生成一个html文件(注意和webpack版本兼容)


2. 如何知道哪个版本的loader适合自己的webpack版本呢？参考博客：https://juejin.cn/post/6898889812741210125













