<template>
  <div class="header">
    <!-- 图片 -->
    <div class="body">
      <!-- 按钮 -->
      <IndexButton class="button"/>
    </div>
  </div>
  
</template>

<script>
import IndexButton from './Components/IndexButton'

export default {
    name: "MyIndex",
    components:{IndexButton}, 
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
  .body{
    background: url('@/assets/images/index85.png');
    width: 1885px;
    height: 987px;
    .button{
      margin-left: 1220px;
      margin-top: 730px;
    }
  }
}
  
  
  

</style>

