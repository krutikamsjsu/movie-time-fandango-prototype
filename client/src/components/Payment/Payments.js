import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Payments extends Component {
  render() {
    //debugger;
    return (
      <StripeCheckout
        name="MovieTime"
        description="Pay for the movie"
        amount={900}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn btn-primary">Get Tickets</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
/*
Script API
amount is in cents
token is what we receive from stripe as a callback func
*/
