// stores/app.ts
import { defineStore } from 'pinia'
import {useCache} from "@/render/hooks/useCache";

const { wsCache } = useCache('localStorage')

interface AppState {
    isCollapse:Boolean,
    breadCrumbList:Array<BreadCrumbList>,
    isDark:Boolean,
}
export interface BreadCrumbList {
    title:String,
    path:String,
    showClose:Boolean,
    type:String
}
export type ActionBread ='route' | 'news'

export const useAppStore = defineStore('app', {
    state: ():AppState => {
        return {
            isCollapse: false,
            breadCrumbList:wsCache.get('breadCrumbList')?wsCache.get('breadCrumbList'):[],
            isDark:wsCache.get('isDark')?wsCache.get('isDark'):false,
        }
    },
    actions: {
        // 设置主题切换
        setDark(){
            this.isDark=!this.isDark
            wsCache.set('isDark',this.isDark)
        },
        // 设置菜单合并
        setCollapse(e:Boolean) {
            this.isCollapse=e
        },
        // 设置面包屑路由展示
        setBreadCrumbList(data:BreadCrumbList,action:ActionBread){
            if(action==="route"){
                const newData=[...this.breadCrumbList]
                const filterData=newData.map((item)=>{
                    if(item.type!=='route'){
                        return {...item}
                    }
                }).filter(item=>item!==undefined)
                this.breadCrumbList=[data,...filterData as any,]
            }else{
                this.breadCrumbList.push(data)
            }
             wsCache.set('breadCrumbList',this.breadCrumbList)
        }
    },
})
