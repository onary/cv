load('application');

var _ = require('underscore');
// skipBefore("auth",{only:["index", "status"]});
/*
 * Index action, main one.
 */
action('index', function() {
    this.title = 'oNary';
    render();
});

/*
 * Tempaltes renderer
 */
action('templates', function() {
    // no layout for templates!
    layout(false);

    // cleanup params
    var folder = params.folder.replace(/\.\.\//g, ''),
        file = params.file.replace(/\.\.\//g, '');

    if (_.indexOf(['admin', 'users', 'exs', 'sources', 'posts', 'comments'],folder )!= -1 ) {
        if (!req.session.user) {
            folder = file = "error";
        } else {
            req.app.models.User.find(req.session.user, function(e, user) {
                if (!user.isadmin) {
                    folder = file = "error";
                }
            });
        }
    }

    render('../' + folder + '/' + file);
});