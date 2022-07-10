<template>
  <div class="table">
    <el-table class="table" :data="orderItemList" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column align="center" label="商品信息" width="340px">
        <template v-slot="scope">
          <div class="goods">
            <a @click="gotoItem(scope.row.item)" href="javascript:;"><img :src="scope.row.item.url" alt=""></a>
            <div>
              <p class="name ellipsis">{{scope.row.item.itemName}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价" width="190px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.item.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="190px" class="tc">
        <template v-slot="scope">
          <span>{{ scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租赁天数" width="250px" class="tc">
        <template v-slot="scope">
          <el-input-number  size="mini" v-model="scope.row.days" @change="handleChange(scope.row)" 
          @blur="handleChange(scope.row)" :min="1" :precision="0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总计" width="180px" class="tc">
        <template v-slot="scope">
          <span>￥{{ scope.row.item.price * scope.row.num }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: "NewOrderTable",
    props:["orderItemList"],
    methods:{
        handleChange(orderItem){

        },


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
    padding-left: 40px;
    .attr {
      font-size: 16px;
      color: #999;
    }
  }
}

</style>