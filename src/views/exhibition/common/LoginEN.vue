<template>
  <div class="login">
    <div id="autosize">
      <img class="imgstyle" src="/static/images/login/QRCode.jpg">
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16" style="text-align:-webkit-center">
          <p :class='[CONSTANT.widthData<=CONSTANT.widthReal?"pstyle-eng-small":"pstyle-eng-large"]'>
            <img class="titlestyle" src="/static/images/login/title_en.png">
          </p>
        </el-col>
        <el-col :span="4" class="market_out" style="position:fixed;right:0;text-align:right;margin:50px;">
            <p style="margin:5px 5px 5px 0px;padding:0px;">
              <a class="lana" href="http://61.161.226.197:8090/templates/帮助手册.doc">Help</a>
              <span style="color:#fff;margin-right:10px;">|</span><span class="lana" @click="clk()">中文</span>
              <span style="color:#fff;margin-right:10px;">|</span><span class="lanb" >English</span>
            </p>
            <p style="margin:15px 5px 5px 0px;padding:0px;"><a class="lana" @click="zgclk" style="background:rgba(0,0,0,0.2);padding:5px;">View Booth Reservations</a></p>
            <p style="margin:15px 5px 5px 0px;padding:0px;"><a class="lana" href="http://61.161.226.197:8090/templates/展馆图片.zip">Download Pavilion Pictures</a></p>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
    <el-row class="footerstyle">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="16" class="footer"></el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
    };
  },
  created:function(){
    this.autoWide();
  },
  methods: {
    clk(){
      this.$router.push({ path: '/exhibition/login/ch/Login' });
    },
    zgclk(){
      this.$router.push({ path: '/plan/planAnonEN' });
    },
     //适配屏幕分辨率
    autoWide(){
      if (this.CONSTANT.widthData <= this.CONSTANT.widthReal) {
        document.body.style.zoom = 0.8;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/login.scss';
.market_out{
  width: 500px;
  .el-tabs__item{
    color:red;
  }
} 

.market_out p span{
  font-size:20px; 
} 

.market_out p a{
  font-size:20px; 
} 

.lana {
  color: $whitecolor;
  font-size: 1rem;
  cursor: pointer;
  letter-spacing: 0.1rem;
}
.lanb {
  color: $blackcolor;
  font-size: 1rem;
  cursor: pointer;
}
.footer {
  text-align: -webkit-center;
  color: $whitecolor;
  font-size: 1rem;
  * {
    text-align: -webkit-center;
    color: $whitecolor;
    font-size: 1rem;
  }
}
</style>