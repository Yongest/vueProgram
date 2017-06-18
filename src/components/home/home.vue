<template>
    <div class="tmpl">
        <!--使用mint-ui 里面的轮播图swipe-->
        <mt-swipe :auto="4000" class="mt-swipe">
            <mt-swipe-item><img src="http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg" alt=""/></mt-swipe-item>
            <mt-swipe-item><img src="http://img05.tooopen.com/images/20160121/tooopen_sy_155168162826.jpg" alt=""/></mt-swipe-item>
        </mt-swipe>
        <!-- 使用mui 里面的九宫格-->
    </div>
</template>

<style scoped>
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
</script>
