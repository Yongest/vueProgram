# vue
This is the vue project that include webpack、vue、mui、mint-ui、jquery,uglifyJs,es6、node and so on technologies. This is also a single page program.

###（webpack 4.12 安装后需要 安装 webpack-cli，从webpack2.4 到4.12中间踩到很多坑）
# step one

## 项目的搭建
    1、创建项目vue
    2、创建必要的文件夹
        src:源代码
        dist:最后打包的时候用
        package.json 不要在里面写注释，描述项目的功能，记录我们项目依赖的包
        webpack.config.babeljs webpack的配置文件，记录一些webpack的配置，方便打包
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

        写好html中的内容,[参考:](https://router.vuejs.org/zh-cn/essentials/getting-started.html)
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
        [参考地址:](http://mint-ui.github.io/docs/#/zh-cn2/swipe)

    九宫格布局
        mui
       [ 参考地址:](http://www.dcloud.io/hellomui/examples/grid-default.html)

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
    (参考地址:)[http://momentjs.cn/]

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

# step3

    目标:
        评论


        图片分享
            图片列表
            图片详情

        返回功能


## 评论

### 为什么抽取
    新闻详情中用到，图片详情中用到，商品详情用到
    如果不抽取，每个页面中都要写一些重复的代码，抽取的好处
    UI的代码写一份就可，发送数据的代码写一份即可,
    注意:请求回来的数据是不一样的

### 怎么抽取，然后和我们现有的页面组合起来
    1、将我们的评论作为一个子组件
        评论子组件中包含页面，样式，逻辑
    2、将我们评论子组件嵌入到父组件(新闻详情，图片详情，商品详情)

### 父子组件如何分工协作，才能完成功能
    1、父组件需要的做的事，第一，把子组件嵌入进来，第二给我们的子组件传递必要的数据
        在评论这个功能里面，父组件只需要给子组件传递 `id` 即可

    2、子组件需要做的事，第一，获取父组件传递过来的数据`id`，第二，处理自己的业务逻辑，评论子组件内部中两大逻辑（加载评论列表-分页功能，提交评论）


### 评论组件的功能实现步骤
    1、先创建评论子组件

    2、在父组件中导入我们的子组件，并且写好对应的代码
        ```
            //1.0 导入
            import subcomment from '../subcomponents/subcomment.vue'

            //2.0 设置父组件中有哪些子组件
            components:{
               subcomment:subcomment //属性名称和属性值
            }

            //3.0 在父组件的html中使用
            <subcomment></subcomment>
        ```

    3、将父组件中的`id`传递给评论子组件
        [参考:](https://cn.vuejs.org/v2/guide/components.html)

        子组件中如何接收?
               ```
                    子组件要显式地用 props 选项声明它期待获得的数据：
                    props: ['期待父组件传递值的属性名称']
                    //props:['commentId']
               ```

        父组件怎么传递?
                ```
                    <subcomment commentId="111111"></subcomment>
                ```

### 评论子组件功能

    步骤
        1、画UI

        2、获取评论列表
            分页加载?

        3、提交评论

### 评论组件中加载更多功能的实现
    步骤:
        1、监听加载更多按钮的点击
        2、点击之后发送请求，我们的pageIndex++
        3、将新pageIndex获取到的10条数据，追加到数组后面
        4、最后将所有的数据重新赋值给模型，只要模型更改，视图就会重新渲染

### 评论组件中提交评论的实现
    步骤:
        1、获取文本框中的值
        2、发送请求，post请求
        3、请求成功之后需要
              原先文本框的内容清空
              给用户弹出一个提示
              重新获取第一页的数据，这样就可以将我们的数据查询出来了


## 图片分享

### 图片列表

### 图片的分类
    1、获取数据
    2、渲染

### 图片列表

    要展示某个分类下面的图片列表数据
    步骤:
        1、监控我们分类的点击，获取图片分类的id
        2、在根据id去发送数据请求，获取该分类id下面对应的数据
        3、最后来做渲染

### 图片详情中的缩略图
    1、获取缩略图数据
    2、先展示
    3、使用vue-preview当点击了缩略图，再来处理

### vue-preview的坑
    记得安装包
        npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime --save-dev

        npm install vue-preview --save
    模型里面必须写成 src w h
    在webpack.config.js中加上对应的loader
        ```
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ```
    剩下的按照它的来写即可

### 全局的返回
    1、UI看到

    2、点击返回按钮需要做的事
        (参考:)(https://router.vuejs.org/zh-cn/essentials/navigation.html)

    3、我们要监控路由导航
        [参考:](https://cn.vuejs.org/v2/api/#watch)
        [参考:](https://router.vuejs.org/zh-cn/api/component-injections.html)

# step4
    目标:
        商品模块

### 商品明细中的轮播功能的抽取
    为什么要抽取

    步骤
        子组件中需要做的事:
            1、创建一个轮播子组件
            2、在轮播子组件中定义一个属性，用来接收父组件传递过来的值
                ```
                    props:['lunboList']
                ```
        父组件:
            3、导入子组件
            4、在父组件中注册子组件
            5、在父组件的html标签中，使用并且给子组件传值
                ```
                    <subimageslider :lunboList="lunboList"></subimageslider>
                ```

### Vue中路由的跳转有两种方式
    声明式，事先声明的意思，用在html标签中，事先声明好了，当点击了超链接跳转到哪里去
        在html标签，使用<router-link to='跳转的路径'>
        [参考:](https://router.vuejs.org/zh-cn/essentials/navigation.html)

    编程式，就是写代码的意思，一般写在js代码中
        router.push({js对象})

### Vue中路由传参
    第一种方式 /goods/goodscomment/参数
        goodsinfo.vue
            ```
                 this.$router.push({ name: 'goodscomment', params: { goodsId: this.$route.params.goodsId }})
            ```

        main.js
            ```
                {name:'goodscomment',path:'/goods/goodscomment/:goodsId',component:goodscomment}
            ```


        最终传值:/goods/goodscomment/88

        接收值(goodscomment.vue)
            ```
                {{this.$route.params.goodsId}}
            ```

    第二种方式   /goods/goodscomment?goodsId=88
        goodsinfo.vue
            ```
                 this.$router.push({path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
            ```

        main.js
            ```
                {name:'goodscomment',path:'/goods/goodscomment',component:goodscomment}
            ```

        最终传值:/goods/goodscomment?goodsId=88

        接收值(goodscomment.vue)
            ```
                {{this.$route.query.goodsId}}
            ```

### Vue-Router 中里面 $route , $router
    区别:
        $route  获取路径
                以及可以被用来监控路由的改变
                获取参数 this.$route.params.xxx
                        this.$route.query.xxx

        $router 用来做事，比如跳转路由 $router.push({})
                         比如回退路由 $router.go(-1)
                         可以理解为动作执行者


   (参考:)[https://router.vuejs.org/zh-cn/api/component-injections.html]


### 集成商品数量子组件
    目的:
        1、可能这个商品数量子组件在其它页面也要用到
        2、了解，子组件怎么给父组件传值，比如我们商品数量子组件改变之后如何告知父组件我当前选中的个数

    思考:为什么商品数量子组件发生变化之后要通知商品明细这个父组件?
        因为`加入购物车`在商品详情的这个父组件中，而点击了`加入购物车`需要做两件事，第一，更改App.vue下面Tarbar中的购物车那个模块的徽标值，第二，要存到localstorage中，方便下次使用，而这两件事，都需要知道子组件中现在的值是多少？


### 子组件中当点击了`-`,`+`要做哪些事情?
    1、更改中间的值
    2、将最新的值告知父组件

### 子组件如何传递值给父组件(和按钮事件对比)

    子组件需要做的事?
        子组件需要触发事件，并且将值传递给父组件
        this.$emit(事件名称，要传递的值)，例如
            ```
                this.$emit('numberChange',this.count)
            ```
        事件名称可以随便写，父组件要注册同名的事件名称

    父组件需要做的事?
        注册同名的事件，写好对应的函数接收值


        打个比方:jQuery中处理事件
        $.on('click',function(){

        })

    总结：
        就是两步
        子组件触发事件，传递值
        父组件监听事件，写好对应的函数来接收值

### 加入购物车功能
    1、更改App.vue中下面TabBar中购物车这个标签栏上面的徽标值

        步骤:
        1、监控点击加入购物车的按钮



    2、将我们的当前的商品信息存储到localStorage中
        setItem("key",值)


### 父子组件传值&非父子组件传值

    父子组件:
        注意点:父子组件传值(父传子，子传父)，不需要单独创建公共的Vue对象
        ，其它它们有个公共的Vue对象---this，本质来说它们之间是有父子关系的，所以可以用this

        子传父
            1、子组件使用this.$emit触发事件传值
            2、父组件注册事件，接收值


    非父子组件:
        (参考地址:)[https://cn.vuejs.org/v2/guide/components.html]

        步骤:
            1、整一个公共的Vue对象
            2、发送发：利用上面的公共Vue对象，调用公共对象的$emit(事件名称，值),触发事件传值
            3、接收方：利用上面的公共Vue对象，注册事件，实现函数，接收值

# step 5

### 购物车的数据本地存储
    存在何处?
        浏览器端
            好处:分担服务器压力
            坏处：可能会被清掉，和浏览器绑定了，换了浏览器就不行了

        服务端存储购物车数据
            淘宝
            好处:清楚浏览器还在
            坏处:服务器压力大

    怎么存?
        localStorage , 存储的是字符串

        setItem("key",value)

    存储的数据格式?
        不用这种 ：89=2&87=3&88=1
        用这种 : [{"goodsId":"89",count:2},{"goodsId":3,count:3}]

### 购物车数据的展示
    [{"goodsId":"87","count":1},{"goodsId":"88","count":2},{"goodsId":"87","count":3}]
    //上面是原始存储起来的字符串

    明确以下几点
        1、本地存储，只存储了商品的id及数量，不要存其它的东西，有些内容是动态变化的，不要存在本地

        2、我们应该从本地获取商品的id，然后根据id发送网络请求给服务器，返回对应商品的图片、价格、名称

    获取购物车商品界面元素的步骤
        1、先从localStorage中获取到数据，我们最终想得到的是 87,89,90
            现读取所有的localStorage中的商品,返回的是数组
            ``` js对象
                [{goodsId:"87","count":1},{goodsId:"88","count":2},{goodsId:"87","count":3}]
            ```
            先转成
            ```
                {87:4,88:2}
            ```
            转成 87，88然后发送请求

        2、拿着返回的数据就去渲染界面

### 删除每一行的商品，需要做的事
    1.购物车的徽标数量要更改(减少)
        解决方案:
            bus.$emit('shopCount',-删除的那行的数量)

    2.localStorage中该goodsId对应的数据全部干掉
        解决方案:
            在shopCartHelper.js中提供一个根据goodsId删除localStorage中数据的方法，当我们调用shopCartHelper.js删除方法deleteGoods(goodsId)即可

    3.列表中的那一行商品会不见
        解决方案:
            删除shopCartList数组中对应索引的元素
            还得删除switchValues中对应索引的元素（为了重新统计）

    4.统计的价格和数量要重新计算
        解决方案:
            再调用一个统计数量和价格的方法 this.statisticsNumberAndPrice()

### 组件的生命周期
    (参考:)[https://cn.vuejs.org/v2/guide/instance.html]

    组件的生命周期钩子(函数)是vue自动帮我们调用的，我们写好对应的函数即可

    统计哪些页面用户最喜欢访问   App埋点
        以newslist.vue为例
        可以在 created 方法
            发送一个请求给后台，今日的时间为 17:37 newslist.vue

        当离开组件会调用beforeDestroy
            发送一个请求给后台，离开newlist.vue 离开事件是17:39

    当组件销毁的时候，做一些事情
        比如在我们的destroyed 中做清理工作

### 打包上线
    前提:装好包
        npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime --save-dev

    1.es6转es5以及压缩

        1.1 在webpack.config.babel.js中为js文件需要使用babel-loader
        ```
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //排除node_modules
            }
        ```
        1.2 配置babel的配置文件 .babelrc

        1.3 在webpack.config.babel.js 配置 Uglify 压缩
        ```
            //这个插件帮我们做了两件事，es6转es5,再压缩
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false //去掉警告
                }
            }),
            // 代码顺序优化
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ```

    2.压缩打包
        webpack --config webpack.config.babel.js

### vue-cli
    看

### 支付宝&微信

    老板、财务人员

        去支付宝申请商户账户,目的:通过支付宝收用户的前，转到我们自己公司的支付账号
        条件:营业执照，纳税证明，法人身份证

        商户账号的id 80081234567892222 === 美团公司

    开发者
        1、下载支付宝sdk ，类似于下载了一个jquery
        2、在我们的支付页面 通过<script src>导入sdk中的js
        3、调用支付宝的函数，打开支付宝页面用户进行支付就行了
            传递参数
                商品唯一ID ，标题，价格，扣钱的用户支付宝id，商户账号的id 80081234567892222

   
        [文档地址:]( https://doc.open.alipay.com/doc2/detail.htm?treeId=203&articleId=105463&docType=1)
