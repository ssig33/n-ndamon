// @ts-ignore
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// @ts-ignore
const path = require('path');

// グローバル参照を維持
let mainWindow = null;

function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    transparent: true,
    hasShadow: false, // 影を無効化
    resizable: false,
    skipTaskbar: true,
    backgroundColor: '#00000000', // 完全に透明な背景色
    titleBarStyle: 'hidden', // タイトルバーを非表示
    titleBarOverlay: false, // タイトルバーオーバーレイを無効化
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true // 開発ツールを有効化（デバッグ用）
    }
  });

  // 開発ツールを開く（デバッグ用）
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  // HTMLファイルを読み込む
  mainWindow.loadFile('src/index.html');

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electronの初期化が完了したら
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // @ts-ignore
  if (process.platform !== 'darwin') {
    app.quit();
  }
});