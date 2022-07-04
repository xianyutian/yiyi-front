<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- <div class="layer" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <GoodsSku :skuId="skuId" :goods="goods" v-else />
      <ShopButton v-if="!loading" type="primary" size="mini" style="margin-left:60px">确认</ShopButton>
    </div> -->
  </div>
</template>

<script>
//import GoodsSku from '@/views/Item/Components/goods-sku.vue'
export default {
  name: 'CartSku',
  //components: { GoodsSku },
  props: {
    // 描述信息
    attrsText: {
      type: String,
      default: ''
    },
    // skuId
    skuId: {
      type: String,
      default: ''
    }
  },
  
}
</script>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid #27BA9B;
    box-shadow: 2px 2px 4px lighten(#27BA9B,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid #27BA9B;
      border-top: 1px solid #27BA9B;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
