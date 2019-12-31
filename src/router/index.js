// 配置路由
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 发布与编辑文章
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment },
        // 个人设置
        { path: '/setting', component: Setting },
        // 个人设置
        { path: '/fans', component: Fans }
      ]
    },
    // 通配以上规则没有的地址
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // to 去哪里
  // from 来自哪里
  // next 放行|指定跳转路由
  // - 判断如果是除去登录页面外其他的路由且当前没有登录，拦截到登录。
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // - 其他情况都是放行。
  next()
})

export default router
