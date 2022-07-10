<template>
  <div class="newOrderPage">
    <div class="container">
        <!-- 导航栏 -->
        <ShopBread>
            <ShopBreadItem to="/home">首页</ShopBreadItem>
            <ShopBreadItem to="/cart">购物车</ShopBreadItem>
            <ShopBreadItem>结账</ShopBreadItem>
        </ShopBread>
        <div class="form">
            <div class="time">
                <span>下单时间：</span>
                <span>{{myformat(order.timestamp)}}</span>
            </div>
            <div class="address">
                <span>收货地址：</span>
                <!-- <ShopCity /> -->
                <el-input v-model="order.address" style="width:400px; height: 30px; font-size: 18px"></el-input>
            </div>
            <el-divider><p class="divider">商品详情</p></el-divider>
            <div class="items">
                <NewOrderTable :orderItemList="order.itemList"/>
            </div>

            <!-- 总价 -->
            <div class="action">
                <div class="total">
                    共 {{order.itemList.length}} 件商品, 商品合计：
                    <span class="red">¥{{computePrice(order.itemList)}}</span>
                    <ShopButton type="primary" @click="submitOrder()" class="button">确认支付</ShopButton>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ShopCity from '@/components/shop-city.vue'
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import NewOrderTable from './Components/NewOrderTable.vue'
import ShopButton from '@/components/shop-button'
import {getAccount} from '@/api/users.js'
import {submitOrder} from '@/api/business.js'
export default {
    name: "NewOrder",
    components:{ShopCity, ShopBread, ShopBreadItem,NewOrderTable, ShopButton},
    data(){
        return {
            order: {},     // 当前产生的新订单
            address: "",    // 收货地址
        }
    },
    methods:{
        computePrice(itemList){
            let sum = 0
            for( let i=0; i< itemList.length; i++){
                sum += itemList[i].item.price* itemList[i].num
            }
            return sum
        },
        getData(){
            this.order = JSON.parse(window.sessionStorage.getItem("newOrder")) 
            let isLocal = window.sessionStorage.getItem("isLocal")
            let uid = window.sessionStorage.getItem("uid")
            if(!isLocal){
                // 从服务器获取账号信息，主要为了获取地址
                if(uid !== null && uid !== ""){
                    getAccount().then(data => {
                        if(data.code !== 200)
                            alert(data.msg)
                        else
                            this.order.address = data.data.address
                    })
                }
            }
        },
        submitOrder(){
            var con = confirm('确认支付吗？')
            if(con){  
                let isLocal = window.sessionStorage.getItem("isLocal")
                if(isLocal){
                    alert("支付成功！商品将尽快发货！请及时归还哦")
                    this.$router.push('/lineOrder')
                } else{
                    let itemList = []
                    for(let i=0; i<this.order.itemList.length; i++){
                        let item = {}
                        item.itemId = this.order.itemList[i].item.itemId
                        item.days = this.order.itemList[i].days
                        item.num = this.order.itemList[i].num
                        itemList.push(item)
                    }
                    this.order.itemList = itemList
                    // 向服务器提交订单
                    getAccount(this.order).then(data => {
                        if(data.code !== 200)
                            alert(data.msg)
                        else{
                            alert('支付成功！商品将尽快发货！请及时归还哦')
                            this.$router.push('/lineOrder')
                        }
                    })
                }
            }
        },
        myformat(timestamp){
            let year = timestamp.slice(0, 4)
            let month = timestamp.slice(4, 6)
            let day = timestamp.slice(6, 8)
            let str = year + '-' + month + '-' + day
            return str
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped lang="less">
.newOrderPage{
    background: #f5f5f5;
    .container{
        width: 1240px;
        margin: 0 auto;
        position: relative;
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
            .action{
                .total{
                    padding-left: 350px;
                    .button{
                        margin-left: 50px;
                    }
                }
                
            }
        }
    }
}
</style>