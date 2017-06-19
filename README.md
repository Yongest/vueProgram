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



# step2

## 目标
    1、路由切换

    2、首页home完成

    3、新闻咨询

        新闻列表

        新闻详情

### 路由切换
    1、创建对应的单文件组件
        home.vue member.vue shopcart.vue settings.vue

    2、配置路由
        安装vue-router
            npm i vue-router -S

        写好html中的内容,参考:https://router.vuejs.org/zh-cn/essentials/getting-started.html
            第一步:<router-link to='/xxx'>xxx</router-link>
            第二步:<router-view></router-view>

        写好js中的内容，配置到main.js中
            导入，并且使用
            ```
                import VueRouter from 'vue-router'

                Vue.use(VueRouter)
            ```

            配置好路由跳转的路径及要渲染出来的对应的组件
            ```
                import home from './components/home/home.vue'
                import member from './components/member/member.vue'
                import shopcart from './components/shopcart/shopcart.vue'
                import settings from './components/settings/settings.vue'

                const vueRouter = new VueRouter({
                    routes : [
                        {path:'/home',component:home},
                        {path:'/member',component:member},
                        {path:'/shopcart',component:shopcart},
                        {path:'/settings',component:settings}
                    ]
                })

            ```

            和Vue实例关联起来
            ```
                new Vue({
                    el:'#app',
                    //es6简便写法
                    router:vueRouter,
                    render : h=>h(App)
                })
            ```

### 首页的布局

    轮播图
        mint-ui swipe
        参考地址:http://mint-ui.github.io/docs/#/zh-cn2/swipe

    九宫格布局
        mui
        参考地址:http://www.dcloud.io/hellomui/examples/grid-default.html

### 轮播图的数据

    发送请求的框架
        Vue-resource

    步骤:
        1、安装 npm i vue-resource -S
        2、导入并且使用
        ```
            import VueResource from 'vue-resource'

            Vue.use(VueResource)
        ```

### 新闻列表&新闻详情

    1、界面&布局写在<template></template>之间
    2、修饰界面布局的样式写在<style></style>
    3、业务逻辑写在<script></script>之间

        export defalut{
            data(){ //作用，给template提供数据，就是MVVM中的M
                return {
                    属性1:值1,
                    属性2:值2
                }
            },
            created(){//自动调用,当我们的组件创建出来，做初始化工作,请求数据
            },
            methods:{//自定义函数写在这了，请求网络的方法
            }
        }

### 路由跳转带参数
    1、在新闻列表中的router-link
        ```
            <router-link :to="'/news/newsinfo/'+item.id">
        ```

    2、在main.js中配置
        ```
            {path:'/news/newsinfo/:newsId',component:newsinfo}
        ```

    3、在跳转过去的组件中如何拿到
        ```
            this.$route.params.newsId
        ```

### js中时间格式化
    参考地址:http://momentjs.cn/

    步骤
        1、安装包
            npm i moment -S
        2、导入
            import moment from 'moment'

        3、在main.js中写好对应的过滤
            ```
                //input 代表要过滤，格式化的原始时间
                //dateFmtString 时间最终格式化成什么样子
                Vue.filter('dateFmt',(input,dateFmtString)=>{
                    const lastFmtString = dateFmtString || 'YYYY-MM-DD HH:mm:ss'

                    return moment(input).format(lastFmtString)
                })
            ```

         4、在需要的组件中调用即可，注意:第一个参数不用传递，默认就是`|`前面的
            ```
                {{item.add_time | dateFmt('YYYY-MM-DD HH:mm')}}
            ```