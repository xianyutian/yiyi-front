<template>
  <div class="card">
    <a href="javascript:;" @click="gotoItem(item)">
        <div class="img">
            <img :src="item.url">
        </div>

        <div class="name">
            <i class="name">
                {{ item.itemName }}
            </i>
        </div>

        <div class="price">
            <i>￥{{item.price}}</i>
        </div>
    </a>
    
  </div>
</template>

<script>
export default {
    name: "ItemCard",
    props:["item"],
    methods:{
        gotoItem(item){
            window.sessionStorage.setItem("item", JSON.stringify(item))
            this.$router.push('/home/item/'+ item.itemId)
        }
    }
}
</script>

<style scoped lang="less">
.card{
    width: 310px;
    height: 480px;
    display: flex;
    a{
        margin-left: 5px;
        flex-direction: column;
        align-items: center;
        display: flex;
        transition: all 0.5s;
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
            color: #c81623;
        }
            i{
            font-style: normal;
        }
        .img{
            img{
                width: 300px;
                height: 400px
            }
        }
        .name{
            font-size: 22px;
            text-align: center;
        }
        .price{
            text-align: center;
            font-size: 23px;
            color: red;
        }
    }
    
}
</style>