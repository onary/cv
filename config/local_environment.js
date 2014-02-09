module.exports = function (compound) {
    compound.app.configure(function(){
        var app = compound.app;
        app.set('nodemailer', {
            user: "mail",
            pass: "password"
        });
    });
};