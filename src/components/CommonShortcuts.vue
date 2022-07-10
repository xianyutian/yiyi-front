<template>
  <div class="shortcuts">
    <div class="wrapper">
      <a href="javascript:;" v-if='!isLogin' @click="gotoLogin()">请先登录</a>|
      <a href="javascript:;" v-if='isLogin' @click="gotoAccount()">个人中心</a>|
      <router-link to="/register">免费注册</router-link>|
      <a href="javascript:;"  @click="gotoOrder()">我的订单</a>|
      <a href="javascript:;"  @click="gotoProfile()">我的收藏</a>|
      <router-link to="#">帮助中心</router-link>|
      <router-link to="#">关于我们</router-link>|
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonShortcuts',
  data(){
    return {
      isLogin: false
    }
  },
  methods:{
    getData(){
      // 初始化页面时加载数据
      var token = window.sessionStorage.getItem("token");
        if(token !== null && token !== "")
          this.isLogin=true;
        else
          this.isLogin=false;  
    },
    gotoLogin(){
      this.$router.push('/login')
    },
    gotoAccount(){
      if(!this.isLogin){
        alert("请先登陆！")
        this.$router.push('/login')
      } else{
        this.$router.push('/account')
      }
    },
    gotoOrder(){
      if(!this.isLogin){
        alert("请先登陆！")
        this.$router.push('/login')
      } else{
        this.$router.push('/lineOrder')
      }
    },
    gotoProfile(){
      if(!this.isLogin){
        alert("请先登陆！")
        this.$router.push('/login')
      } else{
        this.$router.push('/profile')
      }
    }

  },
  created(){
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  .shortcuts {
    height: 52px;
    background-color: #333;
    line-height: 52px;
    color: #666;
    .wrapper {
      display: flex;
      justify-content: flex-end;
      a {
        padding: 0 16px;
        font-size: 14px;
        color: #dcdcdc;
        &:hover {
          color: #27ba9b;
        }
        span {
          display: inline-block;
          margin-right: 8px;
          width: 11px;
          height: 16px;
          background: url('@/assets/images/sprites.png') -160px -70px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
