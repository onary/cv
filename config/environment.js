module.exports = function (compound) {

    var express = require('express');
    var lessMiddleware = require('less-middleware');
    var RedisStore = require('connect-redis')(express);
    var app = compound.app;
    var redisOpts = {};
    var fs = require('fs');

    if (process.env['OPENSHIFT_REDIS_PORT'] && process.env['OPENSHIFT_REDIS_HOST'] && process.env['REDIS_PASSWORD']) {
        redisOpts['port'] = process.env['OPENSHIFT_REDIS_PORT'];
        redisOpts['host'] = process.env['OPENSHIFT_REDIS_HOST'];
        redisOpts['pass'] = process.env['REDIS_PASSWORD'];
    }

    app.configure(function(){
        var cwd = process.cwd();

        app.use(lessMiddleware({
            prefix: '/stylesheets',
            src: cwd + '/less',
            dest: cwd + '/public/stylesheets',
            compress: app.settings.env === 'production',
            force: app.settings.env !== 'production'
        }));

        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('view engine', 'ejs');
        app.set('view options', {complexNames: true});
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');

        compound.loadConfigs(__dirname);
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        app.use(express.session({secret: 'secret', store: new RedisStore(redisOpts)}));
        app.use(express.methodOverride());

        compound.on('after configure', function(){
            var localEnv = cwd + '/config/local_environment.js';
            if(fs.existsSync(localEnv)){
                var func = require(localEnv);
                func(compound);
            }
        });

        app.use(app.router);

       app.use(function(err, req, res, next){
           req.session.err = err;
           res.redirect("error");
       });
    });

};
