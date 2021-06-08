<template>
    <div>
        <van-nav-bar    style="background-color:#00A67C">
        <template #title>
            <p style="color:#FFFFFF">我的</p>
        </template>
        </van-nav-bar>
        <van-nav-bar    style="height:80px;background-color:#00A67C">
        <template #left>
            <van-row type="flex" align="center">
            <van-col span="6">
                <van-image
            round
            width="50px"
            height="50px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            </van-col>
   
            </van-row>
           
        </template>
        </van-nav-bar>
       

        <div>
        <van-tabbar route active-color="#008000">
        <van-tabbar-item replace to="/" icon="home-o">外卖</van-tabbar-item>
        <van-tabbar-item replace to="/serch" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/order"  icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        </div>
    </div>
</template>
<script>
export default {
    name:"user"
}
</script>

