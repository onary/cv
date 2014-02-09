/**
 * Main application variable
 * @type {App}
 */
var MyApp = angular.module('oNary', ['myServices', 'ui.router', 'myFilters', 'hljs']);

/**
 * Directive for validation fields like password confirmation
 */
MyApp.directive('match', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch(function() {
                return $parse(attrs.match)(scope) === ctrl.$modelValue;
            }, function(currentValue) {
                ctrl.$setValidity('mismatch', currentValue);
            });
        }
    };
});

MyApp.directive("header", function ($parse) {
    return {
        restrict: 'E',
        templateUrl: '/templates/index/header',
        replace: false,
        transclude: true,
        scope: {}
    }
});

MyApp.directive("footer", function ($parse) {
    return {
        restrict: 'E',
        templateUrl: '/templates/index/footer',
        replace: false,
        transclude: true,
        scope: {}
    }
});

/**
 * Application config, routes and states.
 */
MyApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise("/");

        $stateProvider
            .state("index", {
                url: "/",
                views: {
                    content: {
                        templateUrl: "/templates/index/index",
                        controller: "IndexCtrl"
                    }
                }
            })
            .state("index.cv", {
                url: "cv",
                views: {
                    index: {
                        templateUrl: "/templates/cv/index",
                        controller: "CvCtrl"
                    }
                }
            })
            .state("index.examples", {
                url: "examples",
                views: {
                    index: {
                        templateUrl: "/templates/examples/index",
                        controller: "ExamplesCtrl"
                    }
                }
            })
            .state("index.examplesView", {
                url: "examples/:id",
                views: {
                    index: {
                        templateUrl: "/templates/examples/view",
                        controller: "ExamplesCtrl"
                    }
                }
            })
            .state("index.contacts", {
                url: "contacts",
                views: {
                    index: {
                        templateUrl: "/templates/contacts/index",
                        controller: "ContactsCtrl"
                    }
                }
            })
            .state("index.blog", {
                url: "blog",
                views: {
                    index: {
                        templateUrl: "/templates/blog/index",
                        controller: "BlogCtrl"
                    }
                }
            })
            .state("index.blogView", {
                url: "blog/:id",
                views: {
                    index: {
                        templateUrl: "/templates/blog/view",
                        controller: "BlogCtrl"
                    }
                }
            })
            .state("admin", {
                url: "/admin",
                views: {
                    content: {
                        templateUrl: "/templates/index/sign",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.index", {
                url: "/home",
                views: {
                    admContent: {
                        templateUrl: "/templates/admin/index",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.examples", {
                url: "/examples",
                views: {
                    admContent: {
                        templateUrl: "/templates/exs/index",
                        controller: "AdminExsCtrl"
                    }
                }
            })
            .state("admin.examplesShow", {
                url: "/examples/:id",
                views: {
                    admContent: {
                        templateUrl: "/templates/exs/show",
                        controller: "AdminExsCtrl"
                    }
                }
            })
            .state("admin.examplesEdit", {
                url: "/examples/:id/edit",
                views: {
                    admContent: {
                        templateUrl: "/templates/exs/edit",
                        controller: "AdminExsCtrl"
                    }
                }
            })
            .state("admin.examplesNew", {
                url: "/example/new",
                views: {
                    admContent: {
                        templateUrl: "/templates/exs/new",
                        controller: "AdminExsCtrl"
                    }
                }
            })
            .state("admin.users", {
                url: "/users",
                views: {
                    admContent: {
                        templateUrl: "/templates/users/index",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.usersShow", {
                url: "/users/:id",
                views: {
                    admContent: {
                        templateUrl: "/templates/users/show",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.usersEdit", {
                url: "/users/:id/edit",
                views: {
                    admContent: {
                        templateUrl: "/templates/users/edit",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.usersNew", {
                url: "/user/new",
                views: {
                    admContent: {
                        templateUrl: "/templates/users/new",
                        controller: "AdminUserCtrl"
                    }
                }
            })
            .state("admin.sources", {
                url: "/sources",
                views: {
                    admContent: {
                        templateUrl: "/templates/sources/index",
                        controller: "AdminSourcesCtrl"
                    }
                }
            })
            .state("admin.sourcesShow", {
                url: "/sources/:id",
                views: {
                    admContent: {
                        templateUrl: "/templates/sources/show",
                        controller: "AdminSourcesCtrl"
                    }
                }
            })
            .state("admin.sourcesEdit", {
                url: "/sources/:id/edit",
                views: {
                    admContent: {
                        templateUrl: "/templates/sources/edit",
                        controller: "AdminSourcesCtrl"
                    }
                }
            })
            .state("admin.sourcesNew", {
                url: "/source/new",
                views: {
                    admContent: {
                        templateUrl: "/templates/sources/new",
                        controller: "AdminSourcesCtrl"
                    }
                }
            })
            .state("admin.posts", {
                url: "/posts",
                views: {
                    admContent: {
                        templateUrl: "/templates/posts/index",
                        controller: "AdminPostsCtrl"
                    }
                }
            })
            .state("admin.postsShow", {
                url: "/posts/:id",
                views: {
                    admContent: {
                        templateUrl: "/templates/posts/show",
                        controller: "AdminPostsCtrl"
                    }
                }
            })
            .state("admin.postsEdit", {
                url: "/posts/:id/edit",
                views: {
                    admContent: {
                        templateUrl: "/templates/posts/edit",
                        controller: "AdminPostsCtrl"
                    }
                }
            })
            .state("admin.postsNew", {
                url: "/post/new",
                views: {
                    admContent: {
                        templateUrl: "/templates/posts/new",
                        controller: "AdminPostsCtrl"
                    }
                }
            })
            .state("admin.comments", {
                url: "/comments",
                views: {
                    admContent: {
                        templateUrl: "/templates/comments/index",
                        controller: "AdminCommentsCtrl"
                    }
                }
            })
            .state("admin.commentsShow", {
                url: "/comments/:id",
                views: {
                    admContent: {
                        templateUrl: "/templates/comments/show",
                        controller: "AdminCommentsCtrl"
                    }
                }
            })
            .state("admin.commentsEdit", {
                url: "/comments/:id/edit",
                views: {
                    admContent: {
                        templateUrl: "/templates/comments/edit",
                        controller: "AdminCommentsCtrl"
                    }
                }
            })
            .state("admin.commentsNew", {
                url: "/comment/new",
                views: {
                    admContent: {
                        templateUrl: "/templates/comments/new",
                        controller: "AdminCommentsCtrl"
                    }
                }
            });
    }
]);
