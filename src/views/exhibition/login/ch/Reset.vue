<template>
  <div id="reset">
    <!-- 忘记账户 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">账户重置</span>
            <span class="signstyle"><a @click="open">返回登录</a></span>
          </div>
          <form  ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <el-row class="filed">
              <el-input v-model="REAcompanyName" name="REAcompanyName" id="REAcompanyName" placeholder="单位名称" prefix-icon="iconfont icon-login-dwmc" @blur="dwmcCheck"></el-input>
              <p class="alert" v-show="dwmcAlertFlag">&nbsp;&nbsp;*请输入单位名称</p>
            </el-row>
            <el-row class="filed">
              <el-input v-model="REAunscid" name="REAunscid" id="REAunscid" placeholder="统一社会信用代码" prefix-icon="iconfont icon-login-tyshxydm" @blur="tyshxydmCheck"></el-input>
              <p class="alert1" v-show="tyshxydmAlertFlag">&nbsp;&nbsp;*应为18位数字字母组合</p>
            </el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed">&nbsp;</el-row>
            <el-row class="filed lgin">
              <el-button type="danger" @click="REAIdentify()" round :class='[CONSTANT.widthData<=CONSTANT.widthReal?"lgin-small":"lgin-large"]'>确定</el-button>
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
        //重置账户
        REAcompanyName: "",
        REAunscid: "",
        //重置校验标识
        dwmcAlertFlag: false,
        tyshxydmAlertFlag: false
    }
  },
  methods:{
    //消息提示框
    open() {
      if(this.REAcompanyName != '' || this.REAunscid != ''){
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

    //单位名称校验
    dwmcCheck: function() {
      if (this.REAcompanyName == null || this.REAcompanyName == '') {
        this.dwmcAlertFlag = true;
      } else {
        this.dwmcAlertFlag = false;
      }
    },

    //统一社会信用代码校验
    tyshxydmCheck: function() {
      if (!(/^[A-Za-z0-9 ]{18}$/.test(this.REAunscid))) {
        this.tyshxydmAlertFlag = true;
      } else {
        this.tyshxydmAlertFlag = false;
      }
    },

    //忘记账户
    REAIdentify() {
      let vm = this;
      if (this.REAcompanyName == null || this.REAcompanyName == '') {
        this.dwmcAlertFlag = true;
      } else if (!(/^[A-Za-z0-9 ]{18}$/.test(this.REAunscid))) {
        this.tyshxydmAlertFlag = true;
      } else {
        var params = {
            unscid: this.REAunscid,
            companyname: this.REAcompanyName
        }
        vm.$axios.post('/signin/findByUnscid/', params).then(function (res) {
          console.log(res);
          if (res.data.result.length == 0) {
            alert("无记录，请重新输入！");
          } else {
            vm.$router.push({name:"exhibition/login/ch/changePassword", query: {username: res.data.result[0].username, userid: res.data.result[0].userid}});
          }
        }.bind(this), function (error) {
            console.log(error);
        });
      }
    },
  }
}
</script>

<style lang="scss">
#reset{
  @import '@/common/scss/login.scss';
}
</style>