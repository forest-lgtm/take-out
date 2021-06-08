<template>
    <div>
        <van-nav-bar :border="false">
              <template #left>
                  <van-icon @click="handleicon"  name="arrow-left" color="rgb(150, 151, 153)"  size="26"/>
              </template>
         </van-nav-bar>
         <br>
         <van-row type="flex" justify="center" >
             <h1 style="color:#00A67C">硅谷外卖</h1>
        </van-row>
         <van-row type="flex"  justify="center">
            <van-tabs @disabled="disabled">
                
                  <van-tab disabled  title="登录" to="/login">  
                           <van-field   format-trigger="onBlur" placeholder="用户名"/>
                            <van-field type="password" format-trigger="onBlur" placeholder="密码">
                                <template #extra>
                                <van-switch v-model="checked" />
                                </template>
                            </van-field>                      
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">登录</van-button>
                    </div>
                    </van-tab>
              

              
                  <van-tab   title="注册" to="/register">
                      <van-field   format-trigger="onBlur" placeholder="手机/邮箱/用户名"/>
                            <van-field type="password"  format-trigger="onBlur" placeholder="密码">
                                <template #extra>
                                <van-switch v-model="checked" />
                                </template>
                            </van-field>     
                        <van-field   format-trigger="onBlur" placeholder="请输入您的姓名"/>                 
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">注册</van-button>
                    </div>
                  </van-tab>
             
          
            </van-tabs>
        </van-row>
         

       
    </div>
</template>
<script>
export default {
    name:"register",
    data(){
        return{
            checked:false
        }
    },
    methods:{
        handleicon(){
            this.$router.push('/')
        },
        disabled(){
            this.$router.push('/login')
        }
    }
}
</script>