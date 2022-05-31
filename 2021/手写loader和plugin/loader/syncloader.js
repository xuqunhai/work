module.exports = function (source) {
  source += '升值加薪';
  // this上有很多我们可以在loader中使用的有用信息，所以，对于loader的编写，一定不要使用箭头函数，那样会改变this的指向。
  console.log(Object.keys(this));
  /*
  [
    'version',                'getOptions',
    'emitWarning',            'emitError',
    'getLogger',              'resolve',
    'getResolve',             'emitFile',
    'addBuildDependency',     'utils',
    'rootContext',            'webpack',
    'sourceMap',              'mode',
    '_module',                '_compilation',
    '_compiler',              'fs',
    'target',                 'loadModule',
    'importModule',           'context',
    'loaderIndex',            'loaders',
    'resourcePath',           'resourceQuery',
    'resourceFragment',       'async',
    'callback',               'cacheable',
    'addDependency',          'dependency',
    'addContextDependency',   'addMissingDependency',
    'getDependencies',        'getContextDependencies',
    'getMissingDependencies', 'clearDependencies',
    'resource',               'request',
    'remainingRequest',       'currentRequest',
    'previousRequest',        'query',
    'data'
  ]
  */
  return source;
};
