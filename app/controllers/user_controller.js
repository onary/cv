load('application');

var json = use("json"),
    json_error = use("json_error"),
    json_success = use("json_success");

// Protection from unauthorized access
before(user_required, {
    only: ["get", "update", "logout"]
});

/*
 * Controller actions
 */

/*
 * Get action, responded with user data allowed to see
 */
action("get", function() {
    json(req.user.visible());
});

/**
 * Authenticate user
 * Responds with user object
 */
action("create", function() {
    if (body.email) {
        // sign in
        if (body.password != undefined) {
            User.authenticate(body.email, body.password, function(user) {
                if (user) {
                    sign_in(user);
                    json(user.isadmin ? user.visible_admin() : user.visible());
                } else {
                    json_error({
                        password: ["is wrong"]
                    });
                }
            });
        } else {
            json_error({
                password: ["is wrong"]
            });
        }
    } else {
        json_error({
            email: ["can't be blank"]
        })
    }
});

/**
 * User sign out
 */
action("logout", function() {
    sign_out();
    json_success();
});

/**
 * Sign in user into session
 */

function sign_in(user) {
    req.session.user = user.id;
    req.user = user;
}
publish("sign_in", sign_in);

/**
 * Sign out user out from session
 */

function sign_out() {
    delete req.session.user;
    delete req.user;
    delete req.session.passport;
    delete this.user;
}
publish("sign_out", sign_out);


/**
 * Before filter for instantiate user object in request and controller scope
 * Checks for user in session object and try to load user object into request
 * structure
 */

function user_required() {
    if (!req.user) {
        if (req.session && req.session.user) {
            req.app.models.User.find(req.session.user, function(e, user) {
                if (user) {
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
        req.session && delete req.session.user;
        json_error("Access denied", 401);
    }
}
publish('user_required', user_required);
