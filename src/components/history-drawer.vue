<template>
  <div class="history">
    <HistoryDrawerCard v-for = "historyItem in historyList" :key="historyItem.itemId"
    :historyItem="historyItem" class="panel"/>
  </div>

</template>

<script>
import HistoryDrawerCard from './history-drawer-card.vue';

export default {
    name:"HistoryDrawer",
    components: {HistoryDrawerCard}, 
    props:["historyList"],
    data() {
      return {
        // historyList: [
        //     { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
        //   ,itemId:"1", classify:"", description:"一条好看的小裙子", inventory:500, sales: 800, timestamp:"2022-07-08 03:10:00" },
        //   { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
        //   ,itemId:"2", classify:"", description:"", inventory:500, sales: 700, timestamp:"2022-07-09 03:10:00"},
        //   { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
        //   ,itemId:"3", classify:"", description:"", inventory:500, sales: 600, timestamp:"2022-07-09 03:10:00"},
        //   { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        //   ,itemId:"4", classify:"", description:"", inventory:500, sales:50, timestamp:"2022-07-10 03:10:00"}
        // ],
      };
    },
    methods: {
      getData(){
        // 初始化页面加载数据
      }
    },
    created(){

    }
};
</script>

<style scoped lang="less">
.history{
    background-color: #f5f5f5;
    width: 500px;
    .panel{
        width: 500px;
        height: 300px;
        // margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 15px;
    }
}
</style>