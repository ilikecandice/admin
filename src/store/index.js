import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import createPersiste from 'vue-savedata'
Vue.use(Vuex);

/**
 * vue-savedata
 * 持久化存储，防止vuex存储数据，刷新页面丢失
 *   没有时间设置？
 *   有多个module怎么处理？
 * 原理：
 * LS即Localstorage本地存储, SS即sessionStorage本地存储, LS、SS可同时使用,也可单独使用
 * 
 *  */
//白名单
const persiste = createPersiste({
    SS: {
        module: user,
        storePath: 'user'
    }
})

const store = new Vuex.Store({
    modules: {
        user, permission
    },
    getters,
    plugins: []
});
export default store;