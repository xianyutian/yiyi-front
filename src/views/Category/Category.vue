<template>
   <div class="container">
    <!-- 导航栏 -->
     <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem>{{categoryId}}</ShopBreadItem>
    </ShopBread>

     <div class="group" v-for="(items, index) in groups" :key="index">
      <div class="panel" v-for="item in items" :key="item.itemId">
        <ItemCard class="card" :item="item" />
      </div>
     </div>
     
     <div class="group">
       <div class="panel" v-for="item in remains" :key="item.itemId">
        <ItemCard class="card" :item="item" />
       </div>
     </div>
     
   </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import {getItemsByClassify} from '@/api/items.js'

export default {
    name: "MyCategory",
    components:{ItemCard, ShopBread, ShopBreadItem},
    data(){
      return{
        categoryId: "",
        itemList:[
          { url: require('@/assets/images/clothes/popular_1.jpg'), itemName: '复古夏季花萝修身旗袍', price: 50 
        ,itemId:"5", classify:"", description:"", inventory:500, sales:300},
        { url: require('@/assets/images/clothes/popular_2.jpg'), itemName: 'MAXRIENY印花茶歇裙', price: 99 
        ,itemId:"6", classify:"", description:"", inventory:500, sales:30},
        { url: require('@/assets/images/clothes/popular_3.jpg'), itemName: '复古碎花吊带裙2022夏', price: 60 
        ,itemId:"7", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_4.jpg'), itemName: '夏季薄款小清新连衣裙', price: 30 
        ,itemId:"8", classify:"", description:"", inventory:500, sales:40},
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"9", classify:"", description:"", inventory:500, sales:50},
        { url: require('@/assets/images/clothes/popular_3.jpg'), itemName: '白色仙女连衣裙', price: 20 
        ,itemId:"10", classify:"", description:"", inventory:500, sales:800},
        { url: require('@/assets/images/clothes/recommand_1.jpg'), itemName: '高腰阔腿牛仔裤', price: 39 
        ,itemId:"11", classify:"", description:"", inventory:500, sales:90},
        ],
        
        groups:[],       // 将item分组，每四个一组
        remains: [],      // 除以四剩余的余数
      }
    },
    methods:{
      getData(){
        this.categoryId = this.$route.params.categoryId
        console.log(this.categoryId)
        // 从服务器获取所有Category下的商品
        let isLocal = window.sessionStorage.getItem("isLocal")
        if(!isLocal){
          getItemsByClassify(this.categoryId).then(data => {
            if(data.code === 200)
              this.itemList = data.data
          })
        }
        
        // 分组
        let groupsNum = Math.floor(this.itemList.length / 4)
        for(let i=0; i<groupsNum; i++){
          this.groups[i] = this.itemList.slice(i, i+4)
          console.log(this.itemList.slice(i, i+4))
        }

        this.remains = this.itemList.slice(4*this.groups.length)
      }
    },
    created(){
      this.getData()
    }
}
</script>

<style scoped lang="less">
  .container{
    width: 1240px;
    margin: 0 auto;
    position: relative;
    .group{
     // width: 306px;
      height: 520px;
      .panel {
        width: 306px;
        height: 500px;
        float: left;
        .card {

        }
      }
    }
  }
  
</style>