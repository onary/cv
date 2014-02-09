#!/usr/bin/env node

/**
 * Server module exports method returning new instance of app.
 *
 * @param {Object} params - compound/express webserver initialization params.
 * @returns CompoundJS powered express webserver
 */
var app = module.exports = function getServerInstance(params) {
    params = params || {};
    // specify current dir as default root of server
    params.root = params.root || __dirname;
    return require('compound').createServer(params);
};

if (!module.parent) {
    var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
    var host = process.env.OPENSHIFT_NODEJS_IP || '192.168.1.149';
//    var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

    var server = app();
    
    if (process.env.OPENSHIFT_APP_NAME == "s") { 
        server.settings.env = "production";
    }

    server.listen(port, host, function () {
        console.log(
            'Compound server listening on %s:%d within %s environment',
            host, port, server.set('env')
        );
    });
}

