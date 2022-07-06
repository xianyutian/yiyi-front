<script>
import { h } from 'vue'
export default {
  name: 'ShopBread',
  // 返回组件内容
  render () {
    // h 第一个参数：标签名字 第二个参数：标签属性 第三个参：子节点
    // 1.创建shop-bread父容器
    // 2.获取默认插槽内容
    // 3.去除shop-bread-item的i标签
    // 4.遍历插槽，得到一个动态创建的节点，最后一个shop-bread-item不加i
    // 5.把动态创建的节点渲染在shop-bread
    // default是默认slot名称，如果有其他名称，则.其他名称
    const items = this.$slots.default()
    // console.log(items)
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      // 最后一个item不加i标签
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'shop-bread' }, dymanicItems)
  }
}
</script>

<style lang='less' scoped>
// 去除scope，将样式作用到shop-bread-item组件
.shop-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      font-size: 12px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 22px;
      color: #666;
      transition: all .4s;
      &:hover {
        color: #27BA9B;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
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
}
</style>
