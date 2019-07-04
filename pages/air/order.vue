<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
          
                <OrderForm 
                @setInfoData='setInfoData'
                @setAllPrice='setAllPrice'/>
            <!-- 侧边栏 -->
                <OrderAside :data="infoData" :allPrice="allPrice" /> 
        </el-row>  
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
import OrderAside from "@/components/air/orderAside.vue"
export default {
    data(){
        return {
            //机票信息的初始值
            infoData:{
                seat_infos:{}
            },
            //总价格
            allPrice:0
        }
    },
    methods:{
        //给表单设置机票数据
        setInfoData(data){
            this.infoData=data;
        },
        setAllPrice(price){
            this.allPrice=price;
        }
    },

   
    components:{
        OrderForm,
        OrderAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>