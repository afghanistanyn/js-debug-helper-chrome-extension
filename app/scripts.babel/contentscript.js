'use strict';

console.log('js debug helper running');

function injectScript(scriptString) {
  let actualCode = '(function(){' + scriptString + '})();';
  let script = document.createElement('script');
  script.textContent = actualCode;
  (document.head || document.documentElement).appendChild(script);
  // script.parentNode.removeChild(script);
}

/**
 * 异步加载文件
 * @param url
 * @return {*|Promise.<TResult>}
 */
function loadFile(url) {
  return fetch(url).then(res => {
    if (res.ok) {
      return res.text();
    } else {
      alert(`fetch ${path} failed`);
    }
  })
}
//
/**
 * 同步加载文件
 * @param url
 * @return {string} 文件内容
 */
function loadFileSync(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    // console.log(request.responseText);
    return request.responseText;
  } else {
    alert(`loadFileSync ${url} failed`);
  }
}


let helperFileList = [
  'diff_window_obj.js',
  'prototype.js'
];

helperFileList.forEach(file => {
  let path = `scripts/helpers/${file}`;
  let url = chrome.runtime.getURL(path);
  loadFile(url).then(scriptSource => {
    // console.log(scriptSource);
    injectScript(scriptSource);
  })
});
