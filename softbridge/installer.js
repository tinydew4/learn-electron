require('electron-winstaller').createWindowsInstaller({
    appDirectory: './dist/softbridge-win32-x64',
    outputDirectory: './dist/installer-win32-x64',
    exe: 'softbridge.exe',
    setupExe: 'sbinst.exe',
}).then(() => {
    console.log('설치파일 생성이 완료되었습니다.');
}, (e) => {
    console.log('ERROR: ' + e.message);
});
