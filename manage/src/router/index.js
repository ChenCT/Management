import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Instruments from '@/views/Instruments'
import Refractories from '@/views/Refractories'
import Chemical from '@/views/Chemical'
import Overview from '@/views/Overview'
import Location from '@/views/Location'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        { path: '/overview', component: Overview, name: '主页'}
      ]
    },
    {
      path: '/',
      name: '物资信息',
      component: Home,
      children: [
        { path: '/instrument', component: Instruments, name: '仪器'},
        { path: '/refractories', component: Refractories, name: '耐火材料'},
        { path: '/chemical', component: Chemical, name: '药品'}
      ]
    },
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        { path: '/location', component: Location, name: '位置信息'}
      ]
    }

  ]
})
