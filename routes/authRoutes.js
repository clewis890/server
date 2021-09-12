const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    app.get(
        '/auth/spotify', 
        passport.authenticate('spotify', {
            scope: ['user-read-email', 'user-read-private'],
            showDialog: true
        })
    );
    app.get(
        '/auth/github', 
        passport.authenticate('github')
    );

    // After user comes back from OAuth flow,
    // passport middleware takes over,
    // passes request on in chain to arrow function
    // to redirect to surveys route
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get(
        '/auth/spotify/callback', 
        passport.authenticate('spotify'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get(
        '/auth/github/callback', 
        passport.authenticate('github'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    // This will test to make sure that someone that has 
    // logged in can now get access to the user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
