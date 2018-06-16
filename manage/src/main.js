// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		nickName:'',
		authority:'',
		laboratory:''
	},
	mutations: {
		updateUserInfo(state,info) {
			state.nickName = info.name
			state.authority = info.authority
			state.laboratory = info.laboratory
		} 
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
