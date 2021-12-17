import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/sidebar/sidebar";
import { links } from "./sidebar/links";
import Fade from "react-reveal/Fade";

export const AppContainer = (props) => {
  return (
    <div className="logincontainer">
      <div className="logoarea">
        <Link to="/login">
          <img src="assets/logo.png" alt="momeymie logo" />
        </Link>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
export const MobileNav = (props) => {
  const [showNav, setShowNav] = useState(false);
  const closeNav = (e) => {
    if (e.currentTarget === e.target) {
      setShowNav(false);
    }
  };
  return (
        <>
      <div className="mobile-nav">
        <img
            onClick={()=>setShowNav(true)}
          src={`${process.env.PUBLIC_URL}/assets/icons/trx.svg`}
          alt="Menu Icon"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="momeymie logo"
        />
        <Link to="/logout">
          <i className="fa fa-sign-out"></i>
        </Link>
      </div>
      <Fade left>
        <div className={`mobile-navc ${!showNav&&'hidden'}`} onClick={closeNav}>
          <div className="mobile-navbar">
            <div className="mobile-head">
              <button className="btn btn-close" onClick={closeNav}>
                &times;
              </button>
            </div>
            <div className="sidebar-links">
              <ul>
                {links.map(({ label, icon, path, key }) => {
                  return (
                    <li
                      className={key === props.itemKey ? "active" : ""}
                      key={key}
                    >
                      <Link to={path}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}`}
                          alt={`${label} Icon`}
                        />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        </Fade>
        </>
    
  );
};
export const Container = (props) => {
  return (
    <div className="app-container">
      <SideBar itemKey={props.page} />
      <MobileNav itemKey={props.page} />
      <div className="app-box">{props.children}</div>
    </div>
  );
};
