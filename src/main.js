
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLogger from 'vuejs-logger'
import Vuetify from 'vuetify'
import Header from './components/Header'
import Navigation from './components/Navigation'
import 'vuetify/dist/vuetify.min.css'

String.prototype.padBack = function (max) {
  // this=this.toString()
  return this.length < max ? ((this+"0").padBack( max) ): this
}
String.prototype.padFront = function (max) {
  // this=this.toString()
  return this.length < max ? (("0"+this).padFront( max) ): this
}
Vue.use(Vuetify,{})
const isProduction = process.env.NODE_ENV === 'production'

Vue.config.productionTip = false
const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
}
Vue.component(Header.name, Header)
Vue.component(Navigation.name, Navigation)
Vue.use(VueLogger, options)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
