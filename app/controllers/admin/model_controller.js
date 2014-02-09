load('application');

var json = use("json"),
    json_error = use("json_error"),
    json_success = use("json_success");

before(admin_required);

var get_model = function(model) {
    if (model == "post") {return Post} else
    if (model == "comment") {return Comment} else
    if (model == "source") {return Source} else
    if (model == "example") {return Example}
};


action(function create() {
    var Model = get_model(params.model);

    Model.create(req.body, function (err, item) {
        if (err) {
            json({'err': err});
        } else {
            json_success();
        }
    });
});

action(function index() {
    var Model = get_model(params.model);

    Model.all(function (err, items) {
        json(items);
    });
});

action(function show() {
    var Model = get_model(params.model);

    Model.find(params.id, function (err, item) {
        json([item]);
    });

});

action(function edit() {
    var Model = get_model(params.model);

    Model.find(params.id, function (err, item) {
        json([item]);
    });
});

action(function update() {
    console.log("this is update func");
    var Model = get_model(params.model);

    Model.find(params.id, function(err, item) {
        item.setAttributes(req.body);
        item.save(req.body, function(err) {
            if (err) {
                json({'err': err});
            } else {
                json_success();
            }
        });
    });
});

action(function destroy() {
    var Model = get_model(params.model);

    Model.find(params.id, function(err, item) {
        item.destroy(function (error) {
            if (error) {json_error(error)}
            else json_success();
        });
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
