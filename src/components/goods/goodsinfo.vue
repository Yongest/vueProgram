<template>
    <div class="tmpl">
        <!--使用mint-ui 里面的轮播图swipe-->
        <subcomponent :imgData="goodsInfoImgData"></subcomponent>
    </div>
</template>

<style scoped>

</style>

<script>
    import common from '../../common/common.js'
    import subcomponentimg from '../subcomponents/subcomponentimg.vue'

    export default {
        data(){
            return {
                goodsInfoImgData:[]
            }
        },
        created(){
            this.getGoodsImgInfo()
        },
        methods:{
            getGoodsImgInfo(){
                const url = `${common.apihost}api/getthumimages/${this.$route.params.goodsId}`
                this.$http.get(url).then(res=>{
                    console.log(res.body.message)
                this.goodsInfoImgData = res.body.message
                },err=>{

                })
            }
        },
        components:{
            subcomponent:subcomponentimg
        }
    }
</script>
