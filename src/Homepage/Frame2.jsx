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
            <p className="content-industries">Solutions</p>
            <h6 className="demo-solution">Ready to supercharge your business?</h6>

            {/* Image in front of h6 heading */}
            <img
              src="images/man.png" // Replace with the correct image path
              alt="Image description"
              className="h6-image"
              style={{
                width: '754px',
                height: '697px',
                top: '65px',
                left: '911px',
                position: 'absolute',
                zIndex: 1, // Adjust the zIndex to position the image in front
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Frame2;

