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
                     <van-col span="6"><van-icon  color="#00A67C" size="24px" name="add" @click="iconAdd(dl.id,dl.name )" /></van-col>
                     </van-row>
                </template>
        </van-card>
  </van-col>
        </van-row> 
            <van-row class="shopping">
              <van-submit-bar  :price="computedCart*900" :safe-area-inset-bottom="true"  text-align="left" suffix-label="配送费:￥0" button-text="提交订单" style="background-color: #000000" >
                <template #default>
                  <van-badge is-link :content="list.length"  />
<!--                  下方弹出框   -->
                  <van-cell  @click="showPopup"  class="shopping-img2" style="width: 45px" >
                      <van-icon name="cart"   size="27px" color="#fff"  />
                  </van-cell>
<!--                  弹出的内容-->
                  <van-popup  v-model="show" position="bottom"   >
                      <div>
                        <ul class="bottom-poput">
                          <li> <p>购物车</p>  <p @click="empty">清空</p> </li>
                          <li v-for="(item,i) in list" :key="i">
                            <p>{{item.name}}</p>
                            <p><van-stepper :min="0" @minus="jian(item.foodId,item.buyCount)" @plus="jia(item.foodId)"
                                            v-model="item.buyCount" theme="round" button-size="22" disable-input /></p>
                            <p>￥{{item.buyCount*9 }}</p>
                          </li>
                        </ul>
                      </div>
                  </van-popup>
                </template>

                <template #button >
                  <van-button  @click="clioe" type="primary" size="large" style="border-radius:0;width: 31%">结算</van-button>
                </template>

              </van-submit-bar>
            </van-row>
       
    </div>
</template>
<script>
 import {mapState,mapMutations} from "vuex"
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
        }
    },
     computed:{
        ...mapState(['name']),//将state的数据引入
      // 计算购物车的金额
          computedCart(){
              var coin = 0
              for (var i=0;i<this.list.length;i++){
                  coin+=this.list[i].buyCount
              }
              return coin
          },

      },
    methods:{
        ...mapMutations(['mutationsMerchant','mutationsShopping','mutationsPush','mutationsplus','mutationsMinus2','mutationsMinus']),
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
        showPopup() {   //底部弹出框是否弹出
          this.show = true;
        },
         //  添加订单
        iconAdd(foodId,name) {
          var food = { "foodId": foodId, "buyCount":1 ,"name":name}
          for (var i=0;i<this.list.length;i++){
                if (foodId==this.list[i].foodId){
                  console.log("重复"+this.list[i])
                  var buyCount = this.list[i].buyCount
                  this.list.splice(i,1)
                  food.buyCount+=buyCount
                }
          }
          this.list.push(food)
          console.log(this.list)
        },
        //点击清空，清空购物车
        empty(){
          this.list = ""
        },
         //点击结算提交订单。
        clioe(){
            var app = this
          this.$http.post("/biz/insertOrder",{
            "userId":this.name.id,
            "shopId":this.order,
            "list": this.list
          }).then(function (res) {
            if( res.data==1 ){
              console.log("下单成功")
                  app.$router.push("/order")
            }
          })
        },
         //点击清空，清空购物车
        empty(){
          this.list = ""
        },
        //商品减一
        jian(id,quan){
          for (var i=0;i<this.list.length;i++){
            if (id==this.list[i].foodId){
              if (quan>1){
                console.log("大于1")
                this.list[i].buyCount--
              }else {   //小于1则删除该订单
                this.list.splice(i,1)
              }
            }
          }

        },
        //  购买的商品加一
        jia(id){
          for (var i=0;i<this.list.length;i++){
            if (id==this.list[i].foodId){
              this.list[i].buyCount++
            }
          }

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
 .shopping .van-submit-bar>van-submit-bar__bar{
    z-index: 4000;
  }
  .shopping .shopping-img2{
    background: #07C160;
    padding: 7px;
    margin-left: 40px;
    margin-bottom: 22px;
    border-radius: 50%;
    z-index: 400;
  }
  .shopping .van-submit-bar .van-submit-bar__bar{
    padding: 0;
  }
.shopping .van-submit-bar *{
  color: #ffffff;
}
.shopping .van-stepper__minus{
    color: red;
}
.shopping .van-badge{
  position: absolute;
  top: -12px;
  left: 70px;
  border: none;
  z-index: 401;
}
.shopping .shopping-img2>i:last-child{
  display: none
}
.shopping .shopping-img2>div{
    margin-top: 5px;
  margin-left: 2px;
}
 .shopping .bottom-poput>li>p{
    color: #000000;
   margin: 15px 10px;
  }
.shopping .bottom-poput>li{
  overflow: hidden;
  padding: 0 20px;
  border-bottom:1px solid #F4F5F7
}
.shopping .bottom-poput>li:first-child{
  background: #F4F5F7;
}
.shopping .bottom-poput>li>p:first-child{
  float:left;
}
.shopping .bottom-poput>li>p:last-child{
  float: right;
}
.shopping .bottom-poput>li>p:nth-child(2){
  float: right;
  margin-right: 10px;
}
.shopping .van-submit-bar__suffix-label{
    font-size: 12px;
}
</style>