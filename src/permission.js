import router from './router';
import NProgress from 'NProgress';
import { getToken, hasPermission } from '@/util/auth';
import store from './store/index';
import { Message } from 'element-ui';

const whiteList = ['/login', '/405'];
//钩子函数对路由进行权限跳转
/**
 * 此处对权限进行判断 NProgress.start() 
 * 
 *  */

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === 'login') {
            next({ path: '/' })
            NProgress.done();
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => {
                    const roles = res.data.roles
                    console.log(store);
                    next({
                        ...to, replace: true
                    })
                    // store.dispatch('GenerateRoutes', {
                    //     roles
                    // }).then(() => {
                    //     router.addRoutes(store.getters.addRouters)
                    //     next({
                    //         ...to, replace: true
                    //     })
                    // }).catch((err) => {
                    //     store.dispatch('FedLogOut').then(() => {
                    //         Message.error(err);
                    //         next({ path: '/' })
                    //     });
                    // });
                })
            } else {
                if (hasPermission(store.getters.roles, to)) {
                    next();
                } else {
                    next({
                        path: '/403',
                        replace: true,
                        query: {
                            noGoBack: true
                        }
                    })
                }

            }
        }
    } else {

        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            if (to.path.includes('405')) {
                next();
            } else {
                var authPath = "http://localhost:8080/authorize?client_id=5516d3ea77f069029efb24cf050e806a&redirect_uri=http://localhost:8083/405/&response_type=code&state=123456";
                //next(`/login?redirect=${to.path}`);
                //next(authPath);
                window.location.href = authPath;
            }

            NProgress.done();
        }
    }
    // next();
});

router.afterEach(() => {
    NProgress.done();
});
