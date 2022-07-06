<template>
  <div class='shop-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem :to="`/category/${item.classify}`">{{item.classify}}</ShopBreadItem>
        <ShopBreadItem>{{item.itemName}}</ShopBreadItem>
      </ShopBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 商品图预览 -->
          <GoodsImage :url="item.url" />
          <!-- 商品销售情况 -->
          <!-- <GoodsSales /> -->
        </div>
        <div class="spec">
          <!-- 商品名称 -->
          <GoodsName :goods="item" style="margin-top: 40px"/>
          <!-- 销量组件 -->
          <GoodsSales :sales="item.sales"/>
          <!-- 数量选中组件 -->
          <ShopNumbox v-model="num" :max="item.inventory" label="数量" style="margin-top: 40px"/>
          <!-- 按钮组件 -->
          <ShopButton @click="addToCart()" type="primary" style="margin-top: 50px;margin-left:10px">加入购物车</ShopButton>
          <ShopButton @click="gotoModel()" type="primary" style="margin-left: 120px">查看3D模型</ShopButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :categoryId="item.classify"/>
    </div>
  </div>
</template>

<script>

import GoodsImage from './Components/goods-image'
import GoodsSales from './Components/goods-sales'
import GoodsName from './Components/goods-name'
// import GoodsSku from './Components/goods-sku'
import GoodsRelevant from './Components/goods-relevant'
import ShopBread from '@/components/shop-bread'
import ShopButton from '@/components/shop-button'
import ShopNumbox from '@/components/shop-numbox'
import ShopBreadItem from '@/components/shop-bread-item'
// import FreshPopular from '@/views/Main/Components/FreshPopular'

export default {
  name: 'MyItem',
  components: {GoodsImage, GoodsSales,
   GoodsName, ShopBread, ShopButton, ShopNumbox, ShopBreadItem, GoodsRelevant},
  data(){
    return {
      num: 0,   //当前选择的商品数量
      item: {
        "itemId": "xxxx",
        "classify": "连衣裙",
        "itemName": "中国风绝美连衣裙",
        "price": 12,
        "description": "xxxxxxxxx",
        "url": require("@/assets/images/clothes/news_1.jpg"),
        "inventory": 500,
        "sales": 30
      },   // 当前要查看的Item对象

      // 推荐的商品列表
      recommandItemList:[
        { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"", inventory:500, sales: 800 },
        { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
        ,itemId:"2", classify:"", description:"", inventory:500, sales: 700},
        { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
        ,itemId:"3", classify:"", description:"", inventory:500, sales: 600},
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"4", classify:"", description:"", inventory:500, sales:50}
      ]    // 
    }
  },
  methods:{
    getData(){
      // 加载Item数据
      this.item = JSON.parse(window.sessionStorage.getItem("item")) 
    },
    addToCart(){
      // 添加到购物车
    },
    gotoModel(){

    }
  },
  created(){
    this.getData()
  }
}

</script>

<style scoped lang='less'>
.shop-goods-page {
  background: #f5f5f5;
}
.container {
   width: 1240px;
   margin: 0 auto;
   position: relative;
 }
.goods-info {
  min-height: 580px;
  background: #fff;
  display: flex;
  .media {
    width: 360px;
    height: 480px;
    padding: 40px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    margin-left: 200px;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.popular {
    padding-bottom: 120px;
}
</style>
