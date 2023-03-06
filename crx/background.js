console.log('pbledfcfnijoghpdgapfbbghlofgmfmn');

const Map = {};

const create = async (config) => new Promise(resolve => {
    const w = Math.floor(config.w || (720 / window.devicePixelRatio));
    const h = Math.floor(config.h || (1280 / window.devicePixelRatio)) + 32;
    chrome.app.window.create('1.html', {
        innerBounds: {
            width: w,
            height: h,
            minWidth: w,
            minHeight: h,
            maxWidth: w,
            maxHeight: h
        },
        frame: 'none',
        resizable: false
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
//119.252.73.161:15987
//root / 4Ch435@K7i
//
//1677148005 Yu Ting, Kao / Ming Yao, Chen 高郁婷 / 陳酩堯
//1676539991 Chen yuan lun, Lin his hsien 林錫賢、陳苑倫.doc
//
// <Resource driverClassName="com.mysql.jdbc.Driver" maxActive="800" maxIdle="0" minIdle="100" maxWait="-1" name="jdbc/timewalking" password="A5YjkC4H7bK" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/aeasyn?useUnicode=true&amp;characterEncoding=utf-8&amp;autoReconnect=true" username="root"/>
// mysql -h127.0.0.1 -uroot -PA5YjkC4H7bK
//1665204184    1665204206
//1665204184   1665204206
// file:/home/webapp/fileupload/icon/1677226901.png
