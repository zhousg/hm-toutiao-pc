<template>
  <el-select :value="value" @change="changeChannel" clearable placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // value 只读特性
  props: ['value'],
  data () {
    return {
      // 选择后的频道ID
      // channelId: null,
      // 频道选项
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道的选项数据
    async getChannelOptions () {
      // 原始数据 res = {data: {message:'',data: {channels:[]}}}
      // 按照 结构 去解构赋值。
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 频道选择处理函数
    changeChannel (channelId) {
      // if (this.channelId === '') this.channelId = null
      if (channelId === '') channelId = null
      // 把选择的频道传递给父组件  父组件去修改数据
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
