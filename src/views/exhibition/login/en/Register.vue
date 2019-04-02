<template>
  <div id="registerEn">
    <!-- 注册 -->
    <el-row class="logincenter">
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form">
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">User Register</span>
            <span class="signstyle">Exist Account?<a @click="open()">To Login</a></span>
          </div>
          <form autocomplete="off" name="reg-form">
            <div class="filed">
              <el-input v-model="mail" name="mail" id="mail" placeholder="Please input an email" @blur="mailCheck" type="text" class="inputstyle" prefix-icon="iconfont icon-login-mail"></el-input>
              <button type="button" id="mail-btn" class="verficode phonebtnEN" @click="getMailCode()" v-text=mailCodeText :disabled="mailBtnDisabled"></button>
              <p class="alert" v-show="mailAlertFlag">*The email is incorrect.</p>
            </div>
            <div class="filed">
              <el-input v-model="mailCode" name="mailCode" id="mailCode" placeholder="Mail Verification Code" @blur="mailCodeCheck" prefix-icon="iconfont icon-login-validate"></el-input>
              <p class="alert1" v-show="mailCodeAlertFlag">*The verification code is incorrect.</p>
            </div>
            <div class="filed">
              <el-input placeholder="Please input a password" prefix-icon="iconfont icon-login-password" type="password" class="inputstyle" v-model="password1" name="password1"
                id="password1" @blur="password1Check"></el-input>
              <p class="alert2" v-show="password1AlertFlag">*Password must be 6-16-bit alphanumeric combination.</p>
            </div>
            <div class="filed">
              <el-input type="password" class="inputstyle" v-model="password2" name="password2" id="password2"
                placeholder="Please input the password again" @blur="password2Check" prefix-icon="iconfont icon-login-checkpass"></el-input>
              <p class="alert3" v-show="password2AlertFlag">*The two entries do not match.</p>
            </div>
            <div class="filed lgin">
              <el-button type="danger" @click="register()" round>Register</el-button>
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
      mail: "",
      mailCode: "",
      mailCodeReal: "",
      mailCodeText: "Get Verification Code",
      mailBtnDisabled: false,
      password1: "",
      password2: "",
      //注册校验标识
      mailAlertFlag: false,
      mailCodeAlertFlag: false,
      password1TipFlag: false,
      password1AlertFlag: false,
      password2AlertFlag: false,
    };
  },
  methods: {
    //消息提示框
    open() {
      if (this.mail!='' || this.mailCode!='' || this.password1!='' || this.password2!='') {
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
    //注册
    mailCheck() {
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.mail))) {
        // 邮箱格式不正确
        this.mailAlertFlag = true;
        return false;
      } else {
        this.mailAlertFlag = false;
        return true;
      }
    },
    getMailCode() {
      let vm = this;
      this.mailCode = "";
      if (this.mailCheck()) {
        this.mailCodeText = "Sending...";
        this.mailBtnDisabled = true;
        vm.$axios.get('/signin/getMailNumENG/' + this.mail + "/static").then(function (res) {
          if (res.data.result !== 0) {
            // 该邮箱已注册！
            alert("The email is registered!");
            this.mailCodeText = "Get Verification Code";
            this.mailBtnDisabled = false;
          } else {
            vm.$axios.get('/signin/sendMailEng?mail=' + this.mail).then(function (res) {
              this.mailCodeReal = res.data.msg;
              var count = this.time;
              this.timer = setInterval(() => {
                if (count == 0) {
                  clearInterval(this.timer);
                  this.timer = null;
                  this.mailCodeText = "Get Verification Code";
                  this.mailBtnDisabled = false;
                } else {
                  this.mailCodeText = count + "seconds later"
                  count--;
                  this.mailBtnDisabled = true;
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
    mailCodeCheck: function () {
      if (this.mailCode != this.mailCodeReal || this.mailCode == '') {
        this.mailCodeAlertFlag = true;
        return false;
      } else {
        this.mailCodeAlertFlag = false;
        return true;
      }
    },
    password1Check: function () {
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password1))) {
        this.password1AlertFlag = true;
        return false;
      } else {
        this.password1AlertFlag = false;
        return true;
      }
    },
    password2Check: function () {
      if (this.password1 !== this.password2) {
        this.password2AlertFlag = true;
        return false;
      } else {
        this.password2AlertFlag = false;
        return true;
      }
    },
    register: function () {
      let vm = this;
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.mail))) {
        vm.mailAlertFlag = true;
      } else if (this.mailCode != this.mailCodeReal || this.mailCode == '') {
        vm.mailCodeAlertFlag = true;
      } else if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(vm.password1))) {
        vm.password1AlertFlag = true;
      } else if (this.password1 != this.password2) {
        vm.password2AlertFlag = true;
      } else {
        var params = {
          username: vm.mail,
          password: vm.password1,
          usertype: "ENG",
          deptid: "ZSYH"
        }
        vm.$axios.post('/signin/insertByVO', params).then(function (res) {
          //注册成功！ 
          alert("Registration is successful.");
          vm.$router.push({name:"exhibition/login/en/Login", query: {username: vm.mail, password: vm.password1, type: 'register'}});
        }.bind(this), function (error) {
          console.log(error)
        })
      }
    }
  }
};
</script>

<style lang="scss">
#registerEn{
  @import '@/common/scss/login.scss';
  .lgin {
    margin-top: 3.8rem;
  }
}
</style>