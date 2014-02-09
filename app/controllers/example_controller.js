load('application');

var json = use("json");

action('get_examples', function() {
    console.log("Example");

    Example.all(function (err, examples) {
        json(examples);
    });
});

action('get_sources', function() {
    console.log("Source");

    Example.find(params.id, function (err, example) {
        example.source(function (err, sources) {
            json({'example': example, 'sources': sources});
        });
    });
});
