// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron')
// @ts-ignore
const setRegister=async (content)=>{
    let result= await ipcRenderer.invoke('on-register-event', content)
}
contextBridge.exposeInMainWorld('electronAPI', {
    setRegister,
    ipcRenderer,
})
