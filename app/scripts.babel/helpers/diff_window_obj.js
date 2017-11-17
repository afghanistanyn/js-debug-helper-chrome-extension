// window 对象上新增了哪些属性
window.__diffWindowObj = function () {
  let result = {};
  // todo 能不能不写死
  let _propInOriWindow = 'stop,open,alert,confirm,prompt,print,requestAnimationFrame,cancelAnimationFrame,requestIdleCallback,cancelIdleCallback,captureEvents,releaseEvents,getComputedStyle,matchMedia,moveTo,moveBy,resizeTo,resizeBy,getSelection,find,getMatchedCSSRules,webkitRequestAnimationFrame,webkitCancelAnimationFrame,btoa,atob,setTimeout,clearTimeout,setInterval,clearInterval,createImageBitmap,scroll,scrollTo,postMessage,blur,scrollBy,focus,close,fetch,webkitRequestFileSystem,webkitResolveLocalFileSystemURL,openDatabase,chrome,frames,self,window,parent,opener,top,length,closed,location,document,origin,name,history,locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,status,frameElement,navigator,applicationCache,external,screen,innerWidth,innerHeight,scrollX,pageXOffset,scrollY,pageYOffset,screenX,screenY,outerWidth,outerHeight,devicePixelRatio,clientInformation,screenLeft,screenTop,defaultStatus,defaultstatus,styleMedia,onanimationend,onanimationiteration,onanimationstart,onsearch,ontransitionend,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,onwheel,isSecureContext,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onseeked,onseeking,onselect,onshow,onstalled,onsubmit,onsuspend,ontimeupdate,ontoggle,onvolumechange,onwaiting,onbeforeunload,onhashchange,onlanguagechange,onmessage,onmessageerror,onoffline,ononline,onpagehide,onpageshow,onpopstate,onrejectionhandled,onstorage,onunhandledrejection,onunload,performance,onauxclick,customElements,ongotpointercapture,onlostpointercapture,onpointercancel,onpointerdown,onpointerenter,onpointerleave,onpointermove,onpointerout,onpointerover,onpointerup,crypto,ondevicemotion,ondeviceorientation,ondeviceorientationabsolute,indexedDB,webkitStorageInfo,sessionStorage,localStorage,caches,speechSynthesis';
  let _propArray = _propInOriWindow.split(',');
  _propArray.push('__diffWindow');

  console.log('ori_window 属性数量：', _propArray.length);

  let _curPropArray = Object.keys(window);
  console.log('cur_window 属性数量：', _curPropArray.length);
  _curPropArray.forEach(function (key) {
    if (_propArray.indexOf(key) == -1) {
      result[key] = window[key];
    }
  });
  // console.log(JSON.stringify(result, null, 2));
  return result;
};