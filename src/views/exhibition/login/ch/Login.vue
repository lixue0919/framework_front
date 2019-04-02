<template>
  <div id="login">
    <!-- 用户登录 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div :class='["login-form",CONSTANT.widthData<=CONSTANT.widthReal?"login-form-small":"login-form-large"]'>
          <div class="filed left">
            <router-link :to="{path:'/exhibition/login/ch/Administrator'}"><i class="iconfont icon-yonghu icou"></i></router-link>
            <span class="formTitleStyle">用户登录</span>
            <span class="signstyle">没有账户?<router-link :to="{path:'/exhibition/login/ch/Register'}"><a>去注册</a></router-link></span>
          </div>
          <el-form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <el-row class="filed">
              <el-input placeholder="用户名" v-model="username" prefix-icon="iconfont icon-login-username" @blur="mobileCheck" class="iconStyle"></el-input>
              <p class="alert" v-show="usernameAlertFlag">&nbsp;&nbsp;*请输入正确手机号</p>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="密码" v-model="password" prefix-icon="iconfont icon-login-password" type="password" @blur="passwordCheck"></el-input>
              <p class="alert1" v-show="passwordAlertFlag">&nbsp;&nbsp;*请输入密码</p>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="验证码" v-model="picLyanzhengma" prefix-icon="iconfont icon-login-validate" @blur="validateCheck"></el-input>
              <input type="button" class="verification1 bk" id="code" @click="createCode" v-model="checkCode"></input>
              <p class="alert2" v-show="validateAlertFlag">&nbsp;&nbsp;*验证码错误</p>
            </el-row>
            <el-row class="filed right">
              <span class="muchtab"><router-link :to="{path:'/exhibition/login/ch/ForgetUsername'}"><a>忘记用户名</a></router-link>  |  <router-link :to="{path:'/exhibition/login/ch/ForgetPassword'}"><a>忘记密码</a></router-link>  |  <router-link :to="{path:'/exhibition/login/ch/Reset'}"><a>重置账户</a></router-link></span>
            </el-row>
            <div :class='["filed","lgin",CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>
              <el-button type="danger" @click="login" round>登录</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
var code ; //在全局定义验证码
export default {
  name: 'Login',
  data () {
    return {
        username: "",
        password: "",
        picLyanzhengma:'',
        checkCode:'',
        // 校验标识符
        usernameAlertFlag: false,
        passwordAlertFlag: false,
        validateAlertFlag: false
    }
  },
  created(){
    this.createCode();
    var type = this.$route.query.type;
    if (type == 'register'||type == 'forgetUsername' || type == 'forgetPassword') {
      this.username = this.$route.query.username;
      this.password = this.$route.query.password;
    }
  },
  methods:{
    // 验证用户名是否为手机号
    mobileCheck() {
      if (!/^1[34578]\d{9}$/.test(this.username)) {
        //用户名不正确，显示红字提醒
        this.usernameAlertFlag = true;
        return false;
      } else {
        this.usernameAlertFlag = false;
        return true;
      }
    },
    //密码校验
    passwordCheck() {
      //密码为空
      if (this.password == '' || this.password == null) {
        this.passwordAlertFlag = true;
        return false;
      } else {
        this.passwordAlertFlag = false;
        return true;
      }
    },
    //验证码校验
    validateCheck() {
      //验证码错误
      if (this.picLyanzhengma.toUpperCase() != this.checkCode) {
        this.validateAlertFlag = true;
        //刷新Verification Code 
        this.createCode();  
        this.picLyanzhengma = '';
        return false;
      }else {
        //清空所有红字提醒
        this.validateAlertFlag = false;
        return true;
      }
    },
    // 图片验证码
    createCode(){
      code = "";    
      var codeLength = 4;//验证码的长度   
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
           'S','T','U','V','W','X','Y','Z');//随机数   
      for(var i = 0; i < codeLength; i++) {//循环操作   
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
        code += random[index];//根据索引取得随机数加到code上   
      }   
      this.checkCode = code;//把code值赋给验证码   
    },
    // 失焦验证图和密码
    checkLpicma(){
      this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写         
      if(this.picLyanzhengma == '') {
        // $(".login_content1 span:eq(2)").text("请输入验证码")
        // $(".login_content1 span:eq(2)").removeClass("disappear");
      }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的验证码与产生的验证码不一致时    
        console.log(this.picLyanzhengma.toUpperCase())
        console.log(code)           
        alert("验证码错误！")
        // $(".login_content1 span:eq(2)").removeClass("disappear");
        this.createCode();//刷新验证码   
        this.picLyanzhengma = '';
      }else { //输入正确时   
        // $(".login_content1 span:eq(2)").addClass("disappear");
        // $(".login_content1 span:eq(2)").text("请输入验证码")
        return true;
      } 

    },
    //登录
    login(){
      let vm = this;
      //校验
      if (!/^1[34578]\d{9}$/.test(vm.username)) {
        vm.usernameAlertFlag = true;
      }else if (vm.password == '' || vm.password == null) {
        vm.passwordAlertFlag = true;
      }else if(vm.picLyanzhengma.toUpperCase() != vm.checkCode){
        vm.validateAlertFlag = true;
        //刷新Verification Code 
        vm.createCode();  
        vm.picLyanzhengma = '';
      }
      else{
        var params = {
          username: vm.username,
          password: vm.password,
          usertype: "CHN",
          deptid: "ZSYH"
        }
        vm.$axios.post('/login', params).then(function (res) {
          if (res.data.code == '00000000') {          
            localStorage.removeItem('isLogin');
            localStorage.removeItem('XTOKEN');
            localStorage.removeItem('CURRENTUSER');
            localStorage.setItem('isLogin', 'TRUE');
            localStorage.setItem('XTOKEN',  res.data.data.token);
            localStorage.setItem('CURRENTUSER',  JSON.stringify(res.data.data.currentUser));
            this.CONSTANT.currentUser = res.data.data.currentUser;
            if (res.data.data.currentUser.deptid == 'ZSYH') {
              this.$router.push({ path: '/exhibitorWeb' });
            } else {
              this.$router.push({ path: '/index' });
            }
          } else if (res.data.code == '22222222') {
            this.$message.error("账号不存在");
          } else if (res.data.code == '33333333') {
            this.$message.error("密码不正确");
          } else {
            this.$message.error("登录失败");
            this.$router.push({ path: '/' });
          }          
        }.bind(this), function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="scss">
#login{
  @import '@/common/scss/login.scss';
  .lgin-small {
    margin-top: 2.7rem;
  }
  .lgin-large {
    margin-top: 5rem;
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
}
</style>