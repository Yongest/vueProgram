<template>
    <div class="tmpl">
        <div class="hidden-box">
            <div class="category-box ">
                <ul class="category-ul" ref="categoryRef">
                    <li>全部</li>
                    <li v-for="item in categoryListData">{{item.title}}</li>
                </ul>
            </div>
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
</style>

<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return {
                categoryListData:[]
            }
        },
        created(){
            this.getCategoryList()
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

            }
        }
    }
</script>
