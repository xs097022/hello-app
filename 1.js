const pluginId = 'pbledfcfnijoghpdgapfbbghlofgmfmn';

const windows = [];

const open = (url) => {
    chrome.runtime.sendMessage(pluginId, {
        type: 'create',
        url,
        h: 1280,
        w: 720 
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

//document.querySelector('.index-trend-view').__vue__.$axios.get("/api/FeedSearchApi/getFeedIndex", {
//    params: {
//        area: 0,
//        days: 30,
//        endDate: "2023-02-19",
//        startDate: "2023-01-21",
//        word: JSON.stringify([
//            [{"name":"163","wordType":1}],
//            [{"name":"139油箱","wordType":1}]
//        ])
//    }
//}).then(res => {
//    console.log(res);
//});
//
//document.querySelector('.index-trend-view').__vue__.$axios.get("/Interface/ptbk", {
//    params: {
//        uniqid: '2c085e2ef475955fa03bf9e915bb78c1'
//    }
//}).then(res => {
//    console.log(res);
//});
//
//document.querySelector('.index-trend-view').__vue__.$axios.get("/api/WordGraph/multi", {
//    params: {
//        wordlist: ['163'],
//        datelist: []
//    }
//}).then(res => {
//    console.log(res);
//});
//
//document.querySelector('.index-trend-view').__vue__.$axios.get("/api/SearchApi/region", {
//    params: {
//        region: 0,
//        word: '163',
//        startDate: '2023-01-21',
//        endDate: '2023-01-30',
//        days: 0
//    }
//}).then(res => {
//    console.log(res);
//});
//
//const d = (msg, key) => {
//    const keyLen = key.length / 2;
//    const keyMap = new Array(keyLen).fill(0).reduce((a, _, index) => (a[key[index]] = key[index + keyLen], a), {});
//    return msg.split('').map(i => keyMap[i]).join('');
//};
