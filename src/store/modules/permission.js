import { hasPermission, filterAsyncRouter } from '@/util/auth';
import { constRoutes, asyncRoutes } from '@/router';
const permission = {
    state: {
        routers: constRoutes,
        addRouters: []
    },
    mutations: {
        SET_ROUTES: (state, routers) => {
            state.addRouters = routers
            state.routers = constRoutes.concat(routers)
        }
    },
    action: {
        GenerateRoutes({ commit }, data) {//只能传两个参数
            return new Promise(resolve => {
                const roles = data
                let accessedRouters
                if (roles.include('admin')) {//管理员有所有路由权限
                    accessedRouters = asyncRoutes
                } else {//非管理员需要根据路由权限过滤路由
                    accessedRouters = filterAsyncRouter(asyncRoutes, roles);
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })

        }
    }
}
export default permission;