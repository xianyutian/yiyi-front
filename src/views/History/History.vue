<template>
  <div class="historyPage">
    <div class="container">
    <!-- 导航栏 -->
     <ShopBread>
        <ShopBreadItem to="/home">首页</ShopBreadItem>
        <ShopBreadItem>历史浏览记录</ShopBreadItem>
    </ShopBread>

    <!-- 日期选择器 -->
    <div class="block">
        <div class="picker">
            <el-date-picker
            v-model="pickDate"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            value-format="YYYY-MM-DD"
            >
        </el-date-picker>
        </div>
        <div class="button" @click="changeDate()">确认</div>
    </div>

    <div class="day" v-for="dateItems in historyLists" :key="dateItems">
        <div class="name">>{{dateItems[0].timestamp.split(" ")[0]}}</div>

            <div class="group" v-for="items in getLists(dateItems)[0]" :key="items" v-show="items.length !==0">
                <div class="panel" v-for="item in items" :key="item.itemId">
                    <ItemCard class="card" :item="item" />
                </div>
            </div>
     
            <div class="group" v-show="getLists(dateItems)[1].length !==0">
                <div class="panel" v-for="item in getLists(dateItems)[1]" :key="item.itemId">
                    <ItemCard class="card" :item="item" />
                </div>
            </div>
    </div>
  </div>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ShopBread from '@/components/shop-bread'
import ShopBreadItem from '@/components/shop-bread-item'
import {getHistories} from '@/api/users.js'

export default {
    name: "MyHistory",
    components:{ItemCard, ShopBread, ShopBreadItem},
    inject:['reload'],                                 //注入App里的reload方法
    data(){
        return{
            historyList: [
                { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
                ,itemId:"4", classify:"", description:"", inventory:500, sales:50, timestamp:"2022-07-10 03:10:00"},
                { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
                ,itemId:"3", classify:"", description:"", inventory:500, sales: 600, timestamp:"2022-07-10 03:10:00"},
                { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
                ,itemId:"2", classify:"", description:"", inventory:500, sales: 700, timestamp:"2022-07-10 03:20:00"},
                    { url: require('@/assets/images/clothes/news_1.jpg'), itemName: '白色仙女连衣裙', price: 20
                ,itemId:"1", classify:"", description:"一条好看的小裙子", inventory:500, sales: 800, timestamp:"2022-07-10 03:20:00" },   
                { url: require('@/assets/images/clothes/news_4.jpg'), itemName: '宴会晚礼服', price: 99 
                ,itemId:"4", classify:"", description:"", inventory:500, sales:50, timestamp:"2022-07-09 03:10:00"},
                { url: require('@/assets/images/clothes/news_3.jpg'), itemName: '秋冬新款高领毛衣', price: 20 
                ,itemId:"3", classify:"", description:"", inventory:500, sales: 600, timestamp:"2022-07-09 03:10:00"},
                { url: require('@/assets/images/clothes/news_2.jpg'), itemName: '魏晋南北朝晋制汉服', price: 39 
                ,itemId:"2", classify:"", description:"", inventory:500, sales: 700, timestamp:"2022-07-08 03:20:00"},
            ],       // 后续要从服务器获取
            historyListChange:[],     // 选择开始日期后的历史记录
            historyLists:[],    // 将浏览记录按时间分组
            disabledDate(time) {
                return time.getTime() > Date.now()
            },                 // 禁用时间
            pickDate:"",  // 选中的时间
        }
    },
    methods:{
        getData(){
            //  historyList从服务器获取
            let isLocal = window.sessionStorage.getItem("isLocal")
            let uid = window.sessionStorage.getItem("uid")
            if(!isLocal && uid){
                getHistories().then(data => {
                    if(data.code === 200)
                    this.historyList = data.data
                })
            } 
            this.historyListChange = this.historyList
            this.getListsByHistoryChange()
        },
        getListsByHistoryChange(){
            // 处理数据
            if(this.historyListChange.length>0){
                this.historyLists = []
                let startDate = this.historyListChange[0].timestamp.split(" ")[0]
                let startList = [this.historyListChange[0]]
                if(this.historyListChange.length === 1){
                    this.historyLists.push(startList)
                } else{
                    for(let i=1; i<this.historyListChange.length; i++){
                        let currentDate = this.historyListChange[i].timestamp.split(" ")[0]
                        if( currentDate === startDate){
                            startList.push(this.historyListChange[i])
                            if(i === this.historyListChange.length-1){
                                this.historyLists.push(startList)
                            }
                        } else{
                            this.historyLists.push(startList)
                            startDate = currentDate
                            startList = [this.historyListChange[i]]
                            if(i === this.historyListChange.length -1){
                                this.historyLists.push(startList)
                            }
                        }
                    }
                }
            }
        },
        getLists(dateItems){
            // 分组
            let groupsNum = Math.floor(dateItems.length / 4)
            let groups = []
            let remains = []
            for(let i=0; i<groupsNum; i++){
                groups[i] = dateItems.slice(i, i+4)
            }
            remains = dateItems.slice(4*groups.length)
            return [groups, remains]
        },
        getDate(){
            var now = new Date()
            var year = now.getFullYear() // 得到年份
            var month = now.getMonth() // 得到月份
            var date = now.getDate() // 得到日期
            month = month + 1
            month = month.toString().padStart(2, '0')
            date = date.toString().padStart(2, '0')
            var defaultDate = `${year}-${month}-${date}`
            this.pickDate = defaultDate
        },
        changeDate(){
            this.historyListChange = []
            let i=0
            for(i=0; i<this.historyList.length; i++){
                let curDate = this.historyList[i].timestamp.split(" ")[0]
                if(curDate === this.pickDate){
                    break
                }
            }

            if(i === this.historyList.length){
                alert("当天没有浏览记录哦")
            }
            else{
                this.historyListChange = this.historyList.slice(i)
                console.log("更新历史记录")
                console.log(this.historyListChange)
                
                this.getListsByHistoryChange()
                console.log(this.historyLists)
                //this.reload()
            }
        }
    },
    created(){
        this.getData()
        this.getDate()
    }
}
</script>

<style lang="less" scoped>
.historyPage{
    background: #f5f5f5;
}
.container {
   width: 1270px;
   margin: 0 auto;
   position: relative;
   .block{
     width: 500px;
     height: 50px;
     .picker{
        float: left;
     }
     .button{
        width: 80px;
        height: 30px;
        font-size: 16px;
        float: left;
        margin-left: 40px;
        appearance: none;
        background: #27BA9B;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
     }
   }
   .day{
    border-radius:20px;
     display: table;
     background: #fff;
    margin-top: 15px;
     .name{
        font-size: 20px;
        height: 50px;
        padding-top: 20px;
        padding-left: 20px;
     }
     .group{
     width: 1270px !important;
      
      height: 480px;
    padding: 20px;
      
      .panel {
        display: table-cell;
        //margin-top: 25px;
        width: 306px;
        height: 480px;
        float: left;
        .card {

        }
      }
    }
   }
   
 }
</style>