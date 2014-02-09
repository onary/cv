load('application');

var json = use("json"),
    json_error = use("json_error"),
    json_success = use("json_success");

var Pdf = require('pdfkit');
var cv = require("cv");

action('get', function() {
    json(cv);
});

action('cv_pdf', function() {
    var doc = new Pdf();

    doc.text("Curriculum Vitae", 250, 20);

    var x = 100;
    var y = 50;
    var cv_keys = ['general', 'experience', 'skills'];
    var distance = {'general': {'x': 150, 'y': 0, 'out': 0},
                    'experience': {'x': 70, 'y': 15, 'out': 0},
                    'skills': {'x': 150, 'y': 0, 'out': 15}
                    };

    for (var itm in cv_keys) {
        var item = cv_keys[itm];
        doc.text(item + ":", x, y);
        for (var key in cv[item]) {
            for (var k in cv[item][key]) {
                doc.text(k, x + 70, y);
                doc.text(cv[item][key][k], x + distance[item]['x'], y + distance[item]['y']);
                y = y + 25 + distance[item]['y'] + distance[item]['out'];
            }
        }
        y = y + 20;
    }

    doc.text("education:", x, y);
    doc.text(cv.education, x + 70, y);
    y = y + 40;
    doc.text("summary:", x, y);
    doc.text(cv.summary, x + 70, y);

    doc.output(function(pdf) {
        res.type('application/pdf');
        res.end(pdf, 'binary');
    });
});
