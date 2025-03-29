import { startViteServer } from './vite.server.js';
import { startExpressServer } from './express.server.js';
import { initializeApp, AppEmitter } from './electron.app.js';

const appEmitter = new AppEmitter();
let serverReference;
let success = false;

// React js/Vite promise
let vitePromise = new Promise(resolve => {
  startViteServer().then(({ ref, success: viteSuccess }) => {
    success = viteSuccess;
    serverReference = ref;
    resolve({ ref, success });
  });
});

// Start express server
async function startExpress() {
  try {
    await startExpressServer();
  } catch (error) {
    console.error("Error starting Express server:", error);
    throw error;
  }
}
startExpress();

// Event listeners
appEmitter.on('electron-closed', () => {
  console.log('Server closed');
  if (success && serverReference) {
    serverReference.close();
  }
});

initializeApp(vitePromise, appEmitter);