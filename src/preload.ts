// @ts-ignore
const { contextBridge, ipcRenderer } = require('electron');

// レンダラープロセスで使用できるAPIを公開
contextBridge.exposeInMainWorld('electronAPI', {
  // 必要に応じてここにAPIを追加
  // アプリケーションを終了する関数
  quitApp: () => ipcRenderer.send('quit-app'),
  // ウィンドウを移動する関数
  moveWindow: (x: number, y: number) => ipcRenderer.send('move-window', { x, y }),
  // ウィンドウのドラッグ開始を通知する関数
  startDrag: () => ipcRenderer.send('start-drag')
});