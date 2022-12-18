import {computed, onMounted, ref, watchEffect} from 'vue'
import {constantRouterMap} from '@/render/router'
import {router} from "@/render/router"
import {useAppStore} from "@/render/store/modules/app";

export const wacthRouter=(location:String)=>{
    let currenPath=ref('/')
    let menuList = ref<any>([])
    const appStore = useAppStore()

    onMounted(()=>{
        menuList.value=constantRouterMap.filter((item=>{
            return !(item as any).hidden
        }))
        if(appStore.breadCrumbList.length===0){
            const data={
                title:router?.currentRoute?.value?.meta?.title as any,
                path:router?.currentRoute?.value?.path,
                showClose:false,
                type:'route'
            }
            appStore.setBreadCrumbList(data,'route')
        }
    })
    watchEffect(()=>{
        // const index=menuList.value[0]?.children?.findIndex((item:any)=>{
        //     return item.path===router?.currentRoute.value.path
        // })
        // if(index!==undefined){
        //     currenPath.value=index
        // }
        if(location==='menu'){
            if(router?.currentRoute.value.path && router?.currentRoute.value.path!=='/news'){
                currenPath.value=router?.currentRoute.value.path
            }
        }else{
            if(router?.currentRoute.value.path){
                currenPath.value=router?.currentRoute.value.path
            }
        }

    })
    return {
        currenPath,
        menuList
    }
}