// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

let app = null;

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  
  // init app if not already created
  if(!app){
  app = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}
})
/* eslint-disable no-new */
