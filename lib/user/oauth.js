module.exports = function(User) {
    
    User.findOrCreate = function (data, done) {
        /* FACEBOOK */
        if (data.facebookId) {
//            console.log("::::::data:::::::::" + JSON.stringify(data));

            User.all({
                where: {
                    providerID: data.facebookId,
                    provider: "facebook"
                }, limit: 1
            }, function (err, user) {
                if (user[0]) return done(err, user[0]);
                User.create({
                    name: data.profile.displayName,
                    email: data.profile.emails[0].value,
                    providerID: data.facebookId,
                    provider: "facebook"
                }, done);
            });
        } else

        /* GOOGLE OPENID */
        if (data.openId) {
//            console.log("::::::data:::::::::" + JSON.stringify(data));

            User.all({
                where: {
                    providerID: data.openId,
                    provider: "google"
                }, limit: 1
            }, function (err, user) {
                if (user[0]) return done(err, user[0]);
                User.create({
                    name: data.profile.displayName,
                    email: data.profile.emails[0].value,
                    providerID: data.openId,
                    provider: "google"
                }, done);
            });
        } else

        /* TWITTER */
        if (data.twitterId) {
//            console.log("::::::data:::::::::" + JSON.stringify(data));

            User.all({
                where: {
                    providerID: data.twitterId,
                    provider: "twitter"
                }, limit: 1
            }, function (err, user) {
                if (user[0]) return done(err, user[0]);
                User.create({
                    name: data.profile.displayName,
                    email: data.profile.emails 
                        ? data.profile.emails[0].value 
                        : data.profile.username + "@fake.mail",
                    providerID: data.twitterId,
                    provider: "twitter"
                }, done);
            });
        } else

        /* LOCAL */
        if (data.email) {
            User.all({
                where: {
                    email: data.email
                }, limit: 1
            }, function (err, user) {
                if (user[0]) return done(err, user[0]);
                if (!user[0]) return done(err);
            });
        } else

        /* SOMETHING NOT KNOWN YET */
        {   
            console.log("SOMETHING NOT KNOWN YET");
            console.log(data.profile);
        }
    };
}
