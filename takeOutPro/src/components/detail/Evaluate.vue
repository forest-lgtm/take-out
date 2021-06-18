<template>
    <div class="van-hairline--top">
        <van-row>
        <van-col span="10" style="margin: 10px 0;" class="van-hairline--right">
            <van-row>
                <h2 style="margin-top: 10px;margin-bottom:0;color:orange">{{evldata.score}}</h2>
            </van-row>
            <van-row>
                <h4 style="margin:0">综合评分</h4>
            </van-row>
            <van-row>
                <span style="color: #808080; font-size: 14px;">高于周边商家99%</span>
            </van-row>
        </van-col>
        <van-col span="14" style="margin-top: 10px;" class="van-hairline--left">
            <van-row>
              <van-col span="12" style="margin-left:10px">
                  <van-rate v-model="evldata.score" readonly allow-half size="14" />
              </van-col>
              <van-col span="12" style="margin-left:-10px">
                <h5 style="margin:0;display:inline;">服务评分</h5>
                <span style="font-size:12px;color:orange">{{evldata.serviceScore}}</span>
              </van-col>  
            </van-row>
             <van-row style="margin-top:8px">
              <van-col span="12" style="margin-left:10px">
                <van-rate v-model="evldata.score" readonly allow-half  size="14"/>
              </van-col>
              <van-col span="12" style="margin-left:-10px">
                  <h5 style="margin:0;display:inline;">商品评分</h5>
                  <span style="font-size:12px;color:orange">{{evldata.goodsScore}}</span>
              </van-col>  
            </van-row>
        </van-col>
         <van-row>
             <van-col style="margin-left:8px">
                 <h4 style="margin:0;display:inline;">送达时间</h4>
                 <span style="margin-left:10px;color: #808080; font-size: 14px;">30分钟</span>
             </van-col>
         </van-row>
        </van-row>
        <div style="background:#ebedf0;padding:8px;"></div>
        <van-row style="margin:15px 0">
        <van-col span="20" style=" margin-left: -15px;">
            <van-button  style="margin-left:-15px;margin-right:15px" color="#00A67C" size="normal" @click="evaluateBtn(2)">全部</van-button>
            <van-button style="margin-right:15px" color="#ebedf0" size="normal" @click="evaluateBtn(1)"><span style="color:#000">满意</span></van-button>
            <van-button style="margin-right:15px" color="#ebedf0" size="normal" @click="evaluateBtn(0)"><span style="color:#000">不满意</span></van-button>
            </van-col>
        </van-row>
        <van-row type="flex" style="margin-top:10px;margin-left:15px">
           <van-tag round style="padding:1px;" type="success">
            <van-icon name="success" size="18"/>
            </van-tag>
            <span style="margin-left:10px;color: #808080; font-size: 14px; ">只看有内容的评论</span>
        </van-row>
        <van-cell-group>
        <van-cell v-for="(item,index) in filetrsData" :key="index">
            <van-row>
                <van-col span="2">
                    <van-image round width="2rem" height="2rem" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                </van-col>
                <van-col span="13">
                     <span style="font-size: 12px">{{item.account | filetrsaccount}}</span>
                      <div>
                        <van-rate v-model="item.score" readonly allow-half size="15"/>
                      </div>
                      <div>
                        <span style="font-size: 12px;font-weight:600">{{item.comments}}</span>
                      </div>
                      <van-row>
                          <van-col span="3"><van-icon name="good-job" color="orange" size="20"/></van-col>
                          <van-col span="21"><van-tag type="warning">南瓜粥</van-tag></van-col>   
                      </van-row>
                </van-col>
                <van-col span="9">
                    <span style="color: #808080; font-size: 12px;">{{item.oederTime}}</span>
                </van-col>
            </van-row>
        </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    name:"evaluate",
    props:['evaluate','evldata'],
    data(){
        return{    
        remark:"",
        btnVal:2
        }
    },
    methods:{
         evaluateBtn(res){
           this.btnVal = res;
        }
    },
    filters:{
            filetrsaccount(val){
                 let reg = /^(.{1}).*(.{1})$/
                  return val.replace(reg,"$1**********$2")           
        
        }
     }, 
    computed:{    
       filetrsData(){
            if(this.btnVal==1){
                return this.remark.filter(function (val){
                    return val.isGood == 1;
                })
            }else if(this.btnVal == 0){
              return this.remark.filter(function (val){
                return val.isGood == 0;
              })
            }else{
              return this.remark
            }
        }
    },
    created(){
        var app =this
        this.$http.get("/biz//queryCommentByShopId?shopId="+this.evaluate).then(function(res){
            console.log(res)
            if(res.data){
                app.remark = res.data
            }
            
        })
    }
}
</script>