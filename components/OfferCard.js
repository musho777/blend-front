"use client";
import Slider from "react-slick";
import { sliderProps } from "@/utility/sliderProps";

const OfferCard = () => {
  const offerCards = [
    {
      image: "/assets/images/offer/offer-card1.png",
      alt: "tobacco",
      title: "Tobacco",
      style: "",
      delay: 0,
    },
    {
      image: "/assets/images/offer/accessories.png",
      alt: "Food",
      title: "Accessories",
      style: "style-two",
      delay: 50,
    },
    {
      image: "/assets/images/offer/offer-card3.png",
      alt: "Food",
      title: "hotdog",
      style: "",
      delay: 100,
    },
    {
      image: "/assets/images/offer/offer-card4.webp",
      alt: "Food",
      title: "chickens",
      style: "style-two",
      delay: 150,
    },
    {
      image: "/assets/images/offer/offer-card5.webp",
      alt: "Food",
      title: "seafood",
      style: "",
      delay: 200,
    },
  ];

  return (
    <>
      {/* Desktop Grid View - Hidden on mobile */}
      <div className="offer-card-area d-none d-sm-block">
        <div className="row no-gap row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
          {offerCards.map((card, index) => (
            <div
              key={index}
              className="col"
              data-aos="fade-up"
              data-aos-delay={card.delay}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className={`offer-card-item ${card.style}`}>
                <span className="title">‎ </span>
                <div className="image">
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={300}
                    height={300}
                    loading="eager"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <span className="title">‎ </span>
                <div className="bg-text">
                  <span>{card.title}</span> <span>{card.title}</span>{" "}
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Slider View - Visible only on mobile - Full Width */}
      <div className="d-block d-sm-none offer-card-mobile-slider">
        <Slider
          {...sliderProps.offerCardSlider}
          className="offer-card-slider-mobile"
        >
          {offerCards.map((card, index) => (
            <div key={index}>
              <div
                className={`offer-card-item ${card.style}`}
                data-aos="fade-up"
                data-aos-delay={card.delay}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="title">‎ </span>
                <div className="image">
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={300}
                    height={300}
                    loading="eager"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <span className="title">‎ </span>
                <div className="bg-text">
                  <span>{card.title}</span> <span>{card.title}</span>{" "}
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default OfferCard;
