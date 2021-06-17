<template>
    <div>
        <van-row>
  <van-col span="5">
      <van-sidebar v-model="activeKey" style="width:100%">
            <van-sidebar-item @click="ordera(item.id,item.name)" v-for="(item,index) in items" :key="index" :title="item.name"></van-sidebar-item>
            </van-sidebar>
  </van-col>
  <van-col span="19">
                <van-nav-bar style="background:#fafafa">
                <template #left>
                    <span style="color:#A9A9A9" >{{titlename}}</span>
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
                    <van-col span="3"><span style="display:inline;color:orange;font-size:16px">￥9</span></van-col>
                    <van-col span="15"></van-col>
                     <van-col span="6"><van-icon  color="#00A67C" size="24px" name="add" @click="addorder(dl.id)" /></van-col>
                     </van-row>
                </template>
        </van-card>
  </van-col>
        </van-row> 
        <van-row>
        <van-tabbar>
                    <van-col span="6" style="background:#000;border:0">
                    <van-badge :content="0" color="#1989fa" >
                       <van-tag @click="showPopup" round style="padding:20px;margin:-25px 0" type="success">
                        <van-icon name="cart" size="24"/>
                    </van-tag>
                        </van-badge>
                    </van-col>
                    <van-col span="12" style="background:#000;color:#FFF">
                        <van-row type="flex">
                            <span style="float: left;font-size: 24px;">￥0</span>                
                        </van-row>
                        <van-row type="flex" class="van-hairline--bottom">
                            <span style="float: left;font-size: 14px;">配送费0元</span>                
                        </van-row>
                    </van-col>
                     <van-col span="6" style="text-align:left"> <van-button type="primary" style="height:100%;width:96%;">结算</van-button></van-col>
        </van-tabbar>
        </van-row>
        
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <div style="height:25%;font-size: 20px;background-color:#ebedf0">
              <span style="float:left;margin: 10px;top:0">购物车</span> 
              <span style="float:right;margin: 10px;">清空</span>
          </div>
          <div>
              <van-list>
                <van-cell v-for="item in allorder" :key="item.id">
                <span style="float:left;margin: 10px;">{{item.foodName}}</span>
                <span style="float:right;margin: 10px;">
                <span>￥9</span>
                <van-tag round type="danger" @click="jian"><van-icon name="minus" size="5"/></van-tag>
                <span>{{item.buyCount}}</span>
                <van-tag round type="danger" @click="jia"><van-icon name="plus" size="5" /></van-tag>
                </span> 
                </van-cell>
                </van-list>
          </div>
        </van-popup>
       
    </div>
</template>
<script>

export default {
    name:"orders",
    props:['order'],
    data(){
        return{
            show: false,
            activeKey:0,
            items:"", //标签页数据
            titlename:"", //标题名
            orderdata:"",//商家基本信息
            ordername:"",//食品名称
            orderid:"", //食品id
            list:[],
            allorder:"" ,//所有订单列表
            orderll:"" //所有订单
        }
    },
    methods:{
        //通过shopid查询商家基本信息
        ordera(itemid,itemname){
            var app = this
            this.titlename = itemname
            this.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+this.order+"&foodcategoryId="+itemid).then(function (res) {
                console.log(res)
                if(res.data){
                   app.orderdata = res.data
                }
              })
        },
        showPopup() {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = true;
            },
            //新增订单
        addorder(dl){
            var obj = {foodId:dl,buyCount:1}
            this.list.push(obj)
            this.$http.post("/biz/insertOrder",{
                userId:this.$store.state.name.id,
                shopId:this.order,
                list:this.list,
            }).then(function (res) {
                console.log(res)
              })
        },
           //商品减一
        jian(id,quan){
            var app = this
          if (quan>1){
            console.log("大于1")
            this.mutationsMinus2(id)
          }else {   //小于1则删除该订单
              this.$http.post("/biz/deleteOrderByOid?orderId="+this.allorder.id).then(function (res) {
                console.log(res.data)
                if (res.data == 1){
                      app.mutationsMinus(id)
                }
              })
          }
        },
        //  购买的商品加一
        jia(id){
            for (var i=0;i<this.allorder.length;i++){
              if (id == this.allorder[i].id){
                this.mutationsplus(this.allorder[i])
              }
            };

        },
        
    },
    //通过商家的食品分类查询对应的食品
    created(){
        var app = this
        var oid = this.$store.state.name.id
         this.$http.get("/biz/queryFoodCategory?id="+this.order).then(function (res) {
            console.log(res)
            if(res.data){
                app.items = res.data
                app.orderid = res.data[0].id
                app.titlename = res.data[0].name   
                app.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+app.order+"&foodcategoryId="+app.orderid).then(function (res) {
                console.log(res)
                if(res.data){
                   app.orderdata = res.data
                }
              })
            }
          }),
           this.$http.get("/biz/queryOrdersByUserId?userId="+oid).then(function (res) {
            console.log(res.data[0].list)
            if(res.data){
                app.orderll = res.data
                for(var i=0;i<res.data.length;i++){
                    app.allorder = res.data[i].list
                }
            }
        })
    }
}
</script>
<style>
.van-submit-bar__bar{
    padding: 0;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width: 0;
}
.van-card__price{
    display: inherit;
}
</style>