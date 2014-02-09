load('application');

action('error', function() {
    this.error = req.session.err.name || "Undefined error";
    this.title = req.session.err.statusCode ||'Error';

    try {
        if ((req.session.err.codes.email)[0] =='uniqueness')
            this.error = "This email is already exist"
    } catch (e) {console.log(e)}

    delete req.session.err;
    render();
});

// { name: 'ValidationError',
// message: 'Validation error',
// statusCode: 400,
// codes: { email: [ 'uniqueness' ] },
// context: 'User' }

