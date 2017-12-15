window.__hookjsLog = function (msg, color = 'red') {
  console.log(`%cHookJS: ${msg}`, `color:${color}`);
};
window.__hookjsTrace = function (trace = false) {
  if (trace) {
    console.trace();
  }
};
window.__hookjs = {
  hook_document_domain: function (trace) {
    let oriSetter = document.__lookupSetter__('domain');
    let oriGetter = document.__lookupGetter__('domain');
    Object.defineProperty(document, 'domain', {
      get: function () {
        __hookjsLog('Get document.domain', '#000');
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments)
      },
      set: function () {
        __hookjsLog(`SET document.domain, before set: ${document.domain}, after set: ${arguments[0]}`); // 这里也读取了 document.domain，所以会触发一次 get hook
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  }
};