<template>
  <div class="card">
    
    <div class="img">
        <a href="javascript:;" @click="gotoItem(item)">
            <img :src="item.url">
        </a>
    </div>

    <div class="name">
        <a href="javascript:;" @click="gotoItem(item)">
            <i class="name">
            {{ item.itemName }}
        </i>
        </a>
    </div>

    <div class="price">
    <i>￥{{item.price}}</i>
    </div>
    <div class="operation">
        <p><a @click="removeProfile(item.itemId)" class="red" href="javascript:;">移除</a></p>
        <p><a @click="findRelavant()" class="green" href="javascript:;" >找相似</a></p>
    </div>
  </div>
</template>

<script>
import {deleteProfile} from '@/api/users.js'
export default {
    name: "ProfileCard",
    props:["item"],
    methods:{
        gotoItem(item){
            window.sessionStorage.setItem("item", JSON.stringify(item))
            this.$router.push('/home/item/'+ item.itemId)
        },
        removeProfile(itemId){
            var con = confirm("确认移除吗？")
            if (con) {
                let isLocal = window.sessionStorage.getItem("isLocal")
                if(isLocal){
                    // 从数组中删除
                    alert("移除成功！")
                    this.$emit("deleteItem", this.item)
                } else{
                    let uid = window.sessionStorage.getItem("uid")
                    if(uid !== null && uid !== ""){
                        deleteProfile(uid, this.item.itemId).then(data => {
                            if(data.code === 200)
                              alert("移除成功！")
                            else
                              alert(data.msg)
                        })
                        this.$emit("deleteItem", this.item)
                    }
                }
            }
            
        }
    }
}
</script>

<style scoped lang="less">
.card{
    height: 340px;
    background: #ffffff;
    white-space: nowrap;
    .img{
        float: left;
        img{
            height: 280px;
            width: 210px;
            margin-left: 30px;
            margin-bottom: 30px;
            margin-top: 30px;
        }
    }
    .name{
        font-style: normal;
        float: left;
        color:#27BA9B;
        font-size: 30px;
        text-align: center;
        width: 550px;
        margin-top: 65px;
    }
        
    .price{
        font-size: 25px;
        float: left;
        width: 100px;
        text-align: center;
        color:red;
        margin-top: 135px;
    }
    .operation{
        margin-top: 80px;
        float: left;
        line-height: 80px;
        margin-left: 160px;
        font-size: 25px;
        text-align: center;
        .green{
            padding: 20px;
            height: 70px;
            color: #27BA9B;
        }
        .red{
            padding: 20px;
            height: 70px;
            color: red
        }
    }
    
}
</style>