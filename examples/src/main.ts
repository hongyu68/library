import Vue from 'vue'
import App from './App.vue'
import ShopComponents from '../../packages/library/index'
Vue.config.productionTip = false
Vue.use(ShopComponents)
new Vue({
  render: h => h(App),
}).$mount('#app')
