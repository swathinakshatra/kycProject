import React, { Component } from 'react';

class Frame1 extends Component {
  state = {};

  render() {
    return (
      <div className="customise-background-layout">
        <p className="content-industries">Industries</p>
        <h6 className="customize-content-solution">Customize Solution with your Business</h6>

        <div className="image-grid-frames">
          
          <div className="image-container-allframes">
            <img src={'images/Frame 23.png'} alt="Image 1" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 24.png'} alt="Image 2" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 25.png'} alt="Image 3" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 26.png'} alt="Image 4" />
          </div>
          </div>

          
          <div className="image-grid-frames">
          <div className="image-container-allframes">
            <img src={'images/Frame 27.png'} alt="Image 5" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 28.png'} alt="Image 6" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 29.png'} alt="Image 7" />
          </div>
          <div className="image-container-allframes">
            <img src={'images/Frame 30.png'} alt="Image 8" />
          </div>
        </div>
      </div>
    );
  }
}

export default Frame1;
