<template>
    <div>
        <div>
        <van-nav-bar style="background-color:#00A67C">
        <template #title>
            <p style="color:#FFFFFF">订单列表</p>
        </template>
        </van-nav-bar>
        </div>
        <van-tabs v-if="loingStatus">
        <van-tab title="外卖订单">
            <van-card
            v-for="card in 15" :key=card  
           
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            >
            <template #title>
                <h2>蛟龙豆捞 ></h2>
            </template>
            <template #desc>
                红米薯粥等一件商品
            </template>
            <template #footer>
                <van-button round  size="mini">删除订单</van-button>
                <van-button round plain type="primary" size="mini">再来一单</van-button>
            </template>
            </van-card>

        </van-tab>
        <van-tab title="待评价"></van-tab>
        <van-tab title="退款"></van-tab>
        <van-tab title="其他订单"></van-tab>
        </van-tabs>


        <div v-else style="text-align:center">
        <van-empty description="用户未登录">
        <van-button round type="danger" class="bottom-button" @click="login">立即登录</van-button>
        </van-empty>
        </div>

        <div>
        <van-tabbar route active-color="#008000">
        <van-tabbar-item  replace to="/home" icon="home-o">外卖</van-tabbar-item>
        <van-tabbar-item  replace to="/serch" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/order" icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user"  icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"order",
    computed:{
         ...mapState(['loingStatus'])
    },
    methods:{
        login(){
            this.$router.push('/login')
        }
    },
    created(){
        if(this.$store.state.isLogined == false){
            return;
        }
        }
}
</script>