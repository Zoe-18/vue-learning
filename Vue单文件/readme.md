## 从零到一搭建 Vue2.0+TS项目开发环境
1. 首先执行`npm init -y`，生成`package.json`
2. 创建`webpack.config.js`文件，先写一些基础的配置
3. 在项目根目录下，新建一个`src`文件夹，新建一个`main.ts`文件作为入口文件
4. 安装 `vue`, `vue-loader`, `vue-template-compiler`
```
npm install vue
npm install --D vue-loader vue-template-compiler 
```
5. 安装 `webpack` 和一些必要的插件
```
npm install --D webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader html-loader
```
并在`package.json`文件中的`scripts`字段中加上 `"start": "webpack-dev-server --hot"`

6. 安装babel, 并新建`babel.config.json`配置文件
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env 
```
配置文件如下( origin from https://www.babeljs.cn/docs/usage)：
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```
6. 安装`typescript`，并新建`tsconfig.json`配置文件
```
npm install --save-dev typescript @babel/preset-typescript ts-loader
```
(1) `tsconfig.json`配置文件如下(origin from https://cn.vuejs.org/v2/guide/typescript.html)： 
```js
{
  "compilerOptions": {
    // 与 Vue 的浏览器支持保持一致
    "target": "es5",
    // 这可以对 `this` 上的数据 property 进行更严格的推断
    "strict": true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    "module": "es2015",
    "moduleResolution": "node"
  }
}
```
(2)另外，需要再`babel.config.json`文件中增加一个预设,如下：
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ],
    [
      "@babel/preset-typescript"    // 新增
    ]
  ]
}
```
7. 在src目录下，新建一个components文件夹，新建一个HelloWorld.vue文件，写一个简单的组件
```vue
<template>
  <p>{{ gretting }} </p>
</template>

<script>
module.exports = {
  data: function() {
    return {
      gretting: 'Hello Vue World!123'
    }
  },
}
</script>

<style>
p{
  font-size: 2em;
  text-align: center;
}
</style>
```
8. 在src目录下，新建App.vue（在这个组件中应用components内的组件） 和 index.html （提供root）
```vue
<template>
  <div>
    <p>这是一个小Demo</p>
    <hello-world></hello-world>
  </div> 
</template>
<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
export default {
  components: {
    HelloWorld
  }
}
</script>
```
9. 在src目录下，新建一个main.ts, 作为程序的入口！
```ts
import Vue from 'vue'
import App from './App.vue'
new Vue({
  el: '.app',
  render: h => h(App)
})
```
10. 在终端运行`npm start`命令，报错 TS2307: Cannot find module './App.vue' or its corresponding type declarations.
- 解决：在src目录下，新建一个`shims.d.ts`文件，
```ts
// 作用： 告诉typescript，遇到.vue文件会交给Vue处理
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

11. 运行成功，页面出现 Hello Vue World!




