<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" 
            v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" 
            v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
            <!-- 删除 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div 
        class="insurance-item" 
        v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox 
            :label="`${item.type}:￥${item.price}/份×1  
            最高赔付${item.compensation}万`" border
            @change="handleInsurances(item.id)"
            >
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input 
            v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
         <!-- {{allPrice}} -->
       
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
     
       
      </div>
    </div>
      <input type="hidden" :value='allPrice'/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],  
      //机票信息
      infoData: {
        insurances: [],
        seat_infos:{},
      },
      captcha: "", //验证码
      contactPhone: "", //手机
      insurances: [], //保险
      contactName: "", //联系人
      contactPhone: "" //联系人电话
    };
  },
      //计算总价格
      computed:{
        allPrice(){
          let price=0;
          //机票单价
          price += this.infoData.seat_infos.org_settle_price;
          //燃油费
          price +=this.infoData.airport_tax_audlet;
          //保险费
          price +=this.insurances.length*30;

          price *=this.users.length;
          // console.log(price);
          this.$emit('setAllPrice',price)
          return price;
    },
      },
  

  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: "",
      });
    },



    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if(this.contactPhone == ""){
            this.$confirm('手机号码不能为空', '提示', {
            confirmButtonText: '确定',
             showCancelButton:false,
            type: 'warning'
            });
            return;
        }  ;
      if (this.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        // console.log(res);
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    //选择保险
    handleInsurances(id){
      const index= this.insurances.indexOf(id);
      if(index ===-1){
        this.insurances.push(id);
      }else{
        this.insurances.splice(index,1)
      }
      
    },

    // 提交订单
    handleSubmit() {

        const data={
            users:this.users,
            insurances:this.insurances,        //保险
            contactName:this.contactName,     //联系人名字
            contactPhone:this.contactPhone,  //联系电话
            invoice:this.invoice,           //是否需要发票
            air:this.$route.query.id,
            seat_xid:this.$route.query.seat_xid,
            captcha:this.captcha,
        };
        //获取token  
        const token = this.$store.state.user.userInfo.token;
    //提交生成机票订单
        this.$axios({
            url:'/airorders',
            method:"POST",
            data,
            //判断是否登录
            headers:{
                  Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            // console.log(res);
            const {id} = res.data.data
            this.$message.success('正在生成订单 请稍等')
            this.$router.push({
                path:'/air/pay',
                query:{
                    id
                }
            })
        }).catch(res=>{
        
             this.$confirm('你未登录，请您先登录！','提示',{
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning',
            }).then(res=>{
               this.$router.push('/user/login')
            })
         
         
           
           
        })
    }
  },
  mounted() {
      //请求机票信息
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      method: "GET",
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then(res => {
      // console.log(res);
      this.infoData = res.data;
      this.$emit('setInfoData',this.infoData)
    });
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>