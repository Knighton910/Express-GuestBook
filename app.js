const http = require('http');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// set up views
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// create a global array to store your data
const entries = [];
// make entries available in all views
app.locals.entries = entries;

// Morgan will log every request
app.use(logger('dev'));

// populates a variable named req.body if the
// user is submitting a form.
app.use(bodyParser.urlencoded({  extended: false }));

// visiting the site root, render the homepage (@views/index.ejs)
app.get('/', (req, res) => {
    res.render('index');
});

// renders the 'new entry' page (@views/index.ejs) when getting the URL
app.get('/new-entry', (req, res) => {
    res.render('new-entry')
});

/** @desc::
 * Defines a route handler when you POST
 * to the 'new-entry' URL in contrast to GET
 */
app.post('/new-entry', (req, res) => {
    if (!req.body.title || !req.body.body) {
        res.status(400).send('Entries must have a title and a body.');
        return;
    }
    /** @desc:: adds a new entry to our list of entries*/
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    // redirect user to homepage to see the new entry
    res.redirect('/');
});

// Error Handler
app.use((req, res) => {
    // render a 404 page because requesting an unknown source
    res.status(404).render('404');
});

// start the server
http.createServer(app).listen(3000, () => {
   console.log('GuestBook app started on port: 3000');
});
