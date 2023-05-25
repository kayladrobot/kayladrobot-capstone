import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// // ------ import api base URL -------
import apiData from "../../data/apiData";

// import styles
import Quiz from "../Quiz/Quiz";
import "./Navigation.scss";
import MatchPage from "../MatchPage/MatchPage";
import logo from "../../assets/logo/Lookbook.svg";
import menu from "../../assets/icons/menu-white.svg";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shrunkLogo, setShrunkLogo] = useState(false);
  const [quizTaken, setQuizTaken] = useState(false); // New state variable


  const handleScroll = () => {
    const scrollY = window.scrollY;
    const logoElement = document.querySelector(".nav__logo");
    const scale = 1 - scrollY * 0.002;

    if (scale > 0.8) {
      logoElement.style.transform = `scale(${scale})`;
    } else {
      logoElement.style.transform = "scale(0.5)";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiData.post("/answers", {
        answers: selectedAnswers,
      });
      const lastData = response.data.pop();
      setShowMatches(true);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuizTaken(true);
  };

  const handleMatchClose = () => {
    setShowMatches(false)
  }

  if (isMobile) {
    return (
      <div className="nav">
        <div className="nav__wrapper">
          <div className="nav__header-wrapper">
            <Link to="/" className="nav__logo-container">
              <img src={logo} alt="lookbook logo" className="nav__logo" />
            </Link>
            <Link to="/" className="nav__menu-container" onClick={toggleMenu}>
              <img src={menu} alt="menu icon" className="nav__menu-icon" />
            </Link>
          </div>
        </div>

        <div
          className={`nav__container ${
            !isOpen ? "nav__container--closed" : "nav__container--open"
          }`}
        >
          <nav className="nav__content">
            <Link to="/creatives" className="nav__item-wrapper">
              <h5 className="nav__item">Creatives</h5>
            </Link>
            <Link to="/jobs" className="nav__item-wrapper">
              <h5 className="nav__item">Jobs</h5>
            </Link>
          </nav>
          <div className="nav__btn-wrapper">
            <button className="nav__btn--primary" onClick={handleOpen}>
            Match with Creatives
            </button>
            {open && <Quiz open={open} handleClose={handleClose} />}
            {quizTaken && ( // Show "View Matches" button only if quizTaken is true
              <button onClick={handleSubmit} className="nav__btn--secondary">
                View Matches
              </button>
            )}
            {showMatches && (
              <MatchPage
                open={showMatches}
                selectedAnswers={selectedAnswers}
                handleClose={handleMatchClose}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="nav">
      <div className="nav__wrapper">
        <div className="nav__header-wrapper">
          <Link to="/" className="nav__logo-container">
            <img
              src={logo}
              alt="lookbook logo"
              className={`nav__logo ${shrunkLogo ? "shrunk-logo" : ""}`}
            />
          </Link>
          <Link to="/" className="nav__menu-container">
            <img src={menu} alt="menu icon" className="nav__menu-icon" />
          </Link>
        </div>
      </div>

      <div className={`nav__container`}>
        <nav className="nav__content">
          <Link to="/creatives" className="nav__item-wrapper">
            <h5 className="nav__item">Creatives</h5>
          </Link>
          <Link to="/jobs" className="nav__item-wrapper">
            <h5 className="nav__item">Jobs</h5>
          </Link>
        </nav>
        <div className="nav__btn-wrapper">
          <button className="nav__btn--primary" onClick={handleOpen}>
          Match with Creatives
          </button>
          {open && <Quiz open={open} handleClose={handleClose} />}
          {quizTaken && ( // Show "View Matches" button only if quizTaken is true
              <button onClick={handleSubmit} className="nav__btn--secondary">
                View Matches
              </button>
            )}
          {showMatches && (
            <MatchPage
              open={showMatches}
              selectedAnswers={selectedAnswers}
              handleClose={handleMatchClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
// quizData={quizData}

export default Navigation;