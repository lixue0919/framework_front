<template>
  <div id="forgetUsernameEn">
    <!-- 忘记用户名 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">Username Recovery</span>
            <span class="signstyle"><a @click="open()">Back to Login</a></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <el-row class="filed">
              <el-input placeholder="Association Email" v-model="FUmail" name="FUmail" id="FUmail" prefix-icon="iconfont icon-login-mail" @blur="FUmailCheck"></el-input>
              <button type="button" id="FUmail-btn" class="verficode phonebtnEN" @click="getFUMailCode()" v-text=FUmailCodeText :disabled="FUmailBtnDisabled"></button>
              <p class="alert" v-show="mailAlertFlag">*The email is incorrect.</p>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="Mail Verification Code"  v-model="FUmailCode" name="FUmailCode" id="FUmailCode" prefix-icon="iconfont icon-login-validate" @blur="mailCodeCheck"></el-input>
              <p class="alert1" v-show="mailCodeAlertFlag">*The verification code is incorrect.</p>
            </el-row>
            <el-row class="filed">&nbsp;&nbsp;</el-row>
            <el-row class="filed">&nbsp;&nbsp;</el-row>
            <el-row class="filed lgin">
              <el-button type="danger" @click="FUIdentify()" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>Confirm</el-button>
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
  name: 'Login',
  data () {
    return {
      //忘记用户名
      FUmail: "",
      FUmailCode: "",
      FUmailCodeReal: "",
      FUmailCodeText: "Get Verification Code",
      FUtimer: null,
      time: 60,
      //验证邮箱标识位
      mailAlertFlag: false,
      mailCodeAlertFlag: false,
      //获取邮箱验证码是否可点击
      FUmailBtnDisabled: false
    }
  },
  methods:{
    //消息提示框
    open() {
      if (this.FUmail!='' || this.FUmailCode!='') {
        this.$confirm("Unsaved data will be lost. Are you sure to return it?", "Tips", {
          confirmButtonText: "Confirm",
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$router.push({path:"/exhibition/login/en/login"});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel success'
          });   
        });
      } else {
        this.$router.push({path:"/exhibition/login/en/login"});
      }
    },

    //邮箱校验
    FUmailCheck() {
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FUmail))) {
        this.mailAlertFlag = true;
        return false;
      } else {
        this.mailAlertFlag = false;
        return true;
      }
    },

    //邮箱验证码验证
    mailCodeCheck() {
      if (this.FUmailCode != this.FUmailCodeReal || this.FUmailCode == '') {
        this.mailCodeAlertFlag = true;
        return false;
      } else {
        this.mailCodeAlertFlag = false;
        return true;
      }
    },

    //获取验证码
    getFUMailCode() {
      let vm = this;
      this.FUmailCode = "";
      if (this.FUmailCheck()) {
        this.FUmailCodeText = "Sending...";
        this.FUmailBtnDisabled = true;
        vm.$axios.get('/signin/getMailNumENG/' + this.FUmail + "/static").then(function (res) {
          if (res.data.result == 0) { 
              // 该邮箱未注册！
            alert("The email is not registered!");
            this.FUmailCodeText = "Get Verification Code";
            this.FUmailBtnDisabled = false;
          } else if (res.data.result == 1) {
            vm.$axios.get('/signin/sendMailEng?mail=' + this.FUmail).then(function (res) {                 
              this.FUmailCodeReal = res.data.msg;
              var count = this.time;
              this.timer = setInterval(() => {
                if (count == 0) {
                  clearInterval(this.timer);
                  this.timer = null;
                  this.FUmailCodeText = "Get Verification Code";
                  this.FUmailBtnDisabled = false;
                } else {
                  this.FUmailCodeText = count + "seconds later"
                  count--;
                  this.FUmailBtnDisabled = true;
                }
              }, 1000)
            }.bind(this), function (error) {
              console.log(error);
            });
          }
        }.bind(this), function (error) {
          console.log(error);
        });
      }
    },
    FUIdentify() {
      let vm = this;
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FUmail))) {
        this.mailAlertFlag = true;
      } else if (this.FUmailCode != this.FUmailCodeReal || this.FUmailCode == '') {
        this.mailCodeAlertFlag = true;
      } else {
        vm.$axios.get('/signin/getMailNumENG/' + this.FUmail + "/static").then(function (res) {
          if (res.data.result == 0) {
            alert("The email is not registered!");
          } else if (res.data.result == 1) {
            vm.$axios.get('/signin/getUsernameByMail/' + this.FUmail + "/static").then(function (res) {
              alert("User name back to success!");
              vm.$router.push({name:"exhibition/login/en/Login", query: {username: res.data, type: 'forgetUsername'}});
            }.bind(this), function (error) {
              console.log(error);
            });
          }
        }.bind(this), function (error) {
          console.log(error);
        });
      }
    }
  }
}
</script>

<style lang="scss">
#forgetUsernameEn{
  @import '@/common/scss/login.scss';
}
</style>