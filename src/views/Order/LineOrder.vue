<template>
  <div class="lineOrderPage">
    <div class="container">
        <!-- 导航栏 -->
        <ShopBread>
            <ShopBreadItem to="/home">首页</ShopBreadItem>
            <ShopBreadItem>我的订单</ShopBreadItem>
        </ShopBread>

        <div class="table">
            <el-divider>我的订单</el-divider>
            <el-table :data="orderList" @row-click="clickData">
                <el-table-column align="center" label="下单时间" width="180">
                    <template v-slot="scope">
                    <span style="margin-left: 10px">
                        <el-link type="primary" @click="gotoOrderDetail(scope.row)">{{ scope.row.timestamp }}</el-link>
                    </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="收货地址" width="500">
                    <template v-slot="scope">
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总价" width="180">
                    <template v-slot="scope">
                    <span style="">￥{{ computePrice(scope.row.itemList)}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="状态" width="180">
                    <template v-slot="scope">
                    <span style="">{{ scope.row.status}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="" width="180">
                    <template v-slot="scope">
                      <a href="javascript:;" @click="gotoOrderDetail(scope.row)" class="green">查看详情 ></a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import {getOrders} from '@/api/order.js'
export default {
    name: "LineOrder",
    components:{ShopBread, ShopBreadItem},
    data(){
        return{
            orderList: [
        {
            "orderId": "1001",    // varchar类型，不是int
            "status": "done",     // 表示订单各商品全部都完成，这里status的取值和含义由后端自己定
            "uid": "12345678",   // 这一项可有可无，如果是把order对象直接丢进来的话会有这项
            "address": "湖南省长沙市岳麓区中南大学南五舍",
            "timestamp": "2022-06-30 15:01",   // 下单时间
            "itemList":[
                {
                    "item":{
                        "itemId": "礼服A-01",
                        "itemName": "伴娘礼服夏季2022新款",
                        "classify": "A-1",  // 所属的类别
                        "price": 250,
                        "description": "2022最新款，超仙，高级小众",
                        "url": require('@/assets/images/clothes/news_1.jpg'),
                        "inventory": 1000   //可有可无
                    },
                    "status": "done",
                    "days": 28,
                    "num": 1
                },    // 一个租赁商品相关信息
                {
                    
                    "item":{
                        "itemId": "汉服A-01",
                        "itemName": "中国风汉服",
                        "classify": "A-1",  // 所属的类别
                        "price": 125,
                        "description": "中国风白菜春夏新款日常，齐胸襦裙套装",
                        "url": require('@/assets/images/clothes/news_2.jpg'),
                        "inventory": 1000   //可有可无
                    },
                    "status": "done",
                    "days": 28,
                    "num": 1
                },
            ]
        }     // 一个订单
    ]

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
        gotoOrderDetail(order){
            window.sessionStorage.setItem("order", JSON.stringify(order))
            this.$router.push('/order/'+ order.orderId)
        }
    },
    created(){
        let isLocal = window.sessionStorage.getItem("isLocal")
        if(!isLocal){
            getOrders().then(data => {
                if(data.code !== 200)
                alert(data.msg)
                else
                this.orderList = data.data
            })
        }
    }
}
</script>

<style lang="less">
.lineOrderPage{
    background: #f5f5f5;
    .container {
        width: 1240px;
        margin: 0 auto;
        position: relative;
        //background: #fff;
        .green{
            &:hover{
                color: #27BA9B;
            }
        }
    }
}
.el-table{
    font-size: 16px;
}
.el-divider{
    font-size: 16px;
}

</style>