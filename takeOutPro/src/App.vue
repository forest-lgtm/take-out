<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: 'App',
   methods:{
        ...mapMutations(['mutationsLogin'])
        },
  created(){
    var loginStatus=window.localStorage.getItem("loingStatus");
    //判断如果为true，处于登陆状态
    if(loginStatus){
      var allname = window.localStorage.getItem("allname")
      var name = JSON.parse(allname)
      console.log(name);
      this.mutationsLogin(name)
  }
  }
 
}
</script>


