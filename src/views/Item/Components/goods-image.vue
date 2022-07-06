<template>
  <!-- 大图 -->
  <div class="goods-image">
    <div v-show="show" class="large" :style="[{backgroundImage:`url(${url})`},largePosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="url" alt="">
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    url: {
      default: require("@/assets/images/clothes/news_1.jpg")
    }
  },
  setup () {
    // 当前预览图的索引
    const currIndex = ref(0)
    // 1.是否显示遮罩和大图
    const show = ref(false)
    // 2.遮罩的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 3.大图背景的定位(样式)
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    // 4.使用useMouseInElement得到基于中图左上角的坐标和是否离开中图
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      // 5.根据数据渲染遮罩和大图
      show.value = !isOutside.value
      // 计算鼠标坐标
      const position = { x: 0, y: 0 }
      // 计算鼠标x值
      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 260) position.x = 160
      else position.x = elementX.value - 100
      // 计算鼠标y值
      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 380) position.y = 280
      else position.y = elementY.value - 100
      // 给样式赋值
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -1.45 * position.y  + 'px'
    })
    return { show, layerPosition, largePosition, currIndex, target }
  }
}
</script>
<style scoped lang="less">

.goods-image {
  width: 400px;
  height: 480px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 360px;
    height: 480px;
    background: #ffffff;
    position: relative;
    cursor: move;
    img {
        margin:auto;
        max-width: 100%;
        max-height: 100%;
        // vertical-align: middle;
    }
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid #27BA9B;
      }
    }
  }
}
</style>
