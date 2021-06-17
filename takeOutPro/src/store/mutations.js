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

}
export default mutations;