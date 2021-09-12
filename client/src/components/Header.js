import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import StripeWrapper from './StripeWrapper';

class Header extends Component {
    // function to determine what shows in Header
    // depending on userAuth state
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <><li><a href="/auth/google">Login With <SocialIcon network="google" /></a></li><li><a href="/auth/github">Login With <SocialIcon network="github" /></a></li><li><a href="/auth/spotify">Login With <SocialIcon network="spotify" /></a></li></>;
            default:
                return [
                    // returning an array instead of wrapping these components in Div.
                    // this code is returned inside of a <ul> in the Header component
                    <><li key="1"><StripeWrapper /></li>
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: { this.props.auth.credits }
                    </li>
                    <li key="2"><a href="/api/logout">Logout</a></li></>
            ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <Link 
                    to={this.props.auth ? '/surveys' : '/'}
                    className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        );
    }
}

// mapStateToProps - called with entire state object out of the Redux store
// returned object will be returned into header as props
function mapStateToProps({ auth }) {
    return { auth };
}
    // use auth property under Object returned in DOM
    // to determine what data to show in Header

export default connect(mapStateToProps)(Header);
