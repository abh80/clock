//@ts-ignore
import { app, BrowserWindow } from "electron";
import { join } from "path";
function CreateInitiateWindow() {
  const win: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `file:///${join(__dirname + "assets/app.ico")}`,
  });
  win.maximize()
  win.loadURL(`file:///${join(__dirname, "index.html")}`);
}
app.on("ready", CreateInitiateWindow);
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

