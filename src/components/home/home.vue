<template>
    <div class="tmpl">
        <!--使用mint-ui 里面的轮播图swipe-->
        <subcomponent :imgData="imgList"></subcomponent>
        <!-- 使用mui 里面的九宫格-->

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

    import common from '../../common/common.js'
    import subcomponentimg from '../subcomponents/subcomponentimg.vue'
//    module.exports ={ //es5 的写法
//        data:function(){
//            return {
//                greeting:'Hello'
//            }
//        }
//    }

    export default {//这是es6新的写法
        data(){
            return {
                imgList:[]
            }
        },
        created(){//这个函数在我们组件被创建的时候就会被调用.
            this.getLunboData()
        },
        methods:{//所有自定义的函数,都会写在里面
            //get 轮播数据,
            getLunboData (){//利用vue-resource 发送ajax请求
                const url = common.apihost + 'api/getlunbo'
                this.$http.get(url).then(res=>{
                    this.imgList = res.body.message
                },err=>{
                    console.log(err)
                })
            }
        },
         components:{
            subcomponent:subcomponentimg
        }
    }
</script>
<style scoped>
    /*   1.0 轮播图*/


    /*2.0九宫格*/
    .mui-content>.mui-table-view:first-child {
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: none;
        border-bottom: none;
    }
    .mui-icon:before {
        content: '';
    }
    .mui-icon {
        width: 50px;
        height: 50px;
        background-repeat: round;
    }
    .mui-icon.mui-icon-home {
        background-image: url('../../../statics/images/menu3.png');
    }
    .mui-icon.mui-icon-email {
        background-image: url('../../../statics/images/menu4.png');
    }
    .mui-icon.mui-icon-chatbubble {
        background-image: url('../../../statics/images/menu5.png');
    }
    .mui-icon.mui-icon-location {
        background-image: url('../../../statics/images/menu6.png');
    }
    .mui-icon.mui-icon-search {
        background-image: url('../../../statics/images/menu9.png');
    }
    .mui-icon.mui-icon-phone {
        background-image: url('../../../statics/images/menu10.png');
    }
</style>


