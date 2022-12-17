/**
 * 脱离客户端 使用浏览器打开窗口
 */

export const useOpenByBrowser=()=>{
    const openByBrowser=(url:string)=>{
        window.electronAPI.openByBrowser(url)
    }
    return {
        openByBrowser
    }

}