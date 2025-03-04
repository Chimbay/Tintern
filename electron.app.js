import electron from 'electron';
import { EventEmitter } from 'events';

const { app, BrowserWindow } = electron;

// Define the AppEmitter class
export class AppEmitter extends EventEmitter {}

let mainWindow;

// Function to create the window
function createWindow() {
  const windowWidth = 600;
  const windowHeight = 800;

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
}

export function initializeApp(resultPromise, appEmitter) {
  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  resultPromise.then(({ _, success }) => {
    if (success) {
      mainWindow.loadURL("http://localhost:5173");
      console.log("it works!");
    } else {
      console.log("Breh the fuck!");
    }
  });

  app.on("window-all-closed", () => {
    console.log('Window close detected!');  // Debugging line
    if (process.platform !== "darwin") {
      console.log('In here!');  // Debugging line
      app.quit();
      appEmitter.emit('electron-closed');
    } 
  });
}