<template>
    <div class="tmpl">
        <div class="add-comment">
            <h4>添加评论</h4>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            <mt-button @click="addComment" size="large" type="primary">提交评论</mt-button>
        </div>
        <div class="comment-list">
            <h4>评论列表</h4>
            <div class="data-father" v-for="(item,index) in addCommentData" :key="index">
                <div class='content'>{{item.content}}</div>
                <p class="data">
                    <span class="user">匿名用户</span>
                    <span class="add-time">{{item.add_time | dateFmt('YYYY-MM-DD HH:MM')}}</span>
                </p>
            </div>
        </div>
        <mt-button @click="loadmore" class="load-more" plain size="large" type="danger">加载更多</mt-button>
    </div>
</template>

<style scoped>
    .add-comment,.comment-list {
        padding: 5px 5px 10px 5px;
    }
    .user {
        float: left;
    }
    .add-time {
        float: right;
        padding-right: 5px;
    }
    .user,.add-time {
        color: green;
    }
    .load-more {
        margin: 20px 5px 65px 5px;
    }
    .data {
        clear: both;
        min-height: 20px;
    }
    .data-father {
        border-bottom: 1px solid darkslategray;
    }
    .content {
        word-break: break-all;
    }
</style>

<script>
    import common from '../../common/common.js'
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return {
                pageindex:1,
                addCommentData:[]
            }
        },
        created(){
            this.getComment()
        },
        methods:{
            getComment(){
//                api/getcomments/:comentid?pageindex=1
                var url = common.apihost + 'api/getcomments/'+this.commonId+"?pageindex=1"
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                    this.addCommentData = res.body.message
                },err=>{

                })
            },
            addComment (){
                var url = common.apihost + 'api/postcomment/'+ this.commonId
                var txtValue = document.querySelector('textarea').value
//                console.log(txtValue)
                if(txtValue=="" ||txtValue.trim()==""){
                    Toast({
                        message: '评论不能为哦!',
                        position: 'middle',
                        duration: 2000,
                    });
                    return false;
                }
                this.$http.post(url,{content:txtValue},{emulateJSON:true}).then(res=>{
                    document.querySelector('textarea').value = null
                    Toast({
                        message: res.body.message,
                        position: 'middle',
                        duration: 2000,
                    });
                    var url = common.apihost + 'api/getcomments/'+this.commonId+"?pageindex=1"
                    this.$http.get(url).then(res=>{
//                    console.log(res.body.message)
                        this.addCommentData = res.body.message
                    },err=>{

                    })
                },err=>{

                })
            },
            loadmore (){
                this.pageindex++
                var url = common.apihost + 'api/getcomments/'+this.commonId+"?pageindex="+this.pageindex++
                this.$http.get(url).then(res=>{
                    this.addCommentData = this.addCommentData.concat(res.body.message)
                    Toast({
                        message: '加载成功',
                        position: 'middle',
                        duration: 2000,
                    });
                },err=>{

                })
            }
        },
        props:['commonId']

    }
</script>
