<template>
    <div class="tmpl">
        <!--使用mint-ui 里面的轮播图swipe-->
        <mt-swipe :auto="4000" class="mt-swipe">
            <mt-swipe-item v-for="item in imgData" :key="item.url"><!--加上key:防止重复渲染一样的列表-->
                <a :href="item.url">
                    <img :src="item.img" alt=""/>
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<style scoped>
    /*   1.0 轮播图*/
    .mt-swipe {
        width: 100%;
        height: 250px;
    }
    .mt-swipe img {
        width: 100%;
        height: 250px;
    }
</style>

<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return {}
        },
        created(){

        },
        methods:{

        },
        props:['imgData']
    }
</script>
