<template>
  <el-form 
  class="form"
  :model='form'
  ref='form'
  :rules='rules'>
    <el-form-item prop="username">
      <!-- 用户名 -->
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>


    <el-form-item prop="captcha">
      <el-input 
      placeholder="验证码" 
      v-model="form.captcha">
        <template slot="append" >
            <el-button @click='handleCaptcha'>
                发送验证码 
            </el-button>   
        </template>
      </el-input>
    </el-form-item>



    <el-form-item prop="nickname">
      <!-- 用户名 -->
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>
    
    <el-form-item prop="password">  
      <!-- 用户名 -->
      <el-input 
      placeholder="密码" 
      type="password" 
      v-model="form.password">
      </el-input>
    </el-form-item>

    <el-form-item prop="checkPassword">
      <!-- 用户名 -->
      <el-input 
      placeholder="确认密码" 
      v-model="form.checkPassword"
       type="password" ></el-input>
    </el-form-item>

    <el-button 
    type='primary' 
    class="btn" 
    @click='handleSubmit'>
            注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
      // rule： 当前的规则的对象
        // value：当前调用规则的字段值
        // callback ：是回调函数代表执行下一步，必须要调用,
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        checkPassword: "",//只是做前端验证 不会发给后台
        captcha:'',//验证码
      },
      //表单的验证规则
       rules: {
           username: [
            { required: true, message: '请输入用户名/手机', trigger: 'blur' }
          ],
           captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
           nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
           checkPassword: [
             // 自定义验证规则，validator自定义验证的函数
            {validator: validatePass, trigger: 'blur'}
          ],
       },
    };
  },
 methods:{
    
     //验证手机验证码
     handleCaptcha(){
          //验证手机之前先验证内容是否为空
        if(this.form.username == ""){
            this.$confirm('手机号码不能为空', '提示', {
            confirmButtonText: '确定',
             showCancelButton:false,
            type: 'warning'
            });
            return;
        }
    //      if(this.form.username.length !== 11){
    //     this.$confirm('手机号码格式错误', '提示', {
    //         confirmButtonText: '确定',
    //         showCancelButton: false,
    //         type: 'warning'
    //     })
    //     return;
    // }

    //请求验证码
         this.$axios({
             url:'/captchas',
             method:"POST",
             data:{
                 tel:this.form.username
                 }
         }).then(res=>{
             const {code}=res.data;
            this.$confirm(`模拟手机验证码为：${code}`, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
         })
     },
     //注册事件
    handleSubmit(){
        // console.log(123);
        //调用注册的接口
        this.$refs.form.validate(valid => {
             const{checkPassword,...props}=this.form;
            if(valid){
                this.$axios({
                    url:'/accounts/register',
                    method:"POST",
                    data:props
                }).then(res=>{
                     // 把用户的数据设置给store
                    this.$store.commit("user/setUserInfo", res.data);
                    this.$message.success('注册成功，正在登陆');
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                   
                    
                })
            }
        })
        
    }
 }
};
</script>

<style lang='less' scoped>
.form{
    padding: 20px;
    .btn{
        width: 100%;
    }
}
</style>
