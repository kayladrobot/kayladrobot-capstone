import * as React from "react";
import { useState } from "react";
import { theme, endStyle } from "../../theme/theme";
import { ThemeProvider } from "@mui/material";
import MatchPage from "../MatchPage/MatchPage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import closeicon from "../../assets/icons/close-24px.svg";
import apiData from "../../data/apiData";
import cupid from "../../assets/images/illustrations/cupid.svg"
import "./QuestionSubmit.scss";

const SubmitPage = ({ open, selectedAnswers, handleClose, quizData}) => {
  const [showMatches, setShowMatches] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiData.post("/answers", {
        answers: selectedAnswers,
      });
      setShowMatches(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open}>
        <Box sx={endStyle}>
          <div className="submit">
            <div className="submit__close-icon" onClick={handleClose}>
              <img src={closeicon} alt="close icon" />
            </div>
            <form className="submit__wrapper">
            <img src={cupid} alt="cupid icon" className="submit__cupid-icon" />
              <div className="submit__copy-container">
                <h2>Matching in Progress!</h2>
                <p>
                  Thank you for completing the questionnaire. Our algorithm is
                  now analyzing your responses to find potential candidates that
                  match your criteria.
                </p>
              </div>
              <div className="submit__button-wrapper">
                <button onClick={handleSubmit} className="submit__button">
                  View Matches
                </button>
                <button onClick={handleClose} className="submit__button--close">
                  Back to Homepage
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {showMatches && <MatchPage open={showMatches}
        selectedAnswers={selectedAnswers}
        handleClose={handleClose}
        quizData={quizData} 
        matches={showMatches}/>}
    </ThemeProvider>
  );
};

export default SubmitPage;
