import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { theme, endStyle } from "../../theme/theme";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import closeicon from "../../assets/icons/close-24px.svg";
import "./MatchPage.scss";

// // ------ import api base URL -------
import apiData from "../../data/apiData";

const MatchPage = ({ open, handleClose, quizData }) => {
  const [answers, setAnswers] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [currentCreative, setCurrentCreative] = useState(0);
  const [endMessage, setEndMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/answers");
        const quiz = response.data.pop();
        setAnswers(quiz);
        console.log(answers);
        setCreatives([]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const compareCreative = (creative) => {
    let count = 0;
    const answerStrings = answers.answers.map((q) => q.toLowerCase());
    const creativeString = JSON.stringify(creative).toLowerCase();

    for (let i = 0; i < answerStrings.length; i++) {
      if (creativeString.includes(answerStrings[i])) {
        count++;
      }
    }

    return count;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/creatives");
        const fetchedCreatives = response.data;
        const sortedCreatives = fetchedCreatives.sort(
          (a, b) => compareCreative(b) - compareCreative(a)
        );
        setCreatives(sortedCreatives);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [answers]);

  const handleEndMessage = () => {
    setEndMessage(true);
  };

  const handleBack = () => {
    setCurrentCreative(currentCreative - 1);
  };

  const handleNext = () => {
    setCurrentCreative(currentCreative + 1);
    handleEndMessage();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open}>
        <Box sx={endStyle}>
          <div className="match__wrapper">
            <div className="match__close-icon" onClick={handleClose}>
              <img src={closeicon} alt="Close" />
            </div>
            <div className="match">
              <div className="match__main">
                <h2>Matches</h2>
                {currentCreative === creatives.length - 1 && endMessage && (
                  <div className="match__end-message">
                    <div className="match__end-copy">
                      <p>
                        Congratulations! You have viewed all the matches.Feel
                        free to explore more artists on our homepage.
                      </p>
                    </div>
                    <Link to="/" onClick={handleClose}>
                      <button className="match__button">
                        Back to Homepage
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              {creatives.length > 0 &&
                currentCreative >= 0 &&
                currentCreative < creatives.length && (
                  <div key={currentCreative} className="match__creative">
                    {creatives[currentCreative].image.map((image, index) => (
                      <img
                        key={index}
                        src={image[0]}
                        alt=""
                        className="match__creative-img"
                      />
                    ))}
                    <div className="match__creative-content">
                      <div className="match__creative-copy">
                        <h3>{creatives[currentCreative].name}</h3>
                        <p>{creatives[currentCreative].title}</p>
                      </div>
                      <div className="match__categories">
                        <div className="match__category-row">
                          {creatives[currentCreative].labels
                            .slice(0, 4)
                            .map((label, index) => (
                              <p
                                className="match__category p--small"
                                key={index}
                              >
                                {label}
                              </p>
                            ))}
                        </div>
                        <div className="match__category-row">
                          {creatives[currentCreative].labels
                            .slice(5, 10)
                            .map((label, index) => (
                              <p
                                className="match__category p--small"
                                key={index}
                              >
                                {label}
                              </p>
                            ))}
                        </div>
                      </div>
                      <div className="match__creative-cta">
                        <Link
                          to={`/creatives/${creatives[currentCreative].id}`}
                        >
                          <p
                            className="match__creative-link"
                            onClick={handleClose}
                          >
                            See Profile →
                          </p>
                        </Link>
                        <Link to={`mailto:${creatives[currentCreative].email}`}>
                          <p className="match__creative-link">Contact →</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              <div className="match__button-container">
                {currentCreative > 0 && (
                  <button className="match__button-back" onClick={handleBack}>
                    Back
                  </button>
                )}
                {currentCreative < creatives.length - 1 && (
                  <button className="match__button-next" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default MatchPage;
