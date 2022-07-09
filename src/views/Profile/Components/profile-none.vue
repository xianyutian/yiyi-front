<template>
  <div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>收藏夹内暂时没有商品！继续去逛一逛挑选心仪的商品吧</p>
    <div class="btn">
      <ShopButton type="primary" @click="$router.push('/home')">继续逛逛</ShopButton>
    </div>
  </div>
</template>

<script>
import ShopButton from '@/components/shop-button'
export default {
  name: 'ProfileNone',
  components:{ShopButton},
}
</script>

<style scoped lang="less">
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
