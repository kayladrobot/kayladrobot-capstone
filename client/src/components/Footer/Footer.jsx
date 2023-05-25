import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/lookbook-white.svg";
import instagram from "../../assets/icons/instagram-white.svg";
import twitter from "../../assets/icons/twitter-white.svg";
import email from "../../assets/icons/email-white.svg";

import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link to="/" className="footer__logo-container">
          <img src={logo} alt="lookbook logo" className="footer__logo" />
        </Link>
        <nav className="footer__nav">
          <div className="footer__nav-main">
            <Link to="/" className="footer__item-wrapper">
              <h5 className="footer__item">Creatives</h5>
            </Link>
            <Link to="/" className="footer__item-wrapper">
              <h5 className="footer__item">Jobs</h5>
            </Link>
          </div>
          <div className="footer__btn-wrapper">
            <Link to="/" className="footer__item-wrapper">
              <h5 className="footer__item">Make A Match</h5>
            </Link>
            <Link to="/" className="footer__item-wrapper">
              <h5 className="footer__item">Take the Quiz</h5>
            </Link>
          </div>
        </nav>
        <div className="footer__social-wrapper">
        <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img
            src={instagram}
            alt="instagram icon"
            className="footer__social-icon"
          />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={twitter}
              alt="twitter icon"
              className="footer__social-icon"
            />
          </a>
          <a href="mailto:lookbook@gmail.com">
            <img src={email} alt="email icon" className="footer__social-icon" />
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="p--small">© 2023 LookBook. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
