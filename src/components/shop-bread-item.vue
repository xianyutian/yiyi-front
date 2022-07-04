<template>
  <div class="shop-bread-item">
    <RouterLink v-if="to" :to="to"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'ShopBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
