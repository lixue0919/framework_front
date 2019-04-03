<template>
  <div id="admin">
    <!-- 管理员登陆 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div :class='["login-form",CONSTANT.widthData<=CONSTANT.widthReal?"login-form-small":"login-form-large"]'>
          <div class="filed left">
            <router-link :to="{path:'/exhibition/login/ch/Login'}"><i class="iconfont icon-yonghu icou"></i></router-link>
            <span class="formTitleStyle">管理员登录</span>
          </div>
          <form ref="GLYloginForm" id="GLYloginForm" autocomplete="off" name="loginform"  method="post">
            <el-row class="filed ">
              <el-input placeholder="用户名" v-model="GLYusername" prefix-icon="iconfont icon-login-username"></el-input>
            </el-row>
            <el-row class="filed">
              <el-input placeholder="密码" v-model="GLYpassword" prefix-icon="iconfont icon-login-password" type="password"></el-input>
            </el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed lgin">
              <el-button type="danger" @click="GLYlogin" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>登录</el-button>
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
        GLYusername: "",
        GLYpassword: "",
        GLYmessages: "",
    }
  },
  methods:{
    clk(){
      this.$router.push({ path: '/login/Register' });
    },
    GLYlogin(){
      let vm = this;
      if (this.GLYusername == null || this.GLYusername == '') {
        alert("用户名不能为空！")
      } else if (this.GLYpassword == null || this.GLYpassword == '') {
        alert("密码不能为空！")
      } else {
        var params = {
          username: vm.GLYusername,
          password: vm.GLYpassword,
          deptid: "GLYH"
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
            this.$router.push({ path: '/index' });
          
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
#admin{
  @import '@/common/scss/login.scss';
}
</style>