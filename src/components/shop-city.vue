<template>
  <div class="shop-city" ref="target">
    <div class="select active" @click="toggle()">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <!-- v-if 和 v-for 不能共存 -->
      <template v-else>
      <span class="ellipsis" @click="changeItem(item)" v-for="item in currCityList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import axios from 'axios'
export default {
  name: 'ShopCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 是否显示城市数据
    const visible = ref(false)
    // 省市区数据
    const allCityData = ref([])
    // 用户选择的省市区数据
    const changeLocation = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 是否正在加载省市区数据
    const loading = ref(false)
    // 获取当前城市级数的地区数组(省 市 区)
    const currCityList = computed(() => {
      // 默认显示省一级
      let list = allCityData.value
      // 市一级
      if (changeLocation.provinceCode && changeLocation.provinceName) {
        list = list.find(p => p.code === changeLocation.provinceCode).areaList
      }
      // 区一级
      if (changeLocation.cityCode && changeLocation.cityName) {
        list = list.find(c => c.code === changeLocation.cityCode).areaList
      }
      return list
    })
    // 打开触发该函数
    const open = () => {
      visible.value = true
      // 获取省市区数据
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
      // 清空之前的城市选择
      for (const key in changeLocation) {
        changeLocation[key] = ''
      }
    }
    // 关闭触发该函数
    const close = () => {
      visible.value = false
    }
    // 是否展示地址对话框
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击外部元素关闭对话框
    const target = ref(null)
    // 参数1: 监听的元素
    // 参数2: 点击该元素的外面是触发的函数
    onClickOutside(target, () => {
      close()
    })
    // 点击省市区时触发记录省市区数据
    const changeItem = (item) => {
      if (item.level === 0) {
        changeLocation.provinceCode = item.code
        changeLocation.provinceName = item.name
      }
      if (item.level === 1) {
        changeLocation.cityCode = item.code
        changeLocation.cityName = item.name
      }
      if (item.level === 2) {
        changeLocation.countyCode = item.code
        changeLocation.countyName = item.name
        changeLocation.fullLocation = `${changeLocation.provinceName} ${changeLocation.cityName} ${changeLocation.countyName}`
        // 最后一级选完了，关闭对话框，通知父组件数据
        close()
        emit('changeLocation', changeLocation)
      }
    }
    return { visible, open, close, toggle, currCityList, loading, target, changeItem }
  }
}
// 获取省市区数据
const getCityData = () => {
  // 1.当本地没有缓存，发送请求获取数据 异步操作
  // 2.当本地有缓存，取出本地数据 同步操作
  // 返回promise，在then中获取数据
  return new Promise((resolve, reject) => {
    // 数据存在window的cityData上
    if (window.cityData) {
      // 如果本地有缓存，返回缓存的数据
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        console.log(res.data);
        window.cityData = res.data
        resolve(res.data);
      })
    }
  })
}
</script>

<style scoped lang="less">
.shop-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    // 加载中样式
    .loading {
      height: 290px;
      width: 100%;
      background: url('@/assets/images/loading.gif') no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
