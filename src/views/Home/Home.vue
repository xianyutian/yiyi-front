<template>
  <div class="home-container">
    <!-- 快捷导航 -->
    <common-shortcuts></common-shortcuts>
    <!-- header -->
    <common-header></common-header>
    <!-- main -->
    <router-view></router-view>
    <!-- footer -->
    <common-footer></common-footer>
  </div>

  <el-drawer
    :destroy-on-close="true"
	  :append-to-body="true"
    v-model="showDrawer"
    direction="rtl"
    :before-close="handleClose"
    class="myDrawer"
    :with-header="false">
    <div class="drawerTitle">
      <router-link to="/history" class="drawerTitle2">查看全部 ></router-link>
    </div>
      <HistoryDrawer :historyList="historyList"/>
  </el-drawer>

  <a @click="viewTodayHistory()" href="javascript:;"><img src="@/assets/images/viewHistory4.png" class="fixHistory"/></a>
  <a @click="viewModel()" href="javascript:;"><img src="@/assets/images/viewModel4.png" class="fixModel"/></a>
</template>

<script>
import CommonShortcuts from '@/components/CommonShortcuts.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonFooter from '@/components/CommonFooter.vue'
import HistoryDrawer from '@/components/history-drawer'
export default {
  name: 'MyHome',
  components: {
    CommonShortcuts,
    CommonHeader,
    CommonFooter,
    HistoryDrawer
  },
  data(){
    return {
      showDrawer: false,     // 是否展示抽屉
      historyList: [
            { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"一条好看的小裙子", inventory:500, sales: 800, timestamp:"2022-07-08 03:10:00" },
          { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
          ,itemId:"2", classify:"", description:"", inventory:500, sales: 700, timestamp:"2022-07-09 03:10:00"},
          { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
          ,itemId:"3", classify:"", description:"", inventory:500, sales: 600, timestamp:"2022-07-09 03:10:00"},
          { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
          ,itemId:"4", classify:"", description:"", inventory:500, sales:50, timestamp:"2022-07-10 03:10:00"}
      ],
    }
  },
  methods:{
    viewTodayHistory(){
      this.showDrawer = true
    },
    viewModel(){
      // 调用3D组件
    },
  }
}
</script>

<style lang="less">
.el-drawer__body {
    background-color: #f5f5f5 !important;
    padding-left: 30px;
    .drawerTitle{
      //margin-left: 5px;
      font-size: 18px;
      color: black;
      height: 40px;
      .drawerTitle2{
        &:hover{
        color: green
      }
      }
    }
}
.fixHistory{
  width: 220px;
  height: 55px;
  position: fixed;
  z-index: 1;
  top: 580px;
  left: 1700px;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s;
  &:hover {
            transform: translateX(-5px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
            color: #c81623;
        }
}
.fixModel{
  width: 220px;
  height: 53px;
  position: fixed;
  z-index: 1;
  top: 650px;
  left: 1700px;
  transition: all 0.5s;
  &:hover {
            transform: translateX(-5px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
            color: #c81623;
        }
}
</style>
