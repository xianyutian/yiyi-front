<template>
  <div class="table">
    <el-table class="table" :data="orderItemList" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column align="center" label="商品信息" width="290px">
        <template v-slot="scope">
          <div class="goods">
            <a @click="gotoItem(scope.row.item)" href="javascript:;"><img :src="scope.row.item.url" alt=""></a>
            <div>
              <p class="name ellipsis">{{scope.row.item.itemName}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价" width="150px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.item.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="150px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租赁天数" width="150px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.days}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总计" width="150px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.item.price * scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="150px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="140px" class="tc">
        <template v-slot="scope">
          <p class="link"><a @click="returnItem(scope.row.item.itemId)"  href="javascript:;">归还</a></p>
          <p class="link"><router-link  :to="`/home/category/${scope.row.item.classify}`">找相似</router-link></p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {returnItem} from '@/api/business.js'
export default {
    name: "OrderItemTable",
    props:["orderItemList", "orderId"],
    methods:{
        returnItem(itemId){
          var con=confirm("确认已经归还吗？");
              if(con){
                let isLocal = window.sessionStorage.getItem("isLocal")
                if(isLocal){
                  alert('归还成功！')
                } else {
                  // 请求服务器
                  let uid = window.sessionStorage.getItem("uid")
                  if(uid !== null && uid !== ""){
                    returnItem(uid, itemId, this.orderId).then(data => {
                      if(data.code === 200)
                        alert("归还成功！")
                      else
                        alert(data.msg)
                    })
                  }
                }
          }  
        }
  }
}
</script>

<style scoped lang="less">
.link {
    font-size: 18px;
    padding:  10px;
    a{
        &:hover{
            color: #27BA9B;
        }
    }
}
.tc {
  text-align: center;
  font-size: 18px;
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

</style>