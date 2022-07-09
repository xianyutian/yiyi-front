<template>
  <div class="accountPage">
    <CommonShortcuts/>

    <div class="container">
        <!-- 此处放account表单 -->

    </div>
  </div>
</template>

<script>
import CommonShortcuts from '@/components/CommonShortcuts'
export default {
    name: 'MyAccount',
    components:{CommonShortcuts}
}
</script>

<style scoped lang="less">
.container{
    width: 1240px;
    margin: 0 auto;
    position: relative;
}
</style>