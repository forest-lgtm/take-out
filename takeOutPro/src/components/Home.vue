<template>
    <div>
        <div>
        <van-nav-bar :title="positionAddress ? positionAddress:'正在定位...'"   style="background-color: #00A67C">
        <template #left>
        <van-icon @click="serch" name="search" color="#FFFFFF" size="22" />
        </template>
        <template #right>
                <van-row v-if="loingStatus"><a :href="'#/user'">{{name.account}}</a><span style="color:#FFFFFF">|</span><a @click="handleoff">注销</a></van-row>   
                <van-row v-else ><a :href="'#/login'">登录</a><span style="color:#FFFFFF">|</span><a>注册</a></van-row> 
                
        </template>
        
        </van-nav-bar>
        </div>

        <div class="van-hairline--bottom">
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(data, index) in 2" :key="index">
            <van-grid :border="false" >

            <van-grid-item  v-for="data in homedata" :key="data.id"  :icon="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+data.photo" :text="data.name" />
            
            </van-grid>
            </van-swipe-item>
            </van-swipe>
        </div>

        <div class="main">
            <div class="main_detail">
                <van-cell-group :border="false">
                <van-cell icon="wap-nav" title="附近商家"/>
                </van-cell-group>

                <van-card style="background: #FFFFFF" @click="Shops(dl.id)" v-for="dl in detail" :key="dl.id"  num="2" :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+dl.photo">
               
                <template #title>
                    <van-row>
                    <van-col span="16">
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium">品牌</van-tag>
                    <h2 style="display:inline-block;">{{dl.name}}</h2></van-col>
                    <van-col span="8">   
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium" style="padding: 2px 5px;">保</van-tag>
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium" style="padding: 2px 5px;">准</van-tag>
                    <van-tag class="van_tag" color="#F8D959" text-color="#000" size="medium" style="padding: 2px 5px;">票</van-tag>
                    </van-col>
                    </van-row>
                </template>
                
                <template #desc>
                    <van-row>
                    <van-col span="19">
                        <van-rate size="14" v-model="dl.score" readonly allow-half />
                        <span>{{dl.score}}</span>
                        <span style="color:orange">月销量{{dl.sales}}单</span>
                    </van-col>
                    <van-col span="5">
                          <van-tag class="van_tag" plain type="waring" text-color="orange" size="medium" style="padding: 2px 0px;">联想教育</van-tag>
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
        <van-tabbar-item  replace to="/home" icon="home-o">外卖</van-tabbar-item>
        <van-tabbar-item  replace to="/serch" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/order"  icon="shopping-cart-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user"  icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        </div>


        <div class="amap-page-container">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
      <div class="toolbar">
        <!-- <span v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </span>
        <span v-else>正在定位</span> -->
      </div>
    </div>
    </div>
</template>
<script>
import {mapMutations, mapState} from "vuex"
export default {
    name:"home",
    data(){
        let self = this;
        return{
            active:0,
            homedata:"",//九宫格
            images: "",
             center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                // console.log(result.addressComponent.township);
                if (result && result.position) {
                  var len = result.addressComponent.township.length;
                  var index = result.formattedAddress.indexOf(
                    result.addressComponent.township
                  );
                  self.positionAddress = result.formattedAddress.substring(
                    index + len
                  );
                  // self.lng = result.position.lng;
                  // self.lat = result.position.lat;
                  // self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
    positionAddress:""
            
        }
    },
    computed:{
        ...mapState(['detail','loingStatus','name'])
    },
    methods:{
        ...mapMutations(['mutationsLoginout']),
        serch(){
            this.$router.push('/serch')
        },
        Shops(id){
            this.$router.push('/shops/'+id)
        },
        handleoff(){
            localStorage.clear()
            this.mutationsLoginout()
        }
    },
     created(){
        var app = this
          this.$http.post("/biz/queryBigCategory",).then(function (res) {
              console.log(res)
              if(res.data){
                  app.homedata =res.data
              }
            }),
            this.$http.get('/biz/queryAllShopsInfo').then(function (res) {
                console.log(res.data)
               if(res.data){
                app.$store.state.detail=res.data;    
               }
                })
     },
     
    
}
</script>

<style>
.van_tag{
    font-weight: 1000;
}
 a {
    color: #FFFFFF;
}

.white{
    color: #FFFFFF;
}


.main{
    margin-top: 20px;
}

.main_detail{
    margin-top: 20px;
}

</style>