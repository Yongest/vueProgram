<template>
    <div class="tmpl">
        <div class="news-info-title">
            <p><h4>{{getNewsInfoData.title}}</h4></p>
            <p><span class="add-time">{{getNewsInfoData.add_time | dateFmt('YYYY-MM-DD HH:MM')}}</span>&nbsp;&nbsp;<span class="click-number">点击数: {{getNewsInfoData.click}}</span></p>
        </div>
        <div v-html="getNewsInfoData.content" class="news-info-body">

        </div>

        <!-- 我是子组件-->
        <subcomponent :commonId="this.$route.params.newsId"></subcomponent>
    </div>
</template>

<style scoped>
    .news-info-title {
        border-bottom: 1px solid grey;
        padding: 5px;
        margin-bottom: 10px;
    }
    .news-info-title h4 {
        /*max-width: 270px;*/
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
    }
    .add-time {
        float: left;
    }
    .click-number {
        float: right;
        margin-right: 10px;
    }
    .news-info-body {
        padding: 0 10px 0 10px;
    }
    .news-info-body p img{
        /*width: 100px !important;*/
        /*height: 100px !important;*/
    }
</style>

<script>
    import common from '../../common/common.js'
    import subcomponent from '../subcomponents/subcomponent.vue'
    export default  {
        data (){
            return {
                getNewsInfoData:[]
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
           getNewsInfo(){
                var url = common.apihost + 'api/getnew/' + this.$route.params.newsId;
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    this.getNewsInfoData = res.body.message[0]
                },err=>{
                    console.log(err)
                })
            }
        },
        components:{
            subcomponent:subcomponent
        }
    }
</script>
