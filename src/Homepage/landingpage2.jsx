// LandingPage2.jsx

import React, { Component } from 'react';

class LandingPage2 extends Component {
  render() {
    return (
      <div className="landing-page-2-container">
        <p className='landingpage-side-content'>Challenges</p>
        <h6 className="landing-page-heading">User Verification Process is</h6>
        <h6 className="heading-landingpage">Broken</h6>

        {/* Frames */}
        <div className="frame" id="frame1">
          <div className="side-heading">Customers Drop-off</div>
          <li className="point" id="point1">Non-personalized workflows</li>
          <li className="point" id="point2">Friction during verification process</li>
          <div className="frame-image-container">
            <div className="frame-image">
              <img src={'images/Artboard 1 1.png'} alt="Frame 1" />
            </div>
          </div>
        </div>

        <div className="frame" id="frame2">
          <div className="side-heading">Non-compliant</div>
          <li className="point" id="point1">Fraudsters taking over accounts</li>
          <li className="point" id="point2">Compliance across countries is complex</li>
          <div className="frame-image-container">
            <div className="frame-image">
              <img src={'images/Artboard 1 2.png'} alt="Frame 2" />
            </div>
          </div>
        </div>

        <div className="frame" id="frame3">
          <div className="side-heading">Increasing Fraud</div>
          <li className="point" id="point1">Fraudsters taking over accounts</li>
          <li className="point" id="point2">Creation of duplicate/fake profiles</li>
          <div className="frame-image-container">
            <div className="frame-image">
              <img src={'images/Artboard 1 3.png'} alt="Frame 3" />
            </div>
          </div>
        </div>

        <div className="frame" id="frame4">
          <div className="side-heading">High Manual Reviews</div>
          <li className="point" id="point1">Expensive and difficult to scale</li>
          <li className="point" id="point2">High TAT and poor customer experience</li>
          <div className="frame-image-container">
            <div className="frame-image">
              <img src={'images/Artboard 1 4.png'} alt="Frame 4" />
            </div>
          </div>
        </div>

        {/* Additional layout below the frames */}
        <div className="additional-layout"></div>
        
        {/* Solutions Section */}
        <p className="solutions-heading">Solutions</p>
        <h6 className="solutions-description">Transform your User Journey & Accelerate Growth</h6>
        <div className="text-container">
          <div className="text">Maximize<br />Conversion</div>
          <div className="text" style={{ left: '150px' }}>Reduce Manual<br />Reviews</div>
          <div className="text" style={{ left: '330px' }}>Prevent<br />Fraud</div>
          <div className="text" style={{ left: '480px' }}>Stay<br />Compliant</div>
          <div className="text" style={{ left: '600px' }}>No-code<br />Userflow</div>
          <div className="horizontal-line"></div>
          
        </div>
        <div className="image-layout">
          <img src={'images/7071861_3512710 1.png'} alt="Solution Image" />
        </div>
        
        <div className="custom-text-content">
          <h6 className="custom-side-heading">Maximise Conversions</h6>
          <p className="custom-paragraph">
            Ensure successful verification in the first attempt and analyze every step of the user’s verification journey.
          </p>
        </div>
      </div>
    
    
    );
  }
}

export default LandingPage2;
     
      
