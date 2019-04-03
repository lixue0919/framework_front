<template>
  <div id="changePassword">
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">修改密码</span>
            <span class="signstyle">已有账户?<a @click="open()">去登陆</a></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <el-row class="filed">
              <el-input placeholder="请输入手机号" v-model="FPDusername" name="FPDusername" id="FPDusername" prefix-icon="iconfont icon-login-phone" :disabled="FPDusernameFlag"></el-input>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="请输入密码" prefix-icon="iconfont icon-login-password" type="password" class="inputstyle" v-model="FPDpassword1" name="FPDpassword1"
                id="FPDpassword1" @blur="FPDpassword1Check"></el-input>
              <p class="alert1" v-show="FPDpassword1AlertFlag">&nbsp;&nbsp;*密码需为6-16位字母数字组合</p>
            </el-row>
            <el-row class="filed">
              <el-input type="password" class="inputstyle" v-model="FPDpassword2" name="FPDpassword2" id="FPDpassword2"
                placeholder="请再次输入密码" @blur="FPDpassword2Check" prefix-icon="iconfont icon-login-checkpass"></el-input>
              <p class="alert2" v-show="FPDpassword2AlertFlag">&nbsp;&nbsp;*两次密码不一致</p>
            </el-row>
            <el-row class="filed">&nbsp;&nbsp;</el-row>
            <el-row class="filed lgin">
              <el-button type="danger" @click="updatePassword()" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>确定</el-button>
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
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(vm.FPDpassword1))) {
        vm.FPDpassword1AlertFlag = true;
      } else if (vm.FPDpassword1 !== vm.FPDpassword2) {
        vm.FPDpassword2AlertFlag = true 
      } else {
        var params = {
          userid: vm.FPDuserid,
          username: vm.FPDusername,
          password: vm.FPDpassword1,
        }
        vm.$axios.post('/signin/updateByVO', params).then(function (res) {
          console.log(res);
          if (res.data.result == 1) {
             this.$message({
              type: 'success',
              message: '密码修改成功'
            });   
            vm.$router.push({name:"exhibition/login/ch/Login", query: {username: vm.FPDusername,password: vm.FPDpassword1, type: 'forgetPassword'}});
          }
        }.bind(vm), function (error) {
            console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="scss">
#changePassword{
  @import '@/common/scss/login.scss';
  .lgin-small {
    margin-top: 2rem;
  }
  .lgin-large {
    margin-top: 3.8rem;
  }
}
</style>