import React from "react";
import PropTypes from "prop-types";
import { NavLink} from "react-router-dom";

const Header = props =>  (
  <div className="navigation">
    <div className="news-links">
      <ul className="top-nav">
        <li className="logo" to='/' />
        <li>
          <NavLink
            className="link"
            exact
            to ='/'>
            {props.company}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="link"
            activeClassName="active-link"
            exact
            to="/new">
            new
          </NavLink>
        </li>
        <span>|</span>
        <li>
          <NavLink
            className="link"
            activeClassName="active-link"
            exact
            to="/comments">
            comments
          </NavLink>
        </li>
        <span>|</span>
        <li>
          <NavLink
            className="link"
            activeClassName="active-link"
            exact
            to="/show">
            show
          </NavLink>
        </li>
        <span>|</span>
        <li>
          <NavLink
            className="link"
            activeClassName="active-link"
            exact
            to="/ask">
            ask
          </NavLink>
        </li>
        <span>|</span>
        <li>
          <NavLink
            className="link"
            activeClassName="active-link"
            exact
            to="/jobs">
            jobs
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

Header.propTypes = {
  company: PropTypes.string.isRequired
};

export default Header;
