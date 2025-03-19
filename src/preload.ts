// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron');

// レンダラープロセスで使用できるAPIを公開
contextBridge.exposeInMainWorld('electronAPI', {
  // 必要に応じてここにAPIを追加
  // 例: アプリケーションを終了する関数
  quitApp: () => ipcRenderer.send('quit-app')
});