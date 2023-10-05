// Reference app and BrowserWindow from 'electron
const { app, BrowserWindow } = require('electron');

// Create a new window
function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024
    });

    // Load the file
    win.loadFile('src/html/index.html');
}

// Check if App is ready
app.whenReady().then(createWindow);

// App listener when all the window is closed,
// clsed the app completely
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
