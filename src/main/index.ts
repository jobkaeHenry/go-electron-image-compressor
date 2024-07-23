import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import winIcon from '../../resources/icon.ico?asset';
import macIcon from '../../resources/icon.icns?asset';
import linuxIcon from '../../resources/icon.png?asset';
import convertImage, {
  convertVideo,
} from '../preload/golang-binary/image-converter/runner';

function createWindow(): void {
  let iconPath: string;
  if (process.platform === 'win32') {
    iconPath = winIcon;
  } else if (process.platform === 'darwin') {
    iconPath = macIcon;
  } else {
    iconPath = linuxIcon;
  }

  const mainWindow = new BrowserWindow({
    width: 660,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    icon: iconPath,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      // FIXME
      contextIsolation: false,
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  ipcMain.handle('convert-image', async (_e, path) => {
    const result = await convertImage(path);
    return result;
  });
  ipcMain.handle('convert-video', async (_e, path) => {
    const result = await convertVideo(path);
    return result;
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
