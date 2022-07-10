<template>
  <div class="orderDetailPage">
    <div class="container">
        <!-- 导航栏 -->
        <ShopBread>
            <ShopBreadItem to="/home">首页</ShopBreadItem>
            <ShopBreadItem to="/lineOrder">我的订单</ShopBreadItem>
            <ShopBreadItem>订单详情</ShopBreadItem>
        </ShopBread>

        <!-- 表单 -->
        <order-form :order="order"/>
    </div>
  </div>
</template>

<script>
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import OrderForm from './Components/OrderForm'
export default {
    name:"OrderDetail",
    components:{ShopBread, ShopBreadItem, OrderForm},
    data(){
        return {
            order:{},
        }
    }, 
    methods:{
        getData(){
            this.order = JSON.parse(window.sessionStorage.getItem("order"))
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped lang="less">
.orderDetailPage{
    background: #f5f5f5;
    .container{
        width: 1240px;
        margin: 0 auto;
        position: relative;
    }
}

</style>