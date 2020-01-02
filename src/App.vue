<template>
  <div id="app">
    <!-- 测试 -->
    <com-a></com-a>
    <div>
      <com-b></com-b>
    </div>
    <!-- 一级路由组件显示位置 -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import ComA from '@/test/com-a'
import ComB from '@/test/com-b'
export default {
  components: { ComA, ComB }
}
</script>

<style lang="less"></style>
