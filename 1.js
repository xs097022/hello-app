const pluginId = 'pbledfcfnijoghpdgapfbbghlofgmfmn';

const windows = [];

const open = (url) => {
    chrome.runtime.sendMessage(pluginId, {
        type: 'create',
        url,
        h: 1280 / window.devicePixelRatio,
        w:  720 / window.devicePixelRatio
    }, msg => {
        msg && windows.push(msg);
    });
};

const close = () => {
    chrome.runtime.sendMessage(pluginId, {
        type: 'close',
        id: windows.shift()
    }, msg => {
        console.log(msg);
    });
};

const openE = document.getElementById('open');
const closeE = document.getElementById('close');

openE.addEventListener('click', _ => open(document.querySelector('input[type=text]').value));
closeE.addEventListener('click', close);

