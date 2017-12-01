import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import url from 'url';

declare const DEV_SERVER: boolean;

const indexUrl = url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true,
});

let win;

function createWindow() {
	win = new BrowserWindow({ width: 800, height: 600 });
	win.loadURL(indexUrl);

	if (DEV_SERVER) {
		win.webContents.openDevTools();
	}

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

ipcMain.on('show-dialog', (event, arg) => {
	dialog.showMessageBox(win, {
		type: 'info',
		buttons: ['OK'],
		title: 'Native Dialog',
		message: 'I\'m a native dialog!',
		detail: 'It\'s my pleasure to make your life better.',
	});
});
