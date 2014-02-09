var _ = require('underscore'),
    oAuth = require('../../lib/user/oauth.js'),
    Validations = require('../../lib/user/validations.js'),
    inject = require('../../lib/user/basemodel.js');

module.exports = function (compound, User) {

    var utils = compound.utils;
    // inject missed features
    inject(User);
    // add oAuth method
    oAuth(User);

    /* Validations */
    Validations(User);

    // hack for correct password validation
    // virtual field password
    User.defineProperty('password', {
        type: 'String'
    });
    //virtual field password_confirmation
    User.defineProperty('password_confirmation', {
        type: 'String'
    });

    User.setter.password = function(password) {
        this.__data.password = password;
    };

    User.setter.password_confirmation = function(password) {
        this.__data.password_confirmation = password;
    };

    User.validate('password_confirmation', function(err) {
        this.password &&
            this.password !== this.password_confirmation &&
        err();
    }, {
        message: 'is not equal to password'
    });

    User.beforeSave = function(next, data) {
        if (data.password) {
            this.password_salt = data.password_salt = utils.randomToken();
            this.password_hash = data.password_hash =
                utils.hashToken(data.password_salt + data.password);
        }

        delete data.password;
        delete data.password_confirmation;
        delete this.password;
        delete this.password_confirmation;

        next();
    };

    User.authenticate = function(email, password, next) {
        User.findOne({
            where: {
                email: email
            }
        }, function(err, user) {
            user ? user.authenticate(password, function(success) {
                console.log(success);
                next(success ? user : null);
            }) : next(null);
        });
    };

    User.prototype.authenticate = function(password, next) {
        next(utils.hashToken(this.password_salt + password) ===
            this.password_hash);
    };

    User.prototype.visible = function() {
        return _.pick(this, 'id', 'email', 'name', 'created_at');
    };

    User.prototype.visible_admin = function() {
        return _.pick(this, 'id', 'email', 'name', 'created_at', 'provider', 'providerID', 'isadmin');
    };
};
