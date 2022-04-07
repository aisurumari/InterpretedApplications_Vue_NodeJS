import Vue from 'vue'
import App from './App.vue'
//import underscore from 'vue-underscore';

Vue.config.productionTip = false
//Vue.use(underscore);

new Vue({
  render: h => h(App),
}).$mount('#app')
