import React, { Component } from "react";

class Frame2 extends Component {
  state = {};

  render() {
    return (
    <div className="supercharge-page-landingpage">
      <div className="new-background-layout">
        <div className="footer-background-layout">
          <p className="content-industries">Solutions</p>
          <h6 className="demo-solution">Ready to supercharge your business?</h6>
          <img src={'images/man.png'} alt="Imagebackground" className="img-header-images"/>
          <button className="btn btn-primary" id="footerbutton">Book a Demo</button>
          <img src={'images/check.png'} alt="checkimage" className="check-tick-image"/>
          <p className="content-live">Go-live in 4 hours</p>
          <img src={'images/check.png'} alt="checkimage" className="check-tick-images"/>
          <p className="content-workflow">No-code workflows</p>
        </div>
        <img src="DIGIFIME 3@4x 1.png" alt="Logo" id="footerLogo" />
       
        <p className="content-footer-friction">Empowering frictionless onboarding across the globe</p>
        <p className="signup-content">Sign up for our newsletter</p>
        <input className="emailInput" placeholder="Enter your Email" />
        <button className="btn-btn"><span id="submitText">Submit</span></button>
        
       
        <p className="product-heading">Products</p>
        <p className="product-row">Digifime</p>
        <p className="product-row">ID Verification</p>
        <p className="product-row">Face Authentication</p>
        <p className="product-row">Know Your Business</p>
        <p className="product-row">CKYC</p>

       
        <p className="industries-heading">Industries</p>
        <p className="industries-row">Gaming</p>
        <p className="industries-row">EdTech</p>
        <p className="industries-row">Remittance</p>
        <p className="industries-row">Insurance</p>
        <p className="industries-row">Crypto</p>
        <p className="industries-row">Marketplaces</p>

       
        <p className="resources-heading">Resources</p>
        <p className="resources-row">Blogs</p>
        <p className="resources-row">Customer</p>

       
        <p className="company-heading">Company</p>
        <p className="company-row">Careers</p>
        <p className="company-row">Privacy Policy</p>
        <p className="company-row">contact@digi.co</p>
      </div>
    </div>
    );
  }
}

export default Frame2;
