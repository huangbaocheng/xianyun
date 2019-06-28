<template>
    <div class="header">
        <!-- 顶部导航栏开始 -->
        <el-row 
            class="main" 
            type='flex' 
            justify='space-between'>
            <!-- logo开始 -->
            <div class="logo">
                <nuxt-link to='/'>
                    <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </nuxt-link>
            </div>
            <!-- logo结束 -->

            <!-- 菜单开始 -->
            <el-row class='navs' type='flex'>
                <nuxt-link to='/'>首页</nuxt-link>
                <nuxt-link to='/post'>旅游攻略</nuxt-link>
                <nuxt-link to='/hotel'>酒店</nuxt-link>
                <nuxt-link to='/air'>国内机票</nuxt-link>
            </el-row>
            <!-- 菜单结束 -->

            <!-- 登陆状态开始 -->
            <el-row>
                <!-- 下拉菜单 -->
                <el-dropdown v-if="false">
                   <el-row type='flex' align="middle" class="el-dropdown-link" >
                        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
                    <span >地球发动机</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-row> 

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>   
                    </el-dropdown-menu>
                </el-dropdown>

                <div v-else class='login-link'>
                    <nuxt-link to='/user/login'>
                        登陆/注册
                    </nuxt-link>
                </div>
            </el-row>
            <!-- 登陆状态结束 -->

        </el-row>


        <!-- 顶部导航栏结束 -->



    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .header{
        height: 60px;
        line-height: 60px;
        box-shadow: 0 2px 2px #ddd;
        .main{
            width: 1000px;
            margin: 0 auto;
             
            .logo{
                width: 156px;
                height: 43px;
                margin-top: 9px;
                margin-right: 20px;
                img{
                    width: 100%;
                    display: block;
                }
            }
            .navs{
                flex: 1;
                height: 60px;
                line-height: 60px;
                a{
                    height: 100%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    font-size: 20px;
                     &:hover{
                        border-bottom:5px #409eff solid;
                        color: #409eff;
                    }
                   
                    
                }
            }
       
        }
        
    }

    .nuxt-link-exact-active{
        background: #409eff;
        color: #fff;
        &:hover{
            color: #fff!important;
        }

    }
    .el-dropdown-link{
         &:hover{
               img{
                    border: 3px solid skyblue;
               }
            }
        img{
            display: block;
            width: 39px;
            height: 39px;
            border-radius: 50px;
            margin-right: 10px;
            box-sizing: border-box;
            border: 3px solid white;
           

        }
    }
    .login-link{
        a:hover{
            color:#409eff;
        }
    }
   

    
</style>
