"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const electron_1 = require("electron");
const path_1 = require("path");
function CreateInitiateWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: `file:///${path_1.join(__dirname + "assets/app.ico")}`,
        webPreferences: {
            nodeIntegration: true
        },
    });
    win.maximize();
    win.loadURL(`file:///${path_1.join(__dirname, "index.html")}`);
}
electron_1.app.on("ready", CreateInitiateWindow);
electron_1.app.on("window-all-closed", () => electron_1.app.quit());
