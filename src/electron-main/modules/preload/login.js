// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron')
// @ts-ignore
const setLogin=async (content)=>{
    let result= await ipcRenderer.invoke('on-setlogin-event', content)
}
contextBridge.exposeInMainWorld('electronAPI', {
    setLogin,
    ipcRenderer,
})
