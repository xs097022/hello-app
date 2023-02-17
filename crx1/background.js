chrome.runtime.onMessage.addListener((request, b) => {
});

chrome.management.getAll(apps => {
    console.log(apps);
    const app = apps.filter(i => i.name === '123')[0];
});

const iframe = document.createElement('iframe');
iframe.src = '';
