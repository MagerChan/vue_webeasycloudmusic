// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from '../static/js/diyaxios.js';
import router from './router';
import store from '../static/js/store.js';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.config.productionTip = false;

Vue.use(MuseUI);
Vue.prototype.$http = Axios;  // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
