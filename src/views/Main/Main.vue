<template>
  <div class="main-container">
    <!-- 轮播图 -->
    <Banner></Banner>
    <!-- 新鲜好物 -->
    <div class="popular wrapper">
      <main-title>
        <template #h2>新品上市</template>
        <template #span>新品上市 不容错过</template>
      </main-title>
      <fresh-popular :goodsData="news">
        <template #price="{ data }">
          <small>￥</small>{{ data }}
        </template>
      </fresh-popular>
    </div>
    <!-- 榜单 -->
    <div class="popular wrapper">
      <main-title>
        <template #h2>热租榜单</template>
        <template #span>本月热销 口碑爆棚</template>
      </main-title>
      <fresh-popular :goodsData="popular">
        <template #price="{ data }">
          <small>￥</small>{{ data }}
        </template>
      </fresh-popular>
    </div>

    <!-- 推荐 -->
    <div class="popular wrapper" v-if="recommand.length !== 0">
      <main-title>
        <template #h2>猜你喜欢</template>
        <template #span>个性推荐 精品推荐</template>
      </main-title>
      <fresh-popular :goodsData="recommand">
        <template #price="{ data }">
          <small>￥</small>{{ data }}
        </template>
      </fresh-popular>
    </div>
    
    
  </div>
</template>

<script>
import Banner from '@/views/Main/Components/Banner.vue'
import MainTitle from '@/views/Main/Components/MainTitle.vue'
import FreshPopular from '@/views/Main/Components/FreshPopular.vue'
import {getHotItems, getRecommendItems} from '@/api/items'


export default {
  name: 'MyMain',
  components: {
    Banner,
    MainTitle,
    FreshPopular,
  },
  data () {
    return {
      // 新上架商品，可以从服务器获取
      news: [
        { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"", inventory:500, sales: 800 },
        { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
        ,itemId:"2", classify:"", description:"", inventory:500, sales: 700},
        { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
        ,itemId:"3", classify:"", description:"", inventory:500, sales: 600},
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"4", classify:"", description:"", inventory:500, sales:50}
      ],
      // 榜单商品，后续从服务器获取
      popular: [
        { url: require('@/assets/images/clothes/popular_1.jpg'), itemName: '复古夏季花萝修身旗袍', price: 50 
        ,itemId:"5", classify:"", description:"", inventory:500, sales:300},
        { url: require('@/assets/images/clothes/popular_2.jpg'), itemName: 'MAXRIENY印花茶歇裙', price: 99 
        ,itemId:"6", classify:"", description:"", inventory:500, sales:30},
        { url: require('@/assets/images/clothes/popular_3.jpg'), itemName: '复古碎花吊带裙2022夏', price: 60 
        ,itemId:"7", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_4.jpg'), itemName: '夏季薄款小清新连衣裙', price: 30 
        ,itemId:"8", classify:"", description:"", inventory:500, sales:40}
      ],
      // 推荐商品，后续从服务器获取
      recommand: [
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"9", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_3.jpg'), itemName: '白色仙女连衣裙', price: 20 
        ,itemId:"10", classify:"", description:"", inventory:500, sales:800},
        { url: require('@/assets/images/clothes/recommand_1.jpg'), itemName: '高腰阔腿牛仔裤', price: 39 
        ,itemId:"11", classify:"", description:"", inventory:500, sales:90},
        { url: require('@/assets/images/clothes/recommand_2.jpg'), itemName: '复古艺术绣花连衣裙', price: 20 
        ,itemId:"12", classify:"", description:"", inventory:500, sales:200}
      ]
      
    }
  },
  created(){
    let isLocal = window.sessionStorage.getItem("isLocal")
    let uid = window.sessionStorage.getItem("uid")
    if(!isLocal){
      // 从服务器获取数据 
      // 获取热销商品
      getHotItems().then(data => {
        if(data.code === 200)
          this.popular = data.data.slice(0, 4)
      })
      // 获取推荐商品
      if(uid !== null && uid !== ""){
        getRecommendItems(uid).then(data => {
          if(data.code === 200)
            this.recommand = data.data.slice(0, 4)
        })
      }

      // 新出商品 随便做两个假的了
    }
  }
}
</script>

<style lang="less">
  .popular {
    padding-bottom: 120px;
  }
  
</style>
