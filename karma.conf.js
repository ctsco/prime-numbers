//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            '../node_modules/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            '**/app.js',
            'tableview/**/*.js',
            'utils/**/*.js',
            'filters/**/*.js',
            '**/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        preprocessors: {
            '**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '',
            moduleName: 'templates'
        }

    });
};
