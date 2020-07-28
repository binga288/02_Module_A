import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import "./assets/css/bootstrap.min.css"
// import "./assets/js/bootstrap.min.js"


Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
  methods: {
    console: function () {
      console.log(1)
    },
  }
}).$mount('#app')
