<template>
    <div> <!--must use a root element,otherwise make a mistake-->
        <!-- header-->
        <mt-header fixed title="Vue 管理系统"></mt-header>
        <div class="go-back" v-if="isHome">
            <a @click="goBack()">&lt;返回</a>
        </div>
        <!-- body-->
        <!--用router-view 先占个位置-->
        <router-view></router-view>
        <!-- footer-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-pengyouquan"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">消息</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>

    </div><!--root element-->
</template>

<style>
    .go-back a {
        position: fixed;
        z-index: 10;
        top: 10px;
        left: 10px;
        color: #fff;
        font-weight: 900;
        font-size: 18px;
    }
</style>

<script>
    export default {
        data(){
            return {
                isHome:true
            }
        },
        created(){
            if(this.$route.path.includes('home') || this.$route.path.includes('member') ||this.$route.path.includes('shopcar') || this.$route.path.includes('settings')){
                this.isHome = false
            }else {
                this.isHome = true
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        },
        watch:{
            "$route":function(val, oldVal){
                if(val.path.includes('home') ||val.path.includes('member')||val.path.includes('shopcar')||val.path.includes('settings')){
                    this.isHome = false
                }else {
                    this.isHome = true
                }
            }
        }

    }
</script>
