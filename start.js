import { startViteServer } from './vite.server.js';
import { initializeApp, AppEmitter } from './electron.app.js';

const appEmitter = new AppEmitter();
let serverReference;
let success = false;

let resultPromise = new Promise(resolve => {
  startViteServer().then(({ ref, success: serverSuccess }) => {
    success = serverSuccess;
    serverReference = ref;
    resolve({ ref, success });
  });
});

appEmitter.on('electron-closed', () => {
  console.log('Server closed');
  if (success && serverReference) {
    serverReference.close();
  }
});

console.log('AppEmitter created:', appEmitter);

initializeApp(resultPromise, appEmitter);