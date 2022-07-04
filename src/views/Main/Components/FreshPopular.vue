<template>
  <div class="pannel">
    <a  v-for="item in goodsData" :key="item.itemName" :class="[item.price ? 'cyan' : 'white']" @click="gotoItem(item)">
      <img :src="item.url">
      <p class="name">{{ item.itemName }}</p>
      <p class="price">
        <slot name="price" :data="item.price"></slot>
      </p>
      <!-- <p class="info">
        <slot name="info" :data="item.description"></slot>
      </p> -->
    </a>
  </div>
</template>

<script>
export default {
  name: 'CommonPannel1',
  props: {
    goodsData: Array
  },
  methods:{
    gotoItem(item){
      window.sessionStorage.setItem("item", JSON.stringify(item))
      this.$router.push('/home/item/'+ item.itemId)
    }
  }
}
</script>

<style lang="less" scoped>
  .pannel {
    display: flex;
    justify-content: space-between;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 306px;
      height: 406px;
      transition: all .5s;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        color: #c81623;
      }
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
      .name {
        margin: 12px 0 10px;
        font-size: 22px;
      }
      .price {
        font-size: 23px;
        color: #9a2e1f;
        small {
          font-size: 16px;
        }
      }
      .info {
        font-size: 18px;
        color: #999;
      }
    }
    .cyan {
      background-color: #f0f9f4;
    }
    .white {
      background-color: #fff;
    }
  }
</style>
