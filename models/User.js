const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});
// This loads the schema into mongoose
mongoose.model('users', userSchema)