require('electron-winstaller').createWindowsInstaller({
    appDirectory: './dist/softbridge-win32-x64',
    outputDirectory: './dist/installer-win32-x64',
    exe: 'softbridge.exe',
    setupExe: 'sbinst.exe',
}).then(() => {
    console.log('��ġ���� ������ �Ϸ�Ǿ����ϴ�.');
}, (e) => {
    console.log('ERROR: ' + e.message);
});
