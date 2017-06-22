<template>
    <div class="content">
        <button type="button" class="left" @click="substrict">-</button>
        <input type="number" class="middle" v-model="count" @keyup="userInput"/>
        <button type="button" class="right" @click="add">+</button>
    </div>
</template>

<style scoped>
    .left,.right {
        width: 35px;
        height: 25px;
        display: inline-block;
        /*line-height: 25px;*/
        text-align: center;
        border: 1px solid darkgray;
        background-color: darkgrey;
    }
    .middle {
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid darkgray;
    }
</style>

<script>
    import common from '../../common/common.js'
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                count:1
            }
        },
        created(){

        },
        methods:{
            substrict(){
                if(this.count<=1){
                    return false
                }
                this.count --
                this.notify()
            },
            add (){
                this.count ++
                this.notify()
            },
            userInput(){//防止用户输入负数
                if(this.count<=0){
                    this.count = 1
                    Toast({
                        message: '购买的商品不能为负数!!',
                        position: 'middle',
                        duration: 2000
                    })
                }
            },
            notify(){//将子组件的count值传递给父组件.注册的事件可以是任何名字.在父组件中调用这个事件就可以了
                this.$emit('numberChange',this.count)
            }
        }
    }
</script>
