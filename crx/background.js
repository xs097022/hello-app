console.log('pbledfcfnijoghpdgapfbbghlofgmfmn');

const Map = {};

const create = async (config) => new Promise(resolve => chrome.app.window.create('1.html', {
    innerBounds: {
        width: config.w || 500,
        height:  config.h || 500
    },
    resizable: false,
    frame: 'none'
}, (appWindow) => {
    appWindow.contentWindow.onload = function() {
        const webview = appWindow.contentWindow.document.getElementById('webview');
        webview.addEventListener('permissionrequest', (e) => {
            if (e.permission === 'media') {
                e.request.allow();
            }
        });
        resolve(appWindow);
    };
}));

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    const req = request || {};
    const fn = ({
        async create(req) {
            const id = Math.random() * 10000000 >> 0;
            const appWindow = await create(req);
            const webview = appWindow.contentWindow.document.getElementById('webview');
            webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/102.0.5005.124');
            req.url && (webview.src = req.url);
            Map[id] = appWindow;
            appWindow.onClosed.addListener(() => {
                delete(Map[id]);
            });
            return id;
        },
        close(req) {
            Map[req.id] && Map[req.id].close();
            return 'OK';
        }
    })[req.type]
    sendResponse(fn && await fn(req));
});

//103.31.115.50:15987
//root / 4Ch435@K7i
