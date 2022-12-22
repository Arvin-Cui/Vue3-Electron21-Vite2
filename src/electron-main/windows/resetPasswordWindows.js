// @ts-ignore
const { LOAD_URL }=require('./config.js');
const path = require('path')
const isDev = require('electron-is-dev')
// //客户端尺寸位置记忆插件
// const windowStateKeeper = require('electron-window-state');
const resetPasswordWinURL =
    isDev? `http://localhost:4000/#/resetPassword`
        : `${LOAD_URL}#resetPassword`;

const createResetPasswordWindow=(BrowserWindow)=>{

    // // 默认窗口尺寸
    // let mainWindowState = windowStateKeeper({
    //     defaultWidth: 826,
    //     defaultHeight: 528
    // });
    const win = new BrowserWindow({
        // 'x': mainWindowState.x,
        // 'y': mainWindowState.y,
        'width': 490,
        'height': 492,
        transparent: true,
        backgroundColor: '#00000000',
        focusable:true,
        show:false,
        frame:false,
        resizable:false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
            // 渲染器进程到主进程通信 定义预加载的界面ts
            preload: path.resolve(__dirname, '../modules/preload/resetPassword.js')
        }
    })
    // 加载页面地址 线上内网可切换地址
    win.loadURL(resetPasswordWinURL)
    // // 管理客户端尺寸位置记忆插件
    // mainWindowState.manage(win);
    // //开发者工具
    // win.webContents.openDevTools()
    // 优雅打开界面
    win.on('ready-to-show',()=>{
        win.show()
    })

}

module.exports={
    createResetPasswordWindow
}
