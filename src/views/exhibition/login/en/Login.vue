<template>
  <div id="loginEn">
    <!-- 用户Login -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">User Login</span>
            <span class="signstyle">No Account?<router-link :to="{path:'/exhibition/login/en/Register'}"><a>To Register</a></router-link></span>
          </div>
          <el-form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <div class="filed">
              <el-input placeholder="Username" v-model="username" prefix-icon="iconfont icon-login-username" @blur="mailCheck"></el-input>
              <p class="alert" v-show="usernameAlertFlag">*The email is incorrect.</p>
            </div>
            <div class="filed">
              <el-input placeholder="Password" v-model="password" prefix-icon="iconfont icon-login-password" type="password" @blur="passwordCheck"></el-input>
              <p class="alert1" v-show="passwordAlertFlag">*The password can not be empty.</p>
            </div>
            <div class="filed">
              <el-input placeholder="Verification Code" v-model="picLyanzhengma" class="yanzhengma_input" prefix-icon="iconfont icon-login-validate" @blur="validateCheck"></el-input>
              <input type="button" id="code" @click="createCode"  v-model="checkCode" <input type="button" id="code" @click="createCode" v-model="checkCode" :class='[CONSTANT.widthData<=CONSTANT.widthReal?"verification-small":"verification-large","bk"]'/>
              <p class="alert2" v-show="validateAlertFlag">*The verification code is incorrect.</p>
            </div>
            <div class="filed right">
              <span class="muchtab"><router-link :to="{path:'/exhibition/login/en/ForgetUsername'}"><a>Forget Username</a></router-link>  |  <router-link :to="{path:'/exhibition/login/en/ForgetPassword'}"><a>Forget Password</a></router-link></span>
            </div>
            <div class="filed lgin">
              <el-button type="danger" @click="login" round>Login</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
var code ; //在全局定义Verification Code
export default {
  name: 'Login',
  data () {
    return {
        username: "",
        password: "",
        usertype: "ENG",
        deptid: 'ZSYH',
        picLyanzhengma:'',
        checkCode:'',
        // 校验标识符
        usernameAlertFlag: false,
        passwordAlertFlag: false,
        validateAlertFlag: false
    }
  },
  created: function() {
    this.createCode();
    var type = this.$route.query.type;
    if (type == 'register') {
      this.username = this.$route.query.username;
      this.password = this.$route.query.password;
    } else if (type == 'forgetUsername' || type == 'forgetPassword') {
      this.username = this.$route.query.username;
    } 
  },
  methods:{
    // 邮箱校验
    mailCheck() {
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.username))) {
        // 邮箱格式不正确
        this.usernameAlertFlag = true;
        return false;
      } else {
        this.usernameAlertFlag = false;
        return true;
      }
    },

    //密码校验
    passwordCheck() {
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
      if (this.picLyanzhengma == '' || this.picLyanzhengma == null) {
        this.validateAlertFlag = true;
        return false;
      } else if (this.picLyanzhengma.toUpperCase() != this.checkCode) {
        this.validateAlertFlag = true;
        this.createCode();//刷新Verification Code   
        this.picLyanzhengma = '';
        return false;
      }else {
        this.validateAlertFlag = false;
        return true;
      }
    },
    // 图片Verification Code
    createCode(){
      code = "";    
      var codeLength = 4;//Verification Code的长度   
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
        'S','T','U','V','W','X','Y','Z');//随机数   
      for(var i = 0; i < codeLength; i++) {//循环操作   
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
        code += random[index];//根据索引取得随机数加到code上   
      }   
        this.checkCode = code;//把code值赋给Verification Code   
    },

    // 失焦验证图和Password------------暂时未使用  by li.xue 2019/3/21
    checkLpicma(){
      this.picLyanzhengma.toUpperCase();//取得输入的Verification Code并转化为大写         
      if(this.picLyanzhengma == '') {
        // $(".login_content1 span:eq(2)").text("请输入Verification Code")
        // $(".login_content1 span:eq(2)").removeClass("disappear");
      }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的Verification Code与产生的Verification Code不一致时    
        // $(".login_content1 span:eq(2)").removeClass("disappear");
        this.createCode();//刷新Verification Code   
        this.picLyanzhengma = '';
        return false;
      }else { //输入正确时   
        // $(".login_content1 span:eq(2)").addClass("disappear");
        // $(".login_content1 span:eq(2)").text("请输入Verification Code")
        return true;
      }
    },

    //登陆
    login(){
      let vm = this;
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.username))) {
        //用户名为邮箱格式
        this.usernameAlertFlag = true;
      } else if (this.password == '' || this.password == null) {
        //密码不能为空
        this.passwordAlertFlag = true;
      } else if(this.picLyanzhengma.toUpperCase() != this.checkCode) {
        //验证码错误
        this.validateAlertFlag = true;
      } else{
        var params = {
          username: vm.username,
          password: vm.password,
          usertype: vm.usertype,
          deptid: vm.deptid
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
            this.$router.push({ name: 'exhibitorWebEN' });
          } else if (res.data.code == '22222222') {
            this.$message.error('Account does not exist.');
          } else if (res.data.code == '33333333') {
            this.$message.error('The password is incorrect.');
          } else {
            this.$message.error("Login failed");
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
#loginEn{
  @import '@/common/scss/login.scss';
  .lgin {
    margin-top: 5rem;
  }
}
</style>