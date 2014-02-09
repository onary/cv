/**
 * Header controller
 * @param  {Scope} $scope
 * @param  {User} User
 */
MyApp.controller("HeaderCtrl", function($scope, User) {
    $scope.user = User.user;
});

MyApp.controller("IndexCtrl", function() {

});

/**
 * User sign in/up controller
 * @param  {Scope} $scope
 * @param  {ui.router.state} $state
 * @param  {User} User
 */
MyApp.controller("UsersCtrl", function($scope, $state, User) {
    $scope.signin = {};
    $scope.user = User.user;

    $scope.create = function() {
        User.create($scope.signin, function(data) {
            User.user.reload();
            if (data.isadmin) {$state.go('admin.index')}
            else $state.go("index")
        }, fillErrors.bind($scope.signinForm));
    };

    $scope.signout = function() {
        User.signout(function() {
            User.user.clean();
            $state.go('index');
        }, function() {});
    }
});

var admin_mixin = function($scope, $state, $stateParams, Model) {
    $scope.success = false;
    $scope.err = false;
    $scope.availability = true;

    $scope.items = Model.query({}, function (data){
        if (!data.length) $scope.availability = false
    });

    if ($stateParams.id){
        Model.query({id: $stateParams.id}, function(data) {
            $scope.item = data[0];
        });
    }

    $scope.delete = function(id, path) {
        Model.remove({id: id}, function(result) {
            if (result.success) {
                $scope.items = Model.query({}, function (data){
                    if (!data.length) $scope.availability = false
                });
            }
            $state.go('admin.' + path);
        });
    };

    $scope.edit = function() {
        Model.update({id: $scope.item.id}, $scope.item, function(data) {
            $scope.editForm.$setPristine();
            $scope.err = data.err;
            $scope.success = data.success;
        }, fillErrors.bind($scope.editForm));
    };

    $scope.create = function() {
        Model.create($scope.item, function(data) {
            $scope.createForm.$setPristine();
            $scope.err = data.err;
            $scope.success = data.success;
        }, fillErrors.bind($scope.createForm));
    };
};

MyApp.controller("AdminExsCtrl", ['$scope', '$state', '$stateParams', 'Examples', admin_mixin]);
MyApp.controller("AdminUserCtrl", ['$scope', '$state', '$stateParams', 'Users', admin_mixin]);
MyApp.controller("AdminSourcesCtrl", ['$scope', '$state', '$stateParams', 'Sources', admin_mixin]);
MyApp.controller("AdminPostsCtrl", ['$scope', '$state', '$stateParams', 'Posts', admin_mixin]);
MyApp.controller("AdminCommentsCtrl", ['$scope', '$state', '$stateParams', 'Comments', admin_mixin]);


MyApp.controller("CvCtrl", function($scope, $state, Cv) {
    Cv.query(function(data) {
        $scope.cv = data;
    });
});

MyApp.controller("ExamplesCtrl", function($scope, $stateParams, E, S) {

    if ($stateParams.id){
        S.query({id: $stateParams.id}, function(data) {
            $scope.sources = data['sources'];
            $scope.example = data['example'];
        });
    } else {
        E.query(function(data) {
            $scope.examples = data;
        });
    }

    $scope.show_source = function(id) {

    }
});

MyApp.controller("ContactsCtrl", function($scope, $timeout, $state, Message) {
    $scope.message = {text: ""};
    $scope.success = false;
    $scope.err = false;
    $scope.active = true;

    $scope.send = function() {
        $scope.active = false;

        Message.send($scope.message, function(data) {
            console.log(data);
            $scope.MessageForm.$setPristine();
            $scope.err = data.err;

            if (data.success) {
                $scope.message = {text: ""};
            }

            $scope.success = data.success;

            $scope.active = true;

            $timeout(function(){
                $scope.success = false;
                $scope.err = false;
            }, 4000);
        }, fillErrors.bind($scope.MessageForm));
    };

});

MyApp.controller("BlogCtrl", function($scope, $stateParams, $timeout, Blog, User) {
    $scope.allow_send_comments = false;
    $scope.message = "";
    $scope.err = false;

    if ($stateParams.id){
        Blog.query({id: $stateParams.id}, function(data) {
            $scope.post = data['post'];
            $scope.comments = data['comments'];
            $scope.user = User.user;

            if ($scope.user.id) {
                $scope.allow_send_comments = true;
            }
        });
    } else {
        Blog.query(function(data) {
            $scope.posts = data.posts;
        });
    }

    $scope.send_comment = function() {
        Blog.create({post_id: $scope.post.id, user_id: $scope.user.id,
            message: $scope.message}, function(data) {
            $scope.err = data.err;

            if (data.comment) {
                $scope.comments.push(data.comment);
                $scope.message = "";
            }

            $timeout(function(){
                $scope.err = false;
            }, 4000);
        });
    };

});