<template>
  <div class="login">
    <div id="autosize">
      <img class="imgstyle" src="/static/images/login/QRCode.jpg">
      <el-row>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12" style="text-align:-webkit-center">
          <p :class='[CONSTANT.widthData<=CONSTANT.widthReal?"pstyle-small":"pstyle-large"]'>
            <img class="titlestyle" src="/static/images/login/title.png">
          </p>
        </el-col>
        <el-col :span="6" class="market_out" style="position:fixed;right:0;text-align:right;margin: 40px 80px 50px -50px;margin-left:-50px;">
          <p style="margin:5px 5px 5px 0px;padding:0px;"><a class="lanb"  href="http://61.161.226.197:8090/templates/帮助手册.doc">帮助手册</a>
            <span style="color:#fff;margin-right:10px;">|</span><span class="lana" >中文</span>
            <span style="color:#fff;margin-right:10px;">|</span><span class="lanb" @click="clk()">English</span>
          </p>
          <p style="margin:15px 5px 5px 0px;padding:0px;"><a class="lanb" @click="zgclk" style="background:rgba(0,0,0,0.2);padding:5px;">查看展位预定情况</a></p>
          <p style="margin:15px 5px 5px 0px;padding:0px;"><a class="lanb"  href="http://61.161.226.197:8090/templates/展馆图片.zip">下载展位图片</a></p>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
    <el-row>
      <el-col :span="24" class="footer">
        <p>建议使用谷歌、搜狗、360和火狐浏览器</p>
        <p style="margin-top:8px;">业务咨询：010-87792278，技术支持：024-31530337，分机号606</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Login from "@/views/exhibition/login/ch/Login";
import Register from "@/views/exhibition/login/ch/Register";
import Reset from "@/views/exhibition/login/ch/Reset";
import ForgetPassword from "@/views/exhibition/login/ch/ForgetPassword";
import ForgetUsername from "@/views/exhibition/login/ch/ForgetUsername";

export default {
  name: "Login",
  components: {
    login: Login,
    register: Register,
    forgetpassword: ForgetPassword,
    forgetusername: ForgetUsername,
    reset: Reset
  },
  data() {
    return {
    };
  },
  created:function(){
    this.autoWide();
  },
  methods: {
    clk(){
      this.$router.push({ path: '/exhibition/login/en/Login' });
    },
    zgclk(){
      this.$router.push({ path: '/plan/planAnon' });
    },
    //适配屏幕分辨率
    autoWide(){
      if (this.CONSTANT.widthData <= this.CONSTANT.widthReal) {
        document.body.style.zoom = 0.8;
      }
      /**
      var winWide = window.screen.availWidth;
      var zm = winWide / 1920;
      document.getElementById('autosize').style.zoom = zm*3 ;
      */
    }
  }
};
</script>

<style lang="scss" scoped>

@import '@/common/scss/login.scss';
// 右侧中英文切换样式
.market_out{
  width: 500px;
  .el-tabs__item{
    color:red;
  }
} 
.market_out p span{
  font-size: 24px; 
} 
.market_out p a{
  font-size: 24px; 
} 
.lana {
  color: $blackcolor;
}
.lanb {
  color: $whitecolor;
}
.footer {
  color: $whitecolor;
  text-align: -webkit-center;
  position: fixed;
  bottom: 5%;
}
</style>