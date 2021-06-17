<template>
    <div>
         <van-row  style="text-align:center">
         <span @click="show = true" style="border: 1px solid #ebedf0;">
        <span><van-tag class="van_tag" color="#FFD700" text-color="#FFF" >首单</van-tag></span>
        <span style="color: #808080; font-size: 12px;">新用户下单立减17元(不同其他    8个优惠   </span><van-icon name="arrow-down" /></span>   
          <van-action-sheet v-model="show" title="优惠活动" :closeable="false" cancel-text="取消">
        <div class="content">
            <van-row type="flex" justify="center">
            <van-list>
            <van-cell v-for="item in options" :key="item.id">
            <van-tag type="danger">{{item.tag}}</van-tag>
            <span>{{item.contents}}</span>
            </van-cell>
        </van-list>
        </van-row>
     
        </div>
        </van-action-sheet>        
        </van-row>

    </div>
</template>
<script>
export default {
    name:"discounts",
    props:['discounts'],
    data(){
        return{
            show: false,
            options:""
        }
    },
    created(){
        var app = this
        this.$http.get("/biz//querySpecialOfferByShopId?shopId="+this.discounts).then(function(res) {
            console.log(res)
             if(res.data){
                 app.options = res.data
             }       
    })
    }
}
</script>