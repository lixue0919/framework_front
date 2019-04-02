<template>
  <div id="phone">
    <!-- 手机号验证 -->
    <el-row class="logincenter">
      <el-col :span="8" >&nbsp;</el-col>
      <el-col :span="8" style="text-align:-webkit-center">
        <div class="login-form" >
          <div class="filed left">
            <i class="iconfont icou"></i>
            <span class="formTitleStyle">密码修改</span>
            <span class="signstyle"><a @click="open()">返回登录</a></span>
          </div>
          <form ref="loginForm" id="loginForm" autocomplete="off" name="loginform"  method="post">
            <div class="filed">
              <el-input placeholder="手机号" v-model="mobile" name="mobile" id="mobile" prefix-icon="iconfont icon-login-phone" @blur="mobileCheck"></el-input>
              <button type="button" id="FUmail-btn" class="verficode phonebtn"  @click="getMessageCode()" v-text=messageCodeText :disabled="mobileBtnDisabled"></button>
              <p class="alert" v-show="mobileAlertFlag">*手机号码格式不正确</p>
            </div>
            <div class="filed">
              <el-input v-model="messageCode" name="messageCode" id="messageCode" placeholder="短信验证码" prefix-icon="iconfont icon-login-validate" @blur="messageCodeCheck"></el-input>
              <p class="alert1" v-show="messageCodeAlertFlag">*短信验证码不正确</p>
            </div>
            <div class="filed lgin">
              <el-button type="danger"  @click="FPCIdentify()" round>确定</el-button>
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
      
        mobile: "",
        messageCode: "",
        messageCodeReal: "",
        messageCodeText: "获取验证码",
        timer: null,
        time: 60,
        FPDusername: "",
        FPDregisterData: "",
        mobileBtnDisabled: false,
        //验证邮箱标识位
        mobileAlertFlag: false,
        messageCodeAlertFlag: false,
        userid:""
    }
  },
  methods:{
     //消息提示框
     open() {
      if(this.mobile != '' || this.messageCode != ''){
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
    //手机号格式验证
    mobileCheck() {
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.mobileAlertFlag = true;
        return false;
      } else {
        this.mobileAlertFlag = false;
        return true;
      }
    },
    //手机验证码校验
    messageCodeCheck() {
     //验证码相等且不为空
     if(this.messageCode == this.messageCodeReal && this.messageCodeReal != ""){
        this.messageCodeAlertFlag = false;
        return true;
     }else{
        this.messageCodeAlertFlag = true;
        return false;
     }
    },
    //获取验证码
    getMessageCode() {
        let vm = this;
        vm.messageCode = "";
        if (vm.mobileCheck()) {
            vm.messageCodeText = "发送中...";
            vm.mobileBtnDisabled = true;
            vm.$axios.get('/signin/getUsernameNum/' + vm.mobile + "/static").then(function (res) {
                if (res.data.result == 0) {
                    vm.$message({
                      type: "error",
                      message: "用户不存在"
                    });
                    vm.messageCodeText = "获取验证码";
                    vm.mobileBtnDisabled = false;
                } else {
                    vm.$axios.get('/signin/sendMessage?phone=' + vm.mobile).then(function (res) {
                        vm.messageCodeReal = res.data.msg;
                        var count = vm.time;
                        vm.timer = setInterval(() => {
                            if (count == 0) {
                                clearInterval(vm.timer);
                                vm.timer = null;
                                vm.messageCodeText = "获取验证码";
                                vm.mobileBtnDisabled = false;
                            } else {
                                vm.messageCodeText = count + "秒后获取"
                                count--;
                                vm.mobileBtnDisabled = true;
                            }
                        }, 1000)
                    }.bind(vm), function (error) {
                        console.log(error);
                    });
                }
            }.bind(vm), function (error) {
                console.log(error);
            });
        }
    },
    FPCIdentify() {
      let vm = this;
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.mobileAlertFlag = true;
      } else if (this.messageCode != this.messageCodeReal || this.messageCodeReal == "") {
        this.messageCodeAlertFlag = true;
      } else {
        vm.$axios.get("/signin/findByUsername/" + this.mobile + "/static").then(function(res) {
          vm.$router.push({path:"/exhibition/login/ch/changePassword", query: {username: vm.mobile, userid: res.data.result[0].userid}});
        }.bind(this),function(error) {
            console.log(error);
        });
      }
    },
  }
}
</script>

<style lang="scss">
#phone{
  @import '@/common/scss/login.scss';
}
</style>