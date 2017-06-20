<template>
    <div class="tmpl">
        <!-- 标题部分-->
        <div class="title">
            <h4>{{imgInfoData.title}}</h4>
            <p><span class="add-time">{{imgInfoData.add_time | dateFmt('YYYY-MM-DD HH:SS')}}</span> <span class="click-number">点击数:{{imgInfoData.click}}</span></p>
        </div>
        <!-- 缩略图部分-->

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in getThumbnailData" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, getThumbnailData)">
                </li>
            </ul>
        </div>
        <!-- 内容部分-->
        <div class="content">
            <p v-html="imgInfoData.content"></p>
        </div>
        <!-- 评论子组件部分-->
        <subcomponent :commonId="this.$route.params.infoId"></subcomponent>
    </div>
</template>

<style scoped>
    .title,.content{
        padding-left: 5px;
        padding-right: 5px;
    }
    .content {
        padding-top: 10px;
    }
    .title {
        padding-top: 5px;
        border-bottom: 1px solid darkgray;
    }
    .title p{
        height: 16px;
        clear: both;
    }
    .add-time {
        float: left;
    }
    .click-number {
        float: right;
    }
</style>

<script>
    import common from '../../common/common.js'
//    导入品论子组件
    import component11 from  '../subcomponents/subcomponent.vue'
    export default {
        data(){
            return {
                imgInfoData:{},
                getThumbnailData:[]
            }
        },
        created(){
            this.getImgInfo(),
            this.getThumbnail()
        },
        methods:{
            getImgInfo(){
                const url =  `${common.apihost}api/getimageInfo/${this.$route.params.infoId}`
                this.$http.get(url).then(res=>{
                    this.imgInfoData = res.body.message[0]
//                    console.log(this.imgInfoData)
                },err=>{

                })
            },
            getThumbnail(){
                const url = `${common.apihost}api/getthumimages/${this.$route.params.infoId}`
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    res.body.message.forEach(item=>{
                        item.w = 400
                        item.h = 600
                    })
                    this.getThumbnailData = res.body.message
                },err=>{

                })
            }
        },
        components: {
            subcomponent :component11
        }
    }
</script>
