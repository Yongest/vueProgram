<template>
    <div class="tmpl">
        我是购物车
    </div>
</template>

<style>
</style>

<script>
    import common from '../../common/common.js'
    //导入本地商品存储数组
    import {getLocalStorageArr} from '../../common/goodscarhelper.js'

    export default {
        data(){
            return {

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
//                4.发送ajax请求,获取数据
            }
        }
    }
</script>
