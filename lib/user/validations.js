module.exports = function (User) {

    User.protectedAttributes('password_hash', 'password_salt');

    // email validation
    User.validatesPresenceOf('email');

    User.validatesFormatOf('email', {
        'with': /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
    });

    User.validatesUniquenessOf('email', {message: 'email is not unique'});
};
