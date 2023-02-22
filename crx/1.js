const webview = document.getElementById('webview');
webview.onloadstop = _ => {
    webview.executeScript({
        code: `document.addEventListener('keydown', e => e.key === 'F5' && location.reload());`
    });
};
