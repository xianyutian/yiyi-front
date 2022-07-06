<template>
  <div class='shop-swiper' @mouseenter="stop()" @mouseleave="start()">
    <!-- 轮播图图片容器 -->
    <ul class="swiper-body">
      <!-- 所有图片都在一个位置，如果要显示，则加上fade类名，让opacity为1 -->
      <li class="swiper-item" :class="{ fade: index === i }" v-for="(itemList, i) in sliders" :key="i">
        <!-- **图片 -->
        <RouterLink to="/" v-if="itemList.url">
          <img :src="itemList.url" alt="">
        </RouterLink>
        <!-- **商品列表 -->
        <div v-else class="slider">
          <a v-for="item in itemList" :key="item.itemId" @click="gotoItem(item)" href="#">
            <img :src="item.url" alt="">
            <p class="name ellipsis">{{item.itemName}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </a>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <!-- 鼠标进入才会显示 -->
    <a @click="toggle(-1)" href="javascript:;" class="swiper-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a @click="toggle(1)" href="javascript:;" class="swiper-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器 -->
    <div class="swiper-indicator">
      <!-- 指示器 active为激活 -->
      <!-- 3.点击索引点可以切换对应图片 @click="index = i" -->
      <span @click="index = i" :class="{ active: index === i }" v-for="(itemList, i) in sliders" :key="i"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watchEffect } from 'vue'
export default {
  name: 'ShopSwiper',
  props: {
    // 父组件传过来的轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 控制显示图片的索引
    const index = ref(1)
    // 1.自动轮播逻辑
    let timer = null
    const autoPlayFn = () => {
      // 防止定时器重复添加
      clearInterval(timer)
      timer = setInterval(() => {
        if (props.sliders.length && props.sliders.length >= 2) {
          index.value++
        }
        // 循环播放
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 监听autoPlay是否为true
    watchEffect(() => {
      if (props.autoPlay) autoPlayFn()
    })
    // 2.鼠标进入停止自动播放逻辑
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    // 开始播放逻辑
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 3.点击索引点可以切换对应图片
    // 4.点击上一张下一张切换图片
    const toggle = (step) => {
      // 把 索引值 赋值给 将要改变的索引值，防止点击过多造成索引值超出有效值
      const newIndex = index.value + step
      // 太大情况
      if (newIndex > props.sliders.length - 1) {
        index.value = 0
        return
      }
      // 太小情况
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      // 正常
      index.value = newIndex
    }
    // 5.组件卸载后清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  },
  methods:{
    gotoItem(item){
      window.sessionStorage.setItem("item", JSON.stringify(item))
      this.$router.push('/home/item/'+ item.itemId)
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.shop-swiper{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .swiper{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .swiper-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 210px!important;
      height: 280px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: #CF4444;
      margin-top: 15px;
    }
  }
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-angle-right:before {
  content: ">";
}

.icon-angle-left:before {
  content: "<";
}
</style>
