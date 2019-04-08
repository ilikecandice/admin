import API from '@/api/index'
import login from '@/api/login'

import {
    setToken, getToken, removeToken
}
    from '@/util/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        roles: ['admin']
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            setToken(token);
        },
        SET_NAME: (state, name) => {
            state.name = name
        },

        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        getAccessToken({ commit }, code) {
            //异步获取token
            API.getAccessTokenAPI(code).then(res => {
                console.log(res);

                if (res && res.access_token) {
                    commit("SET_TOKEN", res.access_token);
                    window.location.href = 'http://localhost:8083/'
                }

            })

        },
        // 获取当前登录人的用户信息
        GetUserInfo({
            commit, state
        }) {
            return new Promise((resolve, reject) => {
                login.getUserInfo(state.token).then(response => {

                    if (!response) {
                        reject('Verification failed, please login again.')
                    }
                    const data = response.data

                    if (data && data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array!')
                    }

                    commit('SET_NAME', data.name)

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }

    }
}

export default user