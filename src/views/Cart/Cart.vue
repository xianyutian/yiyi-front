<template>
<div class="shop-cart-page">
  <div class="container" v-if="cartItemList.length!==0">
    <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem>购物车</ShopBreadItem>
    </ShopBread>
    <div class="cart">
    <el-table class="table" :data="cartItemList" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="70">
      </el-table-column>
      <el-table-column align="center" label="商品信息" width="300">
        <template v-slot="scope">
          <div class="goods">
            <router-link :to="`/item/${scope.row.item.itemId}`"><img :src="scope.row.item.url" alt=""></router-link>
            <div>
              <p class="name ellipsis">{{scope.row.item.itemName}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价" width="220" class="tc">
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row.item.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="180" class="tc">
        <template v-slot="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.item.quantity }}</span> -->
          <!-- <el-input-number size="mini" v-model="scope.row.item.quantity" @change="handleChange(scope.row, scope.row.item.quantity)" :min="0"></el-input-number> -->
          <el-input-number  size="mini" v-model="scope.row.num" @change="handleChange(scope.row)" @blur="handleChange(scope.row)" :min="1" :precision="0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="小计" width="180" class="tc">
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row.item.price * scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="140" class="tc">
        <template v-slot="scope">
          <p><a @click="addToProfile(scope.row)">添加至收藏夹</a></p>
          <p><a @click="handleDelete(scope.row)" class="red" href="javascript:;">删除</a></p>
          <p><a href="javascript:;">找相似</a></p>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- 操作栏 -->
    <div class="action">
      <div class="batch">
        <el-checkbox @change="selectAll()">全选</el-checkbox>
        <a @click="batchDeleteCart()" href="javascript:;" class="red">删除商品</a>
        <a href="javascript:;">移入收藏夹</a>
        <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a>
      </div>
      <div class="total">
        共 {{cartItemList.length}} 件商品，已选择 {{multipleSelection.length}} 件，商品合计：
        <span class="red">¥{{subtotal}}</span>
        <ShopButton type="primary">下单结算</ShopButton>
      </div>
        <!-- 猜你喜欢 -->
        <!-- <GoodRelevant /> -->
    </div>
  </div>
  <div class="container" v-else>
    <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem>购物车</ShopBreadItem>
    </ShopBread>
    <table class="cart">
          <thead>
            <tr>
              <el-checkbox></el-checkbox>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr>
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
          </tbody>
    </table>
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
        {
          "item":{ url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
          ,itemId:"1", classify:"", description:"", inventory:500 },
          "num": 2,
        },
        {
          "item": { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
          ,itemId:"2", classify:"", description:"", inventory:500},
          "num": 3,
        }
      ],
      invalidCartItemList:[

      ],
      multipleSelection:[],   // 当前选中的购物车的几项
    }
  },
  computed: {
   subtotal:{
            get() {
                let total=0;
                for(let cartItem of this.multipleSelection) {
                  total += cartItem.num * cartItem.item.price;
                }
                return total;
            },

            set() {}
  }
      
  },
  methods:{
    // 修改商品数量
    handleChange(row) {
      console.log(row.item.itemId)
      console.log(row.num)
    },

    // 删除商品
    handleDelete(row) {

    },

    handleSelectionChange(selection) {
        this.multipleSelection = selection;
        console.log(this.multipleSelection);
    },

    // 将选中的商品添加到收藏夹
    addToProfile(row){

    },

    // 将商品全部选中
    selectAll(){

    }
  },
  
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
    width: 90px;
    height: 110px;
  }
  > div {
    width: 200px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 16px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  //margin-top: 20px;
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
  background: #f5f5f5;
  .cart {
    background: #fff;
    color: #666;
    font-size: 16px;
    el-table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      font-size: 16px;
      el-table-column{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      el-table-column {
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
.table{
  font-size: 16px;
}
</style>
