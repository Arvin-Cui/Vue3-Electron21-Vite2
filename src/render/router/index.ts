import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory} from 'vue-router'
import type { App } from 'vue'
type RouterCustorm={
    hidden?:boolean
}
const LayOut=()=> import('@/render/layout/index.vue')
export const constantRouterMap: (RouteRecordRaw | RouterCustorm)[] = [
    {
        path: '/load',
        name: 'Load',
        hidden: true,
        component: () => import('@/render/views/load/index.vue'),
    },
    {
        path: '/',
        name: 'Index',
        component: LayOut,
        children:[
            {
                path: '/',
                name: 'Welcome',
                meta: { title: '首页' },
                component: () => import('@/render/views/home/index.vue'),
            },
            {
                path: '/news',
                name: 'News',
                meta: { title: '新闻' },
                component: () => import('@/render/views/news/index.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('@/render/views/login/index.vue'),
    }
]
const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}
