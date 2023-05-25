import React from "react";
import { Link } from "react-router-dom";
import "./CreativeCard.scss";

function CreativeCard({ filteredData }) {
  return (
    <div className="cardlist">
      <div className="cardlist__container">
        {filteredData.map((item) => (
          <Link to={`/creatives/${item.id}`} key={item.id}>
            <div className="cardlist__card">
              <div>
                <div className="cardlist__img-container">
                  {item.image.map((image, index) => (
                    <img
                      key={`image-${index}`}
                      src={image[0]}
                      alt="test"
                      className="cardlist__card-img"
                    />
                  ))}
                </div>
                <div className="cardlist__content">
                  <div className="cardlist__copy">
                    <h4>{item.name}</h4>
                    <p className="p--large">{item.title}</p>
                  </div>
                  <p>
                    {item.bio.slice(0, 140)}
                    {item.bio.length > 140 ? "..." : ""}
                  </p>
                </div>
              </div>
              <div className="cardlist__categories">
                {item.labels.map((label, index) => (
                  <p
                    key={`label-${index}`}
                    className="cardlist__category p--small"
                  >
                    {label}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CreativeCard;
