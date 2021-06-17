const mutations = {
    //  登陆成功后保存用户名，密码，姓名
    mutationsLogin:function (state,payload) {
        state.name = payload
        state.loingStatus = true
    },
    //退出登录
  mutationsLoginout:function (state){
    state.name = ""
    state.loingStatus = false
  },
  //  保存点开的商家信息
  mutationsMerchant:function(state,payload){
    state.merchant = payload
  },
//  保存购物车的商品
  mutationsShopping:function (state,payload) {
    state.shopping=payload
    console.log(payload)
  },

//  清空购物车
  mutationsEmpty:function (state) {
        state.shopping=""
  }

}
export default mutations;