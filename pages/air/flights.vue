<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <!-- 传递一个方法，并且这个方法是要修改dataList -->
                <div>
                    <FlightsFilters 
                    :data='cacheflightsData'
                    @setDataList="setDataList"
                    />
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div class="airInfo">
                    <FlightsItem v-for="(item,index) in dataList" 
                    :key='index'
                    :data='item'/>

                    <!-- 分页  
                    current-change 当前页 触发
                    size-change 每页条数 触发
                    current-page 当前页数 
                    page-sizes	每页显示个数选择器的选项设置
                    
                    -->
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                     </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FightsListHead from "@/components/air/fightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"

export default {
    data(){
        return {
             // 默认机票列表总数据
            flightsData:{
                // 默认机票列表
                flights:[],
                info:{},
                options:{}
            },
             // 总数据，一旦赋值之后不会被修改
            cacheflightsData: {
                // 默认机票列表
                flights: [],
                info: {},
                options: {}
            },
            total:0,     //总条数
            pageIndex:1,  //默认显示第一页
            pageSize:5,   //默认显示多少条数据
            dataList:[]   //分页之后的数据列表
        }
    },
    components:{
        FightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    methods:{
        
        //切换每页条数触发
        handleSizeChange(value){
            // console.log(value);
            this.pageSize = value;
           this.setDataList();
           
        },   
        // 页数切换时候触发
        handleCurrentChange(value){
            this.pageIndex=value

            this.setDataList();
        },
        //过滤 修改dataList 子传父
        setDataList(arr){
            if(arr){
                this.flightsData.flights=arr;
                this.total=arr.length;
                this.pageIndex=1
            };
                this.dataList=this.flightsData.flights.slice((this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize)
        }

    },
     mounted(){
        //$route.query 可以拿到url  地址栏上的数
        //$route.params 可以拿到url地址栏上的动态值
        // console.log(this.$route.query);
        //请求列表数据
        this.$axios({
            url:'/airs',
            method:"GET",
            params:this.$route.query
        }).then(res=>{
            // console.log(res);
            this.flightsData=res.data;
             // 缓存总数据，值和flightsData是相等的，一旦赋值之后不得修改
            this.cacheflightsData = {...res.data};
            
            
            //总条数
            this.total=res.data.total;
            // 默认获取第一到第5条
            this.dataList = res.data.flights.slice(0, 5);  
        })
    }
    
}
</script>

<style scoped lang="less">
    .contianer{
       
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
    .airInfo{
        text-align: center;
    } 
    </style>