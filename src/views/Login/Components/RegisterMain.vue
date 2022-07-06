<template>
  <div class="login-main">
    <div class="wrapper">
      <div class="box">
        <div class="tab-nav">
          <a href="javascript:;" class="active">账户登录</a>
        </div>
        <div class="login-form">
          <!-- 用户名输入框和提示信息 -->
          <div class="input">
            <i class="iconfont icon-jurassic_user"></i>
            <input type="text" placeholder="请输入用户名" v-model="username" @blur="checkUserName()">
            <h5 v-show="showUsernameNotNull" class="red">
                <img src="@/assets/images/invalid3.png"/>
                用户名不能为空
            </h5>
            <h5 v-show="showUsernameExist" class="red">
                <img src="@/assets/images/invalid3.png"/>
                该用户名已存在！请重新选择
            </h5>
            <h5 v-show="showUsernameNotExist" class="green">
                <img src="@/assets/images/valid2.jpg"/>
                用户名有效
            </h5>
          </div>

          <!-- 密码输入框 -->
          <div class="input">
            <i class="iconfont icon-jiesuo"></i>
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>

          <!-- 再次输入密码输入框 -->
          <div class="input">
            <i class="iconfont icon-jiesuo"></i>
            <input type="password" placeholder="请再次输入密码" v-model="repeatPassword" @blur="checkPassword()">
            <h5 v-show="showPasswordNotSame" class="red">
                <img src="@/assets/images/invalid3.png"/>
                两次输入密码不一致！请检查输入是否有误
            </h5>
            <h5 v-show="showPasswordSame" class="red">
                <img src="@/assets/images/valid2.jpg"/>
                密码输入有效
            </h5>
          </div>

          <!-- 注册登陆按钮 -->
          <div class="button">
            <a class="btn2" v-if="isLight" @click="register()" href="javascript:;">立即注册</a>
            <a class="btn" v-else>立即注册</a>
            <router-link class="btn3" to="/login">返回登陆</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterMain',
  data(){
    return{
      username: "",
      password: "",
      repeatPassword: "" ,   // 重复密码
      showUsernameExist: false,
      showUsernameNotExist: false,
      showUsernameNotNull: false,
      showPasswordNotSame: false,
      showPasswordSame: false
    }
  },
  computed: {
    isLight:{
      get(){
        if(this.username !== "" && this.password !=="" && this.repeatPassword !== ""){
          return true
        }
        else
          return false
      },
      set(){}
    }
  },
  methods:{
    register(){
      // 向服务器提交表单进行注册
    },

    // TODO 异步请求判断用户名是否已经注册 现在先随便写个逻辑
    checkUserName(){
        if(this.username === ""){
            this.showUsernameNotNull = true
            this.showUsernameExist = false
            this.showUsernameNotExist = false
        } else{
            this.showUsernameNotNull = false
            this.showUsernameExist = ! this.showUsernameExist;
            this.showUsernameNotExist = ! this.showUsernameExist;
        }
    },
    checkPassword(){
        if (this.password !== "" && this.repeatPassword !== ""){
            if (this.password === this.repeatPassword){
                this.showPasswordNotSame = false
                this.showPasswordSame = true
            }
            else{
                this.showPasswordNotSame = true
                this.showPasswordSame = false
            }
        } else {
            this.showPasswordNotSame = false
            this.showPasswordSame = false
        }
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
            .red {
                font-size: 12px;
                height: 18px;
                padding-top: 5px;
                color:rgb(211, 52, 84)
            }
            .green {
                font-size: 12px;
                height: 18px;
                padding-top: 5px;
                color:rgb(37, 184, 108)
                img{
                    width: 20px;
                    height: 18px;
                }
            }
          }
          
          .button {
            .btn {
              display: block;
              height: 40px;
              margin-top: 28px;
              margin-bottom: 28px;
              background-color: #ccc;
              color: #fff;
              text-align: center;
              line-height: 40px;
            }
            .btn2 {
              display: block;
              height: 40px;
              margin-top: 28px;
              margin-bottom: 28px;
              background-color: #17bb9b;
              color: #fff;
              text-align: center;
              line-height: 40px;
            }
            .btn3 {
            display: block;
              height: 40px;
              margin-top: 28px;
              margin-bottom: 28px;
              background-color: #1c84ec;
              color: #fff;
              text-align: center;
              line-height: 40px;
            }
            
          }
        }
      }
    }
  }
</style>
