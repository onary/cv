var MyAPI = angular.module('myServices', ['ngResource']);

/**
 * User REST service, patched with custom functions for current user state
 * @param  {ngResource} $resource
 */
MyAPI.factory('User', function($resource) {
    var resource = $resource('/user', {}, {
        get: {
            method: 'GET'
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        signout: {
            method: 'DELETE'
        }
    });

    resource.user = {
        is_loaded: false,
        is_authorized: false
    };

    resource.user.clean = function() {
        var that = this;
        angular.forEach(this, function(value, key) {
            if (typeof value !== 'function') {
                delete that[key];
            }
        });
    };

    resource.user.reload = function() {
        resource.user.is_loaded = false;
        resource.get({}, function(data) {
            angular.extend(resource.user, data);
            resource.user.is_loaded = true;
            resource.user.is_authorized = !! data.email;
        });
    };

    resource.user.reload();

    return resource;
});

/**
 * Servers REST model
 * @param  {ngResource} $resource
 */
MyAPI.factory('Users', function($resource) {
    return $resource('/admin/users/:id', {}, {
        query: {
            method: 'GET'
            , isArray: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });
});

MyAPI.factory('Examples', function($resource) {
    return $resource('/admin/example/:id', {}, {
        query: {
            method: 'GET'
            , isArray: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });
});

MyAPI.factory('Sources', function($resource) {
    return $resource('/admin/source/:id', {}, {
        query: {
            method: 'GET'
            , isArray: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });
});

MyAPI.factory('Posts', function($resource) {
    return $resource('/admin/post/:id', {}, {
        query: {
            method: 'GET'
            , isArray: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });
});

MyAPI.factory('Comments', function($resource) {
    return $resource('/admin/comment/:id', {}, {
        query: {
            method: 'GET'
            , isArray: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });
});

MyAPI.factory('E', function($resource) {
    return $resource('/examples', {}, {
        query: {
            method: 'GET'
            , isArray: true
        }
    });
});

MyAPI.factory('S', function($resource) {
    return $resource('/sources/:id', {}, {
        query: {
            method: 'GET'
        }
    });
});

MyAPI.factory('Cv', function($resource) {
    return $resource('/cv', {}, {
        query: {
            method: 'GET'
        }
    });
});

MyAPI.factory('Message', function($resource) {
    return $resource('/sendmail', {}, {
        send: {
            method: 'POST'
        }
    });
});

MyAPI.factory('Blog', function($resource) {
    return $resource('/blog/:id', {}, {
        query: {
            method: 'GET'
        },
        create: {
            method: 'POST'
        }
    });
});