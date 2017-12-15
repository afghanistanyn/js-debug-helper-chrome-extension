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
    Object.defineProperty(Document.prototype, 'domain', {
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
  },
  hook_window_eval: function (trace) {
    let oriEval = window.eval;
    window.eval = function (str) {
      __hookjsLog(`Eval ${str}`);
      __hookjsTrace(trace);
      // return oriEval(str);
      return oriEval.apply(this, arguments);
    }
  }
};