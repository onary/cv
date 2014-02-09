var _ = require('underscore');

module.exports = function(model) {
    var __protected_attributes = ['id', 'created_at'];

    model.protectedAttributes = function(attributes) {
        if (attributes) {
            !_.isArray(attributes) && (attributes = Array.prototype.slice.call(arguments));

            Array.prototype.push.apply(__protected_attributes, attributes);

            __protected_attributes = _.uniq(__protected_attributes);

            return this;
        }

        return __protected_attributes;
    };

    model.prototype.setAttributes = function(attributes) {
        var data = _.omit(attributes[model.modelName] || attributes,
            __protected_attributes);
        _.extend(this, data);

        return this;
    };
}