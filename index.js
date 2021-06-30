const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// Incorrect order of import statements can cause errors
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();

// How long the cookie session will last
app.use(
    cookieSession({
        // This calculation is so that the cookie lasts 30 days
        // And age can only be read in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // this keys object adds an additional layer of security
        keys: [keys.cookieKey]
    })
);
// Tell passport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
