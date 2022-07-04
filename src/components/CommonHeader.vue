<template>
  <div class="header-container wrapper">
    <router-link to="/home"><h1></h1></router-link>
    <div class="nav">
      <router-link v-for="category in categoryList" :key="category" :to="`/category/${category}`">
          {{category}}
      </router-link> 
    </div>
    <div class="search-car">
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
        <span></span>
      </div>
      <div class="cart">
        <router-link class="curr" to="/cart">
          <i class="iconfont icon-cart"></i><em>5</em>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data(){
    return {
      // 商品的所有类别，可以从数据库获取，若无特别需求则直接确定不改动
      categoryList: [
        "连衣裙", "半身裙", "衬衫", "卫衣", "毛衣", "休闲裤", "牛仔裤", "外套", "运动套装"
      ]     
    }
  }
}
</script>

<style lang="less" scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 130px;
    h1 {
      width: 200px;
      height: 130px;
      background: url('@/assets/images/logo.png') no-repeat 50%;
      background-size: contain;
    }
    .nav {
      a {
        margin: 0 20px;
        padding-bottom: 7px;
        &:hover {
          color: #27ba9b;
          border-bottom: 2px solid #27ba9b;
        }
      }
    }
    .search-car {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search {
        position: relative;
        width: 172px;
        height: 30px;
        border-bottom: 2px solid #e7e7e7;
        input {
          width: 172px;
          height: 28px;
          padding-left: 30px;
          outline: none;
        }
        span {
          position: absolute;
          left: 2px;
          top: 0;
          width: 18px;
          height: 18px;
          background: url('../assets/images/sprites.png') -79px -69px;
        }
      }
      .cart {
        position: relative;
        width: 23px;
        height: 23px;
        margin: 0 15px;
        background: url('@/assets/images/sprites.png') -119px -69px;
        .curr {
          height: 32px;
          line-height: 32px;
          text-align: center;
          position: relative;
          display: block;
          .icon-cart {
            font-size: 22px;
          }
          em {
            font-style: normal;
            position: absolute;
            left: 18px;
            top: -5px;
            padding: 1px 6px;
            line-height: 1;
            background: #E26237;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            font-family: Arial;
          }
        }
        &:hover {
          .layer {
            opacity: 1;
            transform: none
          }
        }
        .layer {
          opacity: 0;
          transition: all .4s .2s;
          transform: translateY(-200px) scale(1, 0);
          width: 400px;
          height: 400px;
          position: absolute;
          top: 50px;
          right: 0;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          background: #fff;
          border-radius: 4px;
          padding-top: 10px;
          &::before {
            content: "";
            position: absolute;
            right: 14px;
            top: -10px;
            width: 20px;
            height: 20px;
            background: #fff;
            transform: scale(0.6,1) rotate(45deg);
            box-shadow: -3px -3px 5px rgba(0,0,0,0.1);
          }
          .foot {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 70px;
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            align-items: center;
            .total {
              padding-left: 10px;
              color: #999;
              p {
                &:last-child {
                  font-size: 18px;
                  color: #CF4444;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
