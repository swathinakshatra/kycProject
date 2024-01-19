import React, { Component } from 'react';
import LandingPage from './landingpage';
import LandingPage2 from './landingpage2';

class NavBar extends Component {
  render() {
    return (
      <div id="customNavbar">
        <div id="customRectangle">
          <nav id="customNavLinks">
            <img src="DIGIFIME 3@4x 1.png" alt="Logo" id="customLogo" />
            <a href="#" className="btn btn-link">Home</a>
            <a href="#" className="btn btn-link">Solutions</a>
            <a href="#" className="btn btn-link">Industries</a>
            <a href="#" className="btn btn-link">Use Cases</a>
            <a href="#" className="btn btn-link">About</a>
          </nav>
          <button className="btn btn-outline-primary" id="customSignInButton">Sign In</button>
          <button className="btn btn-primary" id="customBookDemoButton">Book a Demo</button>
        </div>
        <div><LandingPage /></div>
        <div><LandingPage2/></div>
        
      </div>
    );
  }
}

export default NavBar;
