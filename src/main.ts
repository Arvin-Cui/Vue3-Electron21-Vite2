import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/render/styles/index.scss'
// 引入状态管理
import { setupStore } from '@/render/store'
// 引入路由
import {setupRouter} from "@/render/router";


// 创建实例
const setupAll = async () => {
    const app = createApp(App)
    setupStore(app)
    setupRouter(app)
    app.mount('#app')
}

setupAll()
