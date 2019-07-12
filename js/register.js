if('serviceWorker' in navigator) {
    console.log('Service Worker: Supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js');
    });
} else {
    console.error('Browser does not support service worker.');
}
/*
const s = navigator.serviceWorker.getRegistration().then(res => res).then(res => res);
console.log(s);
*/