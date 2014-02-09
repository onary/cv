load('application');

var json = use("json"),
    json_error = use("json_error"),
    json_success = use("json_success");

action("index", function() {
    this.title = 'oNary admin';
    render();
});
