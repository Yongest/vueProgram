/**
 * Created by yong on 2017/2/17.
 */

//负责导入其他文件, .vue .js .css ......这些文件,然后统一打包

//导入相应的包
import Vue from 'vue' //相当es5中的 var Vue = require('vue')
//const path = reuire('path')
// 导入根组件
import  App from './Vue.vue'  //相当于 es5中的 var App = reuire('./App.vue')

//website: mint-ui.github.io/#!/zh-cn
import  Mint from 'mint-ui'
//https://github.com/ElemeFE/mint-ui/
import 'mint-ui/lib/style.css'

import '../statics/mui/css/mui.min.css'
import '../statics/mui/css/icons-extra.css'


//使用 Mint 这个中间件
Vue.use(Mint)
// 创建Vue 实例
new Vue({
    el:'#app',

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
