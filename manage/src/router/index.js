import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Instruments from '@/views/Instruments'
import Equipment from '@/views/Equipment'
import Chemical from '@/views/Chemical'
import Tools from '@/views/Tools'
import Overview from '@/views/Overview'
import Location from '@/views/Location'
import Application from '@/views/Application'
import Approval from '@/views/Approval'
import Staff from '@/views/Staff'
import History from '@/views/History'
import Record from '@/views/Record'

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
        { path: '/chemical', component: Chemical, name: '药品 试剂 原料'},
        { path: '/instrument', component: Instruments, name: '玻璃塑料塑料仪器'},
        { path: '/equipment', component: Equipment, name: '设备仪器'}, 
        { path: '/tools', component: Tools, name: '小工具'}     
      ]
    },
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        { path: '/location', component: Location, name: '位置信息'}
      ]
    },
    {
      path: '/',
      name: '申请审批',
      component: Home,
      children: [
        { path: '/application', component: Application, name: '我的申请'},
        { path: '/approval', component: Approval, name: '我的审批'}
      ]
    },
    {
      path: '/',
      name: '权限管理',
      component: Home,
      children: [
        { path: '/viewp', component: Staff, name: '实验室人员'},
        { path: '/viewr', component: Record, name: '借用记录'}
      ]
    },
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        { path: '/history', component: History, name: '历史物资'}
      ]
    }

  ]
})
