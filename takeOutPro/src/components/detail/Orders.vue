<template>
    <div>
        <van-row>
  <van-col span="4.5">
      <van-sidebar v-model="activeKey">
            <van-sidebar-item @click.native="itema(item.id)" v-for="(item,index) in items" :key="index" :title="item.name"></van-sidebar-item>
            </van-sidebar>
  </van-col>
  <van-col span="19">
        <van-nav-bar style="background:#fafafa">
        <template #left>
            <span style="color:#A9A9A9" >{{items.name}}</span>
        </template>
        </van-nav-bar>
        <van-card  v-for="dl in orderdata" :key="dl.id" :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+dl.photo">
                <template #title>
                    <van-row type="flex">
                    <h3 style="margin:0">{{dl.name}}</h3>
                    </van-row>
                   
                </template>
                <template #desc>
                     <van-row type="flex">
                    <span style="font-size:14px;margin:0">{{dl.info}}</span>
                    </van-row>
                  
                </template>
                <template #price-top>
                     <van-row type="flex">
                    <span style="font-size:14px">月销售86份    好评率100%</span>
                       </van-row>
                </template>
                <template #price>
                    <van-row type="flex">
                     <span style="display:inline;color:orange;font-size:16px">￥9</span>
                     </van-row>
                </template>
        </van-card>
  </van-col>

</van-row>

    </div>
</template>
<script>
export default {
    name:"orders",
    props:['order'],
    data(){
        return{
            activeKey:0,
            items:"",
            orderdata:"",
            ordername:""
        }
    },
    methods:{
        itema(itemid,itemname){
            var app = this
            this.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+this.order+"&foodcategoryId="+itemid).then(function (res) {
                console.log(res)
                if(res.data){
                   app.orderdata = res.data
                }
              })
        }
    },
    created(){
        var app = this
         this.$http.get("/biz/queryFoodCategory?id="+this.order).then(function (res) {
            console.log(res)
            if(res.data){
                app.items = res.data
            }
          }),

            this.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+this.order+"&foodcategoryId="+this.order).then(function (res) {
                console.log(res)
                if(res.data){
                   app.orderdata = res.data
                }
              })
    }
}
</script>
<style>
.van-card__price{
    display: inherit;
}
</style>