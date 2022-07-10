<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{msg}}</span>
    </div>
    <!-- 此处使用改造后的shop-carousel.vue -->
    <ShopSwiper :sliders="sliders" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { toRefs } from 'vue'
import ShopSwiper from '@/components/shop-swiper'
import {getItemsByClassify} from '@/api/items.js'
import {getRecommendItems} from '@/api/items.js'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  components:{ShopSwiper},
  props: {
    categoryId: {
      type: String,
      default: ''
    },
    msg:{
      type: String,
      default: '同类商品推荐'
    },
    
  },
  setup (props) {
    // 最终需要的数据是传sliders给轮播图组件
    const sliders = ref([])
    
    const {msg} = toRefs(props)
    const {categoryId} = toRefs(props)
    
    // data需要从服务器获取
    const data = [
        { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"", inventory:500, sales: 800 },
        { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
        ,itemId:"2", classify:"", description:"", inventory:500, sales: 700},
        { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
        ,itemId:"3", classify:"", description:"", inventory:500, sales: 600},
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"4", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_1.jpg'), itemName: '复古夏季花萝修身旗袍', price: 50 
        ,itemId:"5", classify:"", description:"", inventory:500, sales:300},
        { url: require('@/assets/images/clothes/popular_2.jpg'), itemName: 'MAXRIENY印花茶歇裙', price: 99 
        ,itemId:"6", classify:"", description:"", inventory:500, sales:30},
        { url: require('@/assets/images/clothes/popular_3.jpg'), itemName: '复古碎花吊带裙2022夏', price: 60 
        ,itemId:"7", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_4.jpg'), itemName: '夏季薄款小清新连衣裙', price: 30 
        ,itemId:"8", classify:"", description:"", inventory:500, sales:40}
    ]

    let isLocal = window.sessionStorage.getItem("isLocal")
    if(!isLocal){
      if(msg === "同类商品推荐"){
        // 根据category获取items
        getItemsByClassify(categoryId).then(data => {
          if(data.code === 200)
            this.data = data.data
        })
      } else{
        // 根据用户uid获得推荐商品 标题是猜你喜欢
        let uid = window.sessionStorage.getItem("uid")
        if(uid !== null && uid !== "")
        getRecommendItems().then(data => {
          if(data.code === 200)
            this.data = data.data
        })
      }
    }

    const pageSize = 4
    const pageTotal = Math.ceil(data.length / pageSize)
    for (let i = 0; i < pageTotal; i++) {
      sliders.value.push(data.slice(pageSize * i, pageSize * (i + 1)))
    }
    return { sliders }
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid #27BA9B;
      border-right: 4px solid #27BA9B;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(#27BA9B, 40%);
      }
    }
  }
}
:deep(.shop-swiper) {
  z-index: 1;
  height: 420px;
  .swiper {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: #27BA9B;
        }
      }
    }
    &-btn {
      top: 100px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
