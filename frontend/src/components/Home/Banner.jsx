import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import styles from "./Banner.module.scss";

const slides = [
  {
    image: "/Image/banner3.png",
  },
  {
    image: "/Image/banner3.png",
  },
  {
    image: "/Image/banner.png",
  },
  {
    image: "/Image/banner2.png",
  },
];

export default function Banner() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <Carousel
        autoPlay
        navButtonsAlwaysVisible
        indicators={false}
        animation="slide"
        interval={5000}
        timeout={500}
        cycleNavigation
        navButtonsProps={{
          style: {
            backgroundColor: "#00000088",
            borderRadius: 0,
            padding: 0,
            margin: 0,
            height: "100%",
          },
        }}
        prevButton={
          <Button
            className={styles.navButton}
            onClick={handleBack}
            startIcon={<ArrowBackIosIcon />}
          ></Button>
        }
        nextButton={
          <Button
            className={styles.navButton}
            onClick={handleNext}
            endIcon={<ArrowForwardIosIcon />}
          ></Button>
        }
        fullHeightHover={false}
        className={styles.slide}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <img src={slide.image} alt="slider" className={styles.slideImage} />
            <div className={styles.slideContent}>
              <h2 className={styles.quote}>{slide.quote}</h2>
              <h3 className={styles.saleText}>{slide.saleText}</h3>
              <Link to="/products">
                <Button className={styles.productButton}>{slide.productText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
