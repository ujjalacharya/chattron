// Main Process
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      // will sanitize JS code
      // worldSafeExecuteJavaScript: true,
      // is a feature that ensures that both, our preload scripts and Electron
      // internal logic run in sparate context
      // contextIsolation: true,
    },
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("app-quit", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
