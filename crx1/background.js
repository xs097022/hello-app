chrome.runtime.onMessage.addListener((request, b) => {
});

chrome.management.getAll(apps => {
    const app = apps.filter(i => i.name === '123')[0];
});

const iframe = document.createElement('iframe');
iframe.src = 'https://xs097022.github.io/hello-app/1.html';
document.body.appendChild(iframe);
window.onmessage = e => {
    console.log(e, 99);
};
