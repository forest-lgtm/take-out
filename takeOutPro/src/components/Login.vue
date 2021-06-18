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
                
                  <van-tab title="登录" to="/login">  
                           <van-field  v-model="username"  format-trigger="onBlur" placeholder="用户名"/>
                            <van-field
                v-model="password"
                :type="inputText"
                name="密码"
                placeholder="密码"
              >
                <template #right-icon>
                  <van-switch v-model="checked" size="20" @change="loginInput"/>
                </template>

              </van-field>                    
                    <div style="margin: 16px;">
                        <van-button round block type="primary" @click="handleLogin" native-type="submit">登录</van-button>
                    </div>
                    </van-tab>
              

              
                  <van-tab  disabled title="注册" to="/register">
                      
                  </van-tab>
             
          
            </van-tabs>
        </van-row>
         

       
    </div>
</template>
<script>
  import {mapMutations} from "vuex"
export default {
    
    name:"login",
    data(){
        return{
            username:"",
            password:"",
            checked:false,
            inputText:"password",
        }
    },
    methods:{
        ...mapMutations(['mutationsLogin']),
        handleicon(){
             this.$router.push('/home')
        },
        disabled(){
            this.$router.push('/register')
        },
        loginInput(){   //登录页面的密码框的显示与隐藏
            if (this.checked){
                this.inputText='text';
            }else{
              this.inputText='password';
            }
          },
        handleLogin(){   //登陆按钮事件   获取用户名和密码，发送ajax
          var app = this
          this.$http.post("/user/login",{
            "account":this.username,
            "password":this.password
          }).then(function (res) {
            console.log(res.data)
            if (res.data==""){
              alert("用户名或密码不正确")
            }else{
              app.mutationsLogin(res.data)   //登陆成功后，保存数据到state
              localStorage.setItem("name", JSON.stringify(res.data))
              window.localStorage.setItem("loingStatus",true);
              window.localStorage.setItem("account",res.data.account);
              localStorage.setItem("allname", JSON.stringify(res.data))
              window.localStorage.setItem("name",res.data.name);
              app.$router.push('/home')
            }
          })
        },
        
    }
}
</script>

<style>
/* .van-nav-bar .van-icon{
    color:rgb(150, 151, 153);
} */
</style>