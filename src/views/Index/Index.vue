<template>
  <div class="header">
    <!-- 标签页 -->
    <div class="container">
      <!-- LOGO -->
      <span><h1></h1></span>
        <el-tabs class="nav" v-model="index">
            <!-- 封面 -->
            <el-tab-pane label="主页" name="first">
                <div class="body">
                    <!-- 标题 -->
                    <MyTitle style="margin-left:400px; margin-top:200px"></MyTitle>
                    <!-- 按钮 -->
                    <IndexButton style="margin-left:900px; margin-top:80px"></IndexButton>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于我们" name="second">我们是。。。团队</el-tab-pane>
        </el-tabs>
    </div>
  </div>
  
</template>

<script>
import IndexButton from './Components/IndexButton'
import MyTitle from './Components/Title'

export default {
    name: "MyIndex",
    components:{IndexButton, MyTitle}, 
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
  .el-tabs__header {
    margin-left: 300px;
    width: 200px;
  }
  

</style>

