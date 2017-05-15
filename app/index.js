const electron = require('electron');
const { app, shell } = electron;
const { BrowserWindow } = electron
const express = require('express')
const server = express();
const fetch = require('node-fetch')
require('dotenv').config({ path: __dirname + '/.env' })

const { GithubOauth, parseParam } = require('./lib/oauth.js')


let win;

function createWindow() {
  size = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width: size.width, height: size.height});
  win.loadURL(`file://${__dirname}/index.html`);

  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  })

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
  GithubOauth.requestAccessToken(req.query.code)
  .then((response) => response.text())
  .then((text) => win.webContents.executeJavaScript(`localStorage.setItem(\'githubToken\', \'${parseParam(text).access_token}\')`)) //JSが実行されるので色々問題がある。このような表記はしたくない
  res.send("authorized!!")
});

server.listen(30000, function () {
  console.log('Example app listening on port 30000!');
});
