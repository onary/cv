exports.routes = function (map) {

    map.namespace('admin', function(admin) {
        map.resources('users');

        map.get ('/:model', 'model#index');
        map.post('/:model', 'model#create');
        map.get ('/:model/:id', 'model#show');
        map.get ('/:model/:id/edit', 'model#edit');
        map.del ('/:model/:id', 'model#destroy');
        map.put ('/:model/:id', 'model#update');
    });

    map.get ('/user', 'user#get');
    map.post('/user', 'user#create');
    map.del ('/user', 'user#logout');

    map.get('/cv', 'cv#get');
    map.get('/cv/pdf', 'cv#cv_pdf');

    map.post('/sendmail', 'contact#send_mail');

    map.get('/examples', 'example#get_examples');
    map.get('/sources/:id', 'example#get_sources');

    map.get ('/blog', 'blog#index');
    map.get ('/blog/:id', 'blog#details');
    map.post('/blog', 'blog#create');

    map.get('/templates/:folder/:file', 'index#templates');
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');

    map.get('/error', 'error#error');
    map.root('index#index', {as: 'root'});
};