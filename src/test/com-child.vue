<template>
  <div>子组件 <button @click="fn">触发自定义事件</button></div>
</template>

<script>
export default {
  methods: {
    fn () {
      // 触发自己的自定义事件
      this.$emit('childtoparent', '子组件的数据')
    }
  }
}
</script>

<style scoped lang='less'></style>
