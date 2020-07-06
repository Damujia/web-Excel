import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/hones.vue'
// 主页
import indexvue from '@/components/index.vue'
import tablex from '@/components/tablex.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'default',
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: { name: 'index' },
    children: [
      {
        name: 'index',
        path: 'index',
        component: indexvue
      },
      {
        name: 'tablex',
        path: 'tablex',
        component: tablex
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
