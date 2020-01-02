<template>
  <div class='container'>B组件 <button @click="fn">B到A</button></div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  methods: {
    fn () {
      eventBus.$emit('b2a', 'B组件的数据')
    }
  }
}
</script>

<style scoped lang='less'></style>
