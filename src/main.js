import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(vueLazyLoad, {
  loading: require('common/images/default.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
