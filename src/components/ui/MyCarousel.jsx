import React, { useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const MyCarousel = ({ children }) => {
  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 16,
    autoWidth: false,
    items: 6,
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      1200: { items: 6 },
    },
  };

  return (
    <>
      <OwlCarousel className="owl-theme" {...options}>
        {children}
      </OwlCarousel>
    </>
  );
};

export default MyCarousel;
