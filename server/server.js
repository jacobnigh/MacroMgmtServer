'use strict';

const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use('/', require('../routes/home.js')(express));
app.use('/users', require('../routes/users.js')(express));
app.use('/meals', require('../routes/meals.js')(express));
app.use('/grocerylist', require('../routes/grocery_list.js')(express));
app.use('/ingredients', require('../routes/ingredients.js')(express));
app.use('/intolerances', require('../routes/intolerances.js')(express));
app.use('/trends', require('../routes/trends.js')(express));

app.disable('x-powered-by');

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

const server = app.listen(port, () => {
  console.log("Listening on " + port + "...");
});

module.exports = server;
