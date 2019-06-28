



/**
 * 在nuxt 中不要创建store的实例 每个js 模块nuxt 会自动创建实例
 * 只需要关注state mutations actions
 * 
 * export 在nuxt 中是固定写法
 * state 不能修改的 类似于vue 组件中的data ,用于声明仓库数据
 * 调用一个第三方的库localstorage,会自动判断是浏览器还是服务器
 */

export const state=()=>{
  return {
    userInfo: {
      token:"",
      user:{}
    }
  };
}
//同步修改state
export const mutations ={
    //设置用户的数据
    setUserInfo(state,data){
        state.userInfo=data;
    },
    //删除登陆登陆状态
    clearUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }
}

//异步修改state的数据
export const  actions ={
  // 登录的异步操作
  login({commit},data){
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    })
      .then(res => {
        //调用store下面的mutations方法
       commit("setUserInfo", res.data);
        // 调用login方法传入的成功的回调函数
            Promise.resolve();
      })
     
  }



}


