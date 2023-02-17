chrome.app.window.create('1.html', {
    innerBounds: {
        width: 500,
        height:500 
    },
    resizable: false,
    frame: 'none'
}, function(appWindow) {
    window.appWindow = appWindow;
    appWindow.contentWindow.onload = function() {
    };
});

chrome.runtime.onMessage.addListener((request, b) => {
    console.log(request. b, 11);
});
