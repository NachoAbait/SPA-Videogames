import React, { useState } from "react";
import css from "../Card/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function Card({ nombre, rating, genres, img, id}) {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundImageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: isHovered ? "400%" : "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "background-size 1.8s"
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    };
    
    const additionalContentStyle = {
        display: isHovered ? "block" : "none"
      };

  return (
    <div> 
      <Link to={`/juegos/${id}`} className={ css.link}>
          <div
        className={css.card}
        style={backgroundImageStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={css.info} style={additionalContentStyle}>
            <h2>{nombre}</h2>  
                  <h3>{rating} <FontAwesomeIcon icon={faStar} style={{color: "#000000",}} /></h3>      
        </div>
      </div>
      </Link>

      
    </div>
  );
}
