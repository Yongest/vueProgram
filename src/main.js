/**
 * Created by yong on 2017/6/17.
 */

//负责导入其他文件, .vue .js .css ......这些文件,然后统一打包
//const path = reuire('path')

//导入相应的包
import Vue from 'vue' //相当es5中的 var Vue = require('vue')
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'

//website: mint-ui.github.io/#!/zh-cn
import  Mint from 'mint-ui'
import { Lazyload } from 'mint-ui';

//https://github.com/ElemeFE/mint-ui/
import 'mint-ui/lib/style.css'
// import mui style
import '../statics/mui/css/mui.min.css'
import '../statics/mui/css/icons-extra.css'

//导入mui.min.js
//import mui from '../statics/mui/js/mui.min.js'
//import  '../statics/mui/js/mui.lazyload.js'
//import  '../statics/mui/js/mui.lazyload.img.js'
//导入我们自己的样式
import '../statics/css/common.css'


//使用的中间件集合
//使用 Mint 这个中间件
Vue.use(Mint)
//使用VueRouter 中间件
Vue.use(VueRouter)
//使用VueResource 中间件
Vue.use(VueResource)
//使用Vue.use(Lazyload);
Vue.use(Lazyload);
// 导入根组件
import  App from './Vue.vue'  //相当于 es5中的 var App = reuire('./App.vue')

//导入相应的单文件组件
import home from './components/home/home.vue'
import member from './components/member/member.vue'
import settings from './components/settings/settings.vue'
import shopcar from './components/shopcar/shopcar.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'

//写一个时间过滤器,
Vue.filter('dateFmt',(input,dateResult)=>{
    var dateResult = dateResult || 'YYYY-MM-DD'
    return moment(input).format(dateResult)
})
const vueRouter = new VueRouter({
    routes :[
        {path: '/', redirect: { name: 'home' }},
        {name:'home',path: '/home', component: home},
        {path: '/member', component: member},
        {path: '/settings', component: settings},
        {path: '/shopcar', component: shopcar},
        {path: '/news/newslist', component: newslist},
        {path:'/news/newsinfo/:newsId',component:newsinfo},
        {path:'/photo/photolist',component:photolist}
    ],
    linkActiveClass:'mui-active'
})


// 创建Vue 实例
new Vue({
    el:'#app',
    router:vueRouter,
    //因为组件抽离出去了,所有需要加渲染函数
    //es6 简洁写法
    render:h=>h(App)  // 告诉我们Vue实例,程序已经启动,去渲染那个组件

    //es6 完整写法
    //render:(h)=>{return h(App)}

    // //es5 写法
    //render:function(createElement){
    //    return createElement(App)
    //}
 })
