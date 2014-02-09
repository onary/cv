load('application');

var json = use("json"),
    json_success = use("json_success");

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: compound.app.settings.nodemailer
});

action('send_mail', function() {

    if (body.text) {
        var mailOptions = {
            from: "oNary site",
            to: "my.mail@gmail.com",
            subject: "Message ✔",
            html: "<p>" + body.text + "</p>"
        };

        smtpTransport.sendMail(mailOptions, function(err, response){
            if(err){
                json({'err': err});
            }else{
                json_success();
            }
        });
    }
});
