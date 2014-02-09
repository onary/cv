var express = require('express');

module.exports = function (compound) {
    var app = compound.app;

    app.configure('production', function () {
//        app.enable('quiet');
//        app.enable('merge javascripts');
//        app.enable('merge stylesheets');
//        app.disable('assets timestamps');
//        app.use(express.errorHandler());
        app.enable('watch');
        app.enable('log actions');
        app.enable('env info');
        app.enable('force assets compilation');
        app.set('translationMissing', 'display');
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        app.set('hostname', 'http://onary-pastebin.rhcloud.com/');
    });
};
