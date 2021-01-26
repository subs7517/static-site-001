import React, { useState } from "react";
import { Link } from "gatsby";
import useSiteMetaData from "./SiteMetadata.js";
import ArrowDown from "../svg-icons/arrow-down.js";
import { BuyingGuides } from "./fragments/NavChilds.js";
import AnimateHeight from "react-animate-height";

const Navbar = () => {
  const [navBarActiveClass, setNavBarActiveClass] = useState("");
  const [navBarChildActiveClass, setNavBarChildActiveClass] = useState("");
  const { title } = useSiteMetaData();

  const toggleHamburger = () => {
    navBarActiveClass ? setNavBarActiveClass("") : setNavBarActiveClass("is-active");
  };

  const toggleChild = () => {
    window.innerWidth < 1024 && (navBarChildActiveClass ? setNavBarChildActiveClass("") : setNavBarChildActiveClass("active"));
  };

  const AddChilds = ({ data }) =>
    data.map((item, index) => (
      <div className="child-sec" key={index}>
        <p>{item.title}</p>
        {item.data.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.path}/`}>{item.title}</Link>
          </li>
        ))}
      </div>
    ));

  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="logo-container" title={title}>
            <img src="/useful-img/logo.png" alt={title} loading="lazy" width="187" height="60" />
          </Link>
          {/* Hamburger menu */}
          <div className={`navbar-burger burger ${navBarActiveClass}`} data-target="navMenu" onClick={() => toggleHamburger()}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <AnimateHeight id="navMenu" height={navBarActiveClass ? "auto" : 0} className="navbar-menu">
          <div className="navbar-end has-text-centered">
            <Link className="navbar-item" to="/learning-guides/">
              Learning Guides
            </Link>
            <span className={`navbar-item nav-parent ${navBarChildActiveClass}`}>
              <div className="parent-data">
                <Link className="navbar-item" to="/buying-guides/">
                  Buying Guides
                </Link>
                <span className="open-parent" onClick={() => toggleChild()}>
                  <ArrowDown />
                </span>
              </div>
              <AnimateHeight className="nav-child-container" height={navBarChildActiveClass ? "auto" : 0}>
                <nav className="nav-child">
                  <AddChilds data={BuyingGuides()} />
                </nav>
              </AnimateHeight>
            </span>
            <Link className="navbar-item" to="/news/">
              News
            </Link>
            <Link className="navbar-item" to="/reviews/">
              Reviews
            </Link>
          </div>
        </AnimateHeight>
      </div>
    </nav>
  );
};

export default Navbar;
