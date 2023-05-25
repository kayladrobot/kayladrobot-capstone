import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// // ------ import api base URL -------
import apiData from "../../data/apiData";
import instagram from "../../assets/icons/instagram.svg";
import twitter from "../../assets/icons/twitter.svg";
import email from "../../assets/icons/email.svg";
import "./CreativeProfile.scss";

const CreativeProfile = () => {
  const [loading, setLoading] = useState(true);
  const [currentCreative, setCurrentCreative] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get(`/creatives/${id}`);
        setCurrentCreative(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <section className="profile__bar">
          <div className="profile__back-bar">
            <Link to="/creatives">
              <button className="profile__back">Back</button>
            </Link>
          </div>
          <div className="profile__info">
            <img
              src={currentCreative.profile}
              alt="profile"
              className="profile__profile-img"
            />
            <div className="profile__header-copy">
              <h4>{currentCreative.name}</h4>
              <p>{currentCreative.title}</p>
            </div>
            <p className="p--small profile__bio">{currentCreative.bio}</p>
          </div>
          <div className="profile__work">
            <div className="profile__availability">
              <p className="p--large">Availability</p>
              <p>{currentCreative.status}</p>
            </div>
            <div className="profile__rate">
              <p className="p--large">Hourly Rate</p>
              <p>{currentCreative.rate}</p>
            </div>
          </div>
          <div className="profile__education-wrapper">
            <p className="p--large profile__education-header">Education</p>
            {currentCreative.education.map((educationItem, index) => (
              <div key={index} className="profile__education-container">
                {Object.values(educationItem).map((item, subIndex) => (
                  <div key={subIndex} className="profile__education">
                    <p key={item.name}>{item.name}</p>
                    <p key={item.degree}>{item.degree}</p>
                    <div className="profile__dates">
                      <p key={item.startdate}>{item.startdate}</p>
                      <p>-</p>
                      <p key={item.enddate}>{item.enddate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="profile__categories">
            {currentCreative.labels.map((label) => (
              <p className="profile__category p--small">{label}</p>
            ))}
          </div>
          <div className="profile__social-wrapper">
            <Link to="https://www.instagram.com/">
              <img
                src={instagram}
                alt="instagram icon"
                className="profile__social-icon"
              />
            </Link>
            <Link to="https://twitter.com/">
              <img
                target="_blank"
                src={twitter}
                alt="twitter icon"
                className="profile__social-icon"
              />
            </Link>
            <Link to={`mailto:${currentCreative.email}`}>
              <img
                target="_blank"
                src={email}
                alt="email icon"
                className="profile__social-icon"
              />
            </Link>
          </div>
          <div className="profile__button-wrapper">
            <button className="profile__button" onClick={currentCreative.email}>
              Contact
            </button>
          </div>
        </section>
        <main className="profile__main">
          <div className="profile--images-wrapper">
            {currentCreative.image.map((imageItem, index) => (
              <div key={index} className="profile__profile--images">
                {Object.values(imageItem).map((item) => (
                  <img
                    src={item}
                    alt="project-img"
                    className="profile__project--img"
                  />
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreativeProfile;
