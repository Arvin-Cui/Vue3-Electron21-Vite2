// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron')
// @ts-ignore
const setLogin=async (content)=>{
    let result= await ipcRenderer.invoke('on-setlogin-event', content)
}
const openRegister=async (content)=>{
    let result= await ipcRenderer.invoke('on-openRegister-event', content)
}
const openRestPassword=async (content)=>{
    let result= await ipcRenderer.invoke('on-openRestPassword-event', content)
}
contextBridge.exposeInMainWorld('electronAPI', {
    openRestPassword,
    openRegister,
    setLogin,
    ipcRenderer,
})
