// 基于vue扩展功能(全局组件，原型方法|属性，自定义指令，过滤器)
import MyBread from '@/components/my-bread'
export default {
  install: (Vue) => {
    // Vue 使用vue的构造函数  当main.js使用use的使用传入进来的
    Vue.component(MyBread.name, MyBread)
  }
}
