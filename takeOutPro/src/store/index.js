import Vue from "vue"
// import mutations from "./mutations"
// import actions from "./actions"
import Vuex from "vuex"

Vue.use(Vuex);
const store =new Vuex.Store({
    state:{
        detail:"",
    }
})
export default store;
