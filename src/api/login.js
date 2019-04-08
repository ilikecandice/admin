import request from '@/util/request'
console.log(process.env);
const BASE_URL = process.env.BASE_URL;
//post请求参数，定义变量data，放在data里面，get请求参数放在params里。

export default {

    login: (username, pwd) => {
        const data = {
            username,
            pwd
        }
        return request({
            url: BASE_URL + '/login/login',
            method: 'post',
            data
        })
    },
    logout: () => {
        return request({
            url: '/login/logout',
            method: 'post'
        })
    },
    getUserInfo: (token) => {
        return request({
            url: BASE_URL + '/user/info',
            method: 'get',
            params: {
                token
            }
        })
    }
}