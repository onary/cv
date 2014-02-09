
var User = describe('User', function () {
        property('name', String);
        property('provider', String);
        property('providerID', String);
        property('email', String);
        property('password_hash', { limit: 32 });
        property('password_salt', { limit: 32 });
        property('created_at', Date, { default: function() {
                return new Date;
            } });
        property('isadmin', Boolean, {default: false});
        set('restPath', pathTo.users);
    });

var Example = describe('Example', function() {
        property('name', String, { limit: 240 });
        property('description', String);
        property('created_at', Date, { default: function() {
            return new Date;
        } });
    });

var Source = describe('Source', function() {
        property('name', String, { limit: 240 });
        property('description', String);
        property('code', String);
        property('created_at', Date, { default: function() {
            return new Date;
        } });
    });

var Post = describe('Post', function() {
    property('title', String, { limit: 240 });
    property('post', String);
    property('created_at', Date, { default: function() {
        return new Date;
    } });
});

var Comment = describe('Comment', function() {
    property('message', String);
    property('created_at', Date, { default: function() {
        return new Date;
    } });
});

Example.hasMany(Source, {as: 'source', foreignKey: 'example_id'});
Source.belongsTo(Example, {as: 'example', foreignKey: 'example_id'});

User.hasMany(Post, {as: 'post', foreignKey: 'user_id'});
Post.belongsTo(User, {as: 'user', foreignKey: 'user_id'});

User.hasMany(Comment, {as: 'comment', foreignKey: 'user_id'});
Comment.belongsTo(User, {as: 'user', foreignKey: 'user_id'});

Post.hasMany(Comment, {as: 'comment', foreignKey: 'post_id'});
Comment.belongsTo(Post, {as: 'post', foreignKey: 'post_id'});