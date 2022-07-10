<template>
  <div class="profilePage">
    
    <div class="container">
    <!-- 导航栏 -->
    <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem>收藏夹</ShopBreadItem>
    </ShopBread>
    <!-- 商品卡片 -->
    <ProfileCard :item="item" v-for="item in profileList" :key="item.itemId" class="panel" @deleteItem="deleteItem(item)"/>
    
    <!-- 猜你喜欢 -->
    <GoodsRelevant msg="猜你喜欢" :authorization="authorization"/>
    </div>
  </div>
  
</template>

<script>
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import ProfileCard from './Components/profile-card'
import GoodsRelevant from '@/views/Item/Components/goods-relevant'
import {getProfiles} from '@/api/users.js'

export default {
    name: "MyProfile",
    components:{ShopBread, ShopBreadItem, ProfileCard, GoodsRelevant},
    data(){
      return {
        authorization: "abbbbbbbc",
        profileList:[
          { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"一条好看的小裙子", inventory:500, sales: 800 },
          { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
          ,itemId:"2", classify:"", description:"", inventory:500, sales: 700},
          { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
          ,itemId:"3", classify:"", description:"", inventory:500, sales: 600},
          { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
          ,itemId:"4", classify:"", description:"", inventory:500, sales:50}
        ]
      }
    },
    methods:{
      deleteItem(item){
        this.profileList.splice(this.profileList.indexOf(item), 1)
      }
    },
    created(){
      let isLocal = window.sessionStorage.getItem("isLocal")
      if(!isLocal){
        getProfiles().then(data => {
        if(data.code === 200)
          this.profileList = data.data
      })
      }
    }
}
</script>

<style scoped lang="less">
.profilePage{
  background: #f5f5f5;
  .container {
  background: #f5f5f5;
   width: 1240px;
   margin: 0 auto;
   //margin-left: 330px;
   position: relative;
   .panel{
    margin-top: 30px;
    border-radius:20px;
   }
 }
}

</style>