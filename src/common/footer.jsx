import React, { Component } from "react";

class Footer extends Component {
  state = {
    currentYear: new Date().getFullYear(),
  };

  render() {
    const { currentYear } = this.state;
    return (
      <footer className="footer">
        <div className="container">
          <div className="text-center">Copyright © {currentYear} DigiFiMe</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
