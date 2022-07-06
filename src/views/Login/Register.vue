<template>
  <div class="login-container">
    <LoginHeader></LoginHeader>
    <RegisterMain/>
    <LoginFooter/>
  </div>
</template>

<script>
import LoginHeader from '@/views/Login/Components/LoginHeader'
import RegisterMain from '@/views/Login/Components/RegisterMain'
import LoginFooter from '@/views/Login/Components/LoginFooter'
export default {
  name: 'MyRegister',
  components: {
    LoginHeader,
    RegisterMain,
    LoginFooter
  }
}
</script>

<style lang="less" scoped>

</style>
