<template>
  <div class="goods-sales">
      <p>租赁人气: </p>
      <p class="sale">{{sales}}</p>
      <!-- <p><i class="iconfont icon-task-filling"></i>租赁人气</p> -->
  </div>
</template>

<script>
export default {
  name: 'GoodsSales',
  props: {
    sales: {
      default: 500
    }
  }
}
</script>

<style scoped lang='less'>
.goods-sales {
  display: flex;
  width: 400px;
  height: 65px;
    flex: 1;
    position: relative;
    
    p {
      font-size: 18px;
      padding-top: 36px;
    }
    .sale {
        color: #CF4444;
        padding-left: 30px;
    }
}
</style>
