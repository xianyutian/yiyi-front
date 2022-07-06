<template>
  <div class="login-main">
    <div class="wrapper">
      <div class="box">
        <div class="tab-nav">
          <a href="javascript:;" class="active">账户登录</a>
        </div>
        <div class="login-form">
          <div class="input">
            <i class="iconfont icon-jurassic_user"></i>
            <input type="text" placeholder="请输入用户名" v-model="username">
          </div>
          <div class="input">
            <i class="iconfont icon-jiesuo"></i>
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="agree">
            <!-- <label class="xtx-checkbox">
              <input type="checkbox" />
              <i class="iconfont icon-yixuanze"></i>
              <i class="iconfont icon-weixuanze"></i>
            </label> -->
            <el-checkbox v-model="isAgree"></el-checkbox>
            <span style="padding-left:5px">我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <div class="button">
            <a class="btn2" v-if="isLight" @click="login()" href="javascript:;">登陆</a>
            <a class="btn" v-else>登录</a>
            <a class="btn2" href="javascript:;" @click="gotoRegister()"> 免费注册 </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginMain',
  data(){
    return{
      isAgree: true,    // 是否同意隐私条款
      username: "",
      password: "",
    }
  },
  computed: {
    isLight:{
      get(){
        if(this.username !== "" && this.password !==""){
          return true
        }
        else
          return false
      },
      set(){}
    }
  },
  methods:{
    login(){
      // 向服务器提交表单进行登陆
    },

    gotoRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
  .login-main {
    height: 658px;
    background-image: url('@/assets/images/login-bg5.png');
    .wrapper {
      position: relative;
      .box {
        position: absolute;
        top: 88px;
        right: 0px;
        width: 430px;
        padding: 20px 40px;
        background-color: #fff;
        box-shadow: 0 0 25px 0 rgb(3 3 3 / 14%);
        .tab-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          a {
            display: block;
            font-size: 18px;
            height: 35px;
            line-height: 35px;
            &.active {
              border-bottom: 2px solid #17bb9b;
            }
          }
        }
        .login-form {
          .link {
            text-align: right;
            padding-top: 12px;
            a {
              color: #17bb9b;
              font-size: 14px;
            }
          }
          .input {
            margin-top: 35px;
            position: relative;
            line-height: 34px;
            i {
              position: absolute;
              top: 1px;
              left: 1px;
              width: 50px;
              height: 50px;
              background-color: #cfcdcd;
              color: #fff;
              text-align: center;
              font-size: 28px;
              padding-top: 3px;
            }
            input {
              width: 100%;
              height: 50px;
              padding: 0 54px;
              border: 1px solid #ccc;
              font-size: 18px;
            }
          }
          .agree {
            padding: 28px 0;
            color: #b3b3b3;
            font-size: 16px;
            .xtx-checkbox {
              color: #999;
              cursor: pointer;
              margin-right: 3px;
              margin-bottom: 2px;
              input {
                display: none;
              }
              i {
                vertical-align: middle;
                &.icon-yixuanze {
                  color: #27ba9b;
                }
                &.icon-weixuanze {
                  color: #999;
                  display: none;
                }
              }
            }
            a {
              font-size: 14px;
              color: #0673b1;
            }
          }
          .button {
            .btn {
              display: block;
              height: 40px;
              margin-bottom: 17px;
              background-color: #ccc;
              color: #fff;
              text-align: center;
              line-height: 40px;
            }
            .btn2 {
              display: block;
              height: 40px;
              margin-bottom: 17px;
              background-color: #17bb9b;
              color: #fff;
              text-align: center;
              line-height: 40px;
            }
            

            .other {
              margin-top: 32px;
              margin-bottom: 32px;
              display: flex;
              justify-content: space-between;
              font-size: 18px;
              align-items: center;
              a:hover {
                color: #17bb9b;
              }
            }
          }
        }
      }
    }
  }
</style>
