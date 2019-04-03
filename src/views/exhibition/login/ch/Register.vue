<template>
  <div id="register">
    <!-- 注册 -->
    <el-row class="logincenter">
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form">
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">用户注册</span>
            <span class="signstyle">已有账户?
              <a @click="open()">去登录</a>
            </span>
          </div>
          <form autocomplete="off" name="reg-form">
            <div class="filed">
              <el-input type="text" class="inputstyle" v-model="mobile" name="mobile" id="mobile" placeholder="请输入手机号" prefix-icon="iconfont icon-login-phone" @blur="mobileCheck"></el-input>
              <button type="button" id="mobile-btn" class="verficode phonebtn" @click="getMessageCode()" v-text="messageCodeText" :disabled="mobileBtnDisabled"></button>
              <p class="alert" v-show="mobileAlertFlag">&nbsp;&nbsp;*请填写正确的手机号码</p>
            </div>
            <div class="filed">
              <el-input v-model="messageCode" name="messageCode" id="messageCode" placeholder="请输入手机验证码" @blur="messageCodeCheck" prefix-icon="iconfont icon-login-validate"></el-input>
              <p class="alert1" v-show="messageCodeAlertFlag">&nbsp;&nbsp;*验证码不正确</p>
            </div>
            <div class="filed">
              <el-input placeholder="请输入密码" prefix-icon="iconfont icon-login-password" type="password" class="inputstyle" v-model="password1" name="password1" id="password1" @blur="password1Check"></el-input>
              <p class="alert2" v-show="password1AlertFlag">&nbsp;&nbsp;*密码需为6-16位字母数字组合</p>
            </div>
            <div class="filed">
              <el-input type="password" class="inputstyle" v-model="password2" name="password2" id="password2" placeholder="请再次输入密码" @blur="password2Check" prefix-icon="iconfont icon-login-checkpass"></el-input>
              <p class="alert3" v-show="password2AlertFlag">&nbsp;&nbsp;*两次密码不一致</p>
            </div>

            <div class="filed lgin">
              <el-button type="danger" @click="register()" round>注册</el-button>
            </div>
          </form>
        </div>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      //注册
      time: 60,
      timer: null,
      mobile: "",
      messageCode: "",
      messageCodeReal: "",
      messageCodeText: "获取验证码",
      password1: "",
      password2: "",
      mobileBtnDisabled: false,
      //注册校验标识
      mobileAlertFlag: false,
      messageCodeAlertFlag: false,
      password1AlertFlag: false,
      password2AlertFlag: false
    };
  },
  methods: {
    //校验
    //消息提示框
    open() {
      if (this.mobile!='' || this.messageCode!='' || this.password1!='' || this.password2!='') {
        this.$confirm("未保存的数据将丢失，确定返回吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path:"/exhibition/login/ch/login"});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });   
        });
      }else{
        this.$router.push({path:"/exhibition/login/ch/login"});
      }
    },
    //验证手机号
    mobileCheck() {
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.mobileAlertFlag = true;
        return false;
      } else {
        this.mobileAlertFlag = false;
        return true;
      }
    },
    //获取手机验证码
    getMessageCode() {
      let vm = this;
      vm.messageCode = "";
      if (vm.mobileCheck()) {
        vm.messageCodeText = "发送中...";
        vm.mobileBtnDisabled = true;
        vm.$axios.get("/signin/getUsernameNum/" + vm.mobile + "/static").then(
          function(res) {
            if (res.data.result != 0) {
              vm.$message({
                type: "error",
                message: "用户名已存在！"
              });
              vm.messageCodeText = "获取验证码";
              vm.mobileBtnDisabled = false;
            } else {
              vm.$axios.get("/signin/sendMessage?phone=" + vm.mobile).then(
                function(res) {
                  vm.messageCodeReal = res.data.msg;
                  var count = vm.time;
                  vm.timer = setInterval(() => {
                    if (count == 0) {
                      clearInterval(vm.timer);
                      vm.timer = null;
                      vm.messageCodeText = "获取验证码";
                      vm.mobileBtnDisabled = false;
                    } else {
                      vm.messageCodeText = count + "秒后获取";
                      count--;
                      vm.mobileBtnDisabled = true;
                    }
                  }, 1000);
                }.bind(vm),
                function(error) {
                  console.log(error);
                }
              );
            }
          }.bind(vm),
          function(error) {
            console.log(error);
          }
        );
      }
    },
    //手机验证码校验
    messageCodeCheck() {
      /*
      if (!/^[0-9a-zA-Z]{6}$/.test(this.messageCode)) {
        this.messageCodeAlertFlag = true;
        return false;
      } else {
        this.messageCodeAlertFlag = false;
        return true;
      }
      */
     //验证码相等且不为空
     if(this.messageCode == this.messageCodeReal && this.messageCodeReal != ""){
        this.messageCodeAlertFlag = false;
        return true;
     }else{
        this.messageCodeAlertFlag = true;
        return false;
     }
    },
    //密码校验
    password1Check() {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password1)) {
        this.password1AlertFlag = true;
        return false;
      } else {
        this.password1AlertFlag = false;
        return true;
      }
    },
    
    //确认密码校验
    password2Check() {
      if (this.password1 !== this.password2) {
        this.password2AlertFlag = true;
        return false;
      } else {
        this.password2AlertFlag = false;
        return true;
      }
    },
    //注册
    register() {
      let vm = this;
      vm.mobileCheck();
      vm.messageCodeCheck();
      vm.password1Check();
      vm.password2Check();
      if (vm.mobileCheck() && vm.messageCodeCheck() && vm.password1Check() && vm.password2Check()) {
        var params = {
          username: vm.mobile,
          password: vm.password1,
          usertype: "CHN",
          deptid: "ZSYH"
        };
        vm.$axios.post("/signin/insertByVO", params).then(
          function(res) {
            this.$message({
              type: "success",
              message: "注册成功！"
            });
            vm.username = vm.mobile;
            vm.password = vm.password1;
            //vm.changeForm("loginFlag");
            vm.$router.push({name:"exhibition/login/ch/Login", query: {username: vm.username, password: vm.password, type: 'register'}});
          }.bind(vm),
          function(error) {
            console.log(error);
          }
        );
      }
    }
  }
};
</script>

<style lang="scss">
#register{
  @import "@/common/scss/login.scss";
  .lgin {
    margin-top: 3.85rem;
  }
}
</style>