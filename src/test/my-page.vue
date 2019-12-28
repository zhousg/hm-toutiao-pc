<template>
  <div>
    <div>头部</div>
    <div>
      <slot name="content" :msg="msg" age="100">内容</slot>
    </div>
    <div>
      <slot name="footer">底部</slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'my-page组件的内部数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
