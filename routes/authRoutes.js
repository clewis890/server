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

    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/auth/spotify/callback', passport.authenticate('spotify'));
    app.get('/auth/github/callback', passport.authenticate('github'));
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    
    // This will test to make sure that someone that has 
    //logged in can now get access to the user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};