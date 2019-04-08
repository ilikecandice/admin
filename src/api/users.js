import request from '@/util/request';
const BASE_URL = process.env.BASE_URL;
export default {
    getUsers: (current, size, query) => {
        const data = { current, size, query }
        return request({
            url: BASE_URL + '/user',
            method: 'get',
            params: data
        });
    },
    saveOrUpdateUser: (data, method) => {
        return request({
            url: BASE_URL + '/user',
            method: method,
            data
        });
    }

}