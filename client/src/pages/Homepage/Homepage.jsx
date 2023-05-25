import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// // ------ import api base URL -------
import apiData from "../../data/apiData";

import JobCarousel from "../../components/JobCarousel/JobCarousel";
import CreativeCarousel from "../../components/CreativeCarousel/CreativeCarousel";
import ok from "../../assets/images/illustrations/ok.svg";
import flame from "../../assets/images/illustrations/flame.svg";
import magnify from "../../assets/images/illustrations/magnify.svg";
import eyes from "../../assets/images/illustrations/eyes.svg";
import bell from "../../assets/images/illustrations/bell.svg";
import "./Homepage.scss";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [creativeData, setCreativeData] = useState([]);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/creatives");
        const creatives = response.data;
        setCreativeData(creatives);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/jobs");
        const jobs = response.data;
        setJobData(jobs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const markers = creativeData.map((data) => {
    const { marker } = data;
    const [lat, lng] = marker.split(", ").map(parseFloat);
    return { lat, lng };
  });

  console.log(markers)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="home">
      <section className="home__section home__hero">
        <div className="home__copy-container">
          <h1 className="home__copy-header">
            Discover{" "}
            <img
              src={magnify}
              alt="perfect icon"
              className="home__illustration"
            />{" "}
            Your Perfect{" "}
            <img src={ok} alt="perfect icon" className="home__illustration" />{" "}
            Creative Match
            <img src={flame} alt="flame icon" className="home__illustration" />
            on LookBook:{" "}
          </h1>
          <p>
            The Ultimate Platform for Employeers to Match with Creatives in Vancouver B.C.
          </p>
        </div>
        <button className="home__btn--primary">Match with Creatives</button>
      </section>
      <section className="home__section home__creative">
        <img src={eyes} alt="eyes icon" className="home__illustration" />
        <div className="home__copy-container">
          <p className="p--large">Creatives</p>
          <h2>Discover Vancouver Creatives</h2>
        </div>
        <div className="home__cards">
          <CreativeCarousel creativeData={creativeData} />
        </div>
          <button className="home__btn--primary">
          <Link to="/creatives">View More Creatives</Link></button>
      </section>
      <section className="home__section home__jobs">
        <img src={bell} alt="eyes icon" className="home__illustration" />
        <div className="home__copy-container">
          <p className="p--large">Job Board</p>
          <h2>Discover Vancouver Jobs</h2>
        </div>
        <div className="home__cards">
          <JobCarousel jobData={jobData} />
        </div>
        <button className="home__btn--primary">
        <Link to="/jobs">View More Jobs</Link></button>
      </section>
    </main>
  );
}

export default Homepage;
