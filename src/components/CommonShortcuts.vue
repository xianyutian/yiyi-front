<template>
  <div class="shortcuts">
    <div class="wrapper">
      <router-link to="/login" v-if='isNotSigned'>请先登录</router-link>|
      <router-link to="/account" >个人中心</router-link>|
      <!-- 个人中心暂时先设成一直显示 -->
      <router-link to="/register">免费注册</router-link>|
      <router-link to="/login">我的订单</router-link>|
      <router-link to="/profile">我的收藏</router-link>|
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
      isNotSigned: true
    }
  },
  methods:{
    getData(){
      // 初始化页面时加载数据
      var account= JSON.parse(window.sessionStorage.getItem("account"));
        if(account==null)
          this.isNotSigned=true;
        else
          this.isNotSigned=false;  
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
