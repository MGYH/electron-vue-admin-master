/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devTools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */
import { BrowserWindow } from 'electron'
var path = require('path')
/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Install `vue-devTools`
require('electron').app.on('ready', () => {
  // let installExtension = require('electron-devTools-installer')
  // installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //   .then(() => {})
  //   .catch(err => {
  //     console.log('Unable to install `vue-devTools`: \n', err)
  //   })
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../devTools/vuejs-devtools'));
})

// Require `main` process to boot app
require('./index')
