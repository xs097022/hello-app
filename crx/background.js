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
            req.url && (appWindow.contentWindow.document.getElementById('webview').src = req.url);
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
