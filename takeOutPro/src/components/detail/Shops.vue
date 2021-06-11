<template>
    <div>
        <div>
              <van-nav-bar :border="false"  style="background-color:#00A67C">
              <template #left>
                  <van-icon @click="handleicon"  name="arrow-left" color="#FFF"  size="26"/>
              </template>
              <template #title>
                  <br>
                  <br>
                    <van-image
                    cover
                width="60"
                height="60"
                :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+shop.photo"
                />
              </template>
         </van-nav-bar>
         <van-row style="margin-top:25px;text-align:center">
             <span><van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">品牌</van-tag></span>
             <span style="margin-left:8px;display:inline-block;font-size:24px;font-weight:800">{{shop.name}}</span>
             <van-icon name="play" />
        </van-row>
          <van-row style="text-align:center">
             <span style="color: #808080; font-size: 12px;">{{shop.score}}  月销售{{shop.sales}}单  联想教育   约五分钟   距离1000米</span>
        </van-row>
         <van-row style="text-align:center">
         <span style="border: 1px solid #ebedf0;">
        <span><van-tag class="van_tag" color="#FFD700" text-color="#FFF" >首单</van-tag></span>
        <span style="color: #808080; font-size: 12px;">新用户下单立减17元(不同其他    8个优惠   </span><van-icon name="arrow-down" />
          </span>   
        </van-row>
        <van-row style="text-align:center">
            <van-tabs title-active-color="#00A67C" color="#00A67C">
            <van-tab title="点餐" name="orders">
                <orders :order="id"></orders>
            </van-tab>
            <van-tab title="评价" name="evaluate">内容 2</van-tab>
            <van-tab title="商家" name="merchant">内容 3</van-tab>
            </van-tabs>
        </van-row>

        
        
        </div>
      
    </div>
</template>
<script>
import Orders from "./Orders.vue"

export default {
    name:"shops",
    props:['id'],
     data(){
         return{
             shop:"",
         }
     },
     components:{
         Orders,
     },
    methods:{
        handleicon(){
             this.$router.push('/')
        },
    },
    created(){
         var app = this
         this.$http.get("/biz//queryInfoByShopId?shopId="+this.id).then(function (res) {
             if(res.data){
                 app.shop = res.data
             }
    }
         )}
}
</script>