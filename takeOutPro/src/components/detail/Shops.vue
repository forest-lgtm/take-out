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
        <discounts :discounts="id"></discounts>
        <van-row style="text-align:center">
            <van-tabs title-active-color="#00A67C" color="#00A67C">
            <van-tab title="点餐" name="orders">
                <orders :order="id"></orders>
            </van-tab>
            <van-tab title="评价" name="evaluate">
                <evaluate :evaluate="id" :evldata="shop"></evaluate>
            </van-tab>
            <van-tab title="商家" name="merchant">
                <merchant :merchant="id"></merchant>
            </van-tab>
            </van-tabs>
        </van-row>

        </div>
      
    </div>
</template>
<script>
import Orders from "./Orders.vue"
import Discounts from "./Discounts.vue"
import Evaluate from "./Evaluate.vue"
import Merchant from "./Merchant.vue"



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
         Discounts,
         Merchant,
         Evaluate
     },
    methods:{
         Shops(id){
            this.$router.push('/shops/'+id)
        },
        handleicon(){
             this.$router.push('/home')
        },
        
    },

    created(){
         var app = this
         this.$http.get("/biz//queryInfoByShopId?shopId="+this.id).then(function (res) {
             console.log(res)
             if(res.data){
                 app.shop = res.data
             }       
    })
    },
         
}
</script>
<style>
.van-action-sheet__header{
    font-weight: 600;
    font-size: 22px;
}
</style>