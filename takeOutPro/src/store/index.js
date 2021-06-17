import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations";

Vue.use(Vuex);
const store =new Vuex.Store({
    state:{
        detail:"",
        name:"",//用户个人信息
        loginName:'',   //存储用户名，密码 姓名等信息、
        loingStatus:false,  //用户是否登陆
    },
    mutations
})
export default store;
