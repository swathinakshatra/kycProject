
import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
    <div className="landing-page-container">
      <img
        src="images/abstract.png"
        alt="Abstract Image"
        className="imageContent"
      />
      <div className="backgroundImage">
        <div className="content">
          <div className="title">Building Trust Through</div>
          <div className="innovationContent">Innovation</div>
          <div className="paragraph-content">
            <p>Trust. Verify. Succeed. Navigating the 
              complex landscape of regulations 
              is a challenge, especially in 
              emerging markets. Digifime 
              is your partner in achieving and maintaining compliance.</p>
            <button className="btn btn-primary" id="customBook">Book a Demo</button>
            <p id="talkToExpert">Talk To Expert </p>
          </div>
        </div>
      </div>
      <div className="additionalBackground">
      <div className="trust-heading">Why Trust Digifime?</div>
        <p className="trust-paragraph">Trained on diverse facial variations and ID formats, our robust AI solutions</p> <p className="trust-paragraphs">have onboarded over </p>
        <span className="side-content">750 million users.</span>
        <div className="grid-container">
          <div className="grid-item" id="image1"></div>
          <div className="grid-item" id="image2"></div>
          <div className="grid-item" id="image3"></div>
        </div>
        
      </div>
    </div>
    );
  }
}

export default LandingPage;
