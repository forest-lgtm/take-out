<template>
    <div>
        <div>
        <van-nav-bar    style="background-color:#00A67C">
        <template #title>
            <p style="color:#FFFFFF">搜索</p>
        </template>
        </van-nav-bar>
        </div>
      <div>
      <van-search
        v-model="value"
         @search="handles"
        show-action
        placeholder="请输入搜索关键词"
        
        >
        <template #action>
            <div style="background-color:#4fc08d;padding:0px 5px;color:#FFFFFF"  @click="handles">搜索</div>
        </template>
        </van-search>
        </div>

         <div>
            <div class="main_detail">
                <van-card @click="Shops(dl.id)" v-for="dl in detail" :key="dl.id"  num="2" :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+dl.photo">
               
                <template #title>
                    <van-row>
                    <van-col span="16"><van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">品牌</van-tag>
                    <h2 style="display:inline-block;">{{dl.name}}</h2></van-col>
                    <van-col span="8">   
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">保</van-tag>
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">准</van-tag>
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">票</van-tag>
                    </van-col>
                    </van-row>
                </template>
                
                <template #desc>
                    <van-row>
                    <van-col span="18">
                        <van-rate v-model="dl.score" readonly allow-half />
                        <span>{{dl.score}}</span>
                        <span style="color:orange">月销量{{dl.sales}}单</span>
                    </van-col>
                    <van-col span="6">
                          <van-tag class="van_tag" style="margin-left:10px"  plain type="waring" text-color="orange" size="medium">联想教育</van-tag>
                    </van-col>   
                    </van-row>
                 </template>
                <template #price >
                        <span>￥{{dl.minPrice}}起送</span>/<span>配送费约￥{{dl.transportationPrice}}</span> 
                </template>
                </van-card>
               
        
                
             
                
            </div>
           
        </div>
        <div>
        <van-tabbar route active-color="#008000">
        <van-tabbar-item replace to="/home" icon="home-o">外卖</van-tabbar-item>
        <van-tabbar-item replace to="/serch" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/order" icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"serch",
    data(){
        return{
            value:''
        }
    },
    props:['name'],
    computed:{
        ...mapState(['detail'])
    },
    methods:{
        Shops(id){
            this.$router.push('/shops/'+id)
        },
        handles(){      
          var app = this
          this.$http.get('/biz/queryAllShopsInfoByName?name='+this.value).then(function (res) {
            console.log(res)
            if(res.data){
                app.$store.state.detail=res.data;
               }
              })
        }
    },
  
     created(){
          var app = this
          this.$http.get('/biz/queryAllShopsInfo'         
            ).then(function (res) {
                console.log(res)
               if(res.data){
                app.$store.state.detail=res.data;
               }
              })
     }
    
}
</script>