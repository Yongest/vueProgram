<template>
    <div class="tmpl">
        <!-- 1.0 购物车列表 -->
        <div class="goodsListDiv">
            <div class="everyGoodsItemStyle" v-for="(item,index) in shopsList" :key="item.id">
                <!-- 1.1 开关 -->
                <mt-switch @change="statisticsNumberAndPrice"  v-model="switchValues[index]"></mt-switch>
                <!-- 1.2 图片 -->
                <img :src="item.thumb_path" />
                <!-- 1.3 商品信息 -->
                <div class="priceAndNumberInfo">
                    <h5>{{item.title}}</h5>
                    <p>
                        <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                        商品数量:{{item.count}}
                    </p>
                </div>
                <!-- 1.4 删除按钮 -->
                <mt-button size="small" type="danger">删除</mt-button>
            </div>
        </div>

        <!-- 2.0 合计 -->
        <div class="totalStyle">
            <h6>总计(不含运费)</h6>
            <p>已经勾选商品&nbsp;<span>{{totalCount}}</span>&nbsp;件
                ,总价&nbsp;<span>{{totalPrice}}</span>&nbsp;元</p>
            <mt-button class="jiesuanStyle" size="small" type="danger">去结算</mt-button>
        </div>
    </div>
</template>

<style scoped>
    /**
     1.0 购物车商品列表样式
 */
    .goodsListDiv{
        padding: 5px;
    }

    .everyGoodsItemStyle{
        display: flex;
        height: 100px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        align-items: center;
    }

    .everyGoodsItemStyle img{
        height: 75px;
        width: 75px;
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
        margin-left: 8px;
    }

    .priceAndNumberInfo{
        margin-left: 8px;
        flex: 1;
    }

    h5{
        color: #0094ff;
    }

    .priceAndNumberInfo p{
        margin-top: 10px;
    }

    .priceAndNumberInfo span{
        color: red;
        font-size: 14px;
    }

    /**
        合计
    */
    .totalStyle{
        position: relative;
        margin-top: 10px;
        height: 100px;
        padding-top: 20px;
        padding-left: 15px;
        background-color: rgba(92,92,92,0.3)
    }

    h6{
        color: black;
        font-weight: bold;
        font-size: 16px;
    }

    .totalStyle p{
        margin-top: 10px;
    }

    .totalStyle span{
        font-size: 16px;
        color:red;
    }

    .jiesuanStyle{
        position: absolute;
        top: 35px;
        right: 15px;
    }
</style>

<script>
    import common from '../../common/common.js'
    //导入本地商品存储数组
    import {getLocalStorageArr} from '../../common/goodscarhelper.js'

    export default {
        data(){
            return {
                shopsList:[],
                switchValues:[],
                totalCount : 0,
                totalPrice : 0
            }
        },
        created(){
        this.getGoodsInfo()
        },
        methods:{
            getGoodsInfo(){
//                1.获取localStorage中的数组
//                [{"goodsId":"90","count":4},{"goodsId":"90","count…dsId":"95","count":1},{"goodsId":"95","count":5}]
                const goodsArray = getLocalStorageArr()
//                2.合并数组中的数量,整成一个新的数据{87:3,90:5,88:3}
                var goodsObj = {}
                for(var i = 0;i<goodsArray.length;i++){
                    const goodsId = goodsArray[i]['goodsId']
                    if(goodsObj[goodsId]){
                        var oldValue = goodsObj[goodsId]
                        var newValue = oldValue+ parseInt(goodsArray[i]['count'])
                        goodsObj[goodsId] = newValue
                    }else {
                        goodsObj[goodsId] = parseInt(goodsArray[i]['count'])
                    }
                }
//                3.在新的数组中,获取么个商品的id组成88,89,90 因为后台需要
                var idsArr = []
                for(var key in goodsObj){
                    idsArr.push(key)
                }
                var idsString= idsArr.join(',')
                console.log(idsString)
//                4.发送ajax请求,获取数据
                const url = common.apihost + `api/goods/getshopcarlist/${idsString}`
                this.$http.get(url).then(res=>{
                    res.body.message.forEach((item,index)=>{
                        item.count = goodsObj[item.id]

                        //循环给switchValues 赋值
                        this.switchValues[index] = true
                    })
                    this.shopsList = res.body.message
//                    console.log(res.body.message)
                    //计算总数和价格
                    this.statisticsNumberAndPrice()
                },err=>{

                })
            },
            //统计商品数量与价格
            statisticsNumberAndPrice(){
                //统计数量与商品价格,根据每一条的开关状态来,当开关打开就统计,
                //开关关闭不统计
                var statisticsTotalNumber = 0
                var statisticsTotalPrice = 0
                //this.switchValues与this.shopsList索引是一致的.
                this.switchValues.forEach((item,index)=>{
                    //item 的值只有两种 true 和 false
                    if(item){
                        const goodsObj = this.shopsList[index]
                        //数量的累加
                        statisticsTotalNumber += goodsObj.count
                        //金额的累加
                        statisticsTotalPrice += parseInt(goodsObj.count)*parseInt(goodsObj.sell_price)
                    }
                })
                //最终赋值，这样的话，就重新计算了
                this.totalCount = statisticsTotalNumber
                this.totalPrice = statisticsTotalPrice
            }
        }
    }
</script>
