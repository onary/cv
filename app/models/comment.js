var _ = require('underscore'),
    inject = require('../../lib/user/basemodel.js');

module.exports = function (compound, Comment) {
    inject(Comment);
};