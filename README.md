# vue
This is the vue project that include webpack、vue、mui、mint-ui、es6、node and so on technologies. This is also a single page program.

# step one

## 项目的搭建
    1、创建项目vue
    2、创建必要的文件夹
        src:源代码
        dist:最后打包的时候用
        package.json 不要在里面写注释，描述项目的功能，记录我们项目依赖的包
        webpack.config.js webpack的配置文件，记录一些webpack的配置，方便打包
    3、创建webpack打包的入口文件(main.js)，它的作用就是，把项目中的其它所有模块(文件)通通导入进来，然后在统一打包
    4、创建App.vue这个根组件，这个是项目已启动看到的页面(组件),要想让我们的App.vue成为根组件，这个时候的在main.js中配置下，具体配置
        ```
            import App from './App.vue'
            new Vue({
                el:'#app',
                //es6简便写法
                render : h=>h(App)//告诉我们Vue实例,程序已启动去渲染哪个组件
            })
        ```
    5、在创建好的webpack.config.js中写配置代码
        打包的入口文件
        打包成功之后输出的文件
        配置Loader (vue-loader)

    6、运行 webpack 打包，但是打包出来只有一个bundle.js，得自己建议一个index.html然后导入bundle.js，然后跑起来，并且每个更改了App.vue，都得再次打包，这样很麻烦
    7、使用webpack-dev-server(监控源代码，然后自动打包) 结合 html-webpack-plugin(自动根据模版index.html，并且自动导入bundle.js)，这样就省事了
        ```
            npm i webpack-dev-server -g
            npm install webpack webpack-dev-server html-webpack-plugin --save-dev

            var HtmlWebpackPlugin = require('html-webpack-plugin');
            建立一个模版文件template.html，把里面写上视口，id=app的div

            plugins: [new HtmlWebpackPlugin({
                filename : 'index.html',
                template : 'template.html'
            })]
        ```

## 集成mint-ui&&mui
    mint-ui
        集成步骤:
            npm i mint-ui -S

            import Vue from 'vue';
            import Mint from 'mint-ui';
            import 'mint-ui/lib/style.css';

            Vue.use(Mint);

            该怎么使用就怎么使用

    mui
        集成步骤:
            将css、js放在statics下面去

            在打包入口文件main.js中通过import(require)导入即可

            该怎么使用就怎么使用