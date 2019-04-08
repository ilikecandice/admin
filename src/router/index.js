import Vue from 'vue';
import Router from 'vue-router';

/**
 * route
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
Vue.use(Router);


export const constRoutes = [{
    path: '/',
    redirect: '/dashboard'
}, {
    path: '/',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: {},
    children: [{
        path: '/dashboard',
        component: resolve => require(['../pages/Dashboard.vue'], resolve),
        meta: {}
    },
    {
        path: '/users',
        component: resolve => require(['../pages/users/UsersList.vue'], resolve),
        meta: {}
    },
    {
        path: '/applications',
        component: resolve => require(['../pages/applications/ApplicationList.vue'], resolve),
        meta: {}
    },

    {
        path: '/403',
        component: resolve => require(['../pages/403.vue'], resolve),
        meta: {
            title: '403'
        }
    }
    ]
}, {
    path: '/login',
    component: resolve => require(['../pages/login/Login.vue'], resolve)
},
{
    path: '/404',
    component: resolve => require(['../pages/404.vue'], resolve)
},
{
    path: '/405',
    component: resolve => require(['../pages/405.vue'], resolve)
}, {
    path: '*',
    redirect: '/404'
}]
export const asyncRoutes = [{

}]
export default new Router({
    mode: "history",
    routes: constRoutes
});