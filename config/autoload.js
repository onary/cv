module.exports = function (compound) {
    return [ 'jugglingdb'
        , 'ejs-ext'
        , 'seedjs'
        , 'co-assets-compiler'
        , '../lib/utils'
        , 'co-generators'
        ,'compound-passport'
    ].map(require);
};

