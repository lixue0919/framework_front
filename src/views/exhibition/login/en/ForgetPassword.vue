<template>
  <div id="forgetPasswordEn">
    <!-- 忘记密码 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">Password Modification</span>
            <span class="signstyle"><a @click="open()">Return Login</a></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <div class="filed">
              <el-input placeholder="Email" v-model="FPBmail" name="FPBmail" id="FPBmail" prefix-icon="iconfont icon-login-mail" @blur="FPBmailCheck"></el-input>
              <button type="button" id="FUmail-btn" class="verficode phonebtnEN" @click="getFPBMailCode()" v-text=FPBmailCodeText :disabled="FPBmailBtnDisabled"></button>
              <p class="alert" v-show="mailAlertFlag">*The email is incorrect.</p>
            </div>
            <div class="filed">
              <el-input placeholder="Mail Verification Code"  v-model="FPBmailCode" name="FPBmailCode" id="FPBmailCode" prefix-icon="iconfont icon-login-validate" @blur="mailCodeCheck"></el-input>
              <p class="alert1" v-show="mailCodeAlertFlag">*The verification code is incorrect.</p>
            </div>
            <div class="filed lgin">
              <el-button type="danger" @click="FPBIdentify()" round>Confirm</el-button>
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
  name: 'Login',
  data () {
    return {
      //忘记密码
      FPBmail: "",
      FPBmailCode: "",
      FPBmailCodeReal: "",
      FPBmailCodeText: "Get Verification Code",
      FPBtimer: null,
      time: 60,
      //验证邮箱标识位
      mailAlertFlag: false,
      mailCodeAlertFlag: false,
      //获取邮箱验证码是否可点击
      FPBmailBtnDisabled: false
    }
  },
  methods:{
    //消息提示框
    open() {
      if (this.FPBmail!='' || this.FPBmailCode!='') {
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

    //邮箱格式验证
    FPBmailCheck() {
        if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FPBmail))) {
          //邮箱格式不正确
          this.mailAlertFlag = true;
          return false;
        } else {
          this.mailAlertFlag = false;
          return true;
        }
    },

    //邮箱验证码验证
    mailCodeCheck() {
      if (this.FPBmailCode != this.FPBmailCodeReal || this.FPBmailCode == '') {
        this.mailCodeAlertFlag = true;
        return false;
      } else {
        this.mailCodeAlertFlag = false;
        return true;
      }
    },

    //获取邮箱验证码
    getFPBMailCode() {
      let vm = this;
      this.FPBmailCode = "";
      if (this.FPBmailCheck()) {
        this.FPBmailCodeText = "Sending...";
        this.FPBmailBtnDisabled = true;
        vm.$axios.get('/signin/getUsernameNum/' + this.FPBmail + "/static").then(function (res) {
          if (res.data.result == 0) {
            //该邮箱未注册！
            alert("The email is not registered!");
            this.FPBmailCodeText = "Get Verification Code";
            this.FPBmailBtnDisabled = false;
          } else if (res.data.result == 1) {
            vm.$axios.get('/signin/sendMailEng?mail=' + this.FPBmail).then(function (res) {
              this.FPBmailCodeReal = res.data.msg;
              var count = this.time;
              this.FPBtimer = setInterval(() => {
                if (count == 0) {
                  clearInterval(this.FPBtimer);
                  this.FPBtimer = null;
                  this.FPBmailCodeText = "Get Verification Code";
                  this.FPBmailBtnDisabled = false;
                } else {
                  this.FPBmailCodeText = count + "seconds later"
                  count--;
                  this.FPBmailBtnDisabled = true;
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
      
    //Confirm点击事件
    FPBIdentify() {
      let vm = this;
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FPBmail))) {
        this.mailAlertFlag = true;
      } else if (this.FPBmailCode != this.FPBmailCodeReal || this.FPBmailCode == '') {
        this.mailCodeAlertFlag = true;
      } else {
        vm.$axios.get('/signin/findByUsername/' + this.FPBmail + "/static").then(function (res) {
          vm.$router.push({name:"exhibition/login/en/changePassword", query: {username: vm.FPBmail, userid: res.data.result[0].userid}});
        }.bind(this), function (error) {
            console.log(error);
        }); 
      }
    }
  }
}
</script>

<style lang="scss">
#forgetPasswordEn{
  @import '@/common/scss/login.scss';
  .lgin {
    margin-top: 10.8rem;
  }
}
</style>