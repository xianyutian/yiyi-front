<template>
  <p class="g-name">{{goods.itemName}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>暂无</dd>
    </dl>
    <dl>
      <dt>描述</dt>
      <dd>{{goods.description}} </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'
import ShopCity from '@/components/shop-city'

export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },

  components:{ShopCity},

  setup (props) {
    // 提供给后台的默认四项城市数据(没登录)
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    // 取出用户收货地址的默认地址(已登录)
    if (props.goods.userAddresses) {
      const defaultAddresses = props.goods.userAddresses.find(item => item.isDefualt === 1)
      if (defaultAddresses) {
        provinceCode.value = defaultAddresses.provinceCode
        cityCode.value = defaultAddresses.cityCode
        countyCode.value = defaultAddresses.countyCode
        fullLocation.value = defaultAddresses.fullLocation
      }
    }
    // 子组件传来的城市选择事件
    const changeLocation = (location) => {
      provinceCode.value = location.provinceCode
      cityCode.value = location.cityCode
      countyCode.value = location.countyCode
      fullLocation.value = location.fullLocation
    }
    return { fullLocation, changeLocation }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px
}
.g-price {
  margin-top: 20px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: #CF4444;
      margin-right: 10px;
      font-size: 22px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 20px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: #27BA9B;
            margin-right: 2px;
          }
        }
        a {
          color: #27BA9B;
        }
      }
    }
  }
}
</style>
