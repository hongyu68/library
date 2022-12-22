import Vue from 'vue'
import ShopComponents from '../../packages/library/index'
import App from './App.vue'
Vue.config.productionTip = false
Vue.use(ShopComponents)
new Vue({
  render: (h) => h(App),
}).$mount('#app')
