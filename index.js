const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
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


// body parser middleware - using with Stripe API
app.use(bodyParser.json());
// these next 3 calls are Middlewares
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets 
    // like our main.js file, or main.css file!
    app.use(express.status('client/build'));
    
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
