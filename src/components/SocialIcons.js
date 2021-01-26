import React from "react";
import Facebook from "../svg-icons/facebook.js";
import Youtube from "../svg-icons/youtube.js";
import Twitter from "../svg-icons/twitter.js";

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a href="https://www.youtube.com/c/Sitetitle" className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
        <Youtube />
      </a>
      <a href="https://www.facebook.com/Sitetitle/" className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
        <Facebook />
      </a>
      <a href="https://twitter.com/SEO_Aleem" className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
        <Twitter />
      </a>
    </div>
  );
};

export default SocialIcons;
