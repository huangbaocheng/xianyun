<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
          background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
          background-size:contain contain;
          `">
        </div>

      
      </el-carousel-item>
    </el-carousel>
    <!-- 幻灯片结束 -->


      <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                  type='flex' 
                  class="search-tab" 
                  >
                    <span 
                      v-for='(item,index) in options' 
                      :class="{active:currentOption==index}"
                      :key='index'
                      @click='handleOption(index)'
                    >
                        <i>{{item.name}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                  type='flex'
                  class="search-input"
                  align="middle"
                  >
                    <input :placeholder=options[currentOption].placeholder
                      v-model=searchValue
                      @keyup.enter='handleSearch'
                    />
                    <i class="el-icon-search" 
                      @click='handleSearch'></i>
                </el-row>
            </div>
        </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        // },
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        // }
      ],
      //搜索框 tab选项
      options:[
        {name:'攻略',placeholder:'搜索城市',pageURL:'/post?city='},
        {name:'酒店',placeholder:'请输入城市搜索酒店',pageURL:'/hotel?city='},
        {name:'机票',placeholder:'请输入出发地',pageURL:'/air'},
        ],
        searchValue:'',//搜索框的值
        currentOption:0,//当前选中的项
    
    
    };
  },
  mounted(){
    
    //请求轮播图接口
    this.$axios({
      url:'/scenics/banners',
      method:"GET",
    }).then(res=>{
     
      const {data}=res.data;
      this.banners=data;

    });
    // console.log(this.$axios.defaults);
  },
  methods:{
    //tab栏切换
    handleOption(index){
      this.currentOption=index;
      if(index===2){
        this.$router.push('/air')
      }
    },
    //搜索时触发
    handleSearch(){
      const item=this.options[this.currentOption];
      //跳转时候给对应的页面url加上搜索内容参数
      this.$router.push(item.pageURL+this.searchValue)
    }
  }

};
</script>

<style scoped lang="less" >
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }
            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>