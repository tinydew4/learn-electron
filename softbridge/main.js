const electron = require('electron');

const {app} = electron;
const {BrowserWindow} = electron;

let Main = null;

function createWindow() {
    if (Main === null) {
        Main = new BrowserWindow({
            width: 900,
            height: 660,
            show: false,
        });
        Main.setMenu(null);
        Main.loadURL('http://softbridge.co.kr/');
        Main.on('closed', () => {
            Main = null;
        });
        Main.once('ready-to-show', () => {
            Main.show();
        });
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { // OS X 의 경우 창이 닫히는 경우 app 도 종료시킨다.
		app.quit();
	}
});

app.on('activate', (event, hasVisibleWindows) => {
	if (Main === null) {
		createWindow();
	}
});
