// @ts-ignore
const {ipcMain,BrowserWindow,shell} =require('electron')
const  {createMainWindow} = require( '../../windows/mainWindows.js')
const {createLoginWindow} = require("../../windows/loginWindows");
const {createRegisterWindow} = require("../../windows/registerWindows");
const {createResetPasswordWindow} = require("../../windows/resetPasswordWindows");

const settitle=()=>{
    // @ts-ignore
    ipcMain.handle('on-settitle-event',(event,title)=>{
            const webContents = event.sender
            const win = BrowserWindow.fromWebContents(webContents)
            win.setTitle(title)
      return '已收到'
    })
}
// 浏览器打开页面
const openByBrowser=()=>{
    // @ts-ignore
    ipcMain.handle('on-useOpenByBrowser-event',(event,url)=>{
       shell.openExternal(url)
    })
}
// 登录 展示首页
const setlogin=()=>{
    // @ts-ignore
    ipcMain.handle('on-setlogin-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createMainWindow(BrowserWindow)
        return '已经登录'
    })
}
// 加载页判断登录或者展示首页
const isShowLogin=()=>{
    // @ts-ignore
    ipcMain.handle('on-isshowlogin-event',(event,value)=>{
        if(value){
            setTimeout(()=>{
                const webContents = event.sender
                const win = BrowserWindow.fromWebContents(webContents)
                win.close()
                createLoginWindow(BrowserWindow)
            },3000)
        }else{
            const webContents = event.sender
            const win = BrowserWindow.fromWebContents(webContents)
            win.close()
            createMainWindow(BrowserWindow)
        }

        // const webContents = event.sender
        // const win = BrowserWindow.fromWebContents(webContents)
        // win.close()
        // createMainWindow(BrowserWindow)
        return ''
    })
}
// 首页屏幕缩小 放大 关闭控制
const setScreen=()=>{
    // @ts-ignore
    ipcMain.handle('on-setScreen-event',(event,value)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if(value==='miniScreen'){
            win.minimize()
        }else if(value==='fullScreen'){
            if(win.isMaximized()){
                win.restore()
            }else{
                win.maximize()
            }
        }else if(value==='closeScreen'){

        }
        return ''
    })
}
// 打开注册页面
const openRegister=()=>{
    // @ts-ignore
    ipcMain.handle('on-openRegister-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createRegisterWindow(BrowserWindow)
        return '打开注册页面'
    })
}
// 注册成功
const setRegister=()=>{
    // @ts-ignore
    ipcMain.handle('on-register-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createLoginWindow(BrowserWindow)
        return '返回登录页面'
    })
}
// 重置密码后返回登录页面
const setBackLogin=()=>{
    // @ts-ignore
    ipcMain.handle('on-backLogin-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createLoginWindow(BrowserWindow)
        return '重置密码后返回登录页面'
    })
}
// 打开重置密码
const openRestPassword=()=>{
    // @ts-ignore
    ipcMain.handle('on-openRestPassword-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createResetPasswordWindow(BrowserWindow)
        return '重置密码后返回登录页面'
    })
}
const InitController=(app)=>{
        openRestPassword(),
        setBackLogin(),
        openRegister(),
        setRegister(),
        settitle(),
        openByBrowser(),
        setlogin(),
        isShowLogin(),
        setScreen()
}

module.exports={
    InitController,

}
