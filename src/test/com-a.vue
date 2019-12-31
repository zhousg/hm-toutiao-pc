<template>
  <div class='container'>A组件 {{msg}}</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style scoped lang='less'></style>
