const { contextBridge, ipcRenderer } = require('electron')
const setTitle=async (title)=>{
   let result= await ipcRenderer.invoke('on-settitle-event', title)
}
// 浏览器打开页面
const openByBrowser=(url)=>{
    ipcRenderer.invoke('on-useOpenByBrowser-event',url)
}
// 页面全屏 缩小 关闭
const setScreen=(value)=>{
    ipcRenderer.invoke('on-setScreen-event',value)
}

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle,
    openByBrowser,
    setScreen,
    ipcRenderer: { ...ipcRenderer, on:  ipcRenderer.on.bind(ipcRenderer) }
})
