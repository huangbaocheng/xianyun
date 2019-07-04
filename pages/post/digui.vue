<template>
    <Digui/>
</template>

<script>
import Digui from "@/components/post/Digui.vue";
export default {
    components:{
        Digui
    },
    data(){
        return {
            list:[
                {
                    type: "衣服",
                    children: [
                        { 
                            type: "男装",
                            children: [
                                { type: "上衣"},
                                { type: "裤衩" },
                            ]
                        },
                        {
                            type: "女装",
                            children: [
                                { type: "比基尼", }
                            ]
                        }
                    ]
                },
                {
                    type: "电器",
                    children: [
                        { type: "电脑"},
                        { type: "冰箱" },
                        { type: "洗衣机" }
                    ]
                }
            ]
        }
    }
}
</script>

<style>

</style>
