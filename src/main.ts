// @ts-ignore
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
const ipcMain = electron.ipcMain;
// @ts-ignore
const path = require('path');

// グローバル参照を維持
let mainWindow: any = null;
let tray: any = null;

function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    transparent: true,
    hasShadow: false, // 影を無効化
    resizable: false,
    skipTaskbar: false, // タスクバーに表示する
    backgroundColor: '#00000000', // 完全に透明な背景色
    titleBarStyle: 'hidden', // タイトルバーを非表示
    titleBarOverlay: false, // タイトルバーオーバーレイを無効化
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // プリロードスクリプトを設定
      devTools: true // 開発ツールを有効化（デバッグ用）
    }
  });

  // コンテキストメニューを作成
  const contextMenu = Menu.buildFromTemplate([
    { label: '終了', click: () => app.quit() }
  ]);

  // 右クリックメニューを設定
  mainWindow.webContents.on('context-menu', (e: any) => {
    e.preventDefault();
    contextMenu.popup({ window: mainWindow });
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

// IPCイベントリスナーを設定
ipcMain.on('quit-app', () => {
  app.quit();
});

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