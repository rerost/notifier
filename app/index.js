const electron = require('electron');
const { app, shell } = electron;
const { BrowserWindow } = electron
const express = require('express')
const server = express();


let win;

function createWindow() {
  size = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width: size.width, height: size.height});
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

server.get('/oauth/callback/github', (req, res) => {
  win.webContents.executeJavaScript(`localStorage.setItem(\'githubToken\', \'${req.query.code}\')`); //JSが実行されるので色々問題がある。このような表記はしたくない
  res.send(req.query)
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


exports.openUrl = (url) => {
  shell.openExternal(url)
}
