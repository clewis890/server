import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux';
import * as actions from '../actions';

// while testing payment in Test Mode,
// use CC number 424242424242424242 and
// whatever exp date and cvv code

class StripeWrapper extends Component {
    render() {
        return (
            // tell Stripe exactly what currency
            // and domination of currency we are wanting
            // The default is USD Amount in Cents
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                // token is a callback function retrieving the token representing the payment amount from client
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(StripeWrapper);
