<template>
  <div class="form">
    <div class="time">
        <span>下单时间：</span>
        <span>{{order.timestamp}}</span>
    </div>
    <div class="address">
        <span>收货地址：</span>
        <span>{{order.address}}</span>
    </div>
    <el-divider><p class="divider">商品详情</p></el-divider>
    <div class="items">
        <OrderItemTable :orderItemList="order.itemList" :orderId="order.orderId"/>
    </div>

    <!-- 总价 -->
    <div class="total">
        <span>总计：</span>
        <span>￥{{ computePrice(order.itemList)}}</span>
    </div>
  </div>
</template>

<script>
import OrderItemTable from './OrderItemTable'
export default {
    name: "OrderForm",
    props:["order"],
    components:{OrderItemTable},
    methods:{
        computePrice(itemList){
            let sum = 0
            for( let i=0; i< itemList.length; i++){
                sum += itemList[i].item.price* itemList[i].num
            }
            return sum
        },
    }
}
</script>

<style scoped lang="less">
.divider{
    font-size: 18px;
}
.form{
    background: #fff;
    padding: 30px;
    .time{
        height: 40px;
        font-size: 18px;
    }
    .address{
        margin-top: 30px;
        height: 40px;
        font-size: 18px;
        margin-bottom: 30px;
    }
    .total{
        margin-top: 30px;
        height: 40px;
        font-size: 18px;
    }
}

</style>