const b=new Date('2026-07-06');
const d=Math.floor((Date.now()-b)/(1000*60*60*24));
document.getElementById('age').textContent=d+' Days Old';
document.getElementById('love').onclick=()=>alert('❤️ Papa loves Aurora & Azzalea ❤️');
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
