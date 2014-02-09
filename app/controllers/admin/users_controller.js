load('application');

var json = use("json"),
    json_error = use("json_error"),
    json_success = use("json_success");

before(admin_required);

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
    });


action(function create() {
    User.create(req.body, function (err, user) {
        if (err) {
            json({'err': err});
        } else {
            json_success();
        }
    });
});

action(function index() {
    User.all(function (err, users) {
        json(users);
    });
});

action(function show() {
    json([this.user.visible_admin()]);

});

action(function edit() {
    json([this.user.visible_admin()]);
});

action(function update() {
    console.log("this is update func");
    this.user.setAttributes(req.body);
    this.user.save(req.body, function(err) {
        if (err) {
            json({'err': err});
        } else {
            json_success();
        }
    });
});

action(function destroy() {
    this.user.destroy(function (error) {
        if (error) {json_error(error)}
        else json_success();
    });
});

function admin_required() {
    if (!req.user) {
        if (req.session && req.session.user) {
            req.app.models.User.find(req.session.user, function(e, user) {
                if (user.isadmin) {
                    req.user = user;
                    next();
                } else {
                    forbid();
                }
            });
        } else {
            forbid();
        }
    } else {
        next();
    }

    function forbid() {
        json_error("Access denied", 401);
    }
}
publish('admin_required', admin_required);

function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.users);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
