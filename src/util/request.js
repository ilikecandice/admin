import axios from "axios";
import { getToken } from '@/util/auth';
import ElementUI, { Loading, Message } from 'element-ui';
import { error } from "util";
let loadingInstance = null;
let cancel, promiseArr = {};
const service = axios.create({
    baseURL: process.env.BASEAPI,
    timeout: 5000
});
service.defaults.headers.head['Content-Type'] = 'application/json';
service.defaults.headers.post['Content-Type'] = 'application/json';
//request interceptor
service.interceptors.request.use(
    config => {
        if (promiseArr[config.url]) {
            promiseArr[config.url]("操作取消")
            promiseArr[config.url] = cancel
        } else {
            promiseArr[config.url] = cancel
        }
        loadingInstance = Loading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255,.5)'
        });
        //请求拦截
        if (getToken()) {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            config.headers['Authorization'] = 'Bearer ' + getToken()
        } else {

        }
        console.log(config);


        // Do something before request is sent
        // if (store.getters.token) {
        //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = getToken()
        // }
        return config;
    }, error => {
        console.log(error);
        Promise.reject(error);

    }
);
// response interceptor
service.interceptors.response.use(
    response => {
        loadingInstance && loadingInstance.close();
        const res = response.data;
        console.log(res);
        if (res.code == 401) {
            //token失效
            var authPath = "http://localhost:8080/authorize?client_id=5516d3ea77f069029efb24cf050e806a&redirect_uri=http://localhost:8083/405/&response_type=code&state=123456";
            //next(`/login?redirect=${to.path}`);
            //next(authPath);
            window.location.href = authPath;


        }
        //do sth form res.code 
        //约定token失效的code
        // if (res.code = '100001') {
        //     //token失效，需重新登录


        // }

        return res;
    },
    error => {
        //loadingInstance1 && loadingInstance1.close();
        console.log('err' + error) // for debug
        if (error && error.response) {
            console.log(error.response.status);
            let state = error.response.status;
            switch (state) {
                case 400:
                    error.message = '请求错误'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误，未找到改资源'
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 500:
                    error.message = '服务端出错'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                default:
                    error.message = `连接错误${state}`
            }
        } else {
            error.message = '网络出现错误，请稍后再试'
        }

        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);

export default service;