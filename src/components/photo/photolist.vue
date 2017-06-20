<template>
    <div class="tmpl">
        <div class="hidden-box">
            <div class="category-box ">
                <ul class="category-ul" ref="categoryRef">
                    <li @click="getCategoryId(0)">全部</li>
                    <li  v-for="item in categoryListData"  @click="getCategoryId(item.id)">{{item.title}}</li>
                </ul>
            </div>
        </div>

        <div class="imglist">
            <ul class="imglist-ul">
                <li v-for="item in imgListData">
                    <!--<img :src="item.img_url" alt=""/>-->
                    <router-link :to="'/photo/photoinfo/'+item.id">
                        <img v-lazy="item.img_url">
                         <p>
                            <span class="title">{{item.title}}</span><br/>
                            <span>{{item.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .hidden-box {
        height: 28px;
        overflow: hidden;
    }
    .category-box {
        overflow-x: auto;
    }
    .category-ul {
        /*width: 1200px;*/
        padding-left: 5px;
        margin: 8px 0 15px 0;
        list-style: none;
    }
    .category-ul::-webkit-scrollbar {display:none}
    .category-ul li{
        display: inline-block;
        padding-right: 5px;
        color: #2ac845;
        font-size: 18px;
    }
    /*图片列表*/
    .imglist {
        margin-top: 10px;
        padding: 0 5px 0 5px;
    }
    .imglist-ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .imglist-ul li {
        position: relative;
    }
    .imglist-ul li p {
        position: absolute;
        padding: 0 5px 0 5px;
        left: 0;
        bottom: 0;
        color: #fff;
        background: rgba(0,0,0,.3);
    }
    .imglist-ul li p .title {
        font-size: 16px;
        font-weight: 900;
    }
    .imglist-ul img {
        width: 100%;
        height: 400px;
    }
    /*图片懒加载*/
    img[lazy=loading] {
        background: yellowgreen;
        margin: auto;
    }
</style>

<script>
    import common from '../../common/common.js'
    import { Indicator } from 'mint-ui';
    import { Lazyload } from 'mint-ui';

    export default {
        data(){
            return {
                categoryListData:[],
                imgListData:[]
            }
        },
        created(){
            this.getCategoryList()
            this.getCategoryId(0)
        },
        methods:{
            getCategoryList(){
                var url = `${common.apihost}api/getimgcategory`
                this.$http.get(url).then(res=>{
                    const count = res.body.message.length + 1;
                    this.$refs.categoryRef.style.width = count*76 + 'px'
                    this.categoryListData = res.body.message

                },err=>{

                })
            },
            getCategoryId(id){
                Indicator.open({
                    text: ' 加载中...',
                    spinnerType: 'triple-bounce'
                })
                var url = `${common.apihost}api/getimages/${id}`
                this.$http.get(url).then(res=>{
                    this.imgListData = res.body.message
                    Indicator.close()
                },err=>{

                })
            }
        }
    }
</script>
