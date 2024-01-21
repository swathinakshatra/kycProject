import React, { Component } from "react";

class Frame extends Component {
  state = {};
  render() {
    return (
        <div className="landing-page-container3">
        <p className="content-simple">Products</p>
        <h6 className="content-verification-made">End-to-End Verification Made Simple</h6>

       
        <div className="user-verification">
          <p className="user-verification-heading">User Verification</p>

         
          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 6.png'} alt="Icon 1" />
              <span>Document Verification</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 7.png'} alt="Icon 2" />
              <span>Quality Checks</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 8.png'} alt="Icon 3" />
              <span>Video Verification</span>
            </div>
          </div>

          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 9.png'} alt="Icon 4" />
              <span>Central Database Check</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 10.png'} alt="Icon 5" />
              <span>Liveness & Face Match</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 11.png'} alt="Icon 6" />
              <span>Age Verification</span>
            </div>
          </div>

          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 12.png'} alt="Icon 7" />
              <span>Location Verification</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 13.png'} alt="Icon 8" />
              <span>Address Verification</span>
            </div>
          </div>
        </div>
        <div>
  <img className="image-line"  src={'images/icons/Line 5.png'} alt="Horizontal Line" />
  <div className="user-verification">
          <p className="user-verification-heading">AML Screening</p>

          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 6.png'} alt="Icon 1" />
              <span>PEP + Sanctions</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 7.png'} alt="Icon 2" />
              <span>Adverse Media</span>
            </div>
           
          </div>

         
        </div>
        <div>
  <img className="image-line"  src={'images/icons/Line 5.png'} alt="Horizontal Line" />
</div>
<div className="user-verification">
          <p className="user-verification-heading">Log In</p>

         
          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 6.png'} alt="Icon 1" />
              <span>Face Authentication</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 7.png'} alt="Icon 2" />
              <span>Liveness Check</span>
            </div>
            </div></div>
        <div>
  <img className="image-line"  src={'images/icons/Line 5.png'} alt="Horizontal Line" />
      </div><div className="user-verification">
          <p className="user-verification-heading">Fraud Monitoring</p>

          
          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 6.png'} alt="Icon 1" />
              <span>Face Authentication</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 7.png'} alt="Icon 2" />
              <span>Face Deduplication</span>
            </div>
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 8.png'} alt="Icon 3" />
              <span>AI based Forgery Checks</span>
            </div>
          </div>

          <div className="user-verification-row">
            <div className="user-verification-point">
              <img src={'images/icons/Artboard 1 9.png'} alt="Icon 4" />
              <span>Central DB Checks</span>
            </div>
            </div>
          </div>
        </div>
        <div>
        <div className="platform-best-global">
          
          <span>Achieve the best global pass rates and fraud protection with one platform. Orchestrate verification checks, code-free at any stage of the customer journey.</span>
          <button className="btn btn-primary demo-book">Get a Demo</button>

        </div></div>
       
        
        </div>
    );
  }
}

export default Frame;
