const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("uzz", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  appApi: {
    quitApp() {
      ipcRenderer.send("app-quit");
    },
  },
  batteryApi: {},
  fileApi: {},
});
