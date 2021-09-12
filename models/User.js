const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Model properties for application
const userSchema = new Schema({
    googleId: String,
    githubId: String,
    spotifyId: String,
    credits: { type: Number, default: 0 }
});

// This loads the schema into mongoose
mongoose.model('users', userSchema)