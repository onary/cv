//before('protect from forgery', function () {
//  protectFromForgery('ee47c7a1c094e216c68db4678d00e8bdd9f20533');
//});

//before("auth", function requireManager() {
//    console.log("aplication::::session:passport::::" + JSON.stringify(session.passport));
//    console.log("aplication::::session:user::::" + JSON.stringify(session.passport.user));
//    console.log("aplication::::req:user::::" + JSON.stringify(req.user));
//    console.log("aplication::::redirect:::::" + req.session.redirect);
//    console.log("aplication::::req.path:::::" + req.path);
//    next();
//});


function json(data, code) {
    res.status(code || 200);
    res.json(data || {});
}
publish('json', json);

function json_success() {
    json({
        success: true
    });
}
publish('json_success', json_success);

function json_error(data, code) {
    if (typeof data === 'string') {
        data = {message: data};
    }
    json(data, code || 500);
}
publish('json_error', json_error);