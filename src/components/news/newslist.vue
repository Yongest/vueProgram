<template>
    <div class="tmpl">
        <div class="mui-content">
            <ul class="mui-table-view">
                <li v-for="item in newsListData" class="mui-table-view-cell mui-media">
                    <router-link :to="'/news/newsinfo/'+item.id">
                        <img class="mui-media-object mui-pull-left" v-lazy="item.img_url">
                        <div class="mui-media-body">
                            <span>{{item.title}}</span>
                            <p class='mui-ellipsis'>
                                <span class='add-time'>{{item.add_time | dateFmt('YYYY-MM-DD HH:MM')}}</span>
                                <span class='click-number'>点击数:{{item.click}}</span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .mui-media-object.mui-pull-left {
        width: 65px;
        height: 65px;
        max-width: 65px;
    }
    .mui-ellipsis{
        margin-top: 20px;
        color: #2ac845;
    }
    .add-time {
        float: left;
    }
    .click-number {
        float: right;
        margin-right: 10px;
    }
    .mui-media-body span{
        display: block;
        max-width: 270px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    
</style>
<script>
    import common from '../../common/common.js'
    export default {
        data (){
            return {
                newsListData:[]
            }
        },
        created (){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                var url = common.apihost + 'api/getnewslist'
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    this.newsListData = res.body.message
                },err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
