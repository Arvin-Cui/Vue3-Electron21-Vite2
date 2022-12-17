const { app, Menu, Tray,nativeImage } = require('electron')
const path=require('path')
let appIcon = null
const initTray=()=>{
    const iconPath = path.join(__dirname, '/icone.ico').replace('/\\/g','\\\\');
    appIcon = new Tray(nativeImage.createFromPath(iconPath))
    appIcon.setToolTip('This is my application.')
    const contextMenu = Menu.buildFromTemplate([
        { label: '退出',type: 'radio', click:()=>{
            app.quit()
            }},
        { label: 'Item2', type: 'radio' }
    ])

    // Make a change to the context menu
    contextMenu.items[1].checked = false

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)
}

module.exports={
    initTray
}
