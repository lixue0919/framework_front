<template>
  <div id="mailbox">
    <!-- 邮箱验证 -->
    <el-row class="logincenter">
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form">
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">密码修改</span>
            <span class="signstyle">
              <a @click="open()">返回登录</a>
            </span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform" method="post">
            <el-row class="filed">
              <el-input placeholder="邮箱" v-model="email" name="email" id="email" prefix-icon="iconfont icon-login-mail" @blur="FPBmailCheck"></el-input>
              <button type="button" id="FUmail-btn" :class='["verficode","phonebtn",CONSTANT.widthData<=CONSTANT.widthReal?"phonebtn-small":"phonebtn-large"]' @click="getFPBMailCode()" v-text=mailCodeText :disabled="mailBtnDisabled"></button>
              <p class="alert" v-show="mailAlertFlag">&nbsp;&nbsp;*邮箱格式不正确</p>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="邮件验证码" v-model="mailCode" name="mailCode" id="mailCode" prefix-icon="iconfont icon-login-validate" @blur="mailCodeCheck"></el-input>
              <p class="alert1" v-show="mailCodeAlertFlag">&nbsp;&nbsp;*验证码输入错误</p>
            </el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed lgin">
              <el-button type="danger" @click="FPBIdentify()" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>确定</el-button>
            </el-row>
          </form>
        </div>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //忘记密码
      email: "",
      mailCode: "",
      mailCodeReal: "",
      mailCodeText: "获取验证码",
      timer: null,
      time: 60,
      mailBtnDisabled: false,
      //验证邮箱标识位
      mailAlertFlag: false,
      mailCodeAlertFlag: false,
    };
  },
  methods: {
    //返回登录
    open() {
      if(this.email != '' || this.mailCode != ''){
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
    //邮箱格式验证
    FPBmailCheck() {
      if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.email)) {
        this.mailAlertFlag = true;
        return false;
      } else {
        this.mailAlertFlag = false;
        return true;
      }
    },
    //邮箱验证码验证
    mailCodeCheck() {
      if (this.mailCode != this.mailCodeReal || this.mailCode == '') {
        this.mailCodeAlertFlag = true;
        return false;
      } else {
        this.mailCodeAlertFlag = false;
        return true;
      }
    },
    //获取验证码
    getFPBMailCode() {
      let vm = this;
      vm.mailCode = "";
      if (vm.FPBmailCheck()) {
        vm.mailCodeText = "发送中...";
        vm.mailBtnDisabled = true;
        vm.$axios.get("/signin/getMailNum/" + vm.email + "/static").then(function(res) {
          if (res.data.result == 0) {
            vm.$message({
                type: "error",
                message: "该邮箱未注册！"
              });
            vm.mailCodeText = "获取验证码";
            vm.mailBtnDisabled = false;
          } else if (res.data.result == 1) {
            vm.$axios.get("/signin/sendMail?mail=" + vm.email).then(function(res) {
              vm.mailCodeReal = res.data.msg;
              var count = vm.time;
              vm.timer = setInterval(() => {
                if (count == 0) {
                  clearInterval(vm.timer);
                  vm.timer = null;
                  vm.mailCodeText = "获取验证码";
                  vm.mailBtnDisabled = false;
                } else {
                  vm.mailCodeText = count + "秒后获取";
                  count--;
                  vm.mailBtnDisabled = true;
                }
              }, 1000);
            }.bind(vm),function(error) {
              console.log(error);
            });
          }}.bind(vm),function(error) {
            console.log(error);
          }
        );
      }
    },
    //找回密码方法
    FPBIdentify() {
      let vm = this;
      if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(vm.email)) {
        vm.mailAlertFlag = true;
      } else if (vm.mailCode != vm.mailCodeReal || vm.mailCode == '') {
        vm.mailCodeAlertFlag = true;
      } else {
        vm.$axios.get("/signin/findByMail/" + vm.email + "/static").then(function(res) {
          vm.$router.push({path:"/exhibition/login/ch/changePassword", query: {username: res.data.result[0].username, userid: res.data.result[0].userid}});
        }.bind(vm),function(error) {
          console.log(error);
        });
      }
    }
  }
};
</script>

<style lang="scss">
#mailbox{
  @import "@/common/scss/login.scss";
}
</style>