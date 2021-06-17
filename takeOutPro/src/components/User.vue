<template>
    <div>
        <van-nav-bar    style="background-color:#00A67C">
        <template #title>
            <p style="color:#FFFFFF">我的</p>
        </template>
        </van-nav-bar>
        <van-row style="background-color:#00A67C">
        <van-col span="6" style="padding: 20px 10px;">
            <van-image
            round
            width="5rem"
            height="5rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        </van-col>
        <van-col span="16">
            <p v-if="loingStatus" style="margin-bottom: 5px;font-size: 25px;font-weight: 200;color: #FFF;">{{name.account}}</p>
            <p v-else style="margin-bottom: 5px;font-size: 25px;font-weight: 200;color: #FFF;"><a :href="'#/login'">立即登录</a></p>
          <van-icon name="graphic" color="#FFF" size="20px" /><span style="color:#FFF">暂无绑定手机号</span>
        </van-col>
        <van-col span="2">
            <van-icon name="arrow" size="30px" style="padding: 40px 0px;" color="#ebedf0"/>
        </van-col>
        </van-row>

        <van-row>
        <van-col span="8" style="border:1px solid #ebedf0;text-align:center;padding:30px 0;">
            <span style="font-size:36px;font-weight:700;color:#FFA500">0.00</span>
            <span style="font-size:22px;font-weight:600;margin-left:10px">元</span>
            <p style="color:#969799;margin:0;text-align:center">我的余额</p>
      
        </van-col>
        <van-col span="8" style="border:1px solid #ebedf0;text-align:center;padding:30px 0;">
            <span style="font-size:36px;font-weight:700;color:#FF6347">0</span>
            <span style="font-size:22px;font-weight:600;margin-left:10px">个</span>
            <p style="color:#969799;margin:0;text-align:center">我的优惠</p>
      
        </van-col>
         <van-col span="8" style="border:1px solid #ebedf0;text-align:center;padding:30px 0;">
            <span style="font-size:36px;font-weight:700;color:#32CD32">0</span>
            <span style="font-size:22px;font-weight:600;margin-left:10px">分</span>
            <p style="color:#969799;margin:0;text-align:center">我的积分</p>
        </van-col>
        </van-row>


       <van-cell-group style="margin-top: 15px;padding:10px">
           <van-row style="padding: 0 25px;">
            <van-col span="22"> <van-icon name="orders-o" color="#32CD32" size="20px" style="padding: 5px;"/><span>我的订单</span></van-col>
            <van-col span="2"> <van-icon name="arrow" size="30px"  color="#D3D3D3"/></van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group style="padding:10px">
           <van-row style="padding: 0 25px;">
            <van-col span="22"> <van-icon name="points" color="#FF6347" size="20px" style="padding: 5px;"/><span>积分商城</span></van-col>
            <van-col span="2"> <van-icon name="arrow" size="30px"  color="#D3D3D3"/></van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group style="padding:10px">
           <van-row style="padding: 0 25px;">
            <van-col span="22"> <van-icon name="vip-card-o" color="#FFA500" size="20px" style="padding: 5px;"/><span>小zhang的外卖会员卡</span></van-col>
            <van-col span="2"> <van-icon name="arrow" size="30px"  color="#D3D3D3"/></van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group style="padding:10px">
           <van-row style="padding: 0 25px;">
            <van-col span="22"> <van-icon name="service-o" color="#32CD32" size="20px" style="padding: 5px;"/><span>服务中心</span></van-col>
            <van-col span="2"> <van-icon name="arrow" size="30px"  color="#D3D3D3"/></van-col>
            </van-row>
        </van-cell-group>
            <van-row style="margin: 50px 25px;">
                <h4 style="text-align:center">Let bygones be bygones and go to the future together.</h4>
                <p style="text-align:center;color:#D3D3D3">往事不再过问,未来共赴前程</p>
            </van-row>
            <van-row style="margin: 0 25px;">
           
            </van-row>
        

       
        
       

        <div>
        <van-tabbar route active-color="#008000">
        <van-tabbar-item replace to="/home" icon="home-o">外卖</van-tabbar-item>
        <van-tabbar-item replace to="/serch" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/order"  icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        </div>
    </div>
</template>
<script>
import { mapState} from "vuex"
export default {
    name:"user",
    computed:{
        ...mapState(['loingStatus','name'])
    },
}
</script>

