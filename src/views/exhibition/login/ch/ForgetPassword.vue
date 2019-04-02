<template>
  <div id="forgetPassword">
    <!-- 忘记密码 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">密码修改</span>
            <span class="signstyle"><router-link :to="{path:'/exhibition/login/ch/login'}">返回登录</router-link></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <div class="filed lgin">
                <router-link :to="{path:'/exhibition/login/ch/mailbox'}"><el-button type="danger" round>邮箱找回</el-button></router-link>
            </div>
            <div class="filed lgin">
                <router-link :to="{path:'/exhibition/login/ch/phone'}"><el-button type="danger" round>手机找回</el-button></router-link>
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
        GLYusername: "",
        GLYpassword: "",
        GLYsrc: "/imageCode",
        GLYvalidateCode: "",
        GLYmessages: ""
    }
  },
  methods:{
     
  }
}
</script>

<style lang="scss">
#forgetPassword{
  @import '@/common/scss/login.scss';
  .lgin {
    margin-top: 3.3rem;
    .el-button {
      font-size:20px;
      color:#fff;
      width: 280px;
      background-color: #ea2530;
    }
    .el-button:hover {
      font-size:20px;
      color:#fff;
      width: 280px;
      background-color: #ea2530;
    }
  }
}
</style>