import React from "react";
import { Link } from "react-router-dom";
import "./JobCarousel.scss";

function JobData({ jobData }) {
  return (
    <div className="jobcarousel">
      <div className="jobcarousel__wrapper">
      {jobData.slice(0, 4).map((item) => (
        <div className="jobcarousel__card" key={item.id}>
          <img src={item.image} alt="" className="jobcarousel__icon" />
          <div className="jobcarousel__content">
          <div className="jobcarousel__info">
            <p>{item.job_type}</p>
            <p>{item.rate}</p>
            </div>
            <div className="jobcarousel__copy">
            <h4>{item.job_title}</h4>
              <p className="p--large">{item.employer_name}</p>
              </div>
              <p>{item.job_description}</p>
              <div className="jobcarousel__bottom">
              <div className="jobcarousel__categories">
                {item.labels.map((label) => (
                  <p className="jobcarousel__category p--small">{label}</p>
                ))}
              </div>
              <Link to={`mailto:${item.email}`}>
              <button className="jobcarousel__button">Apply</button>
              </Link>
              </div>
            </div>
          </div>
      ))}
    </div>
    </div>
  );
}

export default JobData;
