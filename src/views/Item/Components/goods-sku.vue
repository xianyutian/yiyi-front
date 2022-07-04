<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
const pathMap = {}
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 1. 得到所有的sku集合  props.goods.skus
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法(求子集的算法)得到子集
  // 4. 根据子集往路径字典对象中存储 key-value
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算有库存的sku的子集
      // 可选值数组
      const valueArr = sku.specs.map(val => val.valueName)
      // 可选值数组的子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集，往pathMap插入子集
      valueArrPowerSet.forEach(arr => {
        // 把数组转为字符串，key为['蓝色','美国'] = '蓝色★美国'
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 返回按钮名字的数组
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    // 找到选中的按钮对象
    // 如果选中，则把按钮名字放入数组，否则放undefined进数组
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisableStatus = (specs, pathMap) => {
  // 1.约定每一个按钮的状态用disabled表示
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 2.判断是否选中，如果选中了不用判断是否禁用
      if (val.selected) return
      // 3.如果未选中，拿当前的按钮数组按顺序套入新数组
      selectedValues[i] = val.name
      // 4.把新数组的undefined去掉，里面其他的字符串用★拼接得到数组
      const key = selectedValues.filter(value => value).join(spliter)
      // 5.那拼接后的数组去路径字典查看是否有数据，有则可以点击，没有就禁用
      val.disabled = !pathMap[key]
    })
  })
}
// 默认选中
const initDefaultSelected = (goods, skuId) => {
  // 1. 找出sku的信息
  // 2. 遍历每一个按钮，按钮的值和sku记录的值相同，就选中。
  const sku = goods.skus.find(sku => sku.id === skuId)
  goods.specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}
export default {
  name: 'GoodsSku',
  props: {
    // 父组件传进来的商品信息
    goods: {
      type: Object,
      default: () => {}
    },
    // 父组件传进来的skuId
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 根据skuId初始化选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
      console.log('初始化', props.skuId);
    }
    const pathMap = getPathMap(props.goods.skus)
    console.log('路径字典(有库存的商品)：', pathMap);
    // **组件初始化：需要更新按钮状态
    updateDisableStatus(props.goods.specs, pathMap)
    // 选中与取消选中
    // 如果点击的是已选中，只需取消当前的选中
    // 如果点击的是未选中，需把其他规格的按钮改为未选中，当前点击的改成选中
    const changeSku = (item, val) => {
      // 当按钮是禁用时阻止程序运行
      if (val.disabled) return
      // 如果不是禁用正常运行
      if (val.selected) {
        val.selected = !val.selected
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
      // **点击按钮：需要更新按钮状态
      getSelectedValues(props.goods.specs)
      // 将你选择的sku信息通知父组件
      // 1.选择完整的sku，提交sku信息对象给父组件
      // 2.不是完整的sku，提交空对象给父组件
      // 判断sku是否完整
      const validSelectedValues = getSelectedValues(props.goods.specs).filter(val => val)
      if (validSelectedValues.length === props.goods.specs.length) {
        // 完整
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, '').trim()
        })
      } else {
        // 父组件需要判断sku信息是否完整，不完整不能加购物车
        emit('change', {})
      }
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin: 0 10px 10px 0;
  cursor: pointer;
  &.selected {
    border-color: #27BA9B;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
