const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// Making a charge to the card via stripe
// Async function because of 3rd party API
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        // Passport function- user buys credits and passport
        // adds them to account and saves the
        // user to update info in DB
        req.user.credits += 5;
        const user = await req.user.save();
        
        // send data we want to communicate back to browser
        res.send(user);
    });
};
