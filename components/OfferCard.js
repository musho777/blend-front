"use client";
import { useMemo } from "react";
import Slider from "react-slick";
import { sliderProps } from "@/utility/sliderProps";
import { useOffers } from "@/hooks/queries/useOffersQuery";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedTitle } from "@/utils/localization";

const OfferCard = () => {
  const { data: offersData, isLoading, isError } = useOffers();
  const { locale } = useLocale();

  const defaultOfferCards = [
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

  // const offerCards = useMemo(() => {
  //   if (offersData && offersData.data && Array.isArray(offersData.data)) {
  //     return offersData.data.slice(0, 5).map((offer, index) => ({
  //       id: offer.id || offer._id,
  //       slug: offer.slug,
  //       image:
  //         offer.image ||
  //         offer.imageUrl ||
  //         `/assets/images/offer/offer-card${index + 1}.png`,
  //       alt: offer.alt || offer.name || offer.title || "offer",
  //       title: offer.title || offer.name || "Offer",
  //       style: index % 2 === 0 ? "" : "style-two",
  //       delay: index * 50,
  //     }));
  //   }
  //   return defaultOfferCards;
  // }, [offersData]);

  // const handleCardClick = (card) => {
  //   if (card.id || card.slug) {
  //     window.location.href = `/category/${card.slug || card.id}`;
  //   }
  // };
  const handleCardClick = (card) => {
    if (card.id || card.slug) {
      window.location.href = `/product-details/${card.id || card.slug}`;
    }
  };

  if (offersData?.length === 0) return null;
  return (
    <>
      {/* Desktop Grid View - Hidden on mobile */}
      <div className="offer-card-area d-none d-sm-block">
        <div className="row no-gap row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
          {offersData?.slice(0, 5)?.map((card, index) => {
            const localizedTitle = getLocalizedTitle(card, locale);
            const truncatedTitle = localizedTitle?.slice(0, 5) || "";
            const cardStyle =
              card.style || (index % 2 === 0 ? "" : "style-two");

            return (
              <div
                key={index}
                className="col"
                data-aos="fade-up"
                data-aos-delay={card.delay || index * 50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div
                  className={`offer-card-item ${cardStyle}`}
                  onClick={() => handleCardClick(card)}
                  style={{
                    cursor: card.id || card.slug ? "pointer" : "default",
                  }}
                >
                  <span className="title">‎ </span>
                  <div className="image">
                    <img
                      src={
                        `${card.imageUrls[0]}` ||
                        "assets/images/dishes/dish1.png"
                      }
                      alt={card.alt}
                      width={300}
                      height={300}
                      loading="eager"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <span className="title">‎ </span>
                  <div className="bg-text">
                    <span>{truncatedTitle}</span> <span>{truncatedTitle}</span>{" "}
                    <span>{truncatedTitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Slider View - Visible only on mobile - Full Width */}
      <div className="d-block d-sm-none offer-card-mobile-slider">
        <Slider
          {...sliderProps.offerCardSlider}
          className="offer-card-slider-mobile"
        >
          {offersData?.slice(0, 5)?.map((card, index) => {
            const localizedTitle = getLocalizedTitle(card, locale);
            const truncatedTitle = localizedTitle?.slice(0, 5) || "";
            const cardStyle =
              card.style || (index % 2 === 0 ? "" : "style-two");

            return (
              <div key={index}>
                <div
                  className={`offer-card-item ${cardStyle}`}
                  data-aos="fade-up"
                  data-aos-delay={card.delay || index * 50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  onClick={() => handleCardClick(card)}
                  style={{
                    cursor: card.id || card.slug ? "pointer" : "default",
                  }}
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
                    <span>{truncatedTitle}</span> <span>{truncatedTitle}</span>{" "}
                    <span>{truncatedTitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
export default OfferCard;
