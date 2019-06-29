import { Message } from "element-ui";
//只是axios的插件 用来做拦截的

//在nuxtjs中 写插件只需要暴露一个函数
export default function({ $axios }) {
    //{$axios} 是nuxtjs环境的大对象

    //onError 拦截所有的错误请求
  $axios.onError(err => {
    //   console.log(res.response);
    const { statusCode, message } = err.response.data;

    // 还未使用
    // if(statusCode === 401 || statusCode === 403){
    //     Message.warning({message: "请先登录"});
    //     redirect("/user/login");
    // }
    //参数错误会触发400的错误
    if (statusCode === 400) {
      Message.warning({ message });
    }
  });
}
