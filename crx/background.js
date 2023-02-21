console.log('pbledfcfnijoghpdgapfbbghlofgmfmn');

const Map = {};

const create = async (config) => new Promise(resolve => {
    const w = Math.floor(config.w || (720 / window.devicePixelRatio));
    const h = Math.floor(config.h || (1280 / window.devicePixelRatio));
    chrome.app.window.create('1.html', {
        innerBounds: {
            width: w,
            height: h 
        },
        resizable: false,
        frame: 'none'
    }, (appWindow) => {
        appWindow.innerBounds.width < w && appWindow.setBounds({
            height: Math.floor(h * (appWindow.innerBounds.width / w))
        });
        appWindow.innerBounds.height < h && appWindow.setBounds({
            width: Math.floor(w * (appWindow.innerBounds.height / h))
        });
        appWindow.contentWindow.onload = function() {
            const webview = appWindow.contentWindow.document.getElementById('webview');
            webview.addEventListener('permissionrequest', (e) => {
                if (e.permission === 'media') {
                    e.request.allow();
                }
            });
            resolve(appWindow);
        };
    });
});

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    const req = request || {};
    const fn = ({
        async create(req) {
            const id = Math.random() * 10000000 >> 0;
            const appWindow = await create(req);
            const webview = appWindow.contentWindow.document.getElementById('webview');
            webview.setZoom(1 / window.devicePixelRatio);
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
