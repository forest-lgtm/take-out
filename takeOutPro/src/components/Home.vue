<template>
    <div>
        <div>
        <van-nav-bar title="标题" left-text="返回" class="nav" left-arrow>
        <template #left>
        <van-icon name="search" color="#FFFFFF" size="18" />
        </template>
        </van-nav-bar>
        </div>
        <div>
        <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">搜索</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
            
        </div>

    </div>
</template>
<script>
export default {
    name:"home",
    data(){
        return{
            active:0
        }
    }
}
</script>