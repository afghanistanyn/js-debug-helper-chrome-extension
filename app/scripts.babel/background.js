'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

/**
 * 监测 storage 变化
 */
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
      'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue);
  }
});

/**
 * 显示所有 chrome.storage 内容
 */
function displayAllChromeStorage() {
  chrome.storage.local.get(null, function (items) {
    console.log('chrome.storage.local:');
    console.log(items);
  });
  chrome.storage.sync.get(null, function (items) {
    console.log('chrome.storage.sync:');
    console.log(items);
  })
}

/**
 * 清空 chrome.storage.local
 */
function clearChromeLocalStorage() {
  chrome.storage.local.clear(function () {
    console.log('chrome.storage.local cleared');
  })
}

/**
 * 清空 chrome.storage.sync
 */
function clearChromeSyncStorage() {
  chrome.storage.sync.clear(function () {
    console.log('chrome.storage.sync cleared');
  })
}