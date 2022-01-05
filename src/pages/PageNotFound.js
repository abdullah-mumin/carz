import React from "react";
import { NavLink } from "react-router-dom";
import SectionBg from "./../assets/images/sectionBg.png";
const NotFound = () => {
  return (
    <div
      style={{
        height: "91vh",
        background: `url(${SectionBg})`,
        backgroundAttachment: "fixed",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="text-center my-5">
        <h1 style={{ fontSize: "100px", color: "red" }}>404</h1>
        <h4 className="text-white">OPPS!  NOT FOUND</h4>
        <p className="text-muted">

        </p>
        <NavLink to="/home">

        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
