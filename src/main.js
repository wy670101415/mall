import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
import BScroll from '@better-scroll/core'
// import 'lib-flexible'
// 适配
// import 'amfe-flexible'
// // 引入jQuery、bootstrap
// import $ from 'jquery'
// import 'bootstrap'

// // 引入bootstrap样式
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// 全局注册 $
Vue.prototype.$ = $
Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus=new Vue();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')