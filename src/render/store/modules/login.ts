// stores/app.ts
import { defineStore } from 'pinia'
import {useCache} from "@/render/hooks/useCache";

const { wsCache } = useCache()

interface LoginState {
    loginSetting:{
        autoLogin:Boolean,
        rememberPassword:false
    }
}
export const useLoginStore = defineStore('login', {
    state: ():LoginState => {
        return {
            loginSetting:{
                autoLogin:false,
                rememberPassword:false,
            }
        }
    },
    actions: {
        setLoginSetting(e:String) {
            // @ts-ignore
            const bol=this.loginSetting[e]
            // @ts-ignore
            this.loginSetting[e]=!bol
            console.log(this.loginSetting)
            //  wsCache.set('test','111')
            // const res= wsCache.get('test')
            // this.count++
        },
    },
})
