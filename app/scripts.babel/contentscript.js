'use strict';

console.log('js debug helper running');

function injectScript(scriptString) {
  let actualCode = '(function(){' + scriptString + '})();';
  actualCode += '(function(){document.currentScript.remove()})();';// 执行完就删除自身 script
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

/**
 * 注入 Helper 文件到宿主页面
 */
function injectHelpers() {
  // 需要同步加载的 helper 文件（即：在宿主页面之前执行）
  let helperFileSync = [
    'js_hook.js'
  ];
  // 可以异步加载的 helper 文件
  let helperFileAsync = [
    'diff_window_obj.js',
    'prototype.js'
  ];

  helperFileAsync.forEach(file => {
    let path = `scripts/helpers/${file}`;
    let url = chrome.runtime.getURL(path);
    loadFile(url).then(scriptSource => {
      // console.log(scriptSource);
      injectScript(scriptSource);
    })
  });

  helperFileSync.forEach(file => {
    let path = `scripts/helpers/${file}`;
    let url = chrome.runtime.getURL(path);
    let scriptSource = loadFileSync(url);
    injectScript(scriptSource);
  });
}

/**
 * 注入 JSHook 的调用到宿主页面
 * conf/js_hook_conf.json 用于动态配置 hook 哪些函数、属性以及是否 trace
 */
function injectJSHookCall() {
  // 原计划通过 options 页面，对 JSHook 进行设置，并保存到 chrome.storage.local。但是内容脚本只能异步读取 chrome.storage.local，
  // 导致无法在宿主页面之前完成 hook，所以改为下面方案
  // 同步加载 js_hook_conf.json 读取配置
  let jsHookConf = JSON.parse(loadFileSync(chrome.runtime.getURL('conf/js_hook_conf.json')));
  // console.log(jsHookConf);

  let script = '';
  Object.keys(jsHookConf).forEach(key => {
    if (jsHookConf[key].hook) {
      script += `window.__hookjs['hook_${key}'](${jsHookConf[key].trace});`;
    }
  });
  injectScript(script);
}
// 入口
(function main() {
  injectHelpers();
  injectJSHookCall();
})();
