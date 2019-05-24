import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

if (navigator.vendor === 'Google Inc.') {
	Vue.config.productionTip = false
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
} else {
	document.addEventListener('deviceready', () => {
		Vue.config.productionTip = false
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}, false)
}
