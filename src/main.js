import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1.1 router文件夹 默认会加载文件夹下的index.js文件
// 1.2 index 含义 索引文件（默认会访问的文件）
// 1.3 index.js index.vue index.json 支持三种格式，优先级和我书写的顺序一致
// 2.1 vue-cli提供的一个绝对路径别名  src绝对路径
import router from '@/router'
// 简单使用axios
import axios from '@/api'

// 使用自己的插件
import plugin from '@/plugin'
Vue.use(plugin)

Vue.prototype.$http = axios
Vue.use(ElementUI)
// 日志的详细与否，生产环境  开发环境
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js 入口文件
// 职责：做全局范围内的依赖和配置
// 职责：创建一个根VUE实例
