<template>
    <div> <!--must use a root element,otherwise make a mistake-->
        <!-- header-->
        <mt-header fixed title="Vue 管理系统"></mt-header>
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
</style>

<script>
</script>
