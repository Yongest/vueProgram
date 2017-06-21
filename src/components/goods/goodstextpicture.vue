<template>
    <div class="tmpl">
        <div class="title" id="title">
            {{goodsTextPictureData.title}}
        </div>
        <div class="content" v-html="goodsTextPictureData.content"></div>
    </div>
</template>

<style scoped>
    .tmpl {
        padding: 5px;
    }
    .title {
        color: green;
        border-bottom: 1px solid darkgray;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
    .content img{
        width: 100% !important;
    }
</style>

<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return {
                goodsTextPictureData:{}
            }
        },
        created(){
            this.goodTextPicture()
            var title = document.getElementById('title')
            console.log(title)
        },
        methods:{
            goodTextPicture(){
                const url = common.apihost + `api/goods/getdesc/${this.$route.query.goodsId}`
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    this.goodsTextPictureData = res.body.message[0]
                })
            }
        }
    }
</script>
