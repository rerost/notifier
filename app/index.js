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

function createOauthWindow(oauthKey) {
  let oauthWin = new BrowserWindow({width: 400, height: 400});
  oauthWin.loadURL(`file://${__dirname}/oauth.html?host=github&access_token=${oauthKey}`);

  oauthWin.on('closed', () => {
    oauthWin = null;
  });

  return oauthWin
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
  .then((text) => createOauthWindow(parseParam(text).access_token).access_token)
  res.send("authorized!!")
});

server.listen(30000, function () {
  console.log('Example app listening on port 30000!');
});
