<template>
  <div class="header">
    <!-- LOGO -->
    <div><h1></h1></div>

    <!-- 标签页 -->
    <div class="container">
        <el-tabs class="nav" v-model="index">
            <el-tab-pane label="主页" name="first">
                <div class="body">
                    <!-- <img :src="require('@/assets/images/index71.jpg')"> -->
                    <h2 class="title">
                        <span style="font-size: 64px; line-height:1.3;">
                            Get Your Dream Closet
                            <br>
                            <i>Easily</i>
                        </span>
                    </h2>
                    <button @click="gotoMain()">现在开始</button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于我们" name="second">我们是。。。团队</el-tab-pane>
        </el-tabs>
    </div>
  </div>
  
</template>

<script>
export default {
    name: "MyIndex",
    data(){
        return{
            index: "first"
        }
    },
    methods:{
        gotoMain(){
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="less">
  .header{
    height: 100px;
    display: inline-block;
    // justify-content: space-between;
    // align-items: center;
  }
  .body{
    background: url('@/assets/images/index72.jpg');
    width: 1900px;
    height: 1265px;
  }
  h1 {
      width: 180px;
      height: 100px;
      background: url('@/assets/images/logo.png') no-repeat 50%;
      background-size: contain;
  }
  .container{

    .nav {
      a {
        margin: 0 20px;
        padding-bottom: 7px;
        &:hover {
          color: #27ba9b;
          border-bottom: 2px solid #27ba9b;
        }
      }
    }
  }

  .title{
    font-family: WulkanDisplay,serif;
    font-variant-numeric: lining-nums;
    font-weight: inherit;
    line-height: 1.2em;
    font-size: 40px;
    // margin-bottom: 15px;
    //margin-top: 400px;
    padding: 0;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    text-align: center;
    position: relative;
    width: 100%;
    text-align: center;
    z-index: 1;
    font-size: 14px;
    font-family: MaisonNeue,sans-serif;
    line-height: 1.5;
    color: rgb(255, 255, 255);

  }
</style>

