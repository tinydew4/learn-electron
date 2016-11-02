const electron = require('electron');

const {app} = electron; // app life 관리
const {BrowserWindow} = electron; // browser window 관리

let Main = null;

function createWindow() {
    if (Main === null) { // 중복 생성 방지
        // 새창을 생성하고 google transrate 를 연다.
        Main = new BrowserWindow({
            width: 800,
            height: 660,
            show: false,
            backgroundColor: '#FFC0CB',
        });
        Main.setMenu(null);
        Main.loadURL('http://translate.google.com/');
        Main.on('closed', () => {
            Main = null; // 창이 닫힐때 reference 제거
        });
        Main.once('ready-to-show', () => {
            Main.show();
        });
    }
}

app.on('will-finish-launching', () => {
/*
 * app 이 기본적인 초기화를 마친 후 발생
 *
 * Windows, Linux: ready 와 같다
 * OS X: NSApplication.applicationWillFinishLaunching 과 같다
 *
 * 보통 이곳에는 open-file, open-url 이벤트, crash reporter, auto updater 를 설정한다.
 * 그러나, 대부분 모든 것을 ready 에서 작성한다.
 */
});

// Electron 초기화 이후 발생. 일부 API 는 ready 이후 사용 가능하다.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
/*
 * 모든 창이 닫힌 뒤 발생
 *
 * app 이 종료되지 않는 상황에 발생한다.
 * Cmd + Q 또는 app.quit() 으로 종료되는 경우 will-quit 이 발생하고 이 이벤트는 발생하지 않는다.
 */

	if (process.platform !== 'darwin') { // OS X 의 경우 창이 닫히는 경우 app 도 종료시킨다.
		app.quit();
	}
});

app.on('before-quit', (event) => {
/*
 * event: Event
 *
 * 모든창을 닫기전에 발생.
 * event.preventDefault() 로 종료를 막을 수 있다.
 */
});

app.on('will-quit', (event) => {
/*
 * event: Event
 *
 * 모든 창을 닫고 app 을 종료하기 전 발생
 * event.preventDefault() 로 종료를 막을 수 있다.
 */
});

app.on('quit', (event, exitCode) => {
/*
 * event: Event
 * exitCode: Integer
 *
 * app 종료시 발생
 */
});

app.on('open-file', (event, path) => {
/*
 * OS X 전용
 * event: Event
 * path: String
 *
 * file 을 열때 발생
 * 주로, app 이 이미 실행되 있고 파일을 열기 위해 재사용 할 때 발생한다.
 * 실행되지 않은 상태에서 dock 에 파일을 끌어서 놓았을 경우에도 발생한다.
 * app 시작시 open-file 이벤트를 빨리 설정하여 이 경우에 대비하자. (ready 발생 전에도 발생)
 * event.preventDefault() 로 이 이벤트를 제어할 수 있다.
 * Windows 에서는 process.argv 를 파싱하여 파일 경로를 얻는다.
 */
});

app.on('open-url', (event, url) => {
/*
 * OS X 전용
 * event: Event
 * url: String
 *
 * URL 을 열 경우 발생
 * URL 스키마는 app 에서 열리도록 등록해야 합니다.
 * event.preventDefault() 로 이 이벤트를 제어할 수 있다.
 */
});

app.on('activate', (event, hasVisibleWindows) => {
/*
 * OS X 전용
 * event: Event
 * hasVisibleWindows: Boolean
 *
 * app 에 활성화 될 때 발생
 * 주로 dock 아이콘을 눌렀을 때 발생
 */

    // OSX 에서 모든 창이 닫혔을 때, dock 에서 실행을 시키면 새창을 띄워주기 위해...
	if (Main === null) {
		createWindow();
	}
});

app.on('browser-window-blur', (event, window) => {
/*
 * event: Event
 * window: BrowserWindow
 *
 * browserWindow 가 blur 됐을 때 발생
 */
});

app.on('browser-window-focus', (event, window) => {
/*
 * event: Event
 * window: BrowserWindow
 *
 * browserWindows 가 focus 됐을 때 발생
 */
});

app.on('browser-window-created', (event, window) => {
/*
 * event: Event
 * window: BrowserWindow
 *
 * browserWindow 가 생성됏을 때 발생
 */
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
/*
 * event: Event
 * webContents: WebContents
 * url: URL
 * error: String - The error code
 * certificate: Object
 *   data: Buffer - PEM encoded data
 *   issuerName: String - Issuer's Common Name
 * callback: Function
 *
 * url 에 대한 certificate 검증 실패시 발생
 * event.preventDefault() 로 기본동작을 방지하고
 * callback(true) 를 호출하여 certificate 를 신뢰 시킬 수 있다.
 *
 *   if (url == 'https://github.com') {
 *       // TODO: Verification logic.
 *       event.preventDefault();
 *       callback(true);
 *   } else {
 *       callback(false);
 *   }
 */
});

app.on('select-client-certificate', (event, webContents, url, certificateList, callback) => {
/*
 * event: Event
 * webContents: WebContents
 * url: URL
 * certificateList: [Objects]
 *   data: Buffer - PEM encoded data
 *   issuerName: String - Issuer's Common Name
 * callback: Function
 *
 * 클라이언트 인증 요청시 발생
 * The url corresponds to the navigation entry requesting the client certificate and callback needs to be
 * called with an entry filtered from the list. Using event.preventDefault() prevents the application from
 * using the first certificate from the store.
 *
 *   event.preventDefault();
 *   callback(list[0]);
 */
});

app.on('login', (event, webContents, request, authInfo, callback) => {
/*
 * event: Event
 * webContents: WebContents
 * request: Object
 *   method: String
 *   url: URL
 *   referrer: URL
 * authInfo: Object
 *   isProcy: Boolean
 *   scheme: String
 *   host: String
 *   port: Integer
 *   realm: String
 * callback: Function
 *
 * webContents 가 기본 인증을 원할 때 발생
 * 기본 동작은 모든 인증을 취소한다.
 * 이를 변경하기 위해 기본 동작을 취소하고 callback 을 호출한다.
 *
 *   event.preventDefault();
 *   callback('username', 'secret');
 */
});

app.on('gpu-process-crashed', () => {
/*
 * gpu 처리 충돌시 발생
 */
});

/*
 * 이 파일에 app 코드를 직접 작성할 수 있고,
 * 다른 파일에 작성하여 require 로 가져올 수 있다.
 */
