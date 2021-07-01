const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// This pulls a schema out of Mongoose by getting just one argument
// User is the model class
const User = mongoose.model('users');

// user is either retrieved or created in the passport.use function below
// 
passport.serializeUser((user, done) => {
    // done = callback after performing action
    // either passes error or user.id which is 
    // a Mongo-assigned identifier (unique identifier, but it can cover if the user has a login through Google, Facebook, Etc)
    done(null, user.id);
});

// Pull information out created by serializeUser function
// and turn it into a user in the future
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            // This enables the callback URL to be valid and
            // not cause errors, whether in dev or prod environment
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            // These queries return promises
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    // We already have record with given 
                    // profile Id
                    // null = everything is fine, existingUser = here is the info we fetched
                    done(null, existingUser);
                } else {
                    // We dont' have a user record with this ID,
                    // make a new record/ "Model Instance"
                    new User({ googleId: profile.id })
                        .save()
                        // providing the new user saved to database, tell
                        // database that action is done, and then pass in user that was just saved
                        // as second argument
                        .then(user => done(null, user));
                }
            });
        }
    )
);

// passport.use(
//     new SpotifyStrategy(
//         {
//             clientID: keys.spotifyClientId,
//             clientSecret: keys.spotifyClientSecret,
//             callbackURL: '/auth/spotify/callback',
//             proxy: true
//         }, 
//         (accessToken, refreshToken, profile, done) => {
//             // These queries return promises
//             User.findOne({ spotifyId: profile.id }).then((existingUser) => {
//                 if (existingUser) {
//                     // We already have record with given 
//                     // profile Id
//                    // null = everything is fine, existingUser = here is the info we fetched
//                     done(null, existingUser);
//                 } else {
//                     // We dont' have a user record with this ID,
//                     // make a new record/ "Model Instance"
//                     new User({ spotifyId: profile.id })
//                         .save()
//                         // providing the new user saved to database, tell
//                         // database that action is done, and then pass in user that was just saved
//                         // as second argument
//                         .then(user => done(null, user));
//                 }
//             });
//         }
//     )
// );

// passport.use(
//     new GithubStrategy(
//         {
//             clientID: keys.githubClientId,
//             clientSecret: keys.githubClientSecret,
//             callbackURL: '/auth/github/callback',
//             proxy: true
//         }, 
//         (accessToken, refreshToken, profile, done) => {
//             // These queries return promises
//             User.findOne({ githubId: profile.id }).then((existingUser) => {
//                 if (existingUser) {
//                     // We already have record with given 
//                     // profile Id
//                    // null = everything is fine, existingUser = here is the info we fetched
//                     done(null, existingUser);
//                 } else {
//                     // We dont' have a user record with this ID,
//                     // make a new record/ "Model Instance"
//                     new User({ githubId: profile.id })
//                         .save()
//                         // providing the new user saved to database, tell
//                         // database that action is done, and then pass in user that was just saved
//                         // as second argument
//                         .then(user => done(null, user));
//                 }
//             });
//         }
//     )
// );
