import React, { useState } from "react";
import { Link } from "gatsby";
import SocialIcons from "./SocialIcons.js";
import useSiteMetadata from "./SiteMetadata";

const Footer = () => {
  const [footerBarActiveClass, setFooterBarActiveClass] = useState("");
  const [footerActive, setFooterActive] = useState(false);
  const { title } = useSiteMetadata();

  const toggleFooterHamburger = () => {
    !footerActive ? setFooterBarActiveClass("is-active") : setFooterBarActiveClass("");
    setFooterActive(!footerActive);
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-logo has-text-centered">
          <div className="logo-container">
            <Link to="/">
              <img src="/useful-img/logo-large.png" alt={title} loading="lazy" width="280" height="90" />
            </Link>
          </div>
        </div>
        {/* Hamburger menu */}
        <div className="footernav has-text-centered">
          <div className={`footer-burger burger ${footerBarActiveClass}`} data-target="footerMenu" onClick={() => toggleFooterHamburger()}>
            <span />
            <span />
            <span />
          </div>
          <div id="footerMenu" className={`footer-menu ${footerBarActiveClass}`}>
            <div className="footerbar">
              <Link className="footerbar-item" to="/about-us/">
                About Us
              </Link>
              <Link className="footerbar-item" to="/contact-us/">
                Contact Us
              </Link>
              <Link className="footerbar-item" to="/affiliate-disclosure/">
                Affiliate Disclosure
              </Link>
              <Link className="footerbar-item" to="/terms-of-service/">
                Terms of Service
              </Link>
              <Link className="footerbar-item" to="/privacy-policy/">
                Privacy Policy
              </Link>
              <a className="footerbar-item" href="/sitemap.xml">
                Sitemap
              </a>
            </div>
          </div>

          <SocialIcons />
          <div className="footer-text">
            <div className="protected-img">
              <a href="google.com">
                <img src="/useful-img/dmca.png" alt="DMCA.com Protection Status" loading="lazy" width="121" height="24" />
              </a>
            </div>
            <p>Site Title © 2020. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
