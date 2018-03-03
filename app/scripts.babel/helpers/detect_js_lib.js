/*
 Identify common js library used by websites
 检测用了哪些 JS 框架
 todo : 漏洞检测 https://github.com/GoogleChrome/lighthouse/blob/master/third-party/snyk/snapshot.json
 https://snyk.io/blog/snyk-and-lighthouse/
 检测方法：判断 window 对象上的属性
 检测目标：
 * 含有 swf 的lib
 *
 */
console.log('detect js lib running....123');
window.__detectJSLib = function () {
  let result = {};
  const uncertainVersion = 'unknown';

  let targets = {
    'jQuery': {
      objName: 'jQuery',
      type: 'function',
      versionProperty: 'jQuery.fn.jquery'
    },
    'React': {
      objName: 'React',
      type: 'object',
      versionProperty: 'React.version'
    },
    'Angular': {
      objName: 'angular',
      type: 'object',
      versionProperty: 'angular.version.full'
    },
    'Vue': {
      objName: 'Vue',
      type: 'function',
      versionProperty: 'Vue.version'
    },
    'Knockout': {
      objName: 'ko',
      type: 'object',
      versionProperty: 'ko.version',
      testUrl: 'http://knockoutjs.com/index.html'
    },
    'Ember': {
      objName: 'Ember',
      type: 'object',
      versionProperty: 'Ember.VERSION',
      testUrl: 'https://emberjs.com/api-beta/ember/2.12.0/namespaces/Ember/properties/VERSION?anchor=VERSION'
    },
    'Meteor': {
      objName: 'Meteor',
      type: 'object',
      versionProperty: 'METEOR_VERSION',
      testUrl: 'https://www.meteor.com/'
    },
    // todo polymer 似乎有lazyload
    'Polymer': {
      objName: 'Polymer',
      type: 'function',
      versionProperty: 'Polymer.version',
      testUrl: 'https://www.polymer-project.org/'
    },
    'Kendo UI': {
      objName: 'kendo',
      type: 'object',
      versionProperty: 'kendo.version',
      testUrl: 'http://demos.telerik.com/kendo-ui/bootstrap/'
    },
    'Backbone': {
      objName: 'Backbone',
      type: 'object',
      versionProperty: 'Backbone.VERSION',
      testUrl: 'http://backbonejs.org/'
    },
    'Prototype': {
      objName: 'Prototype',
      type: 'object',
      versionProperty: 'Prototype.Version',
      testUrl: 'http://api.prototypejs.org/Prototype/'
    },
    'Dojo': {
      objName: 'dojo',
      type: 'object',
      versionProperty: 'dojo.version.toString()',
      testUrl: 'http://dojotoolkit.org/'
    },
    'MooTools': {
      objName: 'MooTools',
      type: 'object',
      versionProperty: 'MooTools.version',
      testUrl: 'https://mootools.net/'
    },
    'Zepto.js': {
      objName: 'Zepto',
      type: 'object',
      versionProperty: '',
      testUrl: 'http://zeptojs.com/'
    },

    // template
    'Mustache.js': {
      objName: 'Mustache',
      type: 'object',
      versionProperty: 'Mustache.version',
      testUrl: ''
    },
    'Handlebars': {
      objName: 'Handlebars',
      type: 'object',
      versionProperty: 'Handlebars.VERSION',
      testUrl: 'http://tryhandlebarsjs.com/'
    },
    'Hogan.js': {
      objName: 'Hogan',
      type: 'object',
      versionProperty: '',
      testUrl: ''
    },
    'Nunjucks': {
      objName: 'nunjucks',
      type: 'object',
      versionProperty: '',
      testUrl: ''
    },
    'doT.js': {
      objName: 'doT',
      type: 'object',
      versionProperty: 'doT.version',
      testUrl: 'http://olado.github.io/doT/'
    },
    'Rivets.js': {
      objName: 'rivets',
      type: 'object',
      versionProperty: '',
      testUrl: ''
    },
    // jquery.tmpl dustjs marko jsrender javascript-template pure

    // editor

    // package loader: webpack
    'RequireJS': {
      objName: 'requirejs',
      type: 'function',
      versionProperty: 'requirejs.version',
      testUrl: ''
    },
    'Sea.js': {
      objName: 'seajs',
      type: 'object',
      versionProperty: 'seajs.version',
      testUrl: ''
    },
    'SystemJS': {
      objName: 'SystemJS',
      type: 'object',
      versionProperty: 'SystemJS.version',
      testUrl: ''
    },
    // LABjs
    //https://github.com/defunkt/jquery-pjax

    // todo 如何区分下面两个
    'Underscore': {
      objName: '_',
      type: 'function',
      versionProperty: '_.VERSION',
      testUrl: 'http://underscorejs.org/'
    },
    'Lodash': {
      objName: '_',
      type: 'function',
      versionProperty: '_.VERSION',
      testUrl: 'https://lodash.com/'
    },
    'Moment.js': {
      objName: 'moment',
      type: 'function',
      versionProperty: 'moment.version',
      testUrl: 'http://momentjs.com/'
    },
    'D3': {
      objName: 'd3',
      type: 'object',
      versionProperty: 'd3.version'
    },

    // vulner
    'ZeroClipboard': {
      objName: 'ZeroClipboard',
      type: 'function',
      versionProperty: 'ZeroClipboard.version',
      references: [
        'https://github.com/zeroclipboard/zeroclipboard/issues/14',
        'https://github.com/zeroclipboard/zeroclipboard/pull/335'
      ]
    },
    // 多媒体相关
    'audiojs': {
      objName: 'audiojs',
      type: 'object',
      versionProperty: '',
      alert: true,
      info: 'audiojs.settings.swfLocation'
    },
    'videojs': {
      objName: 'videojs',
      type: 'function',
      versionProperty: 'videojs.VERSION',
      alert: true,
      info: 'videojs.options'
    },
    'flowplayer': {
      objName: 'flowplayer',
      type: 'function',
      versionProperty: 'flowplayer.version',
      alert: true,
      info: 'flowplayer.conf'
    },
    'jwplayer': {
      objName: 'jwplayer',
      type: 'function',
      versionProperty: 'jwplayer.version',
      alert: true,
      info: 'jwDefaults.flashplayer'
    },
    'MediaElementPlayer': {
      objName: 'mejs',
      type: 'object',
      versionProperty: 'mejs.version',
      alert: true,
      info: ''
    },
    'Clappr': {
      objName: 'Clappr',
      type: 'object',
      versionProperty: 'Clappr.version',
      alert: true,
      info: ''
    },
    'soundManager': {
      objName: 'soundManager',
      type: 'object',
      versionProperty: 'soundManager.version',
      alert: true,
      info: ''
    },
    'SoundJS': {
      objName: 'createjs',
      type: 'object',
      versionProperty: 'createjs.SoundJS.version',
      alert: true,
      info: 'createjs.SoundJS'
    },
    // 上传相关
    'plupload': {
      objName: 'plupload',
      type: 'object',
      versionProperty: 'plupload.VERSION',
      alert: true,
      info: 'plupload.ua.swf_url'
    },
    'FileAPI': {
      objName: 'FileAPI',
      type: 'object',
      versionProperty: 'FileAPI.version',
      alert: true,
      info: 'FileAPI.flashUrl，FileAPI.flashImageUrl，FileAPI.flashWebcamUrl，'
    },
    'WebUploader': {
      objName: 'WebUploader',
      type: 'object',
      versionProperty: 'WebUploader.version',
      alert: true,
      info: '可以 some 攻击'
    }
  };

  var jqueryPlugin = {
    'prettyPhoto': {// todo 复现
      objName: 'prettyPhoto',
      type: 'object',
      versionProperty: 'prettyPhoto.version',
      github: 'https://github.com/scaron/prettyphoto',
      vuls: [
        {
          version: ['3.1.4', '3.1.5'],
          type: 'xss',
          poc: '/#prettyPhoto[gallery]/1,<a onclick="document.write(/sta-es-a-test/);">/',
          info: 'used in Joomla and wordpress to create slides of images',
          issues: ['https://github.com/scaron/prettyphoto/issues/149'],
          dorks: ['inurl:/wp-content/plugins/prettyPhoto']
        }
      ]
    },
    'jPlayer': {
      objName: 'jPlayer',
      type: 'function',
      versionProperty: 'null',
    },
    'uploadify': {
      objName: 'uploadify',
      type: 'function',
      versionProperty: 'null',
    }
  };


  Object.keys(targets).forEach(function (lib) {
    let target = targets[lib];
    if (typeof window[target.objName] === target.type) {
      let version = eval(target.versionProperty);
      // todo 好多没有version 属性的
      result[lib] = typeof version === 'string' ? version : uncertainVersion;
      if (target.alert) {
        console.log(`%cfind JS Lib: ${target.objName}, info: ${target.info}`, 'color:red');
      }
    }
  });

  // 检测 JQ 插件
  if (typeof jQuery === 'function') {
    Object.keys(jqueryPlugin).forEach(function (key) {
      var plugin = jqueryPlugin[key];
      // console.log(plugin.objName);
      if (typeof jQuery.fn[plugin.objName] === plugin.type) {
        var version = eval('jQuery.fn.' + plugin.objName + '.' + plugin.versionProperty);
        result['$.' + key] = typeof version === 'string' ? version : uncertainVersion;
      }
    });
  }

  console.log('Detect JS Lib result: ');
  console.log(result);
};
window.addEventListener('load', function () {// detect_js_lib.js 需要在页面内容之前加载，否则有可能监听不到 load 事件
  // __detectJSLib();

  setTimeout(function () {
    __detectJSLib();

  }, 1000)
});
