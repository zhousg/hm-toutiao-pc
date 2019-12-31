<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <!-- item.id.toString() 因为使用json-bigint后id变成了对象 -->
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <!-- 头像 -->
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <!-- 用户名 -->
              <p>{{item.name}}</p>
              <!-- 关注按钮 -->
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <el-pagination
            style="margin-top:20px"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="picture">
          <div ref="dom" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // 粉丝列表
      fansList: [],
      // 请求参数
      reqParams: {
        page: 1,
        per_page: 21
      },
      // 总条数
      total: 0,
      // 当前激活选择卡名称
      activeName: 'picture'
    }
  },
  mounted () {
    // 初始化echarts  因为需要操作dom
    const myChart = echarts.init(this.$refs.dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  },
  created () {
    this.getFansList()
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding: 10px 0;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 15px;
  p {
    font-size: 12px;
    padding: 5px 0;
  }
}
</style>
