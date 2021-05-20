import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(HighchartsVue);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
