<template>
    <div class="tmpl">
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li id="box" v-for="item in goodsListData" class="mui-table-view-cell mui-media mui-col-xs-6 box">
                    <router-link :to="'/goods/goodsinfo/'+item.id" class="link">
                        <img class="mui-media-object" :src="item.img_url">
                        <div id="title">{{item.title}}</div>
                    </router-link>
                    <div class="content">
                        <p class="price"><span class="price-sell">{{item.sell_price}}</span> <span class="price-market"><s>{{item.market_price}}</s></span></p>
                        <p class="number"><span>热卖中</span><span class="number-stock">剩余{{item.stock_quantity}}件</span></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .link {
        width: 100%;
    }
    #box {
        box-shadow: -1px 1px 0  darkgray;
        min-height: 260px;
        width:50%;
        /*margin-left : 5px;*/
    }
    ul {
        padding-right: 0;
    }
    .mui-table-view-cell>a:not(.mui-btn){
        white-space: inherit;
    }
    #title{
        width: 100% !important;
        font-size: 16px;
        /*white-space: inherit;*/
    }
    .price,.number  {
        text-align: left;
    }
    .price-market{
        margin-left: 60px;
    }
    .price-sell {
        color: red;
    }
    .number-stock {
        margin-left: 50px;
    }
    .content {
        margin-top: 10px;
    }
</style>

<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return {
                goodsListData:[]
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                const url = `${common.apihost}api/getgoods`
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    this.goodsListData = res.body.message
                },err=>{

                })
            }
        }
    }
</script>
