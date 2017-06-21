<template>
    <div class="tmpl">
        <subcomponent :commonId="this.$route.params.goodsId"></subcomponent>
    </div>
</template>

<style scoped>
</style>

<script>
    import goodscomponent from '../subcomponents/subcomponent.vue'

    export default {
        data(){
            return {}
        },
        created(){
            console.log(this.$route.params.goodsId)
        },
        methods:{

        },
        components:{
            subcomponent:goodscomponent
        }
    }
</script>
