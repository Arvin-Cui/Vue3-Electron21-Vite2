// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron')
// @ts-ignore
const setBackLogin=async (content)=>{
    let result= await ipcRenderer.invoke('on-backLogin-event', content)
}
contextBridge.exposeInMainWorld('electronAPI', {
    setBackLogin,
    ipcRenderer,
})
