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
                
                  <van-tab disabled  title="登录" to="/login"></van-tab>
              

              
                  <van-tab   title="注册" to="/register">
                      <van-field   format-trigger="onBlur"  v-model="username"  placeholder="手机/邮箱/用户名"/>
                            <van-field
                        v-model="password"
                        :type="inputText"
                        name="密码"
                        placeholder="密码"
                    >
                        <template #right-icon>
                        <van-switch v-model="checked" size="20" @change="registerInput"/>
                        </template>

                    </van-field>         
                        <van-field   format-trigger="onBlur" v-model="name" placeholder="请输入您的姓名"/>                 
                    <div style="margin: 16px;">
                        <van-button round block type="primary" @click="handleRegister"  native-type="submit">注册</van-button>
                    </div>
                  </van-tab>
             
          
            </van-tabs>
        </van-row>
         

       
    </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
    name:"register",
    data(){
        return{
            fullname:"",
            username:"",
            password:"",
            name:"",
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
            this.$router.push('/login')
        },
        registerInput(){
          if (this.checked){   //注册页面的密码框的显示与隐藏
            this.inputText='text';
          }else{
            this.inputText='password';
          }
        },
        handleRegister(){      //注册
          this.$http.post("/user/register",{
            "account":this.fullname,
              "password":this.password,
              "name":this.username
          }).then(function (res) {
            console.log(res.data)
            // if (res.data=="register success"){
            //   alert("注册成功,前去登录")
            //   history.go(0)
            // };
            // if (res.data=="register fail"){
            //   alert("抱歉，注册失败")
            // };
            // if (res.data=="account is exit"){
            //   alert("用户已存在")
            // }
          })
        }
    }
}
</script>