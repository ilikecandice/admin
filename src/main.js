import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'//引入store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import "babel-polyfill";
import './permission';
import * as filter from './filter' // global filters

Vue.use(ElementUI, {
    size: 'small'
})
// register global utility filters.
Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
