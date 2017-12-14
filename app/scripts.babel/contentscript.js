'use strict';

console.log('js debug helper running');

function injectScript(scriptString) {
  let actualCode = '(function(){' + scriptString + '})();';
  let script = document.createElement('script');
  script.textContent = actualCode;
  (document.head || document.documentElement).appendChild(script);
  // script.parentNode.removeChild(script);
}

function getScript(path) {
  let url = chrome.runtime.getURL(path);
  fetch(url).then(res => {
    if (res.ok) {
      return res.text();
    } else {
      console.log(`fetch ${path} failed`);
    }
  }).then(scriptSource => {
    // console.log(scriptSource);
    injectScript(scriptSource);
  })
}

let helperFileList = [
  'diff_window_obj.js',
  'prototype.js'
];

helperFileList.forEach(file => {
  let path = `scripts/helpers/${file}`;
  getScript(path);
});
