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
  hook_document_write: function (trace) {
    let oriDocumentWrite = Document.prototype.write;
    Document.prototype.write = function (str) {
      __hookjsLog(`document_write ${str}`);
      __hookjsTrace(trace);
      return oriDocumentWrite.apply(this, arguments);
    }
  },
  hook_document_writeln: function (trace) {
    let oriDocumentWriteln = Document.prototype.writeln;
    Document.prototype.writeln = function (str) {
      __hookjsLog(`document_writeln ${str}`);
      __hookjsTrace(trace);
      return oriDocumentWriteln.apply(this, arguments);
    }
  },
  hook_window_eval: function (trace) {
    let oriEval = window.eval;
    window.eval = function (str) {
      __hookjsLog(`Eval ${str}`);
      __hookjsTrace(trace);
      // return oriEval(str);
      return oriEval.apply(this, arguments);
    }
  },
  hook_window_Function: function (trace) {
    let oriFunction = window.Function;
    window.Function = function () {
      __hookjsLog(`new Function ,functionBody: ${arguments[arguments.length - 1]}`);
      __hookjsTrace(trace);
      return oriFunction.apply(this, arguments);
    }
  },
  hook_window_setTimeout: function (trace) {
    let oriSetTimeout = window.setTimeout;
    window.setTimeout = function () {
      __hookjsLog(`setTimeout ${arguments[0]}`);
      __hookjsTrace(trace);
      return oriSetTimeout.apply(this, arguments);
    }
  },
  hook_window_setInterval: function (trace) {
    let oriSetInterval = window.setInterval;
    window.setInterval = function () {
      __hookjsLog(`setInterval ${arguments[0]}`);
      __hookjsTrace(trace);
      return oriSetInterval.apply(this, arguments);
    }
  },

  // HTMLScriptElement src, text, innerText, insertAdjacentText, textContent, todo other ??
  hook_HTMLScriptElement_src: function (trace) {
    let oriSetter = HTMLScriptElement.prototype.__lookupSetter__('src');
    let oriGetter = HTMLScriptElement.prototype.__lookupGetter__('src');
    Object.defineProperty(HTMLScriptElement.prototype, 'src', {
      get: function (src) {
        __hookjsLog('GET HTMLScriptElement_src');
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments)
      },
      set: function (src) {
        __hookjsLog(`SET HTMLScriptElement_src ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments);
      }
    })
  },

  hook_HTMLScriptElement_text: function (trace) {
    let oriSetter = HTMLScriptElement.prototype.__lookupSetter__('text');
    let oriGetter = HTMLScriptElement.prototype.__lookupGetter__('text');
    Object.defineProperty(HTMLScriptElement.prototype, 'text', {
      get: function (text) {
        __hookjsLog('GET HTMLScriptElement_text');
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments);
      },
      set: function (text) {
        __hookjsLog(`SET HTMLScriptElement_text ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  },

  hook_HTMLScriptElement_innerText: function (trace) {
    let oriSetter = HTMLElement.prototype.__lookupSetter__('innerText');
    let oriGetter = HTMLElement.prototype.__lookupGetter__('innerText');
    // shadow HTMLElement.prototype 的 innerText
    Object.defineProperty(HTMLScriptElement.prototype, 'innerText', {
      get: function (text) {
        __hookjsLog('GET HTMLScriptElement_innerText');
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments)
      },
      set: function (text) {
        __hookjsLog(`SET HTMLScriptElement_innerText ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments);
      }
    })
  },

  // todo 其它 Element 的 insertAdjacentText 会有问题么？
  hook_HTMLScriptElement_insertAdjacentText: function (trace) {
    let oriFunc = Element.prototype.insertAdjacentText;
    Element.prototype.insertAdjacentText = function () {
      __hookjsLog(`SET HTMLScriptElement_insertAdjacentText position:${arguments[0]} text:${arguments[1]}`);
      __hookjsTrace(trace);
      return oriFunc.apply(this, arguments)
    }
  },

  hook_HTMLScriptElement_textContent: function (trace) {
    let oriSetter = Node.prototype.__lookupSetter__('textContent');
    let oriGetter = Node.prototype.__lookupGetter__('textContent');
    // shadow Node.prototype 的 textContent
    Object.defineProperty(HTMLScriptElement.prototype, 'textContent', {
      get: function (text) {
        __hookjsLog('GET HTMLScriptElement_textContent');
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments);
      },
      set: function (text) {
        __hookjsLog(`SET HTMLScriptElement_textContent ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  },

  hook_Element_innerHTML: function (trace) {
    let oriSetter = Element.prototype.__lookupSetter__('innerHTML');
    let oriGetter = Element.prototype.__lookupGetter__('innerHTML');
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get: function () {
        __hookjsLog(`GET Element_innerHTML ${oriGetter.apply(this, arguments)}`);
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments);
      },
      set: function (html) {
        __hookjsLog(`SET Element_innerHTML ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  },
  hook_Element_outerHTML: function (trace) {
    let oriSetter = Element.prototype.__lookupSetter__('outerHTML');
    let oriGetter = Element.prototype.__lookupGetter__('outerHTML');
    Object.defineProperty(Element.prototype, 'outerHTML', {
      get: function () {
        __hookjsLog(`GET Element_outerHTML ${oriGetter.apply(this, arguments)}`);
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments);
      },
      set: function (html) {
        __hookjsLog(`SET Element_outerHTML ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  },
  hook_Element_insertAdjacentHTML: function (trace) {
    let oriFunc = Element.prototype.insertAdjacentHTML;
    Element.prototype.insertAdjacentHTML = function () {
      __hookjsLog(`SET Element_insertAdjacentHTML position:${arguments[0]} text:${arguments[1]}`);
      __hookjsTrace(trace);
      return oriFunc.apply(this, arguments);
    }
  },

  // source
  hook_window_name: function (trace) {
    let oriSetter = window.__lookupSetter__('name');
    let oriGetter = window.__lookupGetter__('name');
    Object.defineProperty(window, 'name', {
      get: function () {
        __hookjsLog(`GET window_name ${oriGetter.apply(this, arguments)}`);
        __hookjsTrace(trace);
        return oriGetter.apply(this, arguments)
      },
      set: function () {
        __hookjsLog(`SET window_name ${arguments[0]}`);
        __hookjsTrace(trace);
        return oriSetter.apply(this, arguments)
      }
    })
  },
  hook_window_storage: function (trace) {
    let oriSetItem = Storage.prototype.setItem;
    let oriGetItem = Storage.prototype.getItem;
    Storage.prototype.setItem = function () {
      __hookjsLog(`${this === window.localStorage ? 'localStorage' : 'sessionStorage'} setItem key:${arguments[0]} value:${arguments[1]}`);
      console.log();
      __hookjsTrace(trace);
      return oriSetItem.apply(this, arguments)
    };
    Storage.prototype.getItem = function () {
      let value = oriGetItem.apply(this, arguments);
      __hookjsLog(`${this === window.localStorage ? 'localStorage' : 'sessionStorage'} getItem key:${arguments[0]} value:${value}`);
      __hookjsTrace(trace);
      return value;
    }
  },
  hook_document_cookie: function (trace) {
    let cookie_setter = Document.prototype.__lookupSetter__('cookie');
    let cookie_getter = Document.prototype.__lookupGetter__('cookie');
    Object.defineProperty(Document.prototype, 'cookie', {
      get: function () {
        let cookies = cookie_getter.apply(this, arguments);
        cookies = cookies.split('; ');
        __hookjsLog('GET Cookie ');
        console.log(cookies);
        __hookjsTrace(trace);
        return cookie_getter.apply(this, arguments);
      },
      set: function () {
        __hookjsLog(`SET Cookie ${arguments[0]}`);
        __hookjsTrace(trace);
        return cookie_setter.apply(this, arguments);
      }
    })
  },
  // Object.getOwnPropertyDescriptor(Document.prototype,'referrer')
  // {get: ƒ, set: undefined, enumerable: true, configurable: true}
  hook_document_referrer: function (trace) {
    let oriGetter = Document.prototype.__lookupGetter__('referrer');
    let _ref = document.referrer;
    Object.defineProperty(Document.prototype, 'referrer', {
      get: function () {
        __hookjsLog(`GET document_referrer ${_ref}`);
        __hookjsTrace(trace);
        return _ref;
      },
      set: function () { // todo referrer spoofing
        __hookjsLog(`SET document_referrer ${arguments[0]}`);
        _ref = arguments[0];
        return _ref;
      }
    })
  },
  hook_window_postMessage: function (trace) {
    let oriPostMessage = window.postMessage;
    window.postMessage = function () {
      __hookjsLog(`window_postMessage msg:${arguments[0]} target origin:${arguments[1]} `);
      __hookjsTrace(trace);
      return oriPostMessage.apply(this, arguments)
    }
  },
  hook_window_onMessage: function (trace) {
    let oriFunc = window.addEventListener;
    window.addEventListener = function () {
      if (arguments[0] === 'message') {
        __hookjsLog('window listening message, listener as follow');
        console.log(arguments[1]);
        __hookjsTrace(trace);
      }
      return oriFunc.apply(this, arguments)
    }
  }
};