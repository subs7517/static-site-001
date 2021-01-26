import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumbs from "../components/BreadCrumbs.js";
import "./css/main.css";

const TemplateWrapper = (props) => {
  const { children, title, titleParent, link } = props;

  return (
    <div>
      <Navbar />
      {title && <BreadCrumbs title={title} titleParent={titleParent} link={link} />}
      {children}
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
