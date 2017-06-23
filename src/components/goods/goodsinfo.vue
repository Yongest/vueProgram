<template>
    <div class="tmpl">
        <!--1.0使用mint-ui 里面的轮播图swipe-->
        <div class="sliderStyle">
            <subcomponent :imgData="goodsInfoImgData"></subcomponent>
        </div>
        <!-- 2.0 商品信息 -->
        <div class="priceStyle">
            <h4>{{goodsInfo.title}}</h4>
            <!-- 价格信息 -->
            <p class="price">
                市场价:￥<s>{{goodsInfo.market_price}}</s>&nbsp;&nbsp;
                销售价:￥<span>{{goodsInfo.sell_price}}</span>
            </p>
            <!-- 数量子组件  todo -->
            <!--<button @click="btnClick"></button>-->
            <!-- 和上面对比下 -->
            <!--<subnumber @numberChange="getSubnumberCount"></subnumber>-->
            <subnumber @numberChange="numberChangetoDo"></subnumber>
            <!-- 两个按钮 -->

            <div>
                <mt-button size="small" type="primary">立即购买</mt-button>
                <mt-button size="small" @click="addShopCar" type="danger">加入购物车</mt-button>
            </div>
        </div>
        <!-- 3.0 商品参数 -->
        <div class="paramsStyle">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间:{{goodsInfo.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</li>
            </ul>
        </div>

        <!-- 4.0 图文介绍&评论 -->
        <div class="pictureInfoAndCommentStyle">
            <mt-button size="large" @click="goPictureText" plain type="primary">图文介绍</mt-button>
            <mt-button class="commentStyle"  @click="goGoodsComment()" size="large" plain type="danger">商品评论</mt-button>
        </div>
    </div>
</template>

<style scoped>
    .sliderStyle,.priceStyle,.paramsStyle,.pictureInfoAndCommentStyle{
        margin: 10px;
        padding: 10px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
    }

    .priceStyle h4{
        font-size: 16px;
        color: #0094ff;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .price span{
        color: red;
        font-size: 16px;
    }

    .paramsStyle h5{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .paramsStyle ul{
        padding: 0
    }

    .paramsStyle li{
        list-style: none;
    }

    .commentStyle{
        margin-top: 20px;
    }
</style>

<script>
    import common from '../../common/common.js'
    //导入图片详情
    import subcomponentimg from '../subcomponents/subcomponentimg.vue'
    //导入numchange 子组件
    import subnumber from '../subcomponents/subnumber.vue'
    //导入公共Vue的实例bus
//    import {bus,age} from '../../common/commonvue.js'
    import {bus} from '../../common/commonvue.js'
    //导入goodscarhelper 函数
    import {addGoods} from '../../common/goodscarhelper.js'

    export default {
        data(){
            return {
                goodsInfoImgData:[],
                goodsInfo:{},
                goodsCount:1
            }
        },
        created(){
            this.getGoodsImgInfo()
            this.getGoodsInfoData()//2.0 获取商品明细的数据
        },
        methods:{
            getGoodsImgInfo(){
                const url = `${common.apihost}api/getthumimages/${this.$route.params.goodsId}`
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                this.goodsInfoImgData = res.body.message
                },err=>{

                })
            },
            //获取商品的明细信息
            getGoodsInfoData(){
                const url = common.apihost + `api/goods/getinfo/${this.$route.params.goodsId}`
                this.$http.get(url).then(res=>{
                    this.goodsInfo = res.body.message[0]
                },err=>{

                })
            },
            //去商品评论
            goGoodsComment(){
                this.$router.push({ name: 'goodscomment', params: { goodsId: this.$route.params.goodsId}})
//                this.$router.push({ path: '/goods/goodscomment/'+ this.$route.params.goodsId})
                // 带查询参数，变成 /register?plan=private
//                this.$router.push({ path: '/goods/goodscomment/?', query: { goodsId : this.$route.params.goodsId }})
            },
            //去图文列表
            goPictureText(){
                this.$router.push({ path: '/goods/goodstextpicture', query: { goodsId: this.$route.params.goodsId }})
            },
            //子组件数量改变后,父组件要做的事情
            numberChangetoDo (count){
                this.goodsCount = count
            },
            //添加购物车
            addShopCar(){
//                console.log(bus)
//                1.更改跟组件里面的tapBar中的购物车里面的徽标
                // 触发组件 A 中的事件
                bus.$emit('shopCount',this.goodsCount)

                //2.把数据存储到localstrorage里面
                addGoods({goodsId:this.$route.params.goodsId,count:this.goodsCount})
            }
        },
        components:{
            subcomponent:subcomponentimg,
            subnumber:subnumber
        }
    }
</script>
