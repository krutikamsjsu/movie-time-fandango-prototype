import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Link } from 'react-router-dom';
import Payments from './Payment/Payments';
let logo = require('../images/logo-1.png');

class Header extends Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
            <NavLink to="/User/Login" className="global-menu-li navLink">Login</NavLink>
          /*<li>
            <a href="/auth/google"> Login With Google</a>
          </li>*/
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    var styles = {
      color: 'green'
    };
    var style1 = {
      color: 'lightblue'
    };
    return (
        <div>
            <div className="navbar-header navbar-inverse">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link
                to={this.props.auth ? '/secure/dashboard' : '/'}
                className="navbar-brand"
                to="/"
              >
                <span style={styles}>Movie</span>
                <span style={style1}>Time</span>
              </Link>
            </div>
            <div id="headerwrap">
                <div className="global-header">
                    <nav className="row">
                        <img src={logo} className="img-logo"></img>
                        <div className="float-right">
                            <ul className="global-menu nav navbar-nav">
                <li className="global-menu-li">
                  <NavLink to="/add-movie" className="global-menu-li navLink">New Movies</NavLink>
                </li>
                <li className="global-menu-li">
                  <NavLink to="/secure/movieUpload" className="global-menu-li navLink">Upload Movie</NavLink>
                </li>
				<li className="global-menu-li">
				{/*if user is admin then show this link*/}
                  <NavLink to="/addMovieHall" className="global-menu-li navLink">Add Movie Hall</NavLink>
                </li>
                  <li className="global-menu-li">
                      {/*if user is admin then show this link*/}
                      <NavLink to="/adminDasboard" className="global-menu-li navLink">Admin Dashboard</NavLink>
                  </li>
                  <li className="global-menu-li">
                      {/*if user is admin then show this link*/}
                      <NavLink to="/sudMovieHall" className="global-menu-li navLink">Search|Update|Delete Movie Hall</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/ViewNewMovies" className="global-menu-li navLink">New Movies</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/secure/movieUpload" className="global-menu-li navLink">Book Movies</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/User/EditProfile" className="global-menu-li navLink">My VIP Account</NavLink>
                  </li>
              </ul>

                            <li className="global-menu-li">
                    {this.renderContent()}
                </li>
                        </div>
                    </nav>
                </div>
            </div>

        </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
