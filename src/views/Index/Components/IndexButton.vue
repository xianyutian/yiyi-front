<template>
  <button @click="gotoHome()" >现在开始</button>
</template>

<script>
export default {
    name: "IndexButton",
    methods:{
        gotoHome(){
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
    button{
        min-width: 160px;
        padding: 0 14px;
        background-color: #373535b9;
        color: #eff5f4;
        font-size: 30px;
        box-sizing: border-box;
        display: inline-block;
        border: none;
        cursor: pointer;
        outline: none;
        text-align: center;
        white-space: nowrap;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 43px;
        height: 65px;
        text-transform: capitalize;
        text-decoration: none;
        margin: 0;
        font-family: KaiTi;
    }
    button:hover{
        background-color: #373535d5;
    }
</style>