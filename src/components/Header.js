import React from "react";
import PropTypes from "prop-types";

const Header = props =>  (
  <div className="navigation">
    <div className="news-links">
      <ul className="top-nav">
        <li className="logo"></li>
        <li>{props.company}</li>
        <li>new</li>
        <span>|</span>
        <li>threads</li> 
        <span>|</span>
        <li>comments</li> 
        <span>|</span>
        <li>show</li> 
        <span>|</span>
        <li>ask</li> 
        <span>|</span>
        <li>jobs</li> 
        <span>|</span>
        <li>submit</li> 
      </ul>
    </div>
    <div className="user-portal">
      <ul className="login">
        <li>login</li>
      </ul>
    </div>
  </div>
);

Header.propTypes = {
  company: PropTypes.string.isRequired
};

export default Header;
