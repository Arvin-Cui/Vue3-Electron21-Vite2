import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory} from 'vue-router'
import type { App } from 'vue'
// 引入本地图片方法
import {imgLocalUrl} from '@/render/utils/imgLocalUrl'

type RouterCustorm={
    hidden?:boolean,
}
const LayOut=()=> import('@/render/layout/index.vue')
export const constantRouterMap: (RouteRecordRaw | RouterCustorm)[] = [
    // 多层级
    // {
    //     path: '/',
    //     name: 'Index',
    //     meta: {
    //         title: '设置',
    //         icon:imgLocalUrl('@/assets/layout/avatar.png'),
    //     },
    //     component: LayOut,
    //     children:[
    //         {
    //             path: '/',
    //             name: 'Welcome',
    //             meta: {
    //                 title: '首页',
    //                 icon:imgLocalUrl('@/assets/layout/avatar.png'),
    //             },
    //             component: () => import('@/render/views/home/index.vue'),
    //         },
    //         {
    //             path: '/news',
    //             name: 'News',
    //             meta: {
    //                 title: '新闻',
    //                 icon:imgLocalUrl('@/assets/layout/avatar.png'),
    //             },
    //             component: () => import('@/render/views/home/index.vue'),
    //         }
    //     ]
    // },
    {
        path: '/load',
        name: 'Load',
        hidden: true,
        component: () => import('@/render/views/load/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('@/render/views/login/index.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        hidden: true,
        component: () => import('@/render/views/login/register/index.vue'),
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        hidden: true,
        component: () => import('@/render/views/login/resetPassword/index.vue'),
    },
    {
        path: '/',
        name: 'Review',
        component: LayOut,
        children:[
            {
                path: '/',
                name: 'ReviewIndex',
                meta: {
                    title: '审阅区',
                    icon:imgLocalUrl('@/assets/layout/review.png'),
                },
                component: () => import('@/render/views/review/index.vue'),
            },
        ]
    },
    {
        path: '/reviewHistory',
        name: 'ReviewHistory',
        component: LayOut,
        children:[
            {
                path: '/ReviewHistory',
                name: 'ReviewHistory',
                meta: {
                    title: '审阅区历史',
                    icon:imgLocalUrl('@/assets/layout/history.png'),
                },
                component: () => import('@/render/views/review-history/index.vue'),
            },
        ]
    },
    {
        path: '/notice',
        name: 'Notice',
        component: LayOut,
        children:[
            {
                path: '/notice',
                name: 'Notice',
                meta: {
                    title: '消息提醒',
                    icon:imgLocalUrl('@/assets/layout/xiaoxitixing.png'),
                },
                component: () => import('@/render/views/notice/index.vue'),
            },
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        component: LayOut,
        children:[
            {
                path: '/settings',
                name: 'Settings',
                meta: {
                    title: '配置管理',
                    icon:imgLocalUrl('@/assets/layout/settings.png'),
                },
                component: () => import('@/render/views/settings/index.vue'),
            },
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: LayOut,
        children:[
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon:imgLocalUrl('@/assets/layout/user.png'),
                },
                component: () => import('@/render/views/user/index.vue'),
            },
        ]
    },
    {
        path: '/operate',
        name: 'Operate',
        component: LayOut,
        children:[
            {
                path: '/operate',
                name: 'Operate',
                meta: {
                    title: '运营管理',
                    icon:imgLocalUrl('@/assets/layout/operate.png'),
                },
                component: () => import('@/render/views/operate/index.vue'),
            },
        ]
    },
    {
        path: '/news',
        name: 'News',
        component: LayOut as any,
        hidden: true,
        children:[
            {
                path: '/news',
                name: 'News',
                component: () => import('@/render/views/news/index.vue'),
            },
        ]
    },
]
export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}
