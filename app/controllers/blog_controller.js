load('application');

var json = use("json"),
    json_success = use("json_success");


action('index', function() {
    console.log("Post:: Index");

    Post.all(function (err, posts) {
        json({posts: posts});
    });
});

action('details', function() {
    console.log("Post:: Details");

    var user_id = [];
    var comms = [];
    Post.find(params.id, function (err, post) {
        post.comment(function (err, comments) {
            for (var i in comments) {
                user_id.push(comments[i].user_id);
            }

            User.all({where: {"id" : {"inq" : user_id }}}, function(err, users) {
                for (var u in users) {
                    for (var c in comments) {
                        if ((comments[c].user_id).toString() == (users[u].id).toString()) {
                            comms.push({message: comments[c].message,
                                user: users[u].name,
                                created_at:  comments[c].created_at
                                });
                        }
                    }
                }

                json({'post': post, 'comments': comms});
            });
        });
    });
});

action('create', function() {
    console.log("Post:: Create");

    var data = {user_id: null,
        post_id: req.body.blog_id,
        message: req.body.message};

    if (req.user && req.user.id == req.body.user_id) {
        data.user_id = req.body.user_id;
    } else
    if (req.session.user && req.session.user == req.body.user_id) {
        data.user_id = req.body.user_id;
    }

    if (data.user_id) {
        Comment.create(req.body, function (err, item) {
            if (err) {
                json({'err': err});
            } else {
                User.find(data.user_id, function(e, user) {
                    if (err) {json({'err': err});}
                    else {
                        json({comment: {message: item.message,
                            user: user.name,
                            created_at:  item.created_at}});
                    }
                });
            }
        });
    } else {
        json({'err': "wrong user"});
    }

});
