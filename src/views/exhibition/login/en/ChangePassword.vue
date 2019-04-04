<template>
  <div id="changePasswordEn">
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">Password Modification</span>
            <span class="signstyle"><a @click="open()">To Login</a></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <el-row  class="filed">
              <el-input placeholder="Please input an email" v-model="FPDusername" name="FPDusername" id="FPDusername" prefix-icon="iconfont icon-login-mail" :disabled="FPDusernameFlag"></el-input>
            </el-row >
            <el-row  class="filed">
              <el-input placeholder="Please input a password" prefix-icon="iconfont icon-login-password" type="password" class="inputstyle" v-model="FPDpassword1" name="FPDpassword1"
                id="FPDpassword1" @blur="FPDpassword1Check"></el-input>
              <p class="alert1" v-show="FPDpassword1AlertFlag">*Must be 6-16-bit alphanumeric.</p>
            </el-row >
            <el-row  class="filed">
              <el-input type="password" class="inputstyle" v-model="FPDpassword2" name="FPDpassword2" id="FPDpassword2"
                placeholder="Please input the password again" @blur="FPDpassword2Check" prefix-icon="iconfont icon-login-checkpass"></el-input>
              <p class="alert2" v-show="FPDpassword2AlertFlag">*The two entries do not match.</p>
            </el-row >
            <el-row class="filed">&nbsp;&nbsp;</el-row>
            <el-row  class="filed lgin">
              <el-button type="danger" @click="updatePassword()" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>Confirm</el-button>
            </el-row >
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
      FPDuserid: "",
      FPDusername: "",
      FPDpassword1: "",
      FPDpassword2: "",
      FPDregisterData: "",
      //密码和确认密码标识符
      FPDpassword1AlertFlag: false,
      FPDpassword2AlertFlag: false,
      //用户名文本框Disabled
      FPDusernameFlag: true
    }
  },
  created: function() {
    this.FPDuserid = this.$route.query.userid;
    this.FPDusername = this.$route.query.username;
  },
  methods:{
    //消息提示框
    open() {
      if (this.FPDpassword1!='' || this.FPDpassword2!='') {
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

    //密码规则校验
    FPDpassword1Check() {
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.FPDpassword1))) {
        this.FPDpassword1AlertFlag = true;
        return false;
      } else {
        this.FPDpassword1AlertFlag = false;
        return true;
      }
    },

    //确认密码校验
    FPDpassword2Check() {
      if (this.FPDpassword1 !== this.FPDpassword2) {
        this.FPDpassword2AlertFlag = true;
        return false;
      } else {
        this.FPDpassword2AlertFlag = false;
        return true;
      }
    },

    //修改密码
    updatePassword() {
      let vm = this;
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.FPDpassword1))) {
        vm.FPDpassword1AlertFlag = true;
      } else if (this.FPDpassword1 !== this.FPDpassword2) {
        vm.FPDpassword2AlertFlag = true 
      } else {
        var params = {
          userid: this.FPDuserid,
          username: this.FPDusername,
          password: this.FPDpassword1,
        }
        vm.$axios.post('/signin/updateByVO', params).then(function (res) {
          console.log(res);
          if (res.data.result == 1) {
            alert("Password changed successfully!");
            vm.$router.push({name:"exhibition/login/en/Login", query: {username: this.FPDusername, type: 'forgetPassword'}});
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
#changePasswordEn{
  @import '@/common/scss/login.scss';
  .lgin-small {
    margin-top: 2rem;
  }
  .lgin-large {
    margin-top: 3.8rem;
  }
}
</style>