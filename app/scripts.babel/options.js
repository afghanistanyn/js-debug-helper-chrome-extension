let currentStorage = chrome.storage.local;

let defaultJSHookConfig = {
  'document_domain': {hook: true, trace: true}
};

/**
 * 更新 JSHook 配置
 * @param target: 字符串，hook 目标，例如：document_domain
 * @param conf: 对象，可能是 {hook/trace: true/false}
 */
function updateJSHookConfig(target, conf) {
  currentStorage.get('jsHookConfig', result => {
    let currentConfig = result.jsHookConfig;
    let key = Object.keys(conf)[0];
    currentConfig[target][key] = conf[key];
    console.log(`修改 jsHook 配置：${target} ${key}:${conf[key]}`);
    currentStorage.set({'jsHookConfig': currentConfig}, err => {
      if (err) {
        alert('updateJSHookConfig err')
      }
    })
  })
}

/**
 * 按照配置渲染 JSHook 表格
 * @param config
 */
function renderJSConfigTable(config) {
  let html = '';
  Object.keys(config).forEach(key => {
    html += `<tr> 
                <td>${key}</td> 
                <td><input type="checkbox" ${config[key].hook ? 'checked' : ''} target="${key}" action="hook"></td> 
                <td><input type="checkbox" ${config[key].trace ? 'checked' : ''} target="${key}" action="trace"></td> 
             </tr>`
  });
  document.getElementById('js-hook-set-table-body').innerHTML = html;
}

/**
 * 读取配置并初始化
 */
function init() {
  currentStorage.get('jsHookConfig', result => {
    if ('jsHookConfig' in result) {
      let config = result.jsHookConfig;
      console.log('当前 jsHookConfig 配置如下：');
      console.log(config);
      renderJSConfigTable(config);
    } else {
      console.log('jsHookConfig 目前不存在。初始化开始....');
      currentStorage.set({'jsHookConfig': defaultJSHookConfig}, err => {
        if (err) {
          alert('jsHookConfig 初始化出错')
        } else {
          console.log('jsHookConfig 初始化完成');
          renderJSConfigTable(defaultJSHookConfig);
        }
      })
    }
  });
}


// 入口
(function main() {
  document.addEventListener('DOMContentLoaded', init);

  // 点击 checkbox 修改配置
  document.getElementById('js-hook-set-table').addEventListener('click', function (e) {
    let element = e.target;
    if (element.tagName && element.tagName === 'INPUT' && element.type === 'checkbox') {
      let value = element.checked;
      let conf = element.getAttribute('action') === 'hook' ? {hook: value} : {trace: value};
      updateJSHookConfig(element.getAttribute('target'), conf)
    }
  });
})();