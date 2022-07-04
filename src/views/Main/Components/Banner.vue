<template>
  <div class="banner-list">
    <div class="wrapper">
      <!-- banner图  -->
        <el-carousel height="750px">
          <el-carousel-item v-for="(banner,index) in bannerList" :key="index">
            <img :src="banner.img" @click="turnToItem(index, banner)">
          </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyBanner',
  data(){
    return {
      // 广告图片，必要的话可以从服务器获取，暂时先固定
      bannerList:[
        {"itemId": "连衣裙-01", "img": require("@/assets/images/advertise/redDress3.png")},
        {"itemId": "西装-01", "img": require("@/assets/images/advertise/suit3.png")},
        {"itemId": "毛衣-01", "img": require("@/assets/images/advertise/sweather3.jpg")},
        {"itemId": "衬衣-01", "img": require( "@/assets/images/advertise/advertise3.png")}
      ],
      itemList:[
        { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"", inventory:500 },
        { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
        ,itemId:"2", classify:"", description:"", inventory:500},
        { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
        ,itemId:"3", classify:"", description:"", inventory:500},
        { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
        ,itemId:"4", classify:"", description:"", inventory:500}
      ]
    }
  },
  methods: {
    turnToItem(index, banner){
      // 用getItemById从服务器获取，暂时先固定
      console.log(this.itemList[index])
      window.sessionStorage.setItem("item", JSON.stringify(this.itemList[index]))
      this.$router.push('/home/item/' + banner.itemId)
    }
  }
}
</script>

<style lang="less" scoped>
  .banner-list {
    height: 750px;
    background-color: #f5f5f5;
    .wrapper {
      position: relative;
      .list {
        position: absolute;
        left: 0;
        top: 0;
        width: 250px;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        li {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            padding-left: 36px;
            color: #fff;
            span {
              margin-left: 15px;
              font-size: 14px;
            }
            &:hover {
              background-color: #27ba9b;
            }
            &::after {
              position: absolute;
              top: 19px;
              right: 19px;
              content: "";
              width: 6px;
              height: 11px;
              background: url('@/assets/images/sprites.png') -80px -110px;
            }
          }
        }
      }
      .l-arrow,
      .r-arrow {
        position: absolute;
        top: 228px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .2);
        background-image: url('@/assets/images/sprites.png');
      }
      .l-arrow {
        left: 260px;
        background-position: 14px -60px;
      }
      .r-arrow {
        right: 10px;
        background-position: -23px -60px;
      }
      ol {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 30px;
        left: 680px;
        width: 150px;
        height: 10px;
        li {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, .4);
          cursor: pointer;
        }
        .current {
          background-color: #fff;
        }
      }
    }
  }
</style>
