<template>
  <div class="shop-cart-page">
    <div class="container">
      <ShopBread>
        <ShopBreadItem to="/">首页</ShopBreadItem>
        <ShopBreadItem>购物车</ShopBreadItem>
      </ShopBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><ShopCheckbox @change="isCheckedAll">全选</ShopCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="cartItemList.length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="cartItem in cartItemList" :key="cartItem.item.itemId">
              <!-- 复选框 -->
              <td><ShopCheckbox @change="$event => isChecked(cartItem.item.itemId, $event)" :modelValue="goods.selected" /></td>
              <td>
                <div class="goods">
                  <router-link :to="`/item/${cartItem.item.itemId}`"><img :src="cartItem.item.url" alt=""></router-link>
                  <div>
                    <p class="name ellipsis">{{cartItem.item.itemName}}</p>
                    <!-- 选择规格组件 -->
                    <CartSku :skuId="cartItem.item.itemId" :attrsText="cartItem.item.itemName" />
                  </div>
                </div>
              </td>
              <!-- <td class="tc">
                <p>&yen;{{goods.nowPrice}}</p>
                <p v-if="goods.price-goods.nowPrice>0">比加入时降价 <span class="red">&yen;{{goods.price-goods.nowPrice}}</span></p>
              </td> -->
              <td class="tc">
                <ShopNumbox @change="$event => updateCount(cartItem.item.itemId, $event)" :max="cartItem.item.inventory" :modelValue="cartItem.num" />
              </td>
              <td class="tc"><p class="f16 red">&yen;{{Math.round(cartItem.item.price*100)*cartItem.num/100}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a @click="deleteCart(cartItem.item.itemId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="invalidCartItemList.length">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="cartItem in invalidCartItemList" :key="cartItem.item.itemId">
              <td><ShopCheckbox style="color:#eee;" /></td>
              <td>
                <div class="goods">
                  <router-link :to="`/item/${cartItem.item.itemId}`"><img :src="cartItem.item.url" alt=""></router-link>
                  <div>
                    <p class="name ellipsis">{{cartItem.item.itemName}}</p>
                    <p class="attr">商品已下架</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{cartItem.item.price}}</p></td>
              <td class="tc">{{cartItem.num}}</td>
              <td class="tc"><p>&yen;{{Math.round(cartItem.item.price*100)*cartItem.num/100}}</p></td>
              <td class="tc">
                <p><a @click="deleteCart(cartItem.item.itemId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <ShopCheckbox @change="isCheckedAll" >全选</ShopCheckbox>
          <a @click="batchDeleteCart()" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{cartItemList.length}} 件商品，已选择 0 件，商品合计：
          <span class="red">¥0</span>
          <ShopButton type="primary">下单结算</ShopButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <!-- <GoodRelevant /> -->
    </div>
  </div>
</template>
<script>
import CartNone from './Components/cart-none'
import CartSku from './Components/cart-sku'
import ShopBread from '@/components/shop-bread'
import ShopButton from '@/components/shop-button'
import ShopNumbox from '@/components/shop-numbox'
import ShopBreadItem from '@/components/shop-bread-item'

export default {
  name: 'MyCart',
  components: { CartNone, CartSku,ShopBread, ShopButton, ShopNumbox, ShopBreadItem },
  data(){
    return{
      cartItemList:[
        
      ],
      invalidCartItemList:[

      ]
    }
  },
  methods:{
    // 删除购物车商品
    deleteCart(itemId){

    }
  }
}
</script>

<style scoped lang="less">
.container {
   width: 1240px;
   margin: 0 auto;
   position: relative;
 }
.tc {
  text-align: center;
  .shop-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: #CF4444;
}
.green {
  color: #27BA9B
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .shop-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.shop-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
