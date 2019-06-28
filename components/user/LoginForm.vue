<template>
  
  <div class='form'>
      <!-- 登陆的表单 -->
      <el-form :model=form ref='form' :rules='rules'>
        <el-form-item prop='username'>
                <!-- 用户名 -->
            <el-input 
            placeholder="用户名/手机" 
            
            v-model="form.username">
            </el-input>
        </el-form-item>
        <el-form-item  prop='password'>
            <!-- 密码 -->
            <el-input 
            type='password' 
            placeholder="密码" 
           
            v-model='form.password'>
            </el-input>
        </el-form-item>
        <el-button type='primary' class="btn"  @click='handleSubmit'>
            登陆
        </el-button>
      </el-form>
  </div>
</template>

<script>

export default {
    data(){
        return{
            form:{
                username:'',
                password:''
            },
             //验证用户名和密码
            rules: {
                username: [
                { required: true, message: '请输入用户名/手机', trigger: 'blur' }
                ],
                password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
        }
    },
   
    methods:{
        //登录提交
        handleSubmit(){
           this.$refs.form.validate(valid=>{
               if(valid){
                //    this.$axios({
                //        url:"/accounts/login",
                //        method:"POST",
                //        data:this.form
                //    }).then(res=>{
                //        //调用store下面的mutations方法
                //        this.$store.commit('user/setUserInfo',res.data)
                //       this.$message.success('登陆成功')
                //       setTimeout(() => {
                //           this.$router.push('/')
                //       }, 800);
                      
                //    }).catch(res=>{
                //        this.$message.success('用户名或者密码错误')
                //    })
                //调用actions
                    this.$store.dispatch('user/login',this.form).then(v=>{
                    this.$message.success('登陆成功,正在跳转');
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                })
               }
           })
        },
        
    }  

}
</script>

<style lang='less' scoped>
.form{
    padding: 20px;
    .btn{
        width: 100%;
    }
}



</style>
