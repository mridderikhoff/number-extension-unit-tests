const {join} = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'number-extension.js',
      'number-extension.spec.js'
    ],
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'number-extension.js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'cobertura', subdir: '.' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text-summary', subdir: '.' },
      ],
    },
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
