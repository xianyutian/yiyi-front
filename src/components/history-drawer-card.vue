<template>
  <div class="card">
    <!-- 浏览时间 -->
    <div class="date">
        浏览时间: {{timeCut(historyItem.timestamp)}}
    </div>
    <!-- 商品信息 -->
    <div class="item">
        <div class="img">
        <a href="javascript:;" @click="gotoItem(historyItem)">
            <img :src="historyItem.url">
        </a>
    </div>

    <div class="name">
        <a href="javascript:;" @click="gotoItem(historyItem)">
            <i class="name">
            {{ historyItem.itemName }}
        </i>
        </a>
    </div>

    <div class="price">
        <i>￥{{historyItem.price}}</i>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
    name: "HistoryDrawerCard",
    props:["historyItem"],
    methods:{
        gotoItem(historyItem){
            window.sessionStorage.setItem("item", JSON.stringify(historyItem))
            this.$router.push('/home/item/'+ historyItem.itemId)
        },

        // 将字符串进行切割，只取时分秒，因为都是今天的数据
        timeCut(time){
            let list =  time.split(" ")
            return list.slice(1)[0]
        },
    }
}
</script>

<style scoped lang="less">
.card{
    width: 540px;
    background: #ffffff;
    white-space: nowrap;
    .date{
        height: 40px;
        width: 80px;
        margin-left: 40px;
        padding-top: 15px;
    }
    .item{
        .img{
            float: left;
            img{
                height: 200px;
                width: 150px;
                margin-left: 40px;
                margin-bottom: 15px;
                margin-top: 15px;
            }
        }
        .name{
            font-style: normal;
            float: left;
            color:#27BA9B;
            font-size: 15px;
            text-align: center;
            width: 235px;
            margin-top: 50px;
        }
            
        .price{
            font-size: 15px;
            float: left;
            width: 60px;
            text-align: center;
            color:red;
            margin-top: 100px;
        }
    }
    
}
</style>