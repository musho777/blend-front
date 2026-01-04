const OfferCard = () => {
  return (
    <div className="offer-card-area">
      <div className="row no-gap row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
        <div
          className="col"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="offer-card-item">
            <span className="title">‎ </span>

            <div className="image">
              <img src="assets/images/offer/offer-card1.png" alt="tobacco" />
            </div>
            <span className="title">‎ </span>

            <div className="bg-text">
              <span>Tobacco</span> <span>Tobacco</span> <span>Tobacco</span>
            </div>
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="offer-card-item style-two">
            <span className="title">‎ </span>
            <div className="image">
              <img src="assets/images/offer/accessories.png" alt="Food" />
            </div>
            <span className="title">‎ </span>
            <div className="bg-text">
              <span>Accessories</span> <span>Accessories</span>{" "}
              <span>Accessories</span>
            </div>
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-delay={100}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="offer-card-item">
            <span className="title">‎ </span>
            <div className="image">
              <img src="assets/images/offer/offer-card3.png" alt="Food" />
            </div>
            <span className="title">‎ </span>

            <div className="bg-text">
              <span>hotdog</span> <span>hotdog</span> <span>hotdog</span>
            </div>
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="offer-card-item style-two">
            {/* <div className="badge">-15%</div> */}
            <span className="title">‎ </span>

            <div className="image">
              <img src="assets/images/offer/offer-card4.webp" alt="Food" />
            </div>
            <span className="title">‎ </span>

            <div className="bg-text">
              <span>chickens</span> <span>chickens</span> <span>chickens</span>
            </div>
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-delay={200}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="offer-card-item">
            <span className="title">‎ </span>

            <div className="image">
              <img src="assets/images/offer/offer-card5.webp" alt="Food" />
            </div>
            <span className="title">‎ </span>

            <div className="bg-text">
              <span>seafood</span> <span>seafood</span> <span>seafood</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OfferCard;
