window.log = function() {
    console.log.apply(console, arguments);
};

var fillErrors = function(xhr) {
    for (var field in xhr.data) {
        this[field].$dirty = true;
        this[field].$error.xhr = field + ' ' + xhr.data[field][0];
    }
};
