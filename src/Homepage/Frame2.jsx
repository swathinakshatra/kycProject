import React, { Component } from "react";

class Frame2 extends Component {
  state = {};

  render() {
    return (
      <div className="supercharge-page-landingpage">
        {/* Your content goes here */}

        {/* Example content with the specified layout */}
        <div className="new-background-layout">
          {/* Content inside the new background layout */}
          
          {/* Additional background layout */}
          <div className="footer-background-layout">
            <img
              src={'images/frame.333'}  
              alt="Image"
              className="header-image" 
            />
            <p className="content-industries">Solutions</p>
            <h6 className="demo-solution">Ready to supercharge your business?</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Frame2;
